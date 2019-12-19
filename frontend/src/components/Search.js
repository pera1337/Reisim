import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import CitySearch from "./shared/CitySearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
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
    <form
      className="search-form"
      onSubmit={Send}
      onKeyPress={e => {
        if (e.key === "Enter") e.preventDefault();
      }}
    >
      <Grid container justify="center" spacing={1} direction="column">
        <Grid container item justify="center" alignItems="center" spacing={1}>
          <Grid item xs={8}>
            <CitySearch onSelected={selectCity} clearAfterSelected={false} />
          </Grid>
          <Grid item xs={8} sm="auto">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <FontAwesomeIcon icon={showAdvanced ? faArrowUp : faArrowDown} />
            </Button>
          </Grid>
          <Grid item xs={8} sm="auto">
            <Button
              className={showAdvanced ? "bottom" : ""}
              type="submit"
              size="medium"
              fullWidth
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
        {showAdvanced && (
          <div className="advanced-container">
            <Grid
              container
              item
              spacing={2}
              justify="center"
              direction="column"
            >
              <Grid item>
                <TextField
                  label="Text"
                  fullWidth
                  placeholder="Enter a text"
                  value={text}
                  onChange={setText}
                />
              </Grid>
              <Grid container item justify="flex-start" spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    label="Author"
                    placeholder="Author name"
                    fullWidth
                    value={author}
                    onChange={setAuthor}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    select
                    fullWidth
                    label="Rating"
                    onChange={selectRating}
                    defaultValue={-1}
                    helperText="Select a minimum rating"
                  >
                    <MenuItem key={2} value={2}>
                      2
                    </MenuItem>
                    <MenuItem key={3} value={3}>
                      3
                    </MenuItem>
                    <MenuItem key={4} value={4}>
                      4
                    </MenuItem>
                    <MenuItem key={5} value={5}>
                      5
                    </MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
      </Grid>
    </form>
  );
};

export default withRouter(Search);
