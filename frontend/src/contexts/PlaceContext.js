import React, { createContext, useState } from "react";

export const PlaceContext = createContext();

export function PlaceProvider(props) {
  const [place, setPlace] = useState({});
  const changePlace = value => setPlace(value);

  return (
    <PlaceContext.Provider value={{ place, changePlace }}>
      {props.children}
    </PlaceContext.Provider>
  );
}
