const { db, helpers } = require('./')

const getRaffleParticipants = async (raffleId) => {
  try {
    const participants = await db.any('SELECT * from users WHERE raffle_id = $1', raffleId)
    return participants;
  } catch (err) {
    return Promise.reject(err)
  }
}

const registerParticipantForRaffle = async (user, raffleId) => {
  const newUser = {
    registered_at: new Date().toISOString(),
    raffle_id: raffleId,
    ...user
  }
  try {
    await db.none(
      `INSERT INTO users(raffle_id, firstname, lastname, email, ${newUser.phone ? "phone, " : ""} registered_at)
        VALUES($/raffle_id/, $/firstname/, $/lastname/, $/email/, ${newUser.phone ? "$/phone/, " : ""} $/registered_at/);`,
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

const getRandomUserFromRaffle = async (raffleId) => {
  try {
    const user = await db.one(`
      SELECT * FROM users WHERE raffle_id = $1
      OFFSET floor(random() * (
        SELECT COUNT(*) FROM users WHERE raffle_id = $1)
      ) LIMIT 1;
    `, raffleId)
    return user
  } catch (err) {
    return Promise.reject(err)
  }
}

const drawWinnerForRaffle = async (raffleId) => {
  try {
    let winner = await getRaffleWinner(raffleId);
    if (!winner) {
      winner = await getRandomUserFromRaffle(raffleId);
      let raffle = {
        id: raffleId,
        winner_id: winner.id,
        raffled_at: new Date().toISOString()
      }

      await db.one(`
        UPDATE raffles 
          SET 
            winner_id = $/winner_id/, 
            raffled_at = $/raffled_at/
          WHERE id = $/id/ 
        RETURNING *`, raffle
      )
    }
    return winner;

  } catch (err) {
    return Promise.reject(err)
  }
}

const getRaffleWinner = async (raffleId, tableName) => {
  try {
    let tablename = new helpers.TableName(tableName)
    const raffle = await getRaffleById(raffleId, tableName);
    const winner = await db.one('SELECT * FROM $/tablename/ WHERE id = $/raffleId/', {
      raffleId,
      tablename
    });
    return winner;
  } catch (err) {
    if (err.message === "No data returned from the query.") {
      return false
    }
    return Promise.reject(err)
  }
}

const getTotalRaffleParticipants = async (raffleId) => {
  try {
    const data = await db.one('SELECT COUNT(id) from users WHERE raffle_id = $1', raffleId)
    return data;
  } catch (err) {
    return Promise.reject(err)
  }
}

const getAllRaffles = async (tableName) => {
  let tablename = new helpers.TableName(tableName)
  try {
    const data = await db.any('SELECT id, name, created_at, raffled_at, winner_id from $/tablename/', {
      tablename
    })
    return data;
  } catch (err) {
    return Promise.reject(err)
  }
}

const getRaffleById = async (id) => {
  try {
    const data = await db.one('SELECT * from raffles WHERE id = $1', id)
    return data;
  } catch (err) {
    return Promise.reject(err)
  }
}

// Helpers
const getParticipantById = async (id) => {
  try {
    const data = await db.one('SELECT * from users WHERE id = $1', id)
    return data;
  } catch (err) {
    return Promise.reject(err)
  }
}

const createNewRaffle = async (name, token, tableName) => {
  const raffle = {
    name,
    token,
    created_at: new Date().toISOString(),
    tablename: new helpers.TableName(tableName)
  }

  try {
    let newRaffle = await db.one(
      `INSERT INTO $/tablename/ (name, secret_token, created_at)
        VALUES($/name/, $/token/, $/created_at/) RETURNING *;`,
      raffle
    )
    return {
      type: 'SUCCESS',
      success: true,
      title: 'Successful new raffle created!',
      content: newRaffle
    };
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = {
  getAllRaffles,
  getRaffleById,
  getRaffleParticipants,
  getTotalRaffleParticipants,
  registerParticipantForRaffle,
  drawWinnerForRaffle,
  getRaffleWinner,
  createNewRaffle
}
