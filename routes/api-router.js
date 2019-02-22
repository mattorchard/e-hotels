const express = require('express');
const router = express.Router();
const createError = require('http-errors');
const {getHotelChains} = require('./hotel-chain-router');


router.get('/test', (req, res) =>
  res.send({"Howdy": "World"})
);

router.get("/hotel-chains", getHotelChains);

router.use((req, res, next) =>
  next(new createError.NotFound(`API Endpoint not found [${req.url}]`))
);

module.exports = router;
