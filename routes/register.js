let { Router } = require('express');
let router = new Router();

const db = require('../db');

router.get('/users', async (req, res, next) => {
  let users;
  try {
    users = await db.getAllUsers();
  } catch (err) {
    next(err);
  }
  res.json(users);
})

module.exports = router;