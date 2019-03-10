const {responseToRows, nestAddress, nestManager} = require('../services/postgres-service');
const pool = require("../pool");
const createError = require('http-errors');
const lodash = require("lodash");


const getHotels = async (req, res, next) => {
  const {hotelChainName} = req.params;
  if (!hotelChainName) {
    return next(new createError.UnprocessableEntity("Must supply hotel chain name"));
  }
  try {
    const hotelPromise = pool.query(
      `SELECT * FROM address, employee, capacity_by_hotel, hotel
      WHERE hotel.hotel_chain_name = $1
      AND hotel.address_id = address.id
      AND manager_id = employee.id
      AND hotel.id = capacity_by_hotel.hotel_id
      AND hotel.hotel_chain_name = capacity_by_hotel.hotel_chain_name`,
      [hotelChainName]);
    const phonePromise = pool.query(
      `SELECT * FROM hotel_phone_number
      WHERE hotel_chain_name = $1`,
      [hotelChainName]);
    const emailPromise = pool.query(
      `SELECT * FROM hotel_email_address
      WHERE hotel_chain_name = $1`,
      [hotelChainName]);

    const responses = await Promise.all([hotelPromise, phonePromise, emailPromise]);
    const [hotelRows, phoneRows, emailRows] = responseToRows(responses);

    const hotels = hotelRows.map(nestAddress).map(nestManager);

    const groupedPhones = lodash.groupBy(phoneRows, "hotelId");
    const groupedEmails = lodash.groupBy(emailRows, "hotelId");

    hotels.forEach(hotel => {
      hotel.phoneNumbers = (groupedPhones[hotel.id] || []).map(p => p.phoneNumber);
      hotel.emailAddresses = (groupedEmails[hotel.id] || []).map(e => e.emailAddress);
    });

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