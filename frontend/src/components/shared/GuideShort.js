import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../css/GuideShort.css";

const GuideShort = ({ guide, displayAuthor }) => {
  return (
    <div className="container" key={guide.id}>
      <Link className="guide-title" to={`/guide/${guide.id}`}>
        {guide.title}
      </Link>
      <p style={{ fontWeight: "bold", margin: 0 }}>
        {guide.avgRating}
        <FontAwesomeIcon icon={faStar} />({guide.numOfRatings})
      </p>
      {displayAuthor ? (
        <div>
          <p className="guide-created">
            Created by{" "}
            <Link className="created" to={`/user/${guide.User.id}`}>
              {guide.User.firstName} {guide.User.lastName}
            </Link>
          </p>
        </div>
      ) : null}
      <p className="guide-created">{moment(guide.createdAt).fromNow()}</p>
      <hr />
    </div>
  );
};

export default GuideShort;
