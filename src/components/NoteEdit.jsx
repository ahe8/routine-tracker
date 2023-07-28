import { useState } from "react";
import { Box, Grid, Typography, Popover, Button } from "@mui/material";

function NoteEdit({ note, onSubmit }) {
  const [contents, setContents] = useState(note.contents);

  const handleChange = (event) => {
    setContents(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(note.id, contents);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={contents} />
        <button>Save</button>
      </form>
    </Box>
  );
}

export default NoteEdit;
