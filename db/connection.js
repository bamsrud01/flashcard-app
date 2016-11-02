//  Import PostgreSQL
const pg = require('pg');

//  Set database
var config= {
  database: 'solo'
};

//  Set connection pool
var pool = new pg.Pool(config);

//  Export file
module.exports = pool;
