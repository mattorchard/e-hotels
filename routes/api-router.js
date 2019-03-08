const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {getHotelChains} = require('./hotel-chain-router');
const {getHotels} = require('./hotel-router');
const {getRooms, getRoom} = require('./room-router');
const {getEmployees, getEmployee, deleteEmployee, createEmployee, updateEmployee} = require('./employee-router');
const {getCustomers, getCustomer} = require('./customer-router');
const {getBookings, getRoomsAvailableForBooking, createBooking} = require('./booking-router');
const {getRoomsAvailableForRent, createRental} = require ('./rental-router');

router.get('/test', (req, res) =>
  res.send({"Howdy": "World"})
);

router.get("/hotel-chains", getHotelChains);

router.get("/hotel-chains/:hotelChainName/hotels", getHotels);

router.get("/hotel-chains/:hotelChainName/:hotelId/:roomNumber", getRoom);
router.get("/hotel-chains/:hotelChainName/:hotelId/rooms", getRooms);
router.get("/hotel-chains/:hotelChainName/:hotelId/bookings", getBookings);
router.get("/hotel-chains/:hotelChainName/:hotelId/rentals", getRoomsAvailableForRent);
router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/rent", createRental);
router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/book", createBooking);

router.post("/employee", createEmployee);
router.get("/employees", getEmployees);
router.get("/employee/:employeeId", getEmployee);
router.put("/employee/:employeeId", updateEmployee);
router.delete("/employee/:employeeId", deleteEmployee);

router.get("/customers", getCustomers);
router.get("/customers/:customerId", getCustomer);


router.get("/rooms", getRoomsAvailableForBooking);

router.use((req, res, next) =>
  next(new createError.NotFound(`API Endpoint not found [${req.url}]`))
);

module.exports = router;
