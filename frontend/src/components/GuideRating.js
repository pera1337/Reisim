import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import Rating from "react-rating";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

const GuideRating = ({ guideId, history, changeRating }) => {
  const [rating, setRating] = useState(0);
  const [, setUserId] = useState(-1);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    async function populate() {
      const token = localStorage.getItem("token") || "";
      if (token) {
        const decoded = await jsonwebtoken.decode(token);
        setUserId(Number(decoded.id));
        setLoggedIn(true);
      }
      const headers = {
        "X-Auth-Token": localStorage.getItem("token")
      };
      if (guideId && loggedIn) {
        const result = await axios.get(
          `http://localhost:5000/api/guide/rated/${guideId}`,
          { headers }
        );
        if (result.data) {
          setRating(result.data.rating);
        } else {
          setRating(0);
        }
      }
    }
    populate();
  }, [guideId]);

  async function rate(newRating) {
    setRating(newRating);
    if (!loggedIn) history.push("/login");
    else {
      try {
        const headers = {
          "X-Auth-Token": localStorage.getItem("token")
        };
        const result = await axios.put(
          `http://localhost:5000/api/guide/rate/${guideId}`,
          {
            rating: newRating
          },
          { headers }
        );
        changeRating(result.data.avgRating, result.data.numOfRatings);
      } catch (e) {}
    }
  }
  return (
    <div>
      <Rating
        initialRating={rating}
        fractions={2}
        emptySymbol={<FontAwesomeIcon icon={emptyStar} size="2x" />}
        fullSymbol={<FontAwesomeIcon icon={faStar} size="2x" />}
        onChange={rating => {
          rate(rating);
        }}
      />
    </div>
  );
};

export default withRouter(GuideRating);
