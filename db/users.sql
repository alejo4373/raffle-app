DROP DATABASE IF EXISTS colombiafest_users;
CREATE DATABASE colombiafest_users;

\c colombiafest_users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone VARCHAR NOT NULL,
    registered_at VARCHAR,
    winner BOOLEAN DEFAULT FALSE
);

INSERT INTO users (name, lastname, email, phone, registered_at)
VALUES('Alejandro', 'Franco', 'alejandrofranco@ac.c4q.nyc', '917-5736025','2018-10-18T02:37:57.828Z'),
      ('Kelvin', 'Rodriguez', 'kelvinrodriguez@ac.c4q.nyc', '917-5736025','2018-10-18T02:37:57.828Z'),
      ('Joyce', 'Ajagbe', 'joyceajagbe@ac.c4q.nyc', '917-5736025','2018-10-18T02:37:57.828Z');
