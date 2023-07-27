import { useState } from "react";
import NoteEdit from "./NoteEdit";

//Components
import { Grid, Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

//Style
import { useTheme } from "@mui/material/styles";

function NoteShow({ note, onDelete, onEdit }) {
  const theme = useTheme();
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClick = () => {
    onDelete(note.id);
  };
  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newContents) => {
    setShowEdit(false);
    onEdit(id, newContents);
  };

  let content = <h3>{note.contents}</h3>;
  if (showEdit) {
    content = <NoteEdit onSubmit={handleSubmit} note={note} />;
  }

  return (
    <Grid display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: 1000, border: 1, p: 1, m: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography variant="p" component="p" fontSize={15} marginRight={1}>
              Date
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <IconButton
              onClick={handleDeleteClick}
              aria-label="delete"
              color={theme.primary.standard}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={handleEditClick}
              aria-label="edit"
              color="info"
            >
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            item
            xs={12}
          >
            {content}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default NoteShow;
