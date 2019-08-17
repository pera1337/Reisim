import React, { createContext, useReducer } from "react";

export const LocationsContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "add":
      let stateCpy = [...state];
      let i = 0;
      let found = false;
      while (!found && i < stateCpy.length - 1) {
        if (
          stateCpy[i].locationNumber < action.location.locationNumber &&
          stateCpy[i + 1].locationNumber > action.location.locationNumber
        ) {
          found = true;
          stateCpy.splice(i + 1, 0, action.location);
        }
        i++;
      }
      if (!found) return [...state, action.location];
      return stateCpy;
    case "change-field":
      return state.map(el =>
        el.locationNumber === action.locationNumber
          ? { ...el, [action.name]: action.value }
          : el
      );
    case "remove-location":
      return state.filter(val => {
        let vLat = Math.round(val.lat * 100) / 100;
        let vLng = Math.round(val.lng * 100) / 100;
        let pLat = Math.round(action.point.lat * 100) / 100;
        let pLng = Math.round(action.point.lng * 100) / 100;
        return vLat !== pLat && vLng !== pLng;
      });
    default:
      break;
  }
}

export function LocationsProvider(props) {
  // const [locations, setLocations] = useState([]);
  const [locations, dispatch] = useReducer(reducer, []);

  return (
    <LocationsContext.Provider value={{ locations, dispatch }}>
      {props.children}
    </LocationsContext.Provider>
  );
}
