const raffles = require('express').Router()
const db = require('../db')

raffles.get('/', async (req, res, next) => {
  try {
    let raffles = await db.getAllRaffles();
    res.json(raffles);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId', async (req, res, next) => {
  const { raffleId } = req.params;
  try {
    let raffle = await db.getRaffleById(raffleId);
    res.json(raffle);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId/participants', async (req, res, next) => {
  const { raffleId } = req.params;
  let users;
  try {
    users = await db.getRaffleParticipants(raffleId);
    res.json(users);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId/total', async (req, res, next) => {
  const { raffleId } = req.params;
  try {
    const data = await db.getTotalRaffleParticipants(raffleId);
    res.json(data);
  } catch (err) {
    next(err);
  }
})

raffles.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const msg = await db.createNewRaffle(name);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

raffles.post('/:raffleId/participants', async (req, res, next) => {
  const user = req.body;
  const { raffleId } = req.params;
  try {
    msg = await db.registerParticipantForRaffle(user, raffleId);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

raffles.put('/:raffleId/winner', async (req, res, next) => {
  const { token } = req.body
  const { raffleId } = req.params
  if (token === 's3CrE7') {
    try {
      let winner = await db.drawWinnerForRaffle(raffleId);
      res.json(winner);
    } catch (err) {
      next(err);
    }
  } else {
    res.json({
      type: 'FORBIDDEN',
      success: false,
      title: 'Form Error',
      content: "You have a missing or incorrect secret token."
    });
  }
})

raffles.get('/:raffleId/winner', async (req, res, next) => {
  const { raffleId } = req.params
  try {
    let winner = await db.getRaffleWinner(raffleId);
    if (winner) {
      res.json(winner);
    } else {
      res.status(404).json({
        message: "No winner for this raffle has been picked or the raffle doesn't exist"
      })
    }
  } catch (err) {
    next(err);
  }
})

module.exports = raffles;
