import { useContext } from "react";
import NotesContext from "../contexts/NotesContext";

function useNotesContext() {
  return useContext(NotesContext);
}

export default useNotesContext;
