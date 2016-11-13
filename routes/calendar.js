//  This router will handle all interactions with the calendar.

//  Declare file as a router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection.js');

//  GET all events from database
router.get('/', function(req, res) {
  var username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM user_data ' +
        'JOIN sets ON user_data.set_id = sets.id WHERE ' +
        'user_data.username=$1;', [username], function(err, result) {
          if (err) {
            console.log('Error querying database:', err);
            res.sendStatus(500);
            return;
          }
          console.log('Got rows from database(rating):', result.rows);
          res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

router.get('/date', function(req, res) {
  var username = req.query.username;
  var date = req.query.date;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM user_data ' +
        'JOIN sets ON user_data.set_id = sets.id WHERE ' +
        'user_data.username=$1 AND ' +
        'date_used=$2 OR review_date=$2;', [username, date],
        function(err, result) {
          if (err) {
            console.log('Error querying database:', err);
            res.sendStatus(500);
            return;
          }
          console.log('Got rows from database(rating):', result.rows);
          res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});



module.exports = router;
