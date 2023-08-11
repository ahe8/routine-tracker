const migrate = async (pool) => {
  /**
   * Create table users
   */
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users ( \
    user_id VARCHAR(128) PRIMARY KEY NOT NULL UNIQUE, \
    email VARCHAR(255) NOT NULL UNIQUE, \
    first_name VARCHAR(25) NOT NULL \
  )`
  );
  console.log("Finished user table");

  /**
   * Create routines
   */

  await pool.query(
    `CREATE TABLE IF NOT EXISTS routines ( \
    routine_id SERIAL PRIMARY KEY NOT NULL UNIQUE, \
    user_id VARCHAR(128) REFERENCES users, \
    routine_name VARCHAR(255), 
    routine_yyyymm integer, 
    routine_values VARCHAR(255), 
    is_active BOOLEAN, 
    goal integer \
  )`
  );
  console.log("Finished routines table");

  /**
   * Create notes
   */

  await pool.query(
    `CREATE TABLE IF NOT EXISTS notes ( \
    id SERIAL PRIMARY KEY NOT NULL UNIQUE, \
    user_id VARCHAR(128) REFERENCES users, 
    contents VARCHAR(255), 
    note_date VARCHAR(50) \
  )`
  );
  console.log("Finished notes table");
};

module.exports = migrate;
