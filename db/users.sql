DROP DATABASE IF EXISTS colombiafest_users;

CREATE DATABASE colombiafest_users;

\c colombiafest_users; 

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  raffle_id INT NOT NULL, -- Should reference raffles (id) not done due to time constraint
  name VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR NOT NULL,
  registered_at VARCHAR
);

CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  created_at_timestamp VARCHAR NOT NULL,
  raffled_at_timestamp VARCHAR DEFAULT NULL,
  winner_id INT DEFAULT NULL -- Should reference users (id) not done due to time constraint
);

INSERT INTO raffles (name, created_at_timestamp, raffled_at_timestamp, winner_id)
  VALUES ('Saturday 10/20', '2018-03-12T06:29:35Z', '2018-04-22T08:13:27Z', 1);

INSERT INTO users (raffle_id, name, lastname, phone, email, registered_at)
  VALUES (1, 'Flss', 'Breitler', '+593 (597) 655-4479', 'fbreitler0@yale.edu', '2018-04-22T08:13:27Z'), (1, 'Coreen', 'Blodget', '+375 (565) 810-6816', 'cblodget1@infoseek.co.jp', '2018-07-18T21:04:29Z'), (1, 'Brodie', 'Libbis', '+66 (307) 946-8694', 'blibbis2@imgur.com', '2017-10-31T05:16:43Z'), (1, 'Jordain', 'Rault', '+351 (251) 930-2283', 'jrault3@rambler.ru', '2018-09-18T15:45:57Z'), (1, 'Enrico', 'Thacker', '+351 (372) 633-5094', 'ethacker4@nbcnews.com', '2018-08-08T06:06:33Z'), (1, 'Roddy', 'Leake', '+66 (463) 545-2516', 'rleake5@usa.gov', '2018-03-12T06:29:35Z'), (1, 'Bronson', 'Lyvon', '+420 (457) 189-3403', 'blyvon6@nydailynews.com', '2018-08-25T20:53:10Z'), (1, 'Esther', 'Cranmer', '+98 (665) 817-3571', 'ecranmer7@dot.gov', '2018-05-11T20:48:55Z'), (1, 'Maribelle', 'Stoneman', '+81 (451) 414-6311', 'mstoneman8@nature.com', '2017-12-15T06:57:55Z'), (1, 'Wright', 'Cotmore', '+62 (213) 824-6424', 'wcotmore9@booking.com', '2018-01-25T20:59:23Z'), (1, 'Maurie', 'Beach', '+7 (694) 613-8947', 'mbeacha@printfriendly.com', '2017-12-01T12:23:41Z'), (1, 'Binky', 'Fulmen', '+227 (347) 968-9877', 'bfulmenb@hostgator.com', '2018-07-03T04:14:35Z'), (1, 'Norbert', 'Carillo', '+235 (508) 534-6199', 'ncarilloc@arstechnica.com', '2017-10-23T15:30:01Z'), (1, 'Gerik', 'Golder', '+51 (299) 638-8030', 'ggolderd@t-online.de', '2018-07-23T13:20:30Z'), (1, 'Ki', 'Farny', '+86 (865) 758-9782', 'kfarnye@liveinternet.ru', '2017-12-15T07:04:59Z'), (1, 'Irwin', 'Colombier', '+62 (104) 135-3753', 'icolombierf@bizjournals.com', '2018-04-27T07:12:49Z'), (1, 'Edwin', 'Farlane', '+46 (804) 280-9776', 'efarlaneg@unesco.org', '2017-11-16T17:47:00Z'), (1, 'Anne', 'Jeanon', '+7 (858) 153-7662', 'ajeanonh@cdbaby.com', '2018-08-25T10:24:03Z'), (1, 'Dona', 'Yegoshin', '+420 (478) 766-0797', 'dyegoshini@cisco.com', '2018-01-26T21:55:36Z'), (1, 'Doro', 'Grinov', '+374 (877) 320-6211', 'dgrinovj@cisco.com', '2018-09-05T15:24:01Z'), (1, 'Richmond', 'Dufour', '+86 (555) 539-9460', 'rdufourk@theatlantic.com', '2018-08-16T05:05:36Z'), (1, 'Pietro', 'Veldman', '+33 (199) 931-4951', 'pveldmanl@comcast.net', '2018-01-14T01:21:46Z'), (1, 'Calli', 'Shearsby', '+86 (465) 742-8936', 'cshearsbym@mit.edu', '2018-07-20T08:47:50Z'), (1, 'Isak', 'Harber', '+351 (293) 319-2392', 'iharbern@twitpic.com', '2018-05-29T18:50:47Z'), (1, 'Lou', 'Frediani', '+84 (352) 567-4566', 'lfredianio@go.com', '2018-08-24T23:44:16Z'), (1, 'Aaron', 'Sussex', '+86 (735) 679-3104', 'asussexp@issuu.com', '2018-07-05T13:41:27Z'), (1, 'Rodrique', 'Kenyam', '+86 (403) 631-5424', 'rkenyamq@independent.co.uk', '2017-10-27T10:32:10Z'), (1, 'Carolynn', 'Tumbridge', '+7 (964) 552-0278', 'ctumbridger@mit.edu', '2018-09-15T12:46:32Z'), (1, 'Alex', 'Joselevitz', '+976 (921) 679-9973', 'ajoselevitzs@lycos.com', '2018-01-29T14:26:20Z'), (1, 'Kerr', 'Dunham', '+82 (404) 208-7761', 'kdunhamt@yolasite.com', '2017-12-27T11:04:30Z'), (1, 'Cullen', 'Filler', '+1 (918) 299-5934', 'cfilleru@istockphoto.com', '2018-09-11T12:36:58Z'), (1, 'Lindsay', 'Draysay', '+48 (206) 167-5557', 'ldraysayv@histats.com', '2018-07-13T01:13:49Z'), (1, 'Sherm', 'Stainbridge', '+55 (169) 422-2746', 'sstainbridgew@tripod.com', '2018-04-26T08:51:12Z'), (1, 'Valina', 'Gorden', '+359 (841) 935-3484', 'vgordenx@nyu.edu', '2018-06-01T23:36:27Z'), (1, 'Glenn', 'Smorthwaite', '+62 (397) 449-4691', 'gsmorthwaitey@fastcompany.com', '2018-09-04T13:00:46Z'), (1, 'Shel', 'Hughes', '+237 (859) 987-3122', 'shughesz@dell.com', '2018-07-16T05:49:40Z'), (1, 'Zilvia', 'Braidman', '+1 (192) 539-9906', 'zbraidman10@youtube.com', '2018-04-23T09:55:36Z'), (1, 'Jessie', 'Vankin', '+55 (213) 226-9070', 'jvankin11@businessinsider.com', '2018-08-11T19:09:51Z'), (1, 'Salomo', 'Wakeford', '+86 (606) 400-7704', 'swakeford12@cargocollective.com', '2017-11-23T22:29:09Z'), (1, 'Tova', 'Beetham', '+351 (836) 603-7750', 'tbeetham13@altervista.org', '2018-10-05T09:22:24Z'), (1, 'Guglielmo', 'Ausher', '+1 (247) 581-0179', 'gausher14@cpanel.net', '2017-12-29T20:34:52Z'), (1, 'Darb', 'Gallehawk', '+55 (228) 236-4507', 'dgallehawk15@godaddy.com', '2017-12-15T00:49:41Z'), (1, 'Neal', 'Collip', '+81 (503) 891-2688', 'ncollip16@ucla.edu', '2018-04-12T17:54:17Z'), (1, 'Margaretha', 'Chuney', '+86 (638) 839-8375', 'mchuney17@cafepress.com', '2018-01-12T12:45:34Z'), (1, 'Rube', 'Jardine', '+1 (300) 853-7618', 'rjardine18@nyu.edu', '2018-08-10T10:02:34Z'), (1, 'Kerby', 'MacGinlay', '+7 (449) 220-9797', 'kmacginlay19@gmpg.org', '2018-08-28T00:10:36Z'), (1, 'Mathe', 'Stanmer', '+63 (699) 506-0496', 'mstanmer1a@dagondesign.com', '2018-07-03T06:33:27Z'), (1, 'Konstanze', 'Curnock', '+359 (951) 949-4087', 'kcurnock1b@reddit.com', '2017-12-23T12:35:27Z'), (1, 'Carolyne', 'Gostling', '+63 (913) 297-3656', 'cgostling1c@yandex.ru', '2017-11-04T09:03:28Z'), (1, 'Cleon', 'Spadotto', '+86 (528) 215-1999', 'cspadotto1d@ca.gov', '2018-03-06T04:36:02Z');

