DROP DATABASE IF EXISTS colombiafest_users;
CREATE DATABASE colombiafest_users;

\c colombiafest_users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    phone VARCHAR NOT NULL,
    registered_at VARCHAR
);

INSERT INTO users (name, lastname, email, phone, registered_at)
VALUES('Alejandro', 'Franco', 'alejandrofranco@ac.c4q.nyc', '917-5736025','1539731307708'),
      ('Kelvin', 'Rodriguez', 'kelvinrodriguez@ac.c4q.nyc', '917-5736025','1539731307708'),
      ('Joyce', 'Ajagbe', 'joyceajagbe@ac.c4q.nyc', '917-5736025','1539731307708');
