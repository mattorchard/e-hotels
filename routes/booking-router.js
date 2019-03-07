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

module.exports = {getBookings};