const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//create user
app.post("/register", async (req, res) => {
  try {
    const { email, user_id, first_name } = req.body;
    const newUser = await pool.query(
      "INSERT into users(email, user_id, first_name) VALUES($1, $2, $3) RETURNING user_id",
      [email, user_id, first_name]
    );
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
  }
});

// get user's first name
app.get("/:uid", async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT first_name from users WHERE user_id = $1",
      [req.params.uid]
    );
    res.json(results.rows[0]["first_name"]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a routine
app.post("/:uid/routines", async (req, res) => {
  try {
    const { user_id, routine_name, routine_mmyy, routine_mmyy_values } =
      req.body;
    const newRoutine = await pool.query(
      "INSERT INTO routine (user_id, routine_name, routine_mmyy, routine_mmyy_values) VALUES($1, $2, $3, $4) RETURNING *",
      [user_id, routine_name, routine_mmyy, routine_mmyy_values]
    );
    res.json(newRoutine.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all routines
app.get("/:uid/routines", async (req, res) => {
  try {
    const allRoutines = await pool.query(
      "SELECT * FROM routine WHERE user_id = $1 ORDER BY routine_id ASC",
      [req.params.uid]
    );

    res.json(allRoutines.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a routine
app.get("/routines/:id", async (req, res) => {
  try {
    const routineID = Number(req.params.id);
    const routine = await pool.query(
      "SELECT * FROM routine WHERE routine_id = $1",
      [routineID]
    );
    res.json(routine.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update routine
app.put("/routines/:id", async (req, res) => {
  try {
    const routineID = Number(req.params.id);
    const { routine_mmyy_values } = req.body;
    const updateRoutine = await pool.query(
      "UPDATE routine SET routine_mmyy_values = $1 WHERE routine_id = $2",
      [routine_mmyy_values, routineID]
    );
    res.json(updateRoutine);
  } catch (err) {
    console.error(err.message);
  }
});

// delete routine
app.delete("/routines/:id", async (req, res) => {
  try {
    const routineID = Number(req.params.id);
    const routine = await pool.query(
      "DELETE * FROM routine WHERE routine_id = $1",
      [routineID]
    );

    res.json(routine);
  } catch (err) {
    console.error(err.message);
  }
});

//create a note
app.post("/:uid/notes", async (req, res) => {
  try {
    const { user_id, contents, note_date } = req.body;
    const newNote = await pool.query(
      "INSERT INTO notes (user_id, contents, note_date) VALUES($1, $2, $3) RETURNING *",
      [user_id, contents, note_date]
    );
    res.json(newNote.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all notes
app.get("/:uid/notes", async (req, res) => {
  try {
    const allNotes = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY note_id ASC",
      [req.params.uid]
    );

    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a note
app.get("/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const note = await pool.query("SELECT * FROM notes WHERE note_id = $1", [
      noteId,
    ]);
    res.json(note.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update note
app.put("/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const { contents } = req.body;
    const updateNote = await pool.query(
      "UPDATE notes SET contents = $1 WHERE note_id = $2",
      [contents, noteId]
    );
    res.json(updateNote);
  } catch (err) {
    console.error(err.message);
  }
});

// delete note
app.delete("/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const note = await pool.query("DELETE * FROM notes WHERE note_id = $1", [
      noteId,
    ]);

    res.json(note);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5001, console.log("listening on port 5001..."));
