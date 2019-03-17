const {responseToRows, nestAddress, nestManager} = require('../services/postgres-service');

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

const insertHotelPhoneNumbers = async (client, {hotelChainName, hotelId}, phoneNumbers) => {
  if (phoneNumbers.length < 1) {return;}
  const arguments = phoneNumbers.map((number, index) => `($1, $2, $${index + 3})`);
  return client.query(`INSERT INTO hotel_phone_number VALUES ${arguments.join(", ")}`,
    [hotelChainName, hotelId, ...phoneNumbers]);
};

const insertHotelEmailAddresses = async (client, {hotelChainName, hotelId}, emailAddresses) => {
  if (emailAddresses.length < 1) {return;}
  const arguments = emailAddresses.map((number, index) => `($1, $2, $${index + 3})`);
  return client.query(`INSERT INTO hotel_email_address VALUES ${arguments.join(", ")}`,
    [hotelChainName, hotelId, ...emailAddresses]);
};


module.exports = {getHotels, insertHotelPhoneNumbers, insertHotelEmailAddresses};

