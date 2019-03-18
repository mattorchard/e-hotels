const {responseToRows} = require("./postgres-service");
const {inTransaction} = require("./postgres-service");

const insertAmenities = async (client, {hotelChainName, hotelId, roomNumber, amenities}) => {
  if (amenities.length < 1) {
    return;
  }
  const arguments = amenities.map((amenity, index) => `($1, $2, $3, $${index + 4})`);
  await client.query(`INSERT INTO room_amenity VALUES ${arguments.join(", ")} ON CONFLICT DO NOTHING`,
    [hotelChainName, hotelId, roomNumber, ...amenities]);
};

const insertDamages = async (client, {hotelChainName, hotelId, roomNumber, damages}) => {
  if (damages.length < 1) {
    return;
  }
  const arguments = damages.map((damage, index) => `($1, $2, $3, $${index + 4})`);
  await client.query(`INSERT INTO room_damage VALUES ${arguments.join(", ")} ON CONFLICT DO NOTHING`,
    [hotelChainName, hotelId, roomNumber, ...damages]);
};

const updateAmenities = async (client, {hotelChainName, hotelId, roomNumber, amenities}) => {
  if (amenities.length === 0) {
    await client.query(
      `DELETE FROM room_amenity
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3`,
      [hotelChainName, hotelId, roomNumber]);
  } else {
    const deleteArguments = amenities.map((amenity, index) => `$${index + 4}`);
    await client.query(
      `DELETE FROM room_amenity
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
      AND amenity NOT IN (${deleteArguments.join(", ")})`,
      [hotelChainName, hotelId, roomNumber, ...amenities]);
  }
  await insertAmenities(client, {hotelChainName, hotelId, roomNumber, amenities});
};

const updateDamages = async (client, {hotelChainName, hotelId, roomNumber, damages}) => {
  if (damages.length === 0) {
    await client.query(
      `DELETE FROM room_damage
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3`,
      [hotelChainName, hotelId, roomNumber]);
  } else {
    const deleteArguments = damages.map((damage, index) => `$${index + 4}`);
    await client.query(
      `DELETE FROM room_damage
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
      AND damage NOT IN (${deleteArguments.join(", ")})`,
      [hotelChainName, hotelId, roomNumber, ...damages]);
  }
  await insertDamages(client, {hotelChainName, hotelId, roomNumber, damages});
};

const insertRoom = async (pool, room) => {
  const {
    hotelChainName,
    hotelId,
    roomNumber,
    price,
    capacity,
    scenery,
    extendable
  } = room;
  return inTransaction(pool, async client => {
    await client.query(
      `INSERT INTO room VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [hotelChainName, hotelId, roomNumber, price, capacity, scenery, extendable]);
    await insertAmenities(client, room);
    await insertDamages(client, room);
  });
};

const roomNumberInUse = async(pool, {hotelChainName, hotelId, roomNumber}) => {
  const conflictResponse = await pool.query(
    `SELECT * FROM room
      WHERE hotel_chain_name = $1
      AND hotel_id = $2
      AND room_number = $3`,
    [hotelChainName, hotelId, roomNumber]
  );
  const conflictRows = responseToRows(conflictResponse);
  return conflictRows.length > 0;
};

module.exports = {insertRoom, roomNumberInUse, updateAmenities, updateDamages};