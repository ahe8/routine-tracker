import React from "react";
import { useState } from "react";

//Components
import { Box, Grid, Typography, Popover, Button } from "@mui/material";
import TextField from "@mui/material/TextField";

//Style
import { useTheme } from "@mui/material/styles";

function NoteCreate({ onCreate }) {
  const theme = useTheme();
  const [note, setNote] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(note);
    setNote("");
    handlePopoverClose();
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      height={"100%"}
    >
      <Grid>
        <Box Box display="flex">
          <Button variant="outlined" onClick={handlePopoverOpen}>
            {" "}
            + New Note
          </Button>

          {anchorEl && (
            <Popover
              id="new-note"
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
            >
              <Grid sx={{ backgroundColor: theme.secondary.darker }} p={1}>
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
                        color={theme.primary.light}
                      >
                        Create New Note
                      </Typography>
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        placeholder="Write your thoughts"
                        value={note}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid marginLeft={3}>
                      <Button variant="outlined" onClick={handleSubmit}>
                        Save
                      </Button>
                    </Grid>
                  </Box>
                </form>
              </Grid>
            </Popover>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default NoteCreate;
