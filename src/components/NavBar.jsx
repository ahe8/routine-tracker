import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Popover } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const currUser = useAuth().currentUser;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (currUser) {
      try {
        fetch(`http://localhost:5000/${currUser.uid}`)
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
      justifyContent="center"
      alignItems="center"
      height={"100%"}
    >
      <Grid>
        <Box display="flex">
          <Typography variant="p" component="p" fontSize={15} marginRight={1}>
            Hello
          </Typography>
          <Typography
            variant="p"
            component="p"
            fontSize={15}
            fontWeight={"500"}
            marginRight={1}
          >
            {userFirstName}
          </Typography>
          <AccountCircleIcon
            sx={{ fontSize: "25px" }}
            onClick={handlePopoverOpen}
          />
          {anchorEl && (
            <Popover
              id="avatar-popover"
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
            >
              <Typography
                sx={{ p: 1, width: "150px", cursor: "pointer" }}
                fontWeight={700}
                onClick={async () => {
                  await apiLogout();
                  navigate("/login");
                }}
              >
                Log out
              </Typography>
            </Popover>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default NavBar;
