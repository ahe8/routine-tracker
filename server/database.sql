CREATE DATABASE routine_database;

CREATE TABLE users(
    user_id VARCHAR(128) PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(50)
);

CREATE TABLE routine(
    routine_id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users,
    routine_name VARCHAR(255),
    routine_mmyy VARCHAR(6),
    routine_mmyy_values VARCHAR(255)
);