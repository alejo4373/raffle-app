-- DROP DATABASE IF EXISTS colombiafest_users;
-- CREATE DATABASE colombiafest_users;
-- \c colombiafest_users; 

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  raffle_id INT NOT NULL, -- Should reference raffles (id) not done due to time constraint
  name VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR NOT NULL,
  registered_at VARCHAR
);

DROP TABLE IF EXISTS raffles;
CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at_timestamp VARCHAR NOT NULL,
  raffled_at_timestamp VARCHAR DEFAULT NULL,
  winner_id INT DEFAULT NULL -- Should reference users (id) not done due to time constraint
);
