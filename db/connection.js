//  Import PostgreSQL
const pg = require('pg');
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
const auth = params.auth.split(':');

//  Set database
var config = {
  // database: 'solo'
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: true
};


//  Set connection pool
var pool = new pg.Pool(config);

//  Export file
module.exports = pool;
