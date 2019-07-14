import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { CityContext } from "../contexts/CityContext";
import "../css/SelectedCities.css";

const SelectedCities = () => {
  const { city, changeCity } = useContext(CityContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (city != "") setCities([...cities, city]);
  }, [city]);

  function handleTimesCircleClick(index) {
    const newState = [...cities];
    newState.splice(index, 1);
    setCities(newState);
  }

  return (
    <div className="cities-container">
      {cities.length != 0
        ? cities.map((element, index) => {
            return (
              <div className="city-container" key={index}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={() => handleTimesCircleClick(index)}
                />
                <span>{element}</span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default SelectedCities;
