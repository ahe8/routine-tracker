import React from "react";
import { useState, useEffect, useCallback, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import NoteCreate from "./NoteCreate";
import NoteList from "./NoteList";
import { getFormattedDate } from "../utils/constants";

import { useAuth } from "../contexts/AuthContext";

import axios from "axios";
import NotesContext from "../contexts/NoteContext";

function Notes() {
  const [notes, setNotes] = useState([]);

  // fetch User
  const userInfo = useAuth().currentUser;
  useEffect(() => {
    if (userInfo) {
      try {
        fetch(`http://localhost:5001/${userInfo.uid}/notes`)
          .then((response) => response.json())
          .then((data) => {
            console.log("data is ", data);
            setNotes(data);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }, [userInfo]);

  // const userInfo = useAuth().currentUser;
  // useEffect(() => {
  //   if (userInfo) {
  //     try {
  //       fetch(`http://localhost:5001/notes`)
  //         .then((response) => response.json())
  //         .then((data) => {
  //           console.log("data is ", data);
  //           setNotes(data);
  //         });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // }, [userInfo]);

  const date = getFormattedDate();

  const editNoteById = (id, newContents) => {
    const updateNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, contents: newContents };
      }
      return note;
    });
    setNotes(updateNotes);
  };

  //still need to work on
  // const deleteNoteById = async (id) => {
  //   await fetch(`http://localhost:5001/${userInfo.uid}/notes/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then(() => {
  //       const updateNotes = notes.filter((note) => {
  //         return note.id != id;
  //       });
  //       setNotes(updateNotes);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const deleteNoteById = async (id) => {
    console.log();
    await axios.delete(`http://localhost:5001/${userInfo.uid}/notes/${id}`);

    const updatedNotes = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(updatedNotes);
  };

  // const deleteNoteById = async (id) => {
  //   console.log();
  //   await axios.delete(`http://localhost:5001/notes/${id}`);
  //   const updatedNotes = notes.filter((note) => {
  //     return note.id !== id;
  //   });

  //   setNotes(updatedNotes);
  // };

  const createNote = async (contents) => {
    if (contents.trim() !== "") {
      const body = {
        user_id: userInfo.uid,
        contents: contents,
        note_date: date,
      };

      await fetch(`http://localhost:5001/${userInfo.uid}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
        .then(() => {
          const updateNotes = [...notes, { contents: contents }];
          console.log(notes);
          setNotes(updateNotes);
        })
        .catch((err) => console.log(err));
    }
  };

  // const createNote = async (contents) => {
  //   if (contents.trim() !== "") {
  //     const body = {
  //       user_id: userInfo.uid,
  //       contents: contents,
  //       note_date: date,
  //     };

  //     await fetch(`http://localhost:5001/notes`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(body),
  //     })
  //       .then(() => {
  //         const updateNotes = [...notes, { contents: contents }];
  //         console.log(notes);
  //         setNotes(updateNotes);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

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
