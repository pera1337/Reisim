import React, { useState, useContext } from "react";
import Autosuggest from "react-autosuggest";
import UseTextInput from "../hooks/UseTextInput";
import { CityContext } from "../contexts/CityContext";
import axios from "axios";
import "../css/Autocomplete.css";

const Autocomplete = () => {
  const { changeCity } = useContext(CityContext);
  const [sugestions, setSugestions] = useState([]);
  const [query, setQuery] = UseTextInput("");
  const [, setSelectedCity] = useState({});

  async function getSugestions(value) {
    if (value.length >= 3) {
      const response = await axios.get(
        `https://api.teleport.org/api/cities/?search=${query}&limit=5`
      );
      //setSugestions(response.data._embedded["city:search-results"]);
      return response.data._embedded["city:search-results"];
    }
    return [];
  }

  const getSugestionValue = suggestion => suggestion.matching_full_name;
  const onSuggestionSelected = async (event, { suggestion }) => {
    setQuery("");
    const response = await axios.get(suggestion._links["city:item"].href);
    const data = response.data;
    const sel = {
      full_name: data.full_name,
      name: data.name,
      lat: data.location.latlon.latitude,
      lon: data.location.latlon.longitude
    };
    setSelectedCity(sel);
    changeCity({ name: sel.name, full_name: sel.full_name });
  };
  const renderSuggestion = suggestion => (
    <span>{suggestion.matching_full_name}</span>
  );

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSugestions(await getSugestions(value));
  };

  const onSuggestionsClearRequested = value => setSugestions([]);
  const onChange = (event, { newValue }) => {
    //setQuery(newValue.split(",")[0]);
    setQuery(newValue);
  };

  const inputProps = {
    placeholder: "Type a city name(minimum 3 characters)",
    value: query,
    onChange: onChange
  };

  return (
    <div>
      <Autosuggest
        suggestions={sugestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        getSuggestionValue={getSugestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </div>
  );
};

export default Autocomplete;
