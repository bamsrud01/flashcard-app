//  This router holds all requests for existing flashcards, as well as sorting
//  and filtering new sets.  It also includes creating and updating sets.

//  Declare file as a router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection.js');

//  GET all card sets (Home)
router.get('/all-sets', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets', function(err, result) {
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

//  GET all card sets by rating (Home)
router.get('/rating', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets ORDER BY avg-rating', function(err, result) {
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

//  GET favorited card sets
router.get('/favorite', function(req, res) {
  var username = req.query.username
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT category, set_id, set_name, username ' +
        'FROM sets JOIN user_data ON sets.id=user_data.set_id ' +
        'WHERE user_data.username=$1 AND favorited=TRUE',
        [username], function(err, result) {
          if (err) {
            console.log('Error querying database:', err);
            res.sendStatus(500);
            return;
          }
          console.log('Got rows from database(favorites):', result.rows);
          res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

//GET all cards by chosen category
router.get('/category', function(req, res) {
  var category = req.query.category;
  console.log('Category:', category);
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets WHERE category=$1', [category], function(err, result) {
        if (err) {
          console.log('Error querying database:', err);
          res.sendStatus(500);
          return;
        }
        console.log('Got rows from database(' + category + '):', result.rows);
        res.send(result.rows);
      });
    } finally {
      done();
    }
  });
});

module.exports = router;
