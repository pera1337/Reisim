import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import FormGroup from "react-bootstrap/FormGroup";
// import FormControl from "react-bootstrap/FormControl";
import UseTextInput from "../hooks/UseTextInput";
// import Form from "react-bootstrap/Form";
import "../css/Register.css";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

const EditProfile = props => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = UseTextInput("");
  const [lastName, setLastName] = UseTextInput("");
  const [password, setPassword] = UseTextInput("");
  const [confirmPassword, setConfirmPassword] = UseTextInput("");
  const { changeUser } = useContext(UserContext);

  useEffect(() => {
    async function populate() {
      const responseUser = await axios.get(
        `http://localhost:5000/api/account/${props.id}`
      );
      setFirstName(responseUser.data.firstName);
      setLastName(responseUser.data.lastName);
      setEmail(responseUser.data.email);
    }
    populate();
  }, []);

  async function editProfile(e) {
    e.preventDefault();
    let response;
    try {
      response = await axios.put("http://localhost:5000/api/account/register", {
        firstName,
        lastName,
        email,
        password
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      changeUser(response.data);
      props.history.push("/");
    } catch (e) {
      //setError(e.response.data);
    }
  }
  return (
    <div className="Register">
      {/* <form onSubmit={editProfile}>
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

export default withRouter(EditProfile);
