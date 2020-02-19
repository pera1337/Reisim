import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UseTextInput from "../hooks/UseTextInput";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const EditProfile = props => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = UseTextInput("");
  const [lastName, setLastName] = UseTextInput("");
  const [username, setUsername] = UseTextInput("");
  const [password, setPassword] = UseTextInput("");
  const [confirmPassword, setConfirmPassword] = UseTextInput("");
  const { changeUser } = useContext(UserContext);

  useEffect(() => {
    async function populate() {
      const token = localStorage.getItem("token");
      if (!token) props.history.push("/login");
      else {
        const headers = {
          "X-Auth-Token": token
        };
        try {
          const responseUser = await axios.get(
            `http://localhost:5000/api/account/edit/${props.username}`,
            { headers }
          );
          setFirstName(responseUser.data.firstName);
          setLastName(responseUser.data.lastName);
          setUsername(responseUser.data.username);
          setEmail(responseUser.data.email);
        } catch (e) {
          console.log(e.reponse);
          props.history.push("/");
        }
      }
    }
    populate();
  }, []);

  async function editProfile(e) {
    e.preventDefault();
    let response;
    try {
      response = await axios.put("http://localhost:5000/api/account/register", {
        firstName,
        username,
        lastName,
        email,
        password
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      changeUser(response.data.user);
      props.history.push("/");
    } catch (e) {
      //setError(e.response.data);
    }
  }
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
        <h2 style={{ textAlign: "center" }}>Edit Profile</h2>
        <form style={{ width: "100%" }} onSubmit={editProfile}>
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
                Edit Profile
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default withRouter(EditProfile);
