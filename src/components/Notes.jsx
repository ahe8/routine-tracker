import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import NoteCreate from "./NoteCreate";
import NoteList from "./NoteList";
function Notes() {
  const [notes, setNotes] = useState([]);

  const createNote = (contents) => {
    const updateNotes = [
      ...notes,
      { id: Math.round(Math.random() * 9999), contents: contents },
    ];
    console.log(notes);
    setNotes(updateNotes);
  };

  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={12}>
        <Typography variant="p" component="p" fontSize={15} marginRight={1}>
          Notes
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {" "}
        <NoteCreate onCreate={createNote} />
      </Grid>
      <Grid item xs={12}>
        <NoteList notes={notes} />
      </Grid>
    </Grid>
  );
}

export default Notes;
