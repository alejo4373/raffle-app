DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  raffle_id INT NOT NULL REFERENCES raffles(id),
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  registered_at VARCHAR
);

DROP TABLE IF EXISTS raffles CASCADE;
CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at_timestamp VARCHAR NOT NULL,
  raffled_at_timestamp VARCHAR DEFAULT NULL,
  winner_id INT DEFAULT NULL REFERENCES users(id)
);
