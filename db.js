const pgp = require('pg-promise')();
const db = pgp('postgres://localhost:5432/colombiafest_users')

const getAllUsers = async () => {
  let users;
  try {
    users = await db.any('SELECT * from users')
  } catch (err) {
    return Promise.reject(err)
  }
  return users;
}

const putUser = async (user) => {
  const newUser = {
    registered_at: Date.now(),
    ...user
  }
  try {
    await db.none(
      `INSERT INTO users(name, lastname, email, phone, registered_at)
        VALUES($/name/, $/lastname/, $/email/, $/phone/, $/registered_at/);`,
      newUser
    )
    return { message: 'SUCCESS' };
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return { message: 'ALREADY_EXISTS' };
    }
    return Promise.reject(err)
  }
}

module.exports = {
  getAllUsers,
  putUser,
}