import React, { useState, useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import CitySearch from "./shared/CitySearch";

const Autocomplete = () => {
  const { changeCity } = useContext(CityContext);
  const [, setSelectedCity] = useState({});

  const onSelected = sel => {
    setSelectedCity(sel);
    changeCity({ name: sel.name, full_name: sel.full_name });
  };

  return <CitySearch onSelected={onSelected} />;
};

export default Autocomplete;
