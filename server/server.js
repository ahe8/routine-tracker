const port = process.env.REACT_APP_PORT || 5001; // Default to 5001 if not provided

const express = require("express");
const cors = require("cors");
const app = express();
const { pool: pool } = require("./db");

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

//upsert user
app.put("/register", async (req, res) => {
  try {
    const { email, user_id, first_name } = req.body;
    const newUser = await pool.query(
      "INSERT into users(email, user_id, first_name) VALUES($1, $2, $3) ON CONFLICT DO NOTHING",
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
    const user_id = req.params.uid;
    const { routine_name, routine_yyyymm, routine_values, goal } = req.body;
    const newRoutine = await pool.query(
      "INSERT INTO routines(user_id,routine_name,routine_yyyymm,routine_values,goal) VALUES ($1,$2,$3,$4,$5)",
      [user_id, routine_name, routine_yyyymm, routine_values, goal]
    );
    res.json(newRoutine.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all routines
app.get("/:uid/routines", async (req, res) => {
  try {
    const user_id = req.params.uid;
    const allRoutines = await pool.query(
      "SELECT * FROM routines WHERE user_id = $1 ORDER BY routine_id ASC",
      [user_id]
    );
    res.json(allRoutines.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update routine name/goal
app.put("/:uid/routines/edit", async (req, res) => {
  try {
    const user_id = req.params.uid;
    // const { routine_id, routine_name } = req.body; // Expect routine_id and routine_name from the request body
    let updates = req.body;

    let sqlQuery = "BEGIN;";

    updates.forEach(habit => {
      let query = `UPDATE routines SET `
      if (!habit.hasOwnProperty('routine_name') && habit.hasOwnProperty('goal')) {
        query = query + `goal = ${habit['goal']}`
      } else if (!habit.hasOwnProperty('goal') && habit.hasOwnProperty('routine_name')) {
        query = query + `routine_name = '${habit['routine_name']}'`
      } else if (habit.hasOwnProperty('goal') && habit.hasOwnProperty('routine_name')) {
        query = query + ` routine_name = '${habit['routine_name']}', goal = ${habit['goal']}`
      }
      query = query + ` WHERE user_id = '${user_id}' AND routine_id = ${habit['routine_id']};`
      sqlQuery = sqlQuery + query;
    })

    sqlQuery = sqlQuery + 'COMMIT;';

    const updateRoutine = await pool.query(sqlQuery);

    res.json(updateRoutine.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// update routine values
app.put("/:uid/routines/values", async (req, res) => {
  try {
    const user_id = req.params.uid;
    const { routine_values, routine_id } = req.body;
    const updateRoutine = await pool.query(
      "UPDATE routines SET routine_values = $1 WHERE user_id = $2 AND routine_id = $3",
      [routine_values, user_id, routine_id]
    );
    res.json(updateRoutine);
  } catch (err) {
    console.error(err.message);
  }
});

// bulk insert routine
app.post("/:uid/routines/bulk", async (req, res) => {
  try {
    const user_id = req.params.uid;
    let updates = req.body;

    let sqlQuery = "BEGIN;";


    updates.forEach((habit) => {
      const { routine_name, routine_yyyymm, routine_values, goal } = habit;
      sqlQuery = sqlQuery + `INSERT INTO routines(user_id,routine_name,routine_yyyymm,routine_values,goal) VALUES ('${user_id}', '${routine_name}', ${routine_yyyymm}, '${routine_values}', ${goal});`
    })

    sqlQuery = sqlQuery + 'COMMIT;';

    const updateRoutine = await pool.query(sqlQuery);

    res.json(updateRoutine.rows);
  } catch (err) {
    console.error(err.message);
  }
});


// delete routine
app.delete("/:uid/routines", async (req, res) => {
  try {
    const user_id = req.params.uid;
    const { routine_id } = req.body; // Expect routine_id from the request body

    const routine = await pool.query(
      "DELETE FROM routines WHERE user_id = $1 AND routine_id = $2;",
      [user_id, routine_id]
    );

    res.json(routine);
  } catch (err) {
    console.error(err.message);
  }
});

//get earliest month
app.get("/:uid/earliest_month", async (req, res) => {
  try {
    const user_id = req.params.uid;
    const earliestMonth = await pool.query(
      "SELECT MIN(routine_yyyymm) FROM routines WHERE user_id = $1",
      [user_id]
    );

    res.json(earliestMonth.rows[0].min);
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
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY id ASC",
      [req.params.uid]
    );

    res.json(allNotes.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a note
app.get("/:uid/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const note = await pool.query("SELECT * FROM notes WHERE id = $1", [
      noteId,
    ]);
    res.json(note.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update note
app.put("/:uid/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const { contents } = req.body;
    const updateNote = await pool.query(
      "UPDATE notes SET contents = $1 WHERE id = $2",
      [contents, noteId]
    );
    res.json(updateNote);
  } catch (err) {
    console.error(err.message);
  }
});

// delete note
app.delete("/:uid/notes/:id", async (req, res) => {
  try {
    const noteId = Number(req.params.id);
    const note = await pool.query("DELETE FROM notes WHERE id = $1", [noteId]);
    res.json(note);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
