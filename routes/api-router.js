const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {getHotelChains} = require('./hotel-chain-router');
const {getHotels, getCapacityByHotel} = require('./hotel-router');
const {getRooms, getRoom, getRoomsByArea} = require('./room-router');
const {getEmployees, getEmployee, deleteEmployee, createEmployee, updateEmployee} = require('./employee-router');
const {getCustomers, getCustomer} = require('./customer-router');
const {
  getBookings, getRoomsAvailableForBooking, createBooking, getSearchOptions, getAmountOfUpcomingBookings
} = require('./booking-router');
const {getRoomsAvailableForRent, createRental, checkIn} = require ('./rental-router');


router.get("/hotels/capacity", getCapacityByHotel);

router.get("/hotel-chains", getHotelChains);

router.get("/hotel-chains/:hotelChainName/hotels", getHotels);
router.get("/hotel-chains/:hotelChainName/upcoming-bookings", getAmountOfUpcomingBookings);

router.get("/hotel-chains/:hotelChainName/:hotelId/rooms", getRooms);
router.get("/hotel-chains/:hotelChainName/:hotelId/bookings", getBookings);
router.get("/hotel-chains/:hotelChainName/:hotelId/rentals", getRoomsAvailableForRent);
router.get("/hotel-chains/:hotelChainName/:hotelId/:roomNumber", getRoom);

router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/rent", createRental);
router.post("/hotel-chains/:hotelChainName/:hotelId/:roomNumber/book", createBooking);

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:employeeId", getEmployee);
router.put("/employees/:employeeId", updateEmployee);
router.delete("/employees/:employeeId", deleteEmployee);
router.post("/employees/:employeeId/check-in", checkIn);

router.get("/customers", getCustomers);
router.get("/customers/:customerId", getCustomer);

router.get("/bookings/search-options", getSearchOptions);

router.get("/rooms", getRoomsAvailableForBooking);
router.get("/areas/rooms", getRoomsByArea);

router.use((req, res, next) =>
  next(new createError.NotFound(`API Endpoint not found [${req.url}]`))
);

module.exports = router;
