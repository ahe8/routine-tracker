const Pool = require("pg").Pool;

const pool = new Pool({
  user: "hyerimshin",
  password: "shrz11",
  host: "localhost",
  port: 5432,
  database: "routine_database",
});

module.exports = pool;
