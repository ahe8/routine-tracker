import React from "react";
import { createContext, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);

  const currUser = useAuth().currentUser;

  const fetchNotes = useCallback(async () => {
    console.log("current user id is", currUser.uid);
    const response = await axios.get(
      `http://localhost:5001/${currUser.uid}/notes`
    );
    console.log(response);

    setNotes(response.data);
  }, []);

  const editNoteById = async (id, newContents) => {
    const response = await axios.put(`http://localhost:5001/notes/${id}`, {
      contents: newContents,
    });

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...response.data };
      }

      return note;
    });

    setNotes(updatedNotes);
  };

  const deleteNoteById = async (id) => {
    await axios.delete(`http://localhost:5001/${userInfo.uid}/notes/${id}`);
    const updatedNotes = notes.filter((note) => {
      return note.id !== id;
    });

    setNotes(updatedNotes);
  };

  const createNote = async (contents) => {
    const response = await axios.post("http://localhost:5001/notes", {
      contents,
    });

    const updatedNotes = [...notes, response.data];

    setNotes(updatedNotes);
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
