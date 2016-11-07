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

//  GET comment on existing card
router.get('/card', function(req, res) {
  var cardId = req.query.id;
  var username = req.query.username;
  console.log('Search parameters- cardID:', cardId, 'Username:', username);
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM card_comments ' +
      'WHERE card_id=$1 AND username=$2;',
      [cardId, username], function(err, result) {
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

//  POST a comment
router.post('/card', function(req, res) {
  var comment = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO card_comments' +
        ' (username, card_id, comment)' +
        ' VALUES ($1, $2, $3) RETURNING *;',
        [comment.username, comment.cardId, comment.comment],
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

//  PUT to edit an existing comment
router.put('/card', function(req, res) {
  var comment = req.body;
  console.log('Comment:', comment.comment, 'ID:', comment.id);
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE card_comments SET ' +
        'comment=$1 WHERE id=$2 RETURNING *;',
        [comment.comment, comment.id],
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


module.exports = router;
