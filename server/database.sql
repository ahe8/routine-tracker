CREATE DATABASE routine_database;

CREATE TABLE users (
    user_id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(50)
);

CREATE TABLE routines (
    routine_id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users,
    routine_name VARCHAR(255),
    routine_yyyymm integer,
    routine_values VARCHAR(255),
    goal integer
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users,
    contents VARCHAR(255),
    note_date VARCHAR(50)
);