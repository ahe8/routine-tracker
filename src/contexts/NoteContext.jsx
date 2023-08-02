import { createContext, useState, useCallback } from "react";
import axios from "axios";

const NotesContext = createContext();

function Provider({ children }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    const response = await axios.get("http://localhost:5001/notes");

    setNotes(response.data);
  }, []);

  const editNoteById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:5001/notes/${id}`, {
      title: newTitle,
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
    await axios.delete(`http://localhost:5001/notes/${id}`);
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

export { Provider };
export default NotesContext;
