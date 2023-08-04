import React from "react";
import { createContext, useState, useCallback } from "react";

//Context
import { useAuth } from "./AuthContext";

//Constant
import { getFormattedDate } from "../utils/constants";

import axios from "axios";

const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const currUser = useAuth().currentUser;

  const fetchNotes = useCallback(async () => {
    if (currUser) {
      const response = await axios.get(
        `http://localhost:5001/${currUser.uid}/notes`
      );
      setNotes(response.data);
    }
  }, [currUser]);

  const editNoteById = async (id, newContents) => {
    const response = await axios.put(
      `http://localhost:5001/${currUser.uid}/notes/${id}`,
      {
        contents: newContents,
      }
    );

    const updatedNotes = notes.map((note) => {
      console.log("updated contents is ", response.data);
      if (note.id === id) {
        return { ...note, ...response.data };
      }

      return note;
    });
    console.log("updatea notes are ", updatedNotes);

    setNotes(updatedNotes);
  };

  const deleteNoteById = async (id) => {
    console.log();
    await axios.delete(`http://localhost:5001/${currUser.uid}/notes/${id}`);

    const updatedNotes = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(updatedNotes);
  };

  const createNote = async (contents) => {
    //get today's date
    const date = getFormattedDate();
    if (contents.trim() !== "") {
      const body = {
        user_id: currUser.uid,
        contents: contents,
        note_date: date,
      };

      await fetch(`http://localhost:5001/${currUser.uid}/notes`, {
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
  const valueToShare = {
    notes,
    deleteNoteById,
    editNoteById,
    createNote,
    fetchNotes,
  };

  return (
    <NotesContext.Provider value={valueToShare}>
      {children}
    </NotesContext.Provider>
  );
}

export { NotesProvider };
export default NotesContext;
