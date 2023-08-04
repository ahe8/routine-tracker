import React from "react";
import { useState } from "react";
import NoteEdit from "./NoteEdit";

//Components
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
import { getFormattedDate } from "../utils/constants";
import { CommonPopover } from "./Popover";

//Style
import { useTheme } from "@mui/material/styles";

function NoteShow({ note, onDelete, onEdit }) {
  const theme = useTheme();

  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElForDelete, setAnchorElForDelete] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setShowEdit(!showEdit);
  };

  const handlePopoverDeleteOpen = (event) => {
    setAnchorElForDelete(event.currentTarget);
    setShowDelete(!showDelete);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverDeleteClose = () => {
    setAnchorElForDelete(null);
  };

  const handleDeleteClick = () => {
    onDelete(note.id);
  };

  const handleSubmit = (id, newContents) => {
    setShowEdit(false);
    onEdit(id, newContents);
    handlePopoverClose();
  };

  //get date
  const todayDate = getFormattedDate();

  // get contents on the note
  let content = (
    <Grid>
      <Typography variant="p" component="p" fontSize={15} marginRight={1}>
        {note.contents}
      </Typography>
    </Grid>
  );

  return (
    <Grid display="flex" justifyContent="center" alignItems="center">
      <Box sx={{ width: 1000, border: 1, p: 3, m: 1 }}>
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
              {todayDate}
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
              onClick={handlePopoverDeleteOpen}
              aria-label="delete"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
            {anchorElForDelete && (
              // <CommonPopover anchorEl={anchorElForDelete} onClose={handlePopoverDeleteClose}></CommonPopover>

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
                    item
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
                        Delete Note? <br />
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
                        This Cannot Be undone.
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
