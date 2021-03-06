import React from "react";
import Grid from "@material-ui/core/Grid";
import useTextInput from "../../hooks/UseTextInput";
import { TextField } from "@material-ui/core";
import "../../css/LocationDetails.css";

const LocationDetails = ({ place, display = false, changeField }) => {
  const num = place.locationNumber + 1;
  const [name, setName] = useTextInput(place.name ? place.name : "");
  const [description, setDescription] = useTextInput(
    place.description ? place.description : ""
  );
  return (
    <Grid style={{ padding: "10px" }} container spacing={1}>
      <Grid xs={12} md={3} item>
        <div className="col-container">
          <div className="number-container">
            <p>{num}</p>
          </div>
        </div>
      </Grid>
      <Grid item container spacing={1} md={9}>
        {!display ? (
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Name"
              fullWidth
              placeholder="Enter the location name"
              value={name}
              onChange={e => {
                setName(e);
                changeField(num - 1, "name", e.target.value);
              }}
            />
          </Grid>
        ) : name ? (
          <Grid item xs={12}>
            <h3 className="mobile-center">{name}</h3>
          </Grid>
        ) : null}
        {!display ? (
          <Grid xs={12} item>
            <TextField
              multiline
              fullWidth
              label="Description"
              placeholder="Enter a description"
              variant="outlined"
              rows={4}
              value={description}
              onChange={e => {
                setDescription(e);
                changeField(num - 1, "description", e.target.value);
              }}
            />
          </Grid>
        ) : (
          <Grid item xs={12}>
            {" "}
            <p className="mobile-center">{description}</p>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default LocationDetails;
