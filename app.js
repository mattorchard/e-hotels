const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const apiRouter = require('./routes/api-router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'front-end/build/static')));

app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, 'front-end/build/')});
});


// Catch 404 and forward to error handler
app.use((req, res, next) =>
  next(new createError.NotFound())
);

// Error handler
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
