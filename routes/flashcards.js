//  This router holds all requests for existing flashcards, as well as sorting
//  and filtering new sets.  It also includes creating and updating sets.

//  Declare file as a router
const router = require('express').Router();

//  Import pool from connection.js
const pool = require('../db/connection.js');



module.exports = router;
