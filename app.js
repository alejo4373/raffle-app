var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
const db = require('./db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', async (req, res, next) => {
  let users;
  try {
    users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
})

app.post('/register', async (req, res, next) => {
  const user = req.body;
  console.log(user);
  try {
    msg = await db.putUser(user);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

// error handler
app.use(function (err, req, res, next) {
  if (req.app.get('env') === 'development') {
    console.log('[Error]:\n', err);
  }
  res.status(500);
  res.send('Error')

});

module.exports = app;
