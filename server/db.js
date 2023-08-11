require("dotenv").config();
const Pool = require("pg").Pool;
const migrate = require("./migration");

const pool = new Pool({
  user: process.env.REACT_APP_DB_USERNAME,
  password: process.env.REACT_APP_DB_PASSWORD,
  host: process.env.REACT_APP_HOST,
  port: process.env.REACT_APP_DB_PORT,
  database: process.env.REACT_APP_DB_DATABASE,
});

migrate(pool);

const poolAsync = (...args) => {
  return new Promise((resolve, reject) => {
    pool
      .query(...args)
      .then(resolve)
      .catch(reject);
  });
};

module.exports = { pool, poolAsync };
