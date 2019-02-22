const {snakeToCamel, nestAddress, nestManager} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');


const getHotels = async (req, res, next) => {
  try {
    if (!req.params.hotelChainName) {
      return next(new createError.UnprocessableEntity());
    }
    const response = await pool.query(
      `SELECT hotel.id, category, manager_id,
      street_number, street_name, city, country,
      given_name, family_name 
      FROM hotel, address, employee
      WHERE hotel.hotel_chain_name = $1
      AND hotel.address_id = address.id
      AND manager_id = employee.id`,
      [req.params.hotelChainName]);
    const rows = response.rows.map(snakeToCamel);
    const hotels = rows.map(nestAddress).map(nestManager);
    res.send(hotels);
  } catch (error) {
    console.error("Unable to fetch hotels", error);
    next(error);
  }
};

// Add hotel
// Edit hotel
// Delete hotel

module.exports = {getHotels};