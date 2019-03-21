const {responseToRows, inTransaction} = require('../services/postgres-service');
const {roomInUse} = require('../services/booking-service');
const pool = require("../pool");
const createError = require('http-errors');

const createRental = async(req, res, next) => {
  const {hotelChainName, hotelId, roomNumber} = req.params;
  const {employeeId, customerId, startDate: startDateRaw, endDate: endDateRaw} = req.body;
  if (!hotelChainName || !hotelId || !roomNumber || !employeeId || !customerId || !startDateRaw || !endDateRaw) {
    return next(createError.UnprocessableEntity(
      "Must supply hotel chain, hotel, room, customer, employee, start, and end date"));
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
      `INSERT INTO rental VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [customerId, employeeId, hotelChainName, hotelId, roomNumber, startDate, endDate]);
    const rows = responseToRows(response);
    const [{id}] = rows;
    res.send({id});
  } catch (error) {
    console.error("Unable to create rental", error);
    next(error);
  }
};

const getRoomsAvailableForRent = async (req, res, next) => {
  const {hotelChainName, hotelId} = req.params;
  const {startDate: startDateRaw, endDate: endDateRaw} = req.query;
  if (!hotelChainName || !hotelId || !startDateRaw || !endDateRaw) {
    return next(createError.UnprocessableEntity("Must supply hotel chain, hotel, start, and end date"));
  }

  const startDate = new Date(startDateRaw);
  const endDate = new Date(endDateRaw);
  if (startDate >= endDate) {
    return next(createError.UnprocessableEntity("Start date must be before end date"));
  }

  try {
    const response = await pool.query(
      `SELECT * FROM room
      WHERE hotel_chain_name = $1 AND hotel_id = $2
      AND room_number NOT IN ((
          SELECT room_number FROM booking
          WHERE hotel_chain_name = $1 AND hotel_id = $2
          AND (
            $3 BETWEEN start_date AND end_date
            OR $4 BETWEEN start_date AND end_date
            OR start_date BETWEEN $3 AND $4
            OR end_date BETWEEN $3 AND $4
          )
        ) UNION (
          SELECT room_number FROM rental
          WHERE hotel_chain_name = $1 AND hotel_id = $2
          AND (
            $3 BETWEEN start_date AND end_date
            OR $4 BETWEEN start_date AND end_date
            OR start_date BETWEEN $3 AND $4
            OR end_date BETWEEN $3 AND $4
          )
      ))`, [hotelChainName, hotelId, startDate, endDate]);
    const rows = responseToRows(response);
    return res.send(rows);
  } catch (error) {
    console.error("Unable to fetch available rooms", error);
    return next(error);
  }
};

const checkIn = async(req, res, next) => {
  const {bookingId} =  req.params;
  const {employeeId} = req.query;
  try {
    const bookingResponse = await pool.query("SELECT * FROM booking WHERE id = $1", [bookingId]);
    const [booking] = responseToRows(bookingResponse);
    if (!booking) {
      return next(createError.NotFound("No booking found for that ID"));
    }
    const {customerId, hotelChainName, hotelId, roomNumber, startDate, endDate} = booking;
    await inTransaction(pool, async client => {
      await client.query(
        `INSERT INTO rental VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)`,
        [customerId, employeeId, hotelChainName, hotelId, roomNumber, startDate, endDate]);
      await client.query(`DELETE FROM booking WHERE id = $1`, [bookingId])
    });

    return res.send({message: "Checked in"});
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

module.exports = {getRoomsAvailableForRent, createRental, checkIn};