import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UseTextInput from "../hooks/UseTextInput";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { SnackbarContent, Grid, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes, faLock } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Login = props => {
  const [email, setEmail] = UseTextInput("");
  const [password, setPassword] = UseTextInput("");
  const [error, setError] = useState("");
  const { changeUser } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    let response;
    try {
      response = await axios.post("http://localhost:5000/api/account/login", {
        email,
        password
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      changeUser(response.data.user);
      props.history.push("/");
    } catch (e) {
      setError(e.response.data);
    }
  }

  function closeError() {
    setError("");
  }

  return (
    <Container
      component="main"
      style={{ borderRadius: "15px", marginTop: "50px" }}
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
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={login}>
          <Grid
            spacing={3}
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                margin="normal"
                fullWidth
                label="E-mail"
                placeholder="Enter an e-mail address"
                value={email}
                onChange={setEmail}
              />
            </Grid>
            <Grid item>
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
              <Button
                fullWidth
                color="primary"
                variant="contained"
                type="submit"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link to="/register">Dont have an account? Register</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={error}
        onClose={closeError}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
      >
        <SnackbarContent
          message={
            <span>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ color: "white" }}
              />
              {`  ${error}`}
            </span>
          }
          style={{ backgroundColor: "red" }}
          action={[
            <IconButton onClick={closeError}>
              <FontAwesomeIcon icon={faTimes} color="white" />
            </IconButton>
          ]}
        />
      </Snackbar>
    </Container>
  );
};

export default Login;
