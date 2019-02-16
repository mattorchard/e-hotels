const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/test', (req, res) =>
  res.send({"Howdy": "World"})
);

router.use((req, res, next) =>
  next(new createError.NotFound("API Endpoint not found"))
);

module.exports = router;
