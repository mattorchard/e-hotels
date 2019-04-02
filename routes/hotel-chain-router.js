const pool = require("../pool");
const {responseToRows, nestAddress, inTransaction} = require('../services/postgres-service');
const {deleteAddresses} = require("../services/address-service");
const lodash = require("lodash");
const createError = require('http-errors');

const getHotelChains = async (req, res, next) => {
  try {
    const hotelChainPromise = pool.query(
      `SELECT *, hotel_chain.* from hotel_chain
      JOIN address
        ON address.id = main_office_address_id
      LEFT JOIN (	
        SELECT hotel_chain_name, COUNT(id) as num_hotels FROM hotel GROUP BY hotel_chain_name
      ) as n ON n.hotel_chain_name = hotel_chain.name`);
    const phonePromise = pool.query("SELECT * FROM hotel_chain_phone_number");
    const emailPromise = pool.query("SELECT * FROM hotel_chain_email_address");
    const responses = await Promise.all([hotelChainPromise, phonePromise, emailPromise]);
    const [hotelChainRows, phoneRows, emailRows] = responseToRows(responses);

    const hotelChains = hotelChainRows.map(nestAddress);

    const groupedPhones = lodash.groupBy(phoneRows, "hotelChainName");
    const groupedEmails = lodash.groupBy(emailRows, "hotelChainName");

    hotelChains.forEach(hotelChain => {
      hotelChain.phoneNumbers = (groupedPhones[hotelChain.name] || []).map(p => p.phoneNumber);
      hotelChain.emailAddresses = (groupedEmails[hotelChain.name] || []).map(e => e.emailAddress);
    });

    return res.send(hotelChains);
  } catch (error) {
    console.error("Unable to fetch hotel chains", error);
    return next(error);
  }
};
// Add hotel chain
// Edit hotel chain
const DISABLE_DELETE_HOTEL_CHAINS = process.env.DISABLE_DELETE_HOTEL_CHAINS == "true";
const deleteHotelChain = async (req, res, next) => {
  if (DISABLE_DELETE_HOTEL_CHAINS) {
    return next(createError.Forbidden("Deleting hotel chains has been disabled for this deployment"));
  }
  const {hotelChainName} = req.params;
  if (!hotelChainName) {
    return next(createError.NotFound("Must supply hotel chain name"));
  }
  try {
    await inTransaction(pool, async client => {
      const addressResponse = await client.query(`(
          SELECT main_office_address_id as address_id
          FROM hotel_chain
          WHERE name = $1
        ) UNION (
          SELECT address_id
          FROM hotel
          WHERE hotel_chain_name = $1
      )`, [hotelChainName]);

      const addressIds = responseToRows(addressResponse)
      .map(({addressId}) => addressId);

      await client.query(`DELETE FROM hotel_chain WHERE name = $1`, [hotelChainName]);
      await deleteAddresses(client, addressIds)
    });
    return res.send({message: "Hotel chain deleted"});
  } catch (error) {
    console.error("Unable to delete hotel chain", error);
    return next(error);
  }
};

module.exports = {getHotelChains, deleteHotelChain};