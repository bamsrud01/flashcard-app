--  This table will hold all cards from all sets and users
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  set_id INT NOT NULL,
  question varchar(255) NOT NULL,
  answer varchar(255) NOT NULL
);

--  This table will hold all users and the sets they have created
CREATE TABLE users_sets (
  id SERIAL PRIMARY KEY,
  user_id INT,
  set_id INT,
  set_name varchar(120) NOT NULL
);

--  This table will hold comments on entire card sets, not individual cards
CREATE TABLE set_comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
  set_id INT,
  comment TEXT
);

--  This table will hold comments on individual cards
CREATE TABLE card_comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
  card_id INT,
  comment TEXT
);
