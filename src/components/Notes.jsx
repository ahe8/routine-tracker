import React from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import NoteCreate from "./NoteCreate";
import NoteList from "./NoteList";

function Notes() {
  const [notes, setNotes] = useState([]);

  const editNoteById = (id, newContents) => {
    const updateNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, contents: newContents };
      }
      return note;
    });
    setNotes(updateNotes);
  };

  const deleteNoteById = (id) => {
    const updateNotes = notes.filter((note) => {
      return note.id != id;
    });
    setNotes(updateNotes);
  };

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
      <Grid item xs={12} justifyContent="flex-start" alignItems="center"></Grid>
      <Grid item xs={12}>
        {" "}
        <NoteCreate onCreate={createNote} />
      </Grid>
      <Grid item xs={12}>
        <NoteList
          onEdit={editNoteById}
          notes={notes}
          onDelete={deleteNoteById}
        />
      </Grid>
    </Grid>
  );
}

export default Notes;
