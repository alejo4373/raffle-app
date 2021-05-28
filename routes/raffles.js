const raffles = require('express').Router()
const Raffles = require('../db/raffles');

raffles.get('/', async (req, res, next) => {
  let tableName = req.locals.tableNames.raffles
  try {
    let raffles = await Raffles.getAllRaffles(tableName);
    res.json(raffles);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId', async (req, res, next) => {
  let tableName = req.locals.tableNames.raffles
  const { raffleId } = req.params;
  try {
    let raffle = await Raffles.getRaffleById(raffleId, tableName);
    res.json(raffle);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId/participants', async (req, res, next) => {
  const { raffleId } = req.params;
  let users;
  try {
    users = await Raffles.getRaffleParticipants(raffleId);
    res.json(users);
  } catch (err) {
    next(err);
  }
})

raffles.get('/:raffleId/total', async (req, res, next) => {
  const { raffleId } = req.params;
  try {
    const data = await Raffles.getTotalRaffleParticipants(raffleId);
    res.json(data);
  } catch (err) {
    next(err);
  }
})

raffles.post('/', async (req, res, next) => {
  const { name, secret_token } = req.body;
  console.log(req.locals)
  let tableName = req.locals.tableNames.raffles
  try {
    const msg = await Raffles.createNewRaffle(name, secret_token, tableName);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

raffles.post('/:raffleId/participants', async (req, res, next) => {
  const user = req.body;
  const { raffleId } = req.params;
  try {
    msg = await Raffles.registerParticipantForRaffle(user, raffleId);
    res.json(msg);
  } catch (err) {
    next(err);
  }
})

raffles.put('/:raffleId/winner', async (req, res, next) => {
  const { token } = req.body
  const { raffleId } = req.params
  const { secret_token } = await Raffles.getRaffleById(raffleId)
  if (token === secret_token) {
    try {
      let winner = await Raffles.drawWinnerForRaffle(raffleId);
      res.json(winner);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(403).json({
      message: "You have a missing or incorrect secret token."
    });
  }
})

raffles.get('/:raffleId/winner', async (req, res, next) => {
  const { raffleId } = req.params
  try {
    let winner = await Raffles.getRaffleWinner(raffleId);
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
