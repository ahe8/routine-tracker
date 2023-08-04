CREATE DATABASE routine_database;

CREATE TABLE users(
    user_id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(50)
);


CREATE routines_list(
    routine_id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) references users,
    routine_name VARCHAR(255),
    is_active BOOLEAN
);

CREATE user_routines(
    id SERIAL PRIMARY KEY,
    routine_id references routines_list,
    routine_yyyymm integer,
    routine_yyyymm_values VARCHAR(255)
);


-- CREATE TABLE user_routines(
--     user_routine_id SERIAL PRIMARY KEY,
--     user_id VARCHAR(128) REFERENCES users,
--     routine_name VARCHAR(255)
-- );   

-- CREATE TABLE routines(
--     routine_id SERIAL PRIMARY KEY,
--     user_routine_id integer REFERENCES user_routines,
--     user_id VARCHAR(128) REFERENCES users,
--     routine_yyyymm integer,
--     routine_yyyymm_values VARCHAR(255)
-- );