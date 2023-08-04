import React from "react";
import { Grid, Typography, Popover } from "@mui/material";
//Style
import { useTheme } from "@mui/material/styles";

export const CommonPopover = ({ childeren, onClose }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    // setShowEdit(!showEdit);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  <Popover
    id="edit-note"
    onClose={onClose}
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
      <h4>heyyy</h4>
      Hello sunshine
      {childeren}
    </Grid>
  </Popover>;
};
