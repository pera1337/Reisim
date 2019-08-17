import React, { useContext } from "react";
import { LocationsContext } from "../../contexts/LocationsContext";
import LocationDetails from "./LocationDetails";

const DetailsList = () => {
  const { locations, dispatch } = useContext(LocationsContext);

  function changeField(locationNumber, name, value) {
    dispatch({ type: "change-field", locationNumber, name, value });
  }
  return (
    <div>
      {locations.map(element => {
        return (
          <div
            key={element.locationNumber}
            style={{
              border: "1px solid #aaaaaa",
              padding: "5px",
              margin: "10px",
              borderRadius: "10px"
            }}
          >
            <LocationDetails place={element} changeField={changeField} />
          </div>
        );
      })}
    </div>
  );
};

export default DetailsList;
