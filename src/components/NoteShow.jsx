import React from "react";
import { useState } from "react";
import NoteEdit from "./NoteEdit";

//Components
import { Grid, Typography, IconButton, Box, Popover } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";

//Style
import { useTheme } from "@mui/material/styles";

function NoteShow({ note, onDelete, onEdit }) {
  const theme = useTheme();
  const [showEdit, setShowEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowEdit(!showEdit);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleSubmit = (id, newContents) => {
    setShowEdit(false);
    onEdit(id, newContents);
    handlePopoverClose();
  };

  let content = (
    <Grid>
      <Typography variant="p" component="p" fontSize={15} marginRight={1}>
        {note.contents}
      </Typography>
    </Grid>
  );

  // if (showEdit) {
  //   content = <NoteEdit onSubmit={handleSubmit} note={note} />;
  // }

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
            <Typography
              variant="p"
              component="p"
              color={theme.primary.light}
              fontSize={15}
              marginRight={1}
            >
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
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              onClick={handlePopoverOpen}
              aria-label="edit"
              color="secondary"
            >
              <EditIcon />
            </IconButton>
            {anchorEl && (
              <Popover
                id="edit-note"
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  item
                  xs={12}
                >
                  <NoteEdit onSubmit={handleSubmit} note={note} />
                </Grid>
              </Popover>
            )}
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
