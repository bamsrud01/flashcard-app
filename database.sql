--  This table will hold all cards from all sets and users.
CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  set_id INT NOT NULL,
  question varchar(255) NOT NULL,
  q_image varchar(255),
  answer varchar(255) NOT NULL,
  a_image varchar(255)
);

--  This table will hold all users and the sets they have created.
CREATE TABLE sets (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  set_name varchar(120) NOT NULL,
  category varchar(40) NOT NULL,
  description varchar(150) NOT NULL,
  avg_rating FLOAT
);

--  This table will hold comments on entire card sets, as well as rating.
CREATE TABLE set_comments (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  set_id INT NOT NULL,
  comment TEXT NOT NULL,
  rating INT
);

--  This table will hold comments on individual cards.
CREATE TABLE card_comments (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  card_id INT NOT NULL,
  comment TEXT NOT NULL
);

--  This table will hold user login information.  The password will be hashed.
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  password varchar(120) NOT NULL,
  email varchar(80) NOT NULL
);

--  This table will hold data from the users' activities.
CREATE TABLE user_data (
  id SERIAL PRIMARY KEY,
  username varchar(40) NOT NULL,
  set_id INT NOT NULL,
  date_used TIMESTAMP,
  correct INT,
  total INT,
  proficiency INT,
  review_date TIMESTAMP,
  favorited BOOLEAN
);
