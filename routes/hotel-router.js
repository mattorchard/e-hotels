const {responseToRows, nestAddress, nestManager} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const createError = require('http-errors');


const getHotels = async (req, res, next) => {
  const {hotelChainName} = req.params;
  if (!hotelChainName) {
    return next(new createError.UnprocessableEntity("Must supply hotel chain name"));
  }
  try {
    const response = await pool.query(
      `SELECT * FROM address, employee, capacity_by_hotel, hotel
      WHERE hotel.hotel_chain_name = $1
      AND hotel.address_id = address.id
      AND manager_id = employee.id
      AND hotel.id = capacity_by_hotel.hotel_id
      AND hotel.hotel_chain_name = capacity_by_hotel.hotel_chain_name`,
      [hotelChainName]);
    const rows = responseToRows(response);
    const hotels = rows.map(nestAddress).map(nestManager);
    res.send(hotels);
  } catch (error) {
    console.error("Unable to fetch hotels", error);
    next(error);
  }
};

const getCapacityByHotel = async(req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM capacity_by_hotel");
    const rows = responseToRows(response);
    return res.send(rows);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// Add hotel
// Edit hotel
// Delete hotel

module.exports = {getHotels, getCapacityByHotel};