const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {getHotelChains} = require('./hotel-chain-router');
const {getHotels} = require('./hotel-router');
const {getRooms} = require('./room-router');
const {getEmployees} = require('./employee-router');


router.get('/test', (req, res) =>
  res.send({"Howdy": "World"})
);

router.get("/hotel-chains", getHotelChains);

router.get("/hotel-chains/:hotelChainName/hotels", getHotels);

router.get("/hotel-chains/:hotelChainName/:hotelId/rooms", getRooms);

router.get("/employees", getEmployees);

router.use((req, res, next) =>
  next(new createError.NotFound(`API Endpoint not found [${req.url}]`))
);

module.exports = router;
