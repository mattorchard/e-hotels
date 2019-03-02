const {Pool} = require('pg');
const pool = new Pool();
const {responseToRows, nestAddress} = require('../services/postgres-service');


const getCustomers = async (req, res, next) => {
  try {
    const response = await pool.query("SELECT * FROM address, customer WHERE address.id = address_id");
    const rows = responseToRows(response);
    const customers = rows.map(nestAddress);
    res.send(customers);
  } catch (error) {
    console.error("Unable to fetch customers", error);
    next(error);
  }
};
// Add a customer
// Edit customer
// Delete customer
module.exports = {getCustomers};