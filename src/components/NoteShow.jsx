import React, { useState } from "react";
import NoteEdit from "./NoteEdit";
import {
  Grid,
  Typography,
  IconButton,
  Box,
  Popover,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/EditOutlined";
import { useTheme } from "@mui/material/styles";
import { useWindowWidth } from "@react-hook/window-size";

function NoteShow({ note, onDelete, onEdit }) {
  const theme = useTheme();

  const [showIcons, setShowIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElForDelete, setAnchorElForDelete] = useState(null);
  const windowWidth = useWindowWidth();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverDeleteOpen = (event) => {
    setAnchorElForDelete(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
    handlePopoverClose();
  };

  const handleSubmit = (id, newContents) => {
    onEdit(id, newContents);
    handlePopoverClose();
  };

  const handlePopoverDeleteClose = () => {
    setAnchorElForDelete(null);
  };

  const content = (
    <Grid>
      <Typography variant="p" component="p" fontSize={15} marginRight={1}>
        {note.contents}
      </Typography>
    </Grid>
  );

  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
    >
      <Box
        sx={{
          width: windowWidth * 0.9,
          border: 1,
          p: 3,
          m: 1,
          backgroundColor: showIcons ? theme.secondary.darker : "",
        }}
      >
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
              marginTop={2}
              marginBottom={1}
            >
              {note.note_date}
            </Typography>
          </Grid>

          {showIcons && (
            <Grid
              className="icons"
              item
              xs={4}
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton
                onClick={handlePopoverDeleteOpen}
                aria-label="delete"
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>

              {anchorElForDelete && (
                <Popover
                  id="delete-note"
                  anchorEl={anchorElForDelete}
                  onClose={handlePopoverDeleteClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={Boolean(anchorElForDelete)}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    item
                    xs={12}
                    sx={{ backgroundColor: theme.secondary.darker }}
                  >
                    <Box
                      component="form"
                      sx={{
                        width: 500,
                        height: 200,
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="p"
                          component="p"
                          fontSize={20}
                          marginLeft={3}
                          marginTop={1}
                          marginBottom={2}
                          color={theme.primary.light}
                        >
                          Delete this note? <br />
                        </Typography>
                        <Divider color={theme.primary.light} />

                        <Typography
                          variant="p"
                          component="p"
                          fontSize={15}
                          marginLeft={3}
                          marginTop={1}
                          marginBottom={8}
                          color={theme.primary.font}
                        >
                          This action cannot be undone. Do you wish to delete this note?
                        </Typography>
                      </Grid>
                      <Grid marginLeft={3} marginBottom={1}>
                        <Button variant="outlined" onClick={handleDeleteClick}>
                          Delete
                        </Button>
                      </Grid>
                    </Box>
                  </Grid>
                </Popover>
              )}

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
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
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
                    sx={{ backgroundColor: theme.secondary.darker }}
                  >
                    <NoteEdit onSubmit={handleSubmit} note={note} />
                  </Grid>
                </Popover>
              )}
            </Grid>
          )}

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

export default React.memo(NoteShow);
