import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import CitySearch from "./shared/CitySearch";

const SearchTest = () => {
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <Form.Row>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Find a City</Form.Label>
          <CitySearch clearAfterSelected={false} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridSearch">
          <Button block type="primary">
            Search
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchTest;
