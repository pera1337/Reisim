import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import UseTextInput from "../../hooks/UseTextInput";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

const styles = theme => ({
  input: {
    background: "white",
    borderRadius: "5px"
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    borderRadius: "5px",
    marginTop: theme.spacing(),
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing(2)
  }
});

const CitySearch = ({ onSelected, clearAfterSelected = true, classes }) => {
  const [sugestions, setSugestions] = useState([]);
  const [query, setQuery] = UseTextInput("");

  async function getSugestions(value) {
    if (value.length >= 3) {
      const response = await axios.get(
        `https://api.teleport.org/api/cities/?search=${value}&limit=5`
      );
      //setSugestions(response.data._embedded["city:search-results"]);
      return response.data._embedded["city:search-results"];
    }
    return [];
  }

  const getSugestionValue = suggestion => suggestion.matching_full_name;
  /*const renderSuggestion = suggestion => (
    <span>{suggestion.matching_full_name}</span>
  );*/

  function renderInputComponent(inputProps) {
    const { classes, inputRef = () => {}, ref, ...other } = inputProps;

    return (
      <TextField
        variant="outlined"
        fullWidth
        InputProps={{
          inputRef: node => {
            ref(node);
            inputRef(node);
          },
          classes: {
            input: classes.input
          }
        }}
        {...other}
      />
    );
  }

  function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.matching_full_name, query);
    const parts = parse(suggestion.matching_full_name, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) =>
            part.highlight ? (
              <span key={String(index)} style={{ fontWeight: "bold" }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            )
          )}
        </div>
      </MenuItem>
    );
  }

  const onSuggestionSelected = async (event, { suggestion }) => {
    if (clearAfterSelected) setQuery("");
    const response = await axios.get(suggestion._links["city:item"].href);
    const data = response.data;
    const sel = {
      full_name: data.full_name,
      name: data.name,
      lat: data.location.latlon.latitude,
      lon: data.location.latlon.longitude
    };
    if (onSelected) onSelected(sel);
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setSugestions(await getSugestions(value));
  };

  const onSuggestionsClearRequested = value => setSugestions([]);
  const onChange = (event, { newValue }) => {
    //setQuery(newValue.split(",")[0]);
    setQuery(newValue);
  };

  const inputProps = {
    classes,
    placeholder: "Type a city name(minimum 3 characters)",
    value: query,
    onChange: onChange
  };

  return (
    <Autosuggest
      renderInputComponent={renderInputComponent}
      suggestions={sugestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSugestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        container: classes.container,
        suggestionsContainerOpen: classes.suggestionsContainerOpen,
        suggestionsList: classes.suggestionsList,
        suggestion: classes.suggestion
      }}
      renderSuggestionsContainer={options => (
        <Paper {...options.containerProps} square>
          {options.children}
        </Paper>
      )}
    />
  );
};

export default withStyles(styles)(CitySearch);
