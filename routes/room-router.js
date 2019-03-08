const {responseToRows} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');
const lodash = require("lodash");

const getRooms = async (req, res, next) => {
  try {
    const {hotelChainName, hotelId} = req.params;
    if (!hotelChainName || !hotelId) {
      return next(new createError.UnprocessableEntity("Must supply hotel chain name and hotel ID to fetch rooms"));
    }
    const roomPromise = pool.query(
      `SELECT * 
      FROM room
      WHERE hotel_chain_name = $1
      AND room.hotel_id = $2
      ORDER BY room_number`,
      [hotelChainName, hotelId]);
    const roomDamagePromise = pool.query(
      `SELECT * 
      FROM room_damage
      WHERE hotel_chain_name = $1
      AND hotel_id = $2
      ORDER BY room_number`,
      [hotelChainName, hotelId]);
    const roomAmenityPromise = pool.query(
      `SELECT * 
      FROM room_amenity
      WHERE hotel_chain_name = $1
      AND hotel_id = $2
      ORDER BY room_number`,
      [hotelChainName, hotelId]);

    const responses = await Promise.all([roomPromise, roomDamagePromise, roomAmenityPromise]);
    const [rooms, roomDamages, roomAmenities] = responseToRows(responses);

    const groupedDamages = lodash.groupBy(roomDamages, 'roomNumber');
    const groupedAmenities = lodash.groupBy(roomAmenities, 'roomNumber');

    rooms.forEach(room => {
      room.damages = (groupedDamages[room.roomNumber] || []).map(d => d.damage);
      room.amenities = (groupedAmenities[room.roomNumber] || []).map(a => a.amenity);
    });

    return res.send(rooms);
  } catch (error) {
    console.error("Unable to fetch rooms", error);
    return next(error);
  }
};

const getRoom = async (req, res, next) => {
  const {hotelChainName, hotelId, roomNumber} = req.params;
  if (!hotelChainName || !hotelId || !roomNumber) {
    return next(new createError.NotFound("Must supply hotel chain name, hotel ID and room number"));
  }
  try {
    const response = await pool.query(
      `SELECT * FROM room LEFT JOIN ((
        SELECT damage, null AS amenity
        FROM room_damage
        WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
      ) UNION (
        SELECT null as damage, amenity
        FROM room_amenity
        WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3
      )) AS room_details ON True
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND room_number = $3`,
      [hotelChainName, hotelId, roomNumber]);
    const rows = responseToRows(response);
    if (rows.length === 0) {
      return res.status(404).send(`No room found matching ${hotelChainName}-${hotelId}-${roomNumber}`);
    }
    const room = rows.reduce((room, {damage, amenity}) => {
      if (damage) {
        room.damages.push(damage);
      } if (amenity) {
        room.amenities.push(amenity);
      }
      return room;
    }, {...rows[0], damages: [], amenities: []});

    return res.send(room);
  } catch (error) {
  console.error("Unable to fetch room", error);
  return next(error);
}
};
// Add room
// Edit room
// Delete room
module.exports = {getRooms, getRoom};