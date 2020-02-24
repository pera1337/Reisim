import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../contexts/CityContext";
import UseTextInput from "../hooks/UseTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import axios from "axios";
import axios from "../utils/axiosProxy";
import {
  InputBase,
  List,
  ListItem,
  Button,
  Grid,
  TextField
} from "@material-ui/core";
import "../css/Places.css";

const Places = ({ addLocation }) => {
  const { city } = useContext(CityContext);
  const [query, setQuery] = UseTextInput("");
  const [offset, setOffset] = useState(0);
  const [places, setPlaces] = useState([]);
  const [maxOffset, setMaxOffset] = useState(false);

  useEffect(() => {
    setQuery("");
    fetchPlaces(0, false);
    setOffset(0);
  }, [city]);

  async function fetchPlaces(off) {
    const cityName = city.name;
    if (cityName !== "") {
      const response = await axios.get(
        `/api/places/?city=${cityName}&limit=10&offset=${off}`
      );
      setPlaces(response.data);
      if (response.data.length < 10) setMaxOffset(true);
      else setMaxOffset(false);
    }
  }

  function handleLeft() {
    if (places.length > 10) {
      setOffset(offset - 10);
      if (maxOffset) setMaxOffset(false);
    } else {
      fetchPlaces(offset - 10);
      setOffset(offset - 10);
    }
  }

  async function searchVenue(e) {
    setQuery(e.target.value);
    if (e.target.value.length === 0) {
      setMaxOffset(false);
      fetchPlaces(0);
    } else if (e.target.value.length >= 3 && city.name !== "") {
      setOffset(0);
      const response = await axios.get(
        `/api/places/search?city=${city.name}&limit=50&query=${e.target.value}`
      );
      setPlaces(response.data);
    }
  }

  function handleRight() {
    if (places.length > 10) {
      if (offset === 30) {
        setOffset(offset + 10);
        setMaxOffset(true);
      } else setOffset(offset + 10);
    } else {
      fetchPlaces(offset + 10);
      setOffset(offset + 10);
    }
  }

  const renderPlacesList = () => {
    let displayPlaces = [];
    if (places.length > 10) displayPlaces = places.slice(offset, offset + 10);
    else displayPlaces = places;
    return displayPlaces.map((element, index) => (
      <ListItem
        button
        onDoubleClick={() => {
          addLocation(element);
        }}
        key={index}
      >
        {element.name}
      </ListItem>
    ));
  };

  return (
    <div className="places-container">
      <div>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={query}
          onChange={searchVenue}
          placeholder="Search…"
        />
      </div>
      <List>{renderPlacesList()}</List>
      <Grid container justify="space-evenly">
        <Grid item>
          <Button disabled={!offset} onClick={handleLeft}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
        </Grid>
        <Grid item>
          <Button disabled={maxOffset} onClick={handleRight}>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Places;
