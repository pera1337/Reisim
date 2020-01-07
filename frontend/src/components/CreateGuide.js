import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import Button from "react-bootstrap/Button";
// import FormGroup from "react-bootstrap/FormGroup";
// import FormControl from "react-bootstrap/FormControl";
// import Form from "react-bootstrap/Form";
// import Accordion from "react-bootstrap/Accordion";
// import Card from "react-bootstrap/Card";
// import Col from "react-bootstrap/Col";
import GuideMap from "./GuideMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "./Autocomplete";
import Places from "./Places";
import SelectedCities from "./SelectedCities";
import DetailsList from "./shared/DetailsList";
import UseTextInput from "../hooks/UseTextInput";
import axios from "axios";
import { CityContext } from "../contexts/CityContext";
import { LocationsContext } from "../contexts/LocationsContext";
import "../css/CreateGuide.css";
import { Typography } from "@material-ui/core";

const CreateGuide = props => {
  const [title, setTitle] = UseTextInput("");
  const [description, setDescription] = UseTextInput("");
  const { locations, dispatch } = useContext(LocationsContext);
  const [location, setLocation] = useState({});
  const [cities, setCities] = useState([]);
  const { changeCity } = useContext(CityContext);

  useEffect(() => {
    async function populate() {
      if (props.edit === "true") {
        const response = await axios.get(
          `http://localhost:5000/api/guide/${props.id}`
        );
        const guide = response.data;
        setTitle(guide.title);
        setDescription(guide.description);
        response.data.Locations.forEach(element => {
          dispatch({ type: "add", location: element });
        });
        response.data.Cities.forEach(el => {
          changeCity(el);
        });
      }
    }
    populate();
  }, []);

  function create(e) {
    e.preventDefault();
    async function add() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          "X-Auth-Token": token
        };
        if (props.edit === "true") {
          await axios.put(
            `http://localhost:5000/api/guide/${props.id}`,
            {
              title,
              description,
              coords: locations,
              cities
            },
            { headers }
          );
          props.history.push(`/guide/${props.id}`);
        } else {
          const result = await axios.post(
            "http://localhost:5000/api/guide/new",
            {
              title,
              description,
              coords: locations,
              cities
            },
            { headers }
          );
          props.history.push(`/guide/${result.data.id}`);
        }
      } catch (e) {
        console.log("e :", e);
      }
    }
    add();
  }

  function addLocation(loc) {
    setLocation(loc);
  }

  function addPoint(point) {
    dispatch({ type: "add", location: point });
  }

  function removePoint(point) {
    dispatch({ type: "remove-location", point });
  }

  function addCity(city) {
    if (!cities.includes(city)) setCities([...cities, city]);
  }

  function removeCity(index) {
    const newState = [...cities];
    newState.splice(index, 1);
    setCities(newState);
  }

  return (
    <div className="create-guide-container">
      <h1>Create a guide</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <TextField
          required
          variant="outlined"
          margin="normal"
          fullWidth
          label="Title"
          placeholder="Enter a title"
          value={title}
          onChange={setTitle}
        />
        <TextField
          required
          multiline
          rows={6}
          variant="outlined"
          margin="normal"
          fullWidth
          label="Description"
          placeholder="Enter a description"
          value={description}
          onChange={setDescription}
        />
        <Grid spacing={2} container>
          <Grid spacing={2} container direction="row" item>
            <Grid md={6} item>
              <span className="label">Add a city</span>
              <Autocomplete />
            </Grid>
            <Grid md={6} item>
              <div className="selected">
                <span className="label">Cities</span>
                <SelectedCities addCity={addCity} removeCity={removeCity} />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} direction="row" item>
            <Grid xs={12} md={8} item>
              <GuideMap
                place={location}
                addPoint={addPoint}
                removePoint={removePoint}
                edit={props.edit}
                id={props.id}
                input="true"
              />
            </Grid>
            <Grid xs={12} md={4} item>
              <span className="label">Places</span>
              <Places addLocation={addLocation} />
            </Grid>
          </Grid>
        </Grid>
        {locations.length > 0 && (
          <ExpansionPanel
            style={{ marginTop: "16px", border: "1px solid #ced4da" }}
          >
            <ExpansionPanelSummary
              expandIcon={
                <FontAwesomeIcon size="sm" icon={faAngleDoubleDown} />
              }
            >
              <Typography>Location Details</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <DetailsList />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
        <Button
          style={{ marginTop: "16px", textAlign: "center" }}
          fullWidth
          variant="contained"
          color="primary"
          onClick={create}
        >
          {props.edit === "true" ? "Edit" : "Create"}
        </Button>
      </form>
      {/* <Form
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
        <Form.Row>
          <Col lg={6}>
            <FormGroup controlId="citiesAutocomplete">
              <Form.Label>Add cities</Form.Label>
              <Autocomplete />
            </FormGroup>
          </Col>
          <Col lg={6}>
            <FormGroup controlId="selectedCities">
              <div className="selected">
                <SelectedCities addCity={addCity} removeCity={removeCity} />
              </div>
            </FormGroup>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col lg={8}>
            <FormGroup controlId="map">
              <Form.Label>Add locations</Form.Label>
              <GuideMap
                place={location}
                addPoint={addPoint}
                removePoint={removePoint}
                edit={props.edit}
                id={props.id}
                input="true"
              />
            </FormGroup>
          </Col>
          <Col lg={4}>
            <FormGroup>
              <Form.Label>Places</Form.Label>
              <Places addLocation={addLocation} />
            </FormGroup>
          </Col>
        </Form.Row>
        {locations.length > 0 ? (
          <FormGroup>
            <Form.Label>Descriptions</Form.Label>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  <FontAwesomeIcon
                    style={{ float: "right" }}
                    size="lg"
                    icon={faAngleDoubleDown}
                  />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <DetailsList />
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </FormGroup>
        ) : null}

        <Button block type="button" onClick={create}>
          {props.edit === "true" ? "Edit" : "Create"}
        </Button>
      </Form> */}
    </div>
  );
};

export default withRouter(CreateGuide);
