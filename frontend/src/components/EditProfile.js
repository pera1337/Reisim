import React, { useState, useContext, useEffect } from "react";
import { Formik } from "formik";
import { withRouter } from "react-router-dom";
import TextField from "./shared/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import UseTextInput from "../hooks/UseTextInput";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import * as Yup from "yup";

const EditProfile = props => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = UseTextInput("");
  const [lastName, setLastName] = UseTextInput("");
  const [username, setUsername] = UseTextInput("");
  const [password, setPassword] = UseTextInput("");
  const [confirmPassword, setConfirmPassword] = UseTextInput("");
  const { changeUser } = useContext(UserContext);

  let initialValues = {
    firstName: firstName,
    username: username,
    lastName: lastName,
    password: "",
    confirmPassword: ""
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    username: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters")
      .max(21, "Must be 21 characters or less")
      .oneOf([Yup.ref("confirmPassword"), null], "Passwords don't match!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required("Required")
  });

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

  async function editProfile(values) {
    const { firstName, username, lastName, password } = values;
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
      console.log(response);
    } catch (e) {
      console.log(e.response);
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
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={editProfile}
        >
          {formik => (
            <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
              <Grid spacing={1} container>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    placeholder="Enter a username"
                    {...formik.getFieldProps("username")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    placeholder="Enter a first name"
                    {...formik.getFieldProps("firstName")}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    placeholder="Enter a last name"
                    {...formik.getFieldProps("lastName")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    placeholder="Enter a password"
                    type="password"
                    {...formik.getFieldProps("password")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    {...formik.getFieldProps("confirmPassword")}
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
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default withRouter(EditProfile);
