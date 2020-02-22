import React, { useContext, useState } from "react";
import { Formik } from "formik";
import TextField from "./shared/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Grid, Avatar } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import ErrorSnackbar from "./shared/ErrorSnackbar";
import * as Yup from "yup";

const Register = props => {
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const { changeUser } = useContext(UserContext);

  let initialValues = {
    firstName: "",
    username: "",
    lastName: "",
    email: "",
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
    email: Yup.string()
      .email("Invalid email address")
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

  async function register(values) {
    let response;
    const { firstName, username, lastName, email, password } = values;
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={register}
        >
          {formik => (
            <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
              <Grid spacing={1} container>
                <Grid item xs={12}>
                  <TextField
                    label="E-mail address"
                    placeholder="Enter an e-mail address"
                    {...formik.getFieldProps("email")}
                  />
                </Grid>
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
          )}
        </Formik>
      </Paper>
      <ErrorSnackbar open={openError} error={error} onClose={closeError} />
    </Container>
  );
};

export default Register;
