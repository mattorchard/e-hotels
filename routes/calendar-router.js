const {responseToRows, nestAddress, nestCustomer} = require('../services/postgres-service');
const pool = require("../pool");

const getCalendar = async(req, res, next) => {
  try {
    const bookingPromise = pool.query(
      `SELECT
        customer.given_name, customer.family_name, customer.registered_on,
        hotel.address_id, address.*,
        booking.*
      FROM booking
      JOIN customer
        ON customer_id = customer.id
      JOIN hotel
        ON hotel.hotel_chain_name = booking.hotel_chain_name
        AND hotel.id = booking.hotel_id
      JOIN address
        ON hotel.address_id = address.id`);
    const rentalPromise = pool.query(
      `SELECT
        customer.given_name, customer.family_name, customer.registered_on,
        hotel.address_id,
        address.*,
        rental.*
      FROM rental
      JOIN customer
        ON customer_id = customer.id
      JOIN hotel
        ON hotel.hotel_chain_name = rental.hotel_chain_name
        AND hotel.id = rental.hotel_id
      JOIN address
        ON hotel.address_id = address.id`
    );

    const responses = await Promise.all([bookingPromise, rentalPromise]);
    const [bookingRows, rentalRows] = responseToRows(responses);

    const bookings = bookingRows.map(nestAddress).map(nestCustomer);
    const rentals = rentalRows.map(nestAddress).map(nestCustomer);

    return res.send({bookings, rentals});
  } catch(error) {
    console.error("Unable to get calendar", error);
    return next(error);
  }
};

module.exports = {getCalendar};