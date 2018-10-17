var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let register = require('./routes/register');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/register', register);

// error handler
app.use(function (err, req, res, next) {
  if (req.app.get('env') === 'development') {
    console.log('[Error]:\n', err);
  }
  res.status(500);
  res.send('Error')

});

module.exports = app;
