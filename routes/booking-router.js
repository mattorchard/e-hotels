const {responseToRows, nestCustomer} = require('../services/postgres-service');
const {getHotels} = require('../services/hotel-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');
const {roomInUse} = require("../services/booking-service");


const createBooking = async(req, res, next) => {
  const {hotelChainName, hotelId, roomNumber} = req.params;
  const {customerId, startDate: startDateRaw, endDate: endDateRaw} = req.body;
  if (!hotelChainName || !hotelId || !roomNumber || !customerId || !startDateRaw || !endDateRaw) {
    return next(createError.UnprocessableEntity(
      "Must supply hotel chain, hotel, room, customer, start, and end date"));
  }

  const startDate = new Date(startDateRaw);
  const endDate = new Date(endDateRaw);
  if (startDate >= endDate) {
    return next(createError.UnprocessableEntity("Start date must be before end date"));
  }

  try {
    if (await roomInUse(pool, hotelChainName, hotelId, roomNumber, startDate, endDate)) {
      return res.status(409).send("Room is not available at that time");
    }
    const response = await pool.query(
      `INSERT INTO booking VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id`,
      [customerId, hotelChainName, hotelId, roomNumber, startDate, endDate]);
    const rows = responseToRows(response);
    const [{id}] = rows;
    res.send({id});
  } catch (error) {
    console.error("Unable to create booking", error);
    next(error);
  }
};


const getBookings = async (req, res, next) => {
  const {hotelChainName, hotelId} = req.params;
  if (!hotelChainName || !hotelId) {
    return next(createError.NotFound("Must Supply a hotel chain and hotel to fetch bookings"));
  }
  try {
    const response = await pool.query(
      `SELECT * FROM customer, booking
      WHERE hotel_chain_name = $1 AND hotel_id = $2 AND customer.id = customer_id`,
      [hotelChainName, hotelId]);
    const rows = responseToRows(response);
    const bookings = rows.map(nestCustomer);
    return res.send(bookings);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getRoomsAvailableForBooking = async(req, res, next) => {
  const {startDate: startDateRaw, endDate: endDateRaw} = req.query;
  if (!startDateRaw || !endDateRaw) {
    return next(createError.UnprocessableEntity("Must supply Start and end date"));
  }
  const startDate = new Date(startDateRaw);
  const endDate = new Date(endDateRaw);
  if (startDate >= endDate) {
    return next(createError.UnprocessableEntity("Start date must be before end date"));
  }
  try {
    const roomPromise = await pool.query(`
      SELECT * FROM room
      WHERE (hotel_chain_name, hotel_id, room_number) NOT IN ((
          SELECT hotel_chain_name, hotel_id, room_number
          FROM booking
          WHERE (
            $1 BETWEEN start_date AND end_date
            OR $2 BETWEEN start_date AND end_date
            OR start_date BETWEEN $1 AND $2
            OR end_date BETWEEN $1 AND $2
          )
        ) UNION (
          SELECT hotel_chain_name, hotel_id, room_number
          FROM rental
          WHERE (
            $1 BETWEEN start_date AND end_date
            OR $2 BETWEEN start_date AND end_date
            OR start_date BETWEEN $1 AND $2
            OR end_date BETWEEN $1 AND $2
          )
        )
      )`, [startDate, endDate]);

    const hotels = await getHotels(pool);
    const rooms = responseToRows(await roomPromise);

    const groupedRooms = rooms.reduce((groups, room) => {
      if (room.hotelChainName in groups) {
        const hotelChainGroup = groups[room.hotelChainName];
        if (room.hotelId in hotelChainGroup) {
          hotelChainGroup[room.hotelId].push(room);
        } else {
          hotelChainGroup[room.hotelId] = [room];
        }

      } else {
        groups[room.hotelChainName] = {[room.hotelId]: [room]};
      }
      return groups;
    }, {});



    hotels.forEach(hotel =>
      hotel.rooms = groupedRooms[hotel.hotelChainName][hotel.id] || [] );

    return res.send(hotels);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {getBookings, getRoomsAvailableForBooking, createBooking};