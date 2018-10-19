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

app.get('/raffles/all', async (req, res, next) => {
  try {
    let raffles = await db.getAllRaffles();
    res.json(raffles);
  } catch (err) {
    next(err);
  }
})

app.get('/raffles/:raffleId', async (req, res, next) => {
  const { raffleId } = req.params;
  try {
    let raffle = await db.getRaffleById(raffleId);
    res.json(raffle);
  } catch (err) {
    next(err);
  }
})

// Routes
app.get('/raffles/:raffleId/participants', async (req, res, next) => {
  const { raffleId } = req.params;
  let users;
  try {
    users = await db.getRaffleParticipants(raffleId);
    res.json(users);
  } catch (err) {
    next(err);
  }
})

app.get('/raffles/:raffleId/total', async (req, res, next) => {
  const { raffleId } = req.params;
  try {
    const data = await db.getTotalRaffleParticipants(raffleId);
    res.json(data);
  } catch (err) {
    next(err);
  }
})

app.post('/raffles/:raffleId/register', async (req, res, next) => {
  const user = req.body;
  const { raffleId } = req.params;
  try {
    msg = await db.registerParticipantForRaffle(user, raffleId);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

app.post('/raffles/:raffleId/draw', (req, res, next) => {
  const { secret } = req.body
  const { raffleId } = req.params
  if (secret === 'ColombiaFest 2018') {
    // Wait 3 seconds to build expectation
    setTimeout(async () => {
      try {
        let winner = await db.drawWinnerForRaffle(raffleId);
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

app.get('/raffles/:raffleId/winner', async (req, res, next) => {
  const { raffleId } = req.params
  try {
    let winner = await db.getRaffleWinner(raffleId);
    res.json(winner);
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
