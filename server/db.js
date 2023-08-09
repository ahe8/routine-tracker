require('dotenv').config();
const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "hyerimshin",
//   password: "shrz11",
//   host: "localhost",
//   port: 5432,
//   database: "routine_database",
// });

// console.log("DB Username:", process.env.REACT_APP_DB_USERNAME);
// console.log("DB Password:", process.env.REACT_APP_DB_PASSWORD);
// console.log("DB Port:", process.env.REACT_APP_DB_PORT);
// console.log("DB Database Name:", process.env.REACT_APP_DB_DATABASE);

const pool = new Pool({
    user: process.env.REACT_APP_DB_USERNAME,
    password: process.env.REACT_APP_DB_PASSWORD,
    host: process.env.REACT_APP_HOST,
    port: process.env.REACT_APP_DB_PORT,
    database: process.env.REACT_APP_DB_DATABASE,
  });
  

module.exports = pool;
