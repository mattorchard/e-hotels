const pool = require("../pool");
const {responseToRows, nestAddress} = require('../services/postgres-service');
const lodash = require("lodash");

const getHotelChains = async(req, res, next) => {
  try {
    const hotelChainPromise = pool.query(
      `SELECT * FROM address, hotel_chain
      WHERE main_office_address_id = id`);
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
// Delete hotel chain

module.exports = {getHotelChains};