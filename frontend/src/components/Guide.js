import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import GuideMap from "./GuideMap";
import SelectedItems from "./shared/SelectedItems";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import GuideRating from "./GuideRating";
import LocationDetails from "./shared/LocationDetails";
import axios from "axios";
import "../css/Guide.css";
import "../css/Home.css";
import jsonwebtoken from "jsonwebtoken";

const Guide = params => {
  const [guide, setGuide] = useState({});
  const [locations, setLocations] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [numOfRatings, setNumOfRatings] = useState(0);
  const [, setCoords] = useState([]);
  const [cities, setCities] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [guideUser, setGuideUser] = useState({});
  const [show, setShow] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
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
        if (token) {
          const headers = {
            "X-Auth-Token": localStorage.getItem("token")
          };
          const result = await axios.get(
            `http://localhost:5000/api/account/isfollowing/${
              response.data.User.id
            }`,
            { headers }
          );
          setIsFollowing(result.data);
        }
      } catch (e) {
        console.log("e :", e);
        console.log("something went wrong");
      }
    }
    getData();
  }, []);

  async function deleteGuide() {
    const headers = {
      "X-Auth-Token": localStorage.getItem("token")
    };
    await axios.delete(`http://localhost:5000/api/guide/${params.id}`, {
      headers
    });
    params.history.push("/");
  }

  function changeRating(avg, numOfRatings) {
    setAvgRating(Math.round(avg * 100) / 100);
    setNumOfRatings(numOfRatings);
  }

  function modalShow() {
    setShow(true);
  }

  function modalHide() {
    setShow(false);
  }

  function moveToEdit() {
    params.history.push(`/guide/edit/${params.id}`);
  }

  async function followUser() {
    if (userId === -1) return params.history.push("/login");
    const headers = {
      "x-auth-token": localStorage.getItem("token")
    };
    if (isFollowing) {
      try {
        await axios.delete(
          `http://localhost:5000/api/account/unfollow/${guide.userId}`,
          { headers }
        );
        setIsFollowing(false);
      } catch (e) {
        console.log("e :", e);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:5000/api/account/follow/${guide.userId}`,
          null,
          { headers }
        );
        setIsFollowing(true);
      } catch (e) {
        console.log("e :", e);
      }
    }
  }

  return (
    <div
      style={{
        height: "20%",
        padding: "60px"
      }}
    >
      <h1>{guide.title}</h1>
      <p style={{ fontWeight: "bold" }}>
        {avgRating}
        <FontAwesomeIcon icon={faStar} />({numOfRatings})
      </p>
      <GuideRating changeRating={changeRating} guideId={guide.id} />
      <p className="guide-created">
        Created by{" "}
        <Link className="created" to={`/user/${guideUser.id}`}>
          {guideUser.firstName} {guideUser.lastName}
        </Link>
        {"         "}
        {userId !== guide.userId ? (
          <Button variant="success" onClick={followUser}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        ) : (
          ""
        )}
      </p>
      <SelectedItems items={cities} />
      <p>{guide.description}</p>
      {userId === guide.userId ? (
        <div>
          <Button onClick={moveToEdit} variant="info">
            Edit
          </Button>
          <Button variant="danger" onClick={modalShow}>
            Delete
          </Button>
          <Modal show={show} onHide={modalHide}>
            <Modal.Header closeButton>
              <Modal.Title>Delete guide</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this guide?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={modalHide}>
                Close
              </Button>
              <Button variant="danger" onClick={deleteGuide}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        ""
      )}
      <div>
        <GuideMap edit="false" input="false" id={params.id} />
      </div>
      <div>
        <h2>Descriptions</h2>
        {locations
          .filter(el => el.description)
          .map(el => (
            <div key={el.locationNumber} className="location-container">
              <LocationDetails
                place={el}
                display={true}
                changeField={() => {}}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default withRouter(Guide);
