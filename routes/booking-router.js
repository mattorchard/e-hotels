const {responseToRows, nestCustomer} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');


// Search availability
// Add a booking

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
    const response = await pool.query(`
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
    const rows = responseToRows(response);
    return res.send(rows);
  } catch(error) {
    console.error(error);
    return next(error);
  }
};

module.exports = {getBookings, getRoomsAvailableForBooking};