const {Pool} = require('pg');
// If no connection string is specified use the defaults specified in other environment variables
const pool = process.env.DATABASE_URL
  ? new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  })
  : new Pool();

module.exports = pool;