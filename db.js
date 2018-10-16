const pgp = require('pg-promise')();
const db = pgp('postgres://localhost:5432/colombiafest_users')
const utils = require('./utils');

const getAllUsers = async () => {
  let users
  try {
    users = await db.any('SELECT * from users')
  } catch (err) {
    return utils.handleErr(err);
  }
  return users;
}

module.exports = {
  getAllUsers
}
