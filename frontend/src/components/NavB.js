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
    <Navbar className="main-nav" expand="lg" variant="dark">
      <Link className="btn" to="/">
        Home
      </Link>
      <Link className="btn" to="/feed">
        Following
      </Link>
      <Link className="btn" to="/sandbox">
        Sandbox
      </Link>
      <Navbar.Toggle id="nav-toggle" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" />
        {user ? (
          <Nav>
            <Link className="btn" to="/guide/create">
              Create a guide
            </Link>
            <NavDropdown
              title={`Hello ${user.firstName}`}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href={`/user/${user.id}`}>
                My Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={editProfile}>
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Link className="btn" to="/register">
              Register
            </Link>
            <Link className="btn" to="/login">
              Login
            </Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(NavB);
