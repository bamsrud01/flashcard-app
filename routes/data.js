//  This router will handle all interactions with the calendar.

//  Declare file as a router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection.js');

//  GET user data by set ID and username
router.get('/', function(req, res) {
  var setId = req.query.setId;
  var username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM user_data ' +
      'WHERE set_id=$1 AND username=$2 ORDER BY date_used DESC;',
      [setId, username], function(err, result) {
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

//  POST user data
router.post('/', function(req, res) {
  var userData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO user_data' +
        ' (username, set_id, date_used, correct, total, proficiency, ' +
        'review_date, favorited) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)' +
        ' RETURNING *;', [userData.username, userData.setId, userData.dateUsed,
        userData.correct, userData.total, userData.proficiency,
        userData.reviewDate, userData.favorited],
        function(err, result) {
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


//  Export the router
module.exports = router;
