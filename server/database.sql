CREATE DATABASE routine_database;

CREATE TABLE user(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(50),
    firebase_id VARCHAR UNIQUE
);

CREATE TABLE routine(
    routine_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users,
    routine_name VARCHAR(255),
    routine_MMYY JSON
);