import React, { useEffect, useState, useContext } from "react";
import { CityContext } from "../contexts/CityContext";
//import { PlaceContext } from "../contexts/PlaceContext";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import UseTextInput from "../hooks/UseTextInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/Places.css";
import axios from "axios";

const Places = ({ addLocation }) => {
  const { city } = useContext(CityContext);
  //const { changePlace } = useContext(PlaceContext);
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
        `http://localhost:5000/api/places/?city=${cityName}&limit=10&offset=${off}`
      );
      setPlaces(response.data);
      if (response.data.length < 10) setMaxOffset(true);
      else setMaxOffset(false);
    }
  }

  /*function removePlace(index) {
    changePlace(places[index]);
  }*/

  function handleLeft() {
    if (offset > 0) {
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
        `http://localhost:5000/api/places/search?city=${city.name}&limit=10&&query=${e.target.value}`
      );
      setPlaces(response.data);
      setMaxOffset(true);
    }
  }

  function handleRight() {
    if (!maxOffset) {
      fetchPlaces(offset + 10);
      setOffset(offset + 10);
    }
  }
  return (
    <div className="places-container">
      <FormControl
        className="search"
        placeholder="Search for a venue"
        autoFocus
        type="text"
        value={query}
        onChange={searchVenue}
      />
      <ListGroup>
        {places.map((element, index) => (
          <ListGroup.Item
            action
            onDoubleClick={() => {
              addLocation(element);
              //removePlace(index);
            }}
            key={index}
          >
            {element.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div className="arrow-container">
        <Button onClick={handleLeft} className="left-arrow">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Button>
        <Button onClick={handleRight} className="right-arrow">
          <FontAwesomeIcon icon={faArrowRight} />
        </Button>
      </div>
    </div>
  );
};

export default Places;
