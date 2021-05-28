const { db, helpers } = require('./')

const createTable = (username, name) => {
  const tablesDef = {
    users: `
      CREATE TABLE $/tablename/ (
        id SERIAL PRIMARY KEY,
        raffle_id INT NOT NULL,
        firstname VARCHAR NOT NULL,
        lastname VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        phone VARCHAR,
        registered_at VARCHAR
      );
    `,
    raffles: `
      CREATE TABLE $/tablename/ (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        secret_token VARCHAR NOT NULL,
        created_at VARCHAR NOT NULL,
        raffled_at VARCHAR DEFAULT NULL,
        winner_id INT DEFAULT NULL
      );
    `
  }
  let tablename = new helpers.TableName({ table: `${username}_${name}`, schema: 'public' })

  return db.none(tablesDef[name], { tablename })
}

const getUserTable = async (username, tablename) => {
  const table = await db.any(`SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = $/tablename/`, {
    tablename: `${username}_${tablename}`
  })

  return table.length ? table[0] : null
}

module.exports = {
  createTable,
  getUserTable
}
