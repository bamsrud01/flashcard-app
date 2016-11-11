//  This router holds all requests for existing flashcards, as well as sorting
//  and filtering new sets.  It also includes creating and updating sets.

//  Declare file as a router
const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'assets/'});

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
      client.query('SELECT * FROM sets;', function(err, result) {
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
      client.query('SELECT * FROM sets ORDER BY avg-rating;',
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

//  GET favorited card sets (Home)
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
        'WHERE user_data.username=$1 AND favorited=TRUE;',
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

//GET all card sets by chosen category (Home)
router.get('/category', function(req, res) {
  var category = req.query.category;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets WHERE category=$1;', [category],
        function(err, result) {
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

//  GET all card sets (My Sets)
router.get('/all-sets/mine', function(req, res) {
  var username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets WHERE username=$1;', [username],
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

//  GET all card sets by rating (My Sets)
router.get('/rating/mine', function(req, res) {
  var username = req.query.username;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets ORDER BY avg-rating ' +
        'WHERE username=$1;', [username], function(err, result) {
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

//  GET favorited card sets (My Sets)
router.get('/favorite/mine', function(req, res) {
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
        'WHERE username=$1 AND user_data.username=$1 AND favorited=TRUE;',
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

//  GET all cards by chosen category (My Sets)
router.get('/category/mine', function(req, res) {
  var username = req.query.username;
  var category = req.query.category;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM sets ' +
        'WHERE username=$1 AND category=$2;',
        [username, category], function(err, result) {
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

//  POST a new set
router.post('/set', function(req, res) {
  var setData = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO sets' +
        ' (username, set_name, category, description)' +
        ' VALUES ($1, $2, $3, $4) RETURNING *;',
        [setData.username, setData.name, setData.category, setData.description],
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

//  POST a new card
router.post('/card', function(req, res) {
  var card = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('INSERT INTO cards' +
        ' (set_id, question, answer, q_image, a_image)' +
        ' VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        [card.Id, card.question, card.answer, card.queImage, card.ansImage],
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

//  PUT to edit an existing card
router.put('/card', function(req, res) {
  var card = req.body;
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('UPDATE cards SET question=$1, answer=$2, ' +
        'q_image=$3, a_image=$4 WHERE id=$5 RETURNING *;',
        [card.question, card.answer, card.q_image, card.a_image, card.id],
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

//  GET all cards by set id
router.get('/card', function(req, res) {
  var setId = req.query.setId
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('SELECT * FROM cards ' +
      'WHERE set_id=$1 ORDER BY id;',
      [setId], function(err, result) {
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

router.post('/images', function(req, res) {
  pool.connect(function(err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to database:', err);
        res.sendStatus(500);
        return;
      }
      client.query('',
        [],
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
