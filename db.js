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
    return {
      type: 'SUCCESS',
      success: true,
      title: 'Successful registration!',
      content: "You're all signed up for the raffle"
    };
  } catch (err) {
    if (err.routine === '_bt_check_unique') {
      return {
        type: 'FORBIDDEN',
        success: false,
        title: 'Form Error',
        content: "You can only sign up for an account once with a given e-mail address."
      };
    }
    return Promise.reject(err)
  }
}

const getNumberOfUsers = async () => {
  try {
    const data = await db.one('SELECT COUNT(id) from users')
    return data;
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = {
  getAllUsers,
  putUser,
  getNumberOfUsers
}