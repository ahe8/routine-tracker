import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

// Components
import { Box, Grid, Typography, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const currUser = useAuth().currentUser;

  const options = ["Profile", "Report", "Delete account", "Logout"];

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    if (option === "Logout") {
      logout();
    }
    handleMouseLeave();
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        window.location.reload();
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currUser) {
      try {
        fetch(`http://localhost:5001/${currUser.uid}`)
          .then((res) => res.json())
          .then((data) => setUserFirstName(data));
      } catch (err) {
        console.log(err);
      }
    }
  }, [currUser]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between" // Adjust the main alignment to space-between
      alignItems="center"
      height={"100%"}
    >
      <Box display="flex" alignItems="center">
        <Box id="right-app-name">
          <Typography variant="p" component="p" fontSize={15} marginRight={1}>
            Routine Tracker
          </Typography>
        </Box>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Typography variant="p" component="p" fontSize={15} marginRight={1}>
          Hello, {userFirstName}
        </Typography>
        <AccountCircleIcon sx={{ fontSize: "25px" }} />
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMouseLeave}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleMenuItemClick(option)}
              sx={{
                "&:hover": {
                  color: option === "Logout" ? "red" : "inherit",
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Grid>
  );
};

export default NavBar;
