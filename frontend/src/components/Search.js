import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import CitySearch from "./shared/CitySearch";
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import UseTextInput from "../hooks/UseTextInput";
import "../css/Search.css";

const Search = props => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [author, setAuthor] = UseTextInput("");
  const [text, setText] = UseTextInput("");
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);

  function selectCity(city) {
    setCity(city.full_name);
  }

  function selectRating(e) {
    setRating(e.target.value);
  }

  async function Send(e) {
    e.preventDefault();
    props.history.push({
      pathname: "/search",
      search: `?city=${city}&name=${author}&text=${text}&rating=${rating}`
    });
  }

  return (
    <Form
      onSubmit={Send}
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <Form.Row>
        <Col lg={9}>
          <Form.Group controlId="formGridCity">
            <CitySearch onSelected={selectCity} clearAfterSelected={false} />
          </Form.Group>
        </Col>
        <Col lg={1}>
          <Form.Group controlId="formGridSearch">
            <Button
              style={{ width: "100%", margin: 0 }}
              onClick={() => setShowAdvanced(!showAdvanced)}
              block
              type="button"
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </Form.Group>
        </Col>
        <Col lg={2}>
          <Form.Group controlId="formGridSearch">
            <Button style={{ width: "100%", margin: "0" }} type="submit">
              Search
            </Button>
          </Form.Group>
        </Col>
      </Form.Row>
      {showAdvanced ? (
        <div className="advanced-container">
          <FormGroup controlId="text">
            <Form.Label>Text</Form.Label>
            <FormControl
              placeholder="Enter a text"
              value={text}
              onChange={setText}
              autoFocus
            />
          </FormGroup>
          <Form.Row>
            <Col lg={8}>
              <FormGroup controlId="authorName">
                <Form.Label>Author name</Form.Label>
                <FormControl
                  name="author"
                  placeholder="Author name"
                  value={author}
                  onChange={setAuthor}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup controlId="minRating">
                <Form.Label>Minimum rating</Form.Label>
                <FormControl
                  name="rating"
                  as="select"
                  onChange={selectRating}
                  defaultValue={-1}
                >
                  <option value="-1" disabled hidden>
                    Select a rating
                  </option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </FormControl>
              </FormGroup>
            </Col>
          </Form.Row>
        </div>
      ) : null}
    </Form>
  );
};

export default withRouter(Search);
