const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//create user
app.post("/register", async(req, res) => {
    try {
        const {email, firebase_id, first_name} = req.body;
        const newUser = await pool.query("INSERT into users(email, firebase_id, first_name) VALUES($1, $2, $3) RETURNING user_id", [email, firebase_id, first_name]);
        res.json(newUser);
    } catch(err) {
        console.error(err.message);
    }
})


// get user's first name
app.get("/:uid", async(req, res) => {
    try {
        const firstName = await pool.query("SELECT first_name from users WHERE firebase_id = $1", [req.params.uid])
        res.json(firstName);
    } catch(err) {
        console.error(err.message);
    }   
})

//create a routine
app.post("/:uid/routines", async (req, res) => {
    try {
        const {user_id, routine_name} = req.body;
        const newRoutine = await pool.query("INSERT INTO routine (user_id, routine_name) VALUES($1, $2) RETURNING *", [user_id, routine_name]);
        res.json(newRoutine.rows[0]);
    } catch  (err) {
        console.error(err.message);
    }
})


// get all routines
app.get("/:uid/routines", async(req, res) => {
    try {
        const user_id = Number(req.params.uid);
        const allRoutines = await pool.query("SELECT * FROM routine WHERE $1 = user_id", [user_id]);
        res.json(allRoutines.rows);
    } catch (err) {
        console.error(err.message);
    }
})  

// get a routine
app.get("/routines/:id", async(req, res) => {
    try {
        const routineID = Number(req.params.id);
        const routine = await pool.query("SELECT * FROM routine WHERE routine_id = $1", [routineID])
        res.json(routine.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// update routine
app.put("/routines/:id", async (req, res) => {
    try {
        const routineID = Number(req.params.id);
        const { routine } = req.body;
        const updateRoutine = await pool.query("UPDATE routine SET routine_name = $1 WHERE routine_id = $2", [routine, routineID])
        res.json(updateRoutine);
    } catch(err) {
        console.error(err.message);
    }
})


// delete routine
app.delete("/routines/:id", async(req, res) => {
    try {
        const routineID = Number(req.params.id);
        const routine = await pool.query("DELETE * FROM routine WHERE routine_id = $1", [routineID]);
        
        res.json(routine);
    } catch (err) {
        console.error(err.message);
    }
})


app.listen(5000, console.log("listening on port 5000..."));