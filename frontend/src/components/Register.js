import React, { useContext } from "react";
// import Button from "react-bootstrap/Button";
// import FormGroup from "react-bootstrap/FormGroup";
// import FormControl from "react-bootstrap/FormControl";
import UseTextInput from "../hooks/UseTextInput";
// import Form from "react-bootstrap/Form";
import "../css/Register.css";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const Register = props => {
  const [email, setEmail] = UseTextInput("");
  const [firstName, setFirstName] = UseTextInput("");
  const [lastName, setLastName] = UseTextInput("");
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
      //setError(e.response.data);
    }
  }
  return (
    <div className="Register">
      <h1>Register</h1>
      {/* <form onSubmit={register}>
        <FormGroup controlId="email">
          <Form.Label>Email address</Form.Label>
          <FormControl
            placeholder="Enter an email adress"
            autoFocus
            type="email"
            value={email}
            onChange={setEmail}
          />
        </FormGroup>
        <FormGroup controlId="firstName">
          <Form.Label>FirstName</Form.Label>
          <FormControl
            placeholder="First Name"
            autoFocus
            value={firstName}
            onChange={setFirstName}
          />
        </FormGroup>
        <FormGroup controlId="lastName">
          <Form.Label>LastName</Form.Label>
          <FormControl
            placeholder="Last Name"
            autoFocus
            value={lastName}
            onChange={setLastName}
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
        <FormGroup controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <FormControl
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            type="password"
          />
        </FormGroup>
        <Button block type="submit">
          Register
        </Button>
      </form> */}
    </div>
  );
};

export default Register;
