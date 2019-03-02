const {Pool} = require('pg');
const pool = new Pool();
const {responseToRows, nestAddress} = require('../services/postgres-service');


const getHotelChains = async(req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM hotel_chain, address WHERE main_office_address_id = id");
    const rows = responseToRows(response);
    const hotelChains = rows.map(nestAddress);
    res.send(hotelChains);
  } catch (error) {
    console.error("Unable to fetch hotel chains", error);
    next(error);
  }
};
// Add hotel chain
// Edit hotel chain
// Delete hotel chain

module.exports = {getHotelChains};