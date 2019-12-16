import React, { useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { UserContext } from "../contexts/UserContext";
import "../css/NavB.css";

const NavB = props => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, changeUser } = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuChange = num => {
    setValue(num);
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    changeUser("");
    setAnchorEl(null);
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              component={Link}
              onClick={() => handleMenuChange(0)}
              variant={value === 0 ? "outlined" : undefined}
              color="inherit"
              to="/"
            >
              Home
            </Button>
            <Button
              component={Link}
              onClick={() => handleMenuChange(1)}
              variant={value === 1 ? "outlined" : undefined}
              color="inherit"
              to="/feed"
            >
              Following
            </Button>
            <Button
              component={Link}
              onClick={() => handleMenuChange(2)}
              variant={value === 2 ? "outlined" : undefined}
              color="inherit"
              to="/sandbox"
            >
              Sandbox
            </Button>
          </Grid>
          <Grid item>
            {user ? (
              <div>
                <Button
                  component={Link}
                  color="inherit"
                  variant="outlined"
                  to="/guide/create"
                >
                  Create
                </Button>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  color="inherit"
                  onClick={handleClick}
                >
                  {user.firstName}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to={`/user/${user.id}`}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/user/edit/${user.id}`}
                    onClick={handleClose}
                  >
                    Edit Profile
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button component={Link} color="inherit" to="/register">
                  Register
                </Button>
                <Button component={Link} color="inherit" to="/login">
                  Login
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavB);
