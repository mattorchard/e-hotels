const {responseToRows} = require('../services/postgres-service');
const pool = require("../pool");
const createError = require('http-errors');
const lodash = require("lodash");
const {insertRoom} = require("../services/room-service");

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

const getRoomsByArea = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM ROOMS_BY_AREA");
    const rows = responseToRows(response);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const createRoom = async (req, res, next) => {
  const {hotelChainName, hotelId} = req.params;
  const room = req.body;
  if (!hotelChainName || !hotelId || !room.roomNumber) {
    return next(new createError.NotFound("Must supply hotel chain name, hotel ID and room number"));
  }
  try {
    const conflictResponse = await pool.query(
      `SELECT * FROM room
      WHERE hotel_chain_name = $1
      AND hotel_id = $2
      AND room_number = $3`,
      [hotelChainName, hotelId, room.roomNumber]
    );
    const conflictRows = responseToRows(conflictResponse);
    if (conflictRows.length !== 0) {
      return res.status(409).send({message: "That room number is already in use"});
    }
    await insertRoom(pool, {...room, hotelId, hotelChainName});
    res.send({message: "Room created"});
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
// Edit room

const deleteRoom = async (req, res, next) => {
  const {hotelChainName, hotelId, roomNumber} = req.params;
  if (!hotelChainName || !hotelId || !roomNumber) {
    return next(new createError.NotFound("Must supply hotel chain name, hotel ID and room number"));
  }
  try {
    await pool.query(
      `DELETE FROM room
      WHERE hotel_chain_name = $1
      AND hotel_id = $2
      AND room_number = $3`,
      [hotelChainName, hotelId, roomNumber]
    );
    res.send({message: "Room deleted"});
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
module.exports = {getRooms, getRoom, getRoomsByArea, createRoom, deleteRoom};