# Project Title

A simple routine tracker.

## Description

Routine Tracker allows users to create habits along with a monthly target then display it into a formatted calendar. Users can check off the habits each day and monitor their progress in accordance to their monthly goals.

## Getting Started

### Required Tools
* PostgresSQL
* Firebase
* Node.js

### Dependencies / Libraries
* @emotion/react
* @emotion/styled
* @mui/icons-material
* @mui/material
* @react-hook/window-size
* axios
* dotenv
* esbuild
* express
* firebase
* react
* react-dom
* react-google-button
* react-router-dom


### Installing

* Clone repository 
* Download, install and set up PostgresSQL
* Set up Firebase Authentication and grab API keys
* Create an .env file in the root and server directories with your API keys and server information
```
/.env

VITE_FIREBASE_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```
```
/server/.env

Example:

REACT_APP_DB_USERNAME="postgres"
REACT_APP_DB_PASSWORD="password"
REACT_APP_HOST="localhost"
REACT_APP_DB_PORT=5433
REACT_APP_DB_DATABASE="routine_database"
REACT_APP_PORT=5000
```


### Executing program
 
* Starting the client
```
npm install
npm run dev
```
* Starting the server
```
cd server
npm install
npm run dev
```


## To Dos
* Improve responsiveness for smaller screens (e.g. phones)
* Improve styling
* Add user profile page
* Optimize hooks and performance


## Authors

Austin He - https://github.com/ahe8

Hyerim Shin - https://github.com/hyerimshin

Victor Li - https://github.com/livictor888

