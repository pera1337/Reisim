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
    props.history.push("/");
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container justify="space-between">
          <Grid item>
            <Button
              component={Link}
              onClick={() => handleMenuChange(0)}
              style={{
                borderBottom: value === 0 ? "2px solid white" : undefined,
                borderRadius: "0px"
              }}
              color="inherit"
              to="/"
            >
              Home
            </Button>
            {user && (
              <Button
                component={Link}
                onClick={() => handleMenuChange(1)}
                style={{
                  borderBottom: value === 1 ? "2px solid white" : undefined,
                  borderRadius: "0px"
                }}
                color="inherit"
                to="/feed"
              >
                Following
              </Button>
            )}
            <Button
              component={Link}
              onClick={() => handleMenuChange(2)}
              style={{
                borderBottom: value === 2 ? "2px solid white" : undefined,
                borderRadius: "0px"
              }}
              color="inherit"
              to="/top"
            >
              Top guides
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
                    to={`/user/${user.username}`}
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to={`/user/edit/${user.username}`}
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
                <Button
                  component={Link}
                  color="inherit"
                  variant="outlined"
                  to="/login"
                >
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
