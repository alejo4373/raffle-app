const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const app = express();
const rafflesRouter = require('./routes/raffles')

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/raffles', rafflesRouter)
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

// Error handler
app.use(function (err, req, res, next) {
  console.log('[Error]:\n', err);
  res.status(500);
  res.send({ message: "An unknown error ocurred" })

});

module.exports = app;
