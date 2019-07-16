import React, { useState, useContext, useEffect } from "react";
import SelectedItems from "../components/shared/SelectedItems";
import { CityContext } from "../contexts/CityContext";

const SelectedCities = () => {
  const { city, changeCity } = useContext(CityContext);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    if (city && !cities.includes(city)) setCities([...cities, city]);
  }, [city]);

  function handleTimesCircleClick(index) {
    const newState = [...cities];
    newState.splice(index, 1);
    setCities(newState);
  }

  const handleCityClick = city => changeCity(city);

  return (
    <SelectedItems
      items={cities}
      handleRemoveClick={handleTimesCircleClick}
      handleClick={handleCityClick}
    />
  );
};

export default SelectedCities;
