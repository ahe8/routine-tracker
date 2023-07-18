import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography, Popover } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {


    const userInfo = {userEmail: "sinhyerim@gmail.com"}

    const [anchorEl, setAnchorEl] = React.useState(null);

    
    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handlePopoverClose = () => {
        setAnchorEl(null);
      };


    return (<Grid container direction="row" justifyContent="center" alignItems="center" height={"100%"}>
        <Grid><Box display="flex" >
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
      {userInfo.userEmail}
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
          horizontal: "right"
        }}
        open={Boolean(anchorEl)}>
        <Typography
          sx={{ p: 1, width: "150px", cursor: "pointer" }}
          fontWeight={700}
          onClick={async () => {
            await apiLogout();
            navigate("/login");
          }}>
          Log out
        </Typography>
      </Popover>
    )}
  </Box></Grid>
  </Grid>)
}



export default NavBar;