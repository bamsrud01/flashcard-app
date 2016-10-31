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

--  This table will hold comments on entire card sets, as well as rating.
CREATE TABLE set_comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
  set_id INT,
  comment TEXT,
  rating INT
);

--  This table will hold comments on individual cards
CREATE TABLE card_comments (
  id SERIAL PRIMARY KEY,
  user_id INT,
  card_id INT,
  comment TEXT
);

--  This table will hold user login information.  The password will hold the hashed value
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(40),
  password varchar(120),
  email varchar(80)
);

--  This table will hold data from the users' activities
CREATE TABLE user_data (
  id SERIAL PRIMARY KEY,
  user_id INT,
  set_id INT,
  date_used TIMESTAMP,
  correct INT,
  total INT
);