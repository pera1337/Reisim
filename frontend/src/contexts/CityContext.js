import React, { createContext, useState } from "react";

export const CityContext = createContext();

export function CityProvider(props) {
  const [city, setCity] = useState("");
  const changeCity = value => setCity(value);

  return (
    <CityContext.Provider value={{ city, changeCity }}>
      {props.children}
    </CityContext.Provider>
  );
}
