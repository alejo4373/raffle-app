const Tables = require('../db/tables')

const checkOrCreateUserTables = async (req, res, next) => {
  const { username } = req.params
  let rafflesTable;
  let usersTable;
  try {
    rafflesTable = await Tables.getUserTable(username, 'raffles')
    if (!rafflesTable) {
      Tables.createTable(username, 'raffles')
    }
    usersTable = await Tables.getUserTable(username, 'users')
    if (!usersTable) {
      Tables.createTable(username, 'users')
    }
    req.locals = {
      tableNames: {
        raffles: `${username}_raffles`,
        users: `${username}_users`
      }
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkOrCreateUserTables
}
