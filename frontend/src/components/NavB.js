import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../contexts/UserContext";
import "../css/NavB.css";

const NavB = props => {
  const { user, changeUser } = useContext(UserContext);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    changeUser("");
    //<NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
  }

  function editProfile() {
    props.history.push(`/user/edit/${user.id}`);
  }
  return (
    <Navbar expand="lg">
      <Link className="btn" to="/">
        Home
      </Link>
      <Link className="btn" to="/sandbox">
        Following
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        {user ? (
          <>
            <Link className="btn" to="/guide/create">
              Create a guide
            </Link>
            <NavDropdown
              title={`Hello ${user.firstName}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={editProfile}>
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Account</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          <div>
            <Link className="btn" to="/register">
              Register
            </Link>
            <Link className="btn" to="/login">
              Login
            </Link>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavB);
