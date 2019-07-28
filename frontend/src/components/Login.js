import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import UseTextInput from "../hooks/UseTextInput";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import "../css/Login.css";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

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
    <div className="Login">
      <h1>Login</h1>
      <form onSubmit={login}>
        <FormGroup controlId="email">
          <Form.Label>Email address</Form.Label>
          <FormControl
            placeholder="Enter your email"
            autoFocus
            type="email"
            value={email}
            onChange={setEmail}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <Form.Label>Password</Form.Label>
          <FormControl
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            type="password"
          />
        </FormGroup>
        <Button block type="submit">
          Login
        </Button>
        {error && (
          <Alert
            className="Alert"
            variant="danger"
            onClose={closeError}
            dismissible
          >
            <p>{error}</p>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default Login;
