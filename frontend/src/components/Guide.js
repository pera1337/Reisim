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
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
// import axios from "axios";
import axios from "../utils/axiosProxy";
import jsonwebtoken from "jsonwebtoken";
import "../css/Guide.css";
import "../css/Home.css";
import GuidesList from "./shared/GuidesList";
import AddComment from "./shared/AddComment";
import CommentList from "./shared/CommentList";
import moment from "moment";
import InterestedButton from "./shared/InterestedButton";
import DisplayUsers from "./shared/DisplayUsers";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Guide = (params) => {
  const classes = useStyles();
  const [guide, setGuide] = useState({});
  const [locations, setLocations] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [similarGuides, setSimilarGuides] = useState([]);
  const [, setCoords] = useState([]);
  const [cities, setCities] = useState([]);
  const [going, setGoing] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [guideUser, setGuideUser] = useState({});
  const [isGoing, setIsGoing] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/api/guide/${params.id}`);
        const similar = await axios.get(
          `/api/guide/similar/${response.data.guide.id}`
        );
        const token = localStorage.getItem("token") || "";
        let decoded = {};
        if (token) {
          decoded = await jsonwebtoken.decode(token);
          setUserId(Number(decoded.id));
        }
        setSimilarGuides(similar.data);
        console.log(response.data);
        setGuide(response.data.guide);
        setGoing(response.data.going);
        console.log(userId);
        setIsGoing(
          response.data.going.some((el) => el.userId === Number(decoded.id))
        );
        setCities(response.data.guide.Cities);
        setAvgRating(response.data.guide.avgRating);
        setNumOfRatings(response.data.guide.numOfRatings);
        setGuideUser(response.data.guide.User);
        setLocations(response.data.guide.Locations);
        var statePoints = [];
        response.data.guide.Locations.forEach((element) => {
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
  }, [params.id]);

  async function deleteGuide(id, history) {
    const headers = {
      "X-Auth-Token": localStorage.getItem("token"),
    };
    await axios.delete(`/api/guide/${id}`, {
      headers,
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

  const handleGoingClick = async () => {
    const headers = {
      "x-auth-token": localStorage.getItem("token"),
    };
    if (isGoing) {
      try {
        await axios.delete(`/api/goingTo/${guide.id}`, { headers });
        setIsGoing(false);
      } catch (e) {
        console.log("e :", e);
      }
    } else {
      try {
        await axios.post(`/api/goingTo/${guide.id}`, null, { headers });
        setIsGoing(true);
      } catch (e) {
        console.log("e :", e);
      }
    }
  };

  const DescriptionText = () => {
    let filtered = locations.filter((el) => el.description);
    if (filtered.length > 0)
      return (
        <div>
          <h2>Descriptions</h2>
          {filtered.map((el) => (
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
    <Grid container direction="row" spacing={1}>
      <Grid item xs={12} lg={8}>
        <div className="guide-container">
          <Grid container direction="column">
            <Grid item>
              <h1 style={{ margin: "0" }}>{guide.title}</h1>
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
              <div className="guide-created">
                Created by{" "}
                <Link
                  style={{ marginLeft: "4px", marginRight: "4px" }}
                  className="created"
                  to={`/user/${guideUser.username}`}
                >
                  {guideUser.firstName} {guideUser.lastName}
                </Link>
                {"         "}
                <Avatar
                  className={classes.small}
                  src={`${axios.defaults.baseURL}/${guideUser.profileImage}`}
                />
              </div>
            </Grid>
            {guide.organized && (
              <Grid
                direction="column"
                item
                container
                justify="center"
                align="center"
              >
                <Grid item>
                  <span>{`From: ${guide.startTime}`}</span>
                </Grid>
                <Grid item>
                  <span>{`To: ${guide.endTime}`}</span>
                </Grid>
                <Grid item>
                  <span>{`Next Tour: ${new Date(
                    guide.nextDate
                  ).toDateString()}`}</span>
                </Grid>
              </Grid>
            )}
            {userId !== guide.userId && userId !== -1 && (
              <Grid
                style={{ marginTop: "2px" }}
                item
                spacing={3}
                container
                justify="center"
              >
                <Grid item>
                  <FollowButton targetId={guide.userId} />
                </Grid>
                <Grid item>
                  <InterestedButton
                    isGoing={isGoing}
                    onClick={handleGoingClick}
                  />
                </Grid>
              </Grid>
            )}
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
            <h1 style={{ textAlign: "center" }}>Comments</h1>
            <Grid item>
              <AddComment guideId={params.id} />
            </Grid>
            <Grid item>
              <CommentList guideId={params.id} />
            </Grid>
          </Grid>
        </div>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="center"
        item
        xs={12}
        lg={4}
      >
        {going.length > 0 && (
          <Grid item>
            <h1>Going</h1>
            <DisplayUsers
              going={[
                going[0],
                going[0],
                going[0],
                going[0],
                going[0],
                going[0],
                going[0],
              ]}
            />
          </Grid>
        )}
        <Grid item>
          <h1>Similar guides</h1>
          <GuidesList hasMore={false} guides={similarGuides} displayAuthor />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withRouter(Guide);
