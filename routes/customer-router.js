const addressService = require("../services/address-service");
const pool = require("../pool");
const {responseToRows, nestAddress, inTransaction} = require('../services/postgres-service');


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

const getCustomer = async (req, res, next) => {
  const {customerId} = req.params;
  if (!customerId) {
    return next(createError.NotFound("Must supply a customer ID"));
  }
  try {
    const response = await pool.query(
      `SELECT * FROM address, customer WHERE address.id = address_id AND customer.id = $1`,
      [customerId]);
    const [customer] = responseToRows(response);
    return res.send(nestAddress(customer))
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
// Add a customer
const createCustomer = async (req, res, next) => {
   const {ssn, sin, givenName, familyName, address} = req.body;
  try {
    const registeredOn = new Date();
    const customerId = await inTransaction(pool, async client => {
      const addressId = await addressService.insertAddress(client, address);
      const customerResponse = await client.query(
        "INSERT INTO customer VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id",
        [ssn, sin, givenName, familyName, addressId, registeredOn]);
      return customerResponse.rows[0].id;
    });
    return res.send({id: customerId});
  } catch (error) {
    return next(error);
  }
};
// Edit customer
const deleteCustomer = async(req, res, next) =>{
  const {customerId} = req.params;
  if (!customerId) {
    return next(new createError.UnprocessableEntity("Must supply ID to delete customer"));
  }

  try {
    const rows = responseToRows(await pool.query(
      "SELECT address_id FROM customer WHERE id = $1", [customerId]));
    const [{addressId}] = rows;

    await inTransaction(pool, async client=> {
      await client.query(`DELETE FROM customer WHERE id=$1`, [customerId]);
      await client.query(`DELETE FROM address WHERE id=$1`, [addressId]);
    });

    return res.send({message: `Deleted customer ${customerId}`});
  } catch(error){
    console.error(`Unable to delete customer [${customerId}]`, error);
    return next(error);
  }
};
module.exports = {getCustomers, getCustomer, deleteCustomer, createCustomer};