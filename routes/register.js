//  This router will handle username registration, as well as user login.

//  Declare file as a router
const router = require('express').Router();

//  Import user registration
const User = require('../models/user');

//  Import passport
const passport = require('passport');

//  Import pool from connection.js
const pool = require('../db/connection.js');

//  GET function to check existing usernames
router.get('/check', function(req, res) {
  var username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM users WHERE username=$1;', [username], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database:', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//  POST function to register a user
router.post('/', function(req, res) {
  console.log('Registering a new user');
  User.create(req.body.username, req.body.password, req.body.email).then(function() {
    res.sendStatus(201);
  }).catch(function(err) {
    console.log('Error in /register:', err);
    res.sendStatus(500);
  });
});

//  POST function for user login
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('Loggin in a user');
  res.sendStatus(200);
});

//  POST function for user logout
router.post('/logout', function(req, res) {
  req.logout();
  console.log('Loggin in a user');
  res.sendStatus(200);
});

//  Export router
module.exports = router;
