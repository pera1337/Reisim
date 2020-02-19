import React, { useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Grid, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import UseTextInput from "../hooks/UseTextInput";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorSnackbar from "./shared/ErrorSnackbar";

const Register = props => {
  const [email, setEmail] = UseTextInput("");
  const [firstName, setFirstName] = UseTextInput("");
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [lastName, setLastName] = UseTextInput("");
  const [username, setUsername] = UseTextInput("");
  const [password, setPassword] = UseTextInput("");
  const [confirmPassword, setConfirmPassword] = UseTextInput("");
  const { changeUser } = useContext(UserContext);

  async function register(e) {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(
        "http://localhost:5000/api/account/register",
        {
          firstName,
          username,
          lastName,
          email,
          password
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      changeUser(response.data.user);
      props.history.push("/");
    } catch (e) {
      setOpenError(true);
      setError(e.response.data);
    }
  }

  const closeError = () => {
    setOpenError(false);
    setError("");
  };

  return (
    <Container
      component="main"
      style={{ borderRadius: "15px", marginTop: "25px" }}
      color="#3f51b5"
      maxWidth="xs"
    >
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px"
        }}
      >
        <Avatar style={{ backgroundColor: "#3f51b5" }}>
          <FontAwesomeIcon icon={faLock} />
        </Avatar>
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <form style={{ width: "100%" }} onSubmit={register}>
          <Grid spacing={1} container>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="E-mail address"
                placeholder="Enter an e-mail address"
                value={email}
                onChange={setEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="Username"
                placeholder="Enter a username"
                value={username}
                onChange={setUsername}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="First name"
                placeholder="Enter a first name"
                value={firstName}
                onChange={setFirstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="Last name"
                placeholder="Enter a last name"
                value={lastName}
                onChange={setLastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="Password"
                placeholder="Enter a password"
                type="password"
                value={password}
                onChange={setPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="Confirm password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={setConfirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
              >
                Register
              </Button>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "8px" }} container justify="center">
            <Grid item>
              <Link to="/login">Already have an account? Login</Link>>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ErrorSnackbar open={openError} error={error} onClose={closeError} />
    </Container>
  );
};

export default Register;
