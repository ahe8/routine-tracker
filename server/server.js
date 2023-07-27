const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

// create a routine
app.post("/routines", async (req, res) => {
    try {
        const {routine_name} = req.body;
        const newRoutine = await pool.query("INSERT INTO routine (routine_name) VALUES($1) RETURNING *", [routine_name]);
        res.json(newRoutine.rows[0]);
    } catch  (err) {
        console.error(err.message);
    }
})


// get all routines
app.get("/routines", async(req, res) => {
    try {
        const allRoutines = await pool.query("SELECT * FROM routine")
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