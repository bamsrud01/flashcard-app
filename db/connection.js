//  Import PostgreSQL
const pg = require('pg');

//  Set database
var config= {
  database: 'solo'
};

//  Set connection pool
var pool = new pg.pool(config);

//  Export file
module.exports = pool;
