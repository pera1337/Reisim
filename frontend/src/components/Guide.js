import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import GuideMap from "./GuideMap";
import GuideRating from "./GuideRating";
import SelectedItems from "./shared/SelectedItems";
import ConfirmDialog from "./shared/ConfirmDialog";
import FollowButton from "./shared/FollowButton";
import LocationDetails from "./shared/LocationDetails";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "../css/Guide.css";
import "../css/Home.css";

const Guide = params => {
  const [guide, setGuide] = useState({});
  const [locations, setLocations] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [, setCoords] = useState([]);
  const [cities, setCities] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [guideUser, setGuideUser] = useState({});
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/guide/${params.id}`
        );
        const token = localStorage.getItem("token") || "";
        if (token) {
          const decoded = await jsonwebtoken.decode(token);
          setUserId(Number(decoded.id));
        }
        setGuide(response.data);
        setCities(response.data.Cities);
        setAvgRating(response.data.avgRating);
        setNumOfRatings(response.data.numOfRatings);
        setGuideUser(response.data.User);
        setLocations(response.data.Locations);
        var statePoints = [];
        response.data.Locations.forEach(element => {
          const point = [];
          point.push(element.lng);
          point.push(element.lat);
          statePoints.push(point);
        });
        setCoords(statePoints);
      } catch (e) {
        console.log("e :", e);
        console.log("something went wrong");
      }
    }
    getData();
  }, []);

  async function deleteGuide(id, history) {
    const headers = {
      "X-Auth-Token": localStorage.getItem("token")
    };
    await axios.delete(`http://localhost:5000/api/guide/${id}`, {
      headers
    });
    history.push("/");
  }

  function changeRating(avg, numOfRatings) {
    setAvgRating(Math.round(avg * 100) / 100);
    setNumOfRatings(numOfRatings);
  }

  function moveToEdit() {
    params.history.push(`/guide/edit/${params.id}`);
  }

  const DescriptionText = () => {
    let filtered = locations.filter(el => el.description);
    if (filtered.length > 0)
      return (
        <div>
          <h2>Descriptions</h2>
          {filtered.map(el => (
            <div key={el.locationNumber} className="location-container">
              <LocationDetails
                place={el}
                display={true}
                changeField={() => {}}
              />
            </div>
          ))}
        </div>
      );
    else return null;
  };

  return (
    <div className="guide-container">
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <h1>{guide.title}</h1>
        </Grid>
        {userId === guide.userId && (
          <Grid item container spacing={1} direction="row" justify="center">
            <Grid item>
              <Button
                startIcon={<FontAwesomeIcon icon={faEdit} />}
                onClick={moveToEdit}
                variant="contained"
                color="primary"
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <ConfirmDialog
                buttonText="Delete"
                startIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                title="Delete this guide?"
                contentText="Permanently delete this guide?"
                confirmBtnText="Delete"
                onConfirm={() => deleteGuide(params.id, params.history)}
              />
            </Grid>
          </Grid>
        )}
        <Grid container item justify="center">
          <p style={{ fontWeight: "bold" }}>
            {avgRating}
            <FontAwesomeIcon icon={faStar} />({numOfRatings})
          </p>
        </Grid>
        <Grid container item justify="center">
          <GuideRating changeRating={changeRating} guideId={guide.id} />
        </Grid>
        <Grid container item justify="center">
          <p className="guide-created">
            Created by{" "}
            <Link className="created" to={`/user/${guideUser.id}`}>
              {guideUser.firstName} {guideUser.lastName}
            </Link>
            {"         "}
            {userId !== guide.userId && (
              <FollowButton targetId={guide.userId} />
            )}
          </p>
        </Grid>
        <Grid item>
          <SelectedItems items={cities} />
        </Grid>
        <Grid item>
          <p>{guide.description}</p>
        </Grid>

        <Grid item>
          <GuideMap edit="false" input="false" id={params.id} />
        </Grid>
        {DescriptionText()}
      </Grid>
    </div>
  );
};

export default withRouter(Guide);
