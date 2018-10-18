const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL)

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
    registered_at: new Date().toISOString(),
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

const pickWinnerUser = async () => {
  try {
    // See if a winner was already picked
    let winner = await getWinnerUser();
    if (!winner) {
      const numberOfUsers = await getNumberOfUsers();
      const max = numberOfUsers.count;
      const min = 1;
      // Get a random number between max and min inclusive
      const randomUserId = Math.floor(Math.random() * (max - min + 1)) + min
      try {
        winner = await db.one(
          `UPDATE users SET winner=TRUE WHERE id=$1
            RETURNING *`, randomUserId)
        return winner;
      } catch (err) {
        return Promise.reject(err)
      }
    } else {
      return winner;
    }

  } catch (err) {
    return Promise.reject(err)
  }
}

const getWinnerUser = async () => {
  try {
    const [user] = await db.any('SELECT * from users WHERE winner=true')
    return user;
  } catch (err) {
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
  pickWinnerUser,
  getNumberOfUsers,
  getWinnerUser
}