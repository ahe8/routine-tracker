import React from "react";
import { useEffect } from "react";

//Imported compoents
import { Grid } from "@mui/material";
import NoteCreate from "./NoteCreate";
import NoteList from "./NoteList";

//Context
import useNotesContext from "../hooks/use-note-context";

function Notes() {
  const { notes, deleteNoteById, fetchNotes, createNote, editNoteById } =
    useNotesContext();

  //Fecth Notes
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes, editNoteById]);

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
