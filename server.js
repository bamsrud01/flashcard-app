//  Imported modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./db/connection');
const auth = require('./auth/setup');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const sessionConfig = {
  secret: process.env.SESSION_SECRET,  //  dotenv
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: false
  }
};

connection.connect();
auth.setup();

//  Start express
const app = express();

//  Middleware
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//  Create routes
const register = require('./routes/register');

//  Connect routes
app.use('/register', register);

//  Create port
var port = process.env.PORT || 3000;

//  Authentication required beyond this line
app.use(ensureAuthenticated);

//  Function to check if authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
}

//  Set up public connection
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

//  Set server port
var server = app.listen(port, function() {
  console.log('Listening on port ' + server.address().port);
});
