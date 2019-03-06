const {responseToRows} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');

// Check in (booking to rental)
// Add rental

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

module.exports = {getRoomsAvailableForRent};