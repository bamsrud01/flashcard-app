//  This router will handle all comments and ratings of cards and sets.

//  Declare file as a router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection.js');

router.get('/set', function(req, res) {
  var id = req.query.id;
  console.log('Set id:', id);
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM set_comments WHERE set_id=$1', [id], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database(' + id + '):', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});


module.exports = router;
