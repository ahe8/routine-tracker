import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Popover,
  Button,
  TextField,
} from "@mui/material";

//Style
import { useTheme } from "@mui/material/styles";

function NoteEdit({ note, onSubmit }) {
  const theme = useTheme();
  const [contents, setContents] = useState(note.contents);

  const handleChange = (event) => {
    setContents(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(note.id, contents);
  };

  return (
    <form noValidate>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "50ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid itme xs={12}>
          <Typography
            variant="p"
            component="p"
            fontSize={15}
            marginLeft={3}
            marginTop={1}
            color={theme.primary.light}
          >
            Edit Note
          </Typography>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={contents}
            onChange={handleChange}
          />
        </Grid>
        <Grid marginLeft={3} marginBottom={1}>
          <Button variant="outlined" onClick={handleSubmit}>
            Save
          </Button>
        </Grid>
      </Box>
    </form>
  );
}

export default NoteEdit;