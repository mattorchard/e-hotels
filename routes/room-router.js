const {snakeToCamel} = require('../services/postgres-service');
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

    const allResponses = await Promise.all([roomPromise, roomDamagePromise, roomAmenityPromise]);
    const [rooms, roomDamages, roomAmenities] = allResponses.map(response => response.rows.map(snakeToCamel));

    const groupedDamages = lodash.groupBy(roomDamages, 'roomNumber');
    const groupedAmenities = lodash.groupBy(roomAmenities, 'roomNumber');

    rooms.forEach(room => {
      room.damages = (groupedDamages[room.roomNumber] || []).map(d => d.damage);
      room.amenities = (groupedAmenities[room.roomNumber] || []).map(a => a.amenity);
    });

    res.send(rooms);
  } catch (error) {
    console.error("Unable to fetch rooms", error);
    next(error);
  }
};
// Add room
// Edit room
// Delete room
module.exports = {getRooms};