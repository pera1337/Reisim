import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import GuideMap from "./GuideMap";
import Autocomplete from "./Autocomplete";
import Places from "./Places";
import SelectedCities from "./SelectedCities";
import UseTextInput from "../hooks/UseTextInput";
import axios from "axios";
import "../css/CreateGuide.css";

const CreateGuide = props => {
  const [title, setTitle] = UseTextInput("");
  const [description, setDescription] = UseTextInput("");
  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function populate() {
      if (props.edit === "true") {
        const response = await axios.get(
          `http://localhost:5000/api/guide/${props.id}`
        );
        const guide = response.data;
        setTitle(guide.title);
        setDescription(guide.description);
        const p = [];
        response.data.Locations.map(element => {
          const point = [];
          point.push(element.lng);
          point.push(element.lat);
          point.push(element.locationNumber);
          p.push(point);
        });
        setPoints(p);
      }
    }
    populate();
  }, []);

  function create(e) {
    e.preventDefault();
    async function add() {
      try {
        const postPoints = [];
        points.map(element => {
          var el = {
            lat: element[1],
            lng: element[0],
            num: element[2]
          };
          postPoints.push(el);
        });
        const token = localStorage.getItem("token");
        const headers = {
          "X-Auth-Token": token
        };
        if (props.edit === "true") {
          const response = await axios.put(
            `http://localhost:5000/api/guide/${props.id}`,
            {
              title,
              description,
              coords: postPoints
            },
            { headers }
          );
          props.history.push(`/guide/${props.id}`);
        } else {
          const response = await axios.post(
            "http://localhost:5000/api/guide/new",
            {
              title,
              description,
              coords: postPoints
            },
            { headers }
          );
          props.history.push("/");
        }
      } catch (e) {
        console.log("e :", e);
      }
    }
    add();
  }

  function addPoint(point) {
    setPoints([...points, point]);
  }

  function removePoint(point) {
    let pointsCopy = [...points];
    let newPoints = pointsCopy.filter(val => {
      let v0 = Math.round(val[0] * 100) / 100;
      let v1 = Math.round(val[1] * 100) / 100;
      let p0 = Math.round(point[0] * 100) / 100;
      let p1 = Math.round(point[0] * 100) / 100;
      return v0 != p0 && v1 != p1;
    });
    setPoints(newPoints);
  }

  return (
    <div>
      <h1>Create a guide</h1>
      <div className="create-guide">
        <Form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <FormGroup controlId="title">
            <Form.Label>Title</Form.Label>
            <FormControl
              placeholder="Enter a title"
              autoFocus
              type="text"
              value={title}
              onChange={setTitle}
            />
          </FormGroup>
          <FormGroup controlId="description">
            <Form.Label>Description</Form.Label>
            <FormControl
              as="textarea"
              rows="6"
              placeholder="Enter a description"
              value={description}
              onChange={setDescription}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="citiesAutocomplete">
            <Form.Label>Add cities</Form.Label>
            <Autocomplete />
          </FormGroup>
          <FormGroup controlId="selectedCities">
            <SelectedCities />
          </FormGroup>
          <Form.Row>
            <Col>
              <FormGroup controlId="map">
                <Form.Label>Add locations</Form.Label>
                <GuideMap
                  addPoint={addPoint}
                  removePoint={removePoint}
                  edit={props.edit}
                  id={props.id}
                  input="true"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Form.Label>Places</Form.Label>
                <Places />
              </FormGroup>
            </Col>
          </Form.Row>
          <Button block type="button" onClick={create}>
            {props.edit === "true" ? "Edit" : "Create"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default withRouter(CreateGuide);
