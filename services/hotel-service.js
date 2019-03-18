const {responseToRows, nestAddress, nestManager, inTransaction} = require('../services/postgres-service');
const {updateAddress} = require("./address-service");

const getHotels = async client => {
  const response = await client.query(
    `SELECT *, (
      SELECT COUNT(room_number) AS num_rooms FROM room WHERE room.hotel_id = hotel.id
    ) FROM address, employee, hotel, capacity_by_hotel
    WHERE address.id = hotel.address_id
    AND employee.id = hotel.manager_id
    AND capacity_by_hotel.hotel_chain_name = hotel.hotel_chain_name
    AND capacity_by_hotel.hotel_id = hotel.id`);
  return responseToRows(response)
  .map(nestAddress)
  .map(nestManager);
};

const insertHotelPhoneNumbers = async (client, {hotelChainName, id}, phoneNumbers) => {
  if (phoneNumbers.length < 1) {
    return;
  }
  const arguments = phoneNumbers.map((number, index) =>
    `($1, $2, $${index + 3})`);
  return client.query(
    `INSERT INTO hotel_phone_number
    VALUES ${arguments.join(", ")}
    ON CONFLICT DO NOTHING`,
    [hotelChainName, id, ...phoneNumbers]);
};

const insertHotelEmailAddresses = async (client, {hotelChainName, id}, emailAddresses) => {
  if (emailAddresses.length < 1) {
    return;
  }
  const arguments = emailAddresses.map((number, index) =>
    `($1, $2, $${index + 3})`);
  return client.query(
    `INSERT INTO hotel_email_address
    VALUES ${arguments.join(", ")}
    ON CONFLICT DO NOTHING`,
    [hotelChainName, id, ...emailAddresses]);
};

const deleteUnusedPhoneNumbers = async (client, {hotelChainName, id}, phoneNumbers) => {
  if (!phoneNumbers || phoneNumbers.length === 0) {
    await client.query(
      `DELETE FROM hotel_phone_number
      WHERE hotel_chain_name = $1 AND hotel_id = $2`,
        [hotelChainName, id]);
  } else {
    const arguments = phoneNumbers.map((number, index) => `$${index + 3}`);
    await client.query(
      `DELETE FROM hotel_phone_number
      WHERE hotel_chain_name = $1 AND hotel_id = $2
      AND phone_number NOT IN (${arguments})`,
      [hotelChainName, id, ...phoneNumbers]);
  }
};

const deleteUnusedEmailAddresses = async (client, {hotelChainName, id}, emailAddresses) => {
  if (!emailAddresses || emailAddresses.length === 0) {
    await client.query(
      `DELETE FROM hotel_email_address
      WHERE hotel_chain_name = $1 AND hotel_id = $2`,
      [hotelChainName, id]);
  } else {
    const arguments = emailAddresses.map((email, index) => `$${index + 3}`);
    await client.query(
      `DELETE FROM hotel_email_address
      WHERE hotel_chain_name = $1 AND hotel_id = $2
      AND email_address NOT IN (${arguments})`,
      [hotelChainName, id, ...emailAddresses]);
  }
};

const updateHotel = async (pool, hotel) => {
  const {hotelChainName, id, managerId, category, address, phoneNumbers, emailAddresses} = hotel;
  await inTransaction(pool, async client => {
    await updateAddress(client, address);
    await deleteUnusedPhoneNumbers(client, hotel, phoneNumbers);
    await insertHotelPhoneNumbers(client, hotel, phoneNumbers);
    await deleteUnusedEmailAddresses(client, hotel, emailAddresses);
    await insertHotelEmailAddresses(client, hotel, emailAddresses);
    await client.query(
      `UPDATE hotel SET
      manager_id = $3, category = $4
      WHERE hotel_chain_name = $1 AND id = $2`,
      [hotelChainName, id, managerId, category]);
  });
};


module.exports = {getHotels, insertHotelPhoneNumbers, insertHotelEmailAddresses, updateHotel};

