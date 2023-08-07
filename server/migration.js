const migrate = async (pool) => {
  // create table User

  await pool.query(
    `CREATE TABLE IF NOT EXISTS public.user ( \
        user_id SERIAL PRIMARY KEY NOT NULL UNIQUE, \
        username VARCHAR(25) NOT NULL, \
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(25) NOT NULL,
      )`
  );
};
module.exports = migrate;
