import React from "react";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import useTextInput from "../../hooks/UseTextInput";
import "../../css/LocationDetails.css";

const LocationDetails = ({ place, display = false, changeField }) => {
  const num = place.locationNumber + 1;
  const [name, setName] = useTextInput(place.name ? place.name : "");
  const [description, setDescription] = useTextInput(
    place.description ? place.description : ""
  );
  return (
    <Form.Row>
      <Col lg={3}>
        <div className="col-container">
          <div className="number-container">
            <p>{num}</p>
          </div>
        </div>
      </Col>
      <Col lg={9}>
        {!display ? (
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              value={name}
              onChange={e => {
                setName(e);
                changeField(num - 1, "name", e.target.value);
              }}
            />
          </FormGroup>
        ) : name ? (
          <h3 style={{ textAlign: "center" }}>{name}</h3>
        ) : null}
        {!display ? (
          <FormGroup>
            <Form.Label>Description</Form.Label>
            <FormControl
              value={description}
              onChange={e => {
                setDescription(e);
                changeField(num - 1, "description", e.target.value);
              }}
              type="text"
            />
          </FormGroup>
        ) : (
          <p style={{ textAlign: "center" }}>{description}</p>
        )}
      </Col>
    </Form.Row>
  );
};

export default LocationDetails;
