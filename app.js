const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const db = require('./db');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/users', async (req, res, next) => {
  let users;
  try {
    users = await db.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
})

app.get('/users/total', async (req, res, next) => {
  try {
    const data = await db.getNumberOfUsers();
    res.json(data);
  } catch (err) {
    next(err);
  }
})

app.post('/register', async (req, res, next) => {
  const user = req.body;
  try {
    msg = await db.putUser(user);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

app.post('/raffle', (req, res, next) => {
  let { secret } = req.body
  if (secret === 'ColombiaFest 2018') {
    // Wait 3 seconds to build expectation
    setTimeout(async () => {
      try {
        let winner = await db.pickWinnerUser();
        res.json(winner);
      } catch (err) {
        next(err);
      }
    }, 3000)
  } else {
    res.json({
      type: 'FORBIDDEN',
      success: false,
      title: 'Form Error',
      content: "You used an incorrect secret word."
    });
  }
})

app.get('/raffle/winner', async (req, res, next) => {
  try {
    let winner = await db.getWinnerUser();
    res.json(winner);
  } catch (err) {
    next(err);
  }
})

app.get('/raffles', async (req, res, next) => {
  try {
    let raffles = await db.getAllRaffles();
    res.json(raffles);
  } catch (err) {
    next(err);
  }
})

// Error handler
app.use(function (err, req, res, next) {
  if (req.app.get('env') === 'development') {
    console.log('[Error]:\n', err);
  }
  res.status(500);
  res.send('Error')

});

module.exports = app;
