const {inTransaction} = require("./postgres-service");

const insertAmenities = async (client, {hotelChainName, hotelId, roomNumber, amenities}) => {
  if (amenities.length < 1) {
    return;
  }
  const arguments = amenities.map((amenity, index) => `($1, $2, $3, $${index + 4})`);
  await client.query(`INSERT INTO room_amenity VALUES ${arguments.join(", ")}`,
    [hotelChainName, hotelId, roomNumber, ...amenities]);
};

const insertDamages = async (client, {hotelChainName, hotelId, roomNumber, damages}) => {
  if (damages.length < 1) {
    return;
  }
  const arguments = damages.map((damage, index) => `($1, $2, $3, $${index + 4})`);
  await client.query(`INSERT INTO room_damage VALUES ${arguments.join(", ")}`,
    [hotelChainName, hotelId, roomNumber, ...damages]);
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

module.exports = {insertRoom};