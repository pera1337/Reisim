import React from "react";
import Autocomplete from "./Autocomplete";
import Places from "./Places";

const Sandbox = () => {
  return (
    <div>
      <h1>Hello</h1>
      <div style={{ display: "inline-block" }}>
        <Autocomplete />
      </div>
      <div style={{ display: "inline-block" }}>
        <Places />
      </div>
    </div>
  );
};

export default Sandbox;
