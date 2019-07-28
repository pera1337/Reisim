import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../css/GuideShort.css";

const GuideShort = ({ guide, displayAuthor }) => {
  return (
    <div className="container" key={guide.id}>
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          <Link className="guide-title" to={`/guide/${guide.id}`}>
            {guide.title}
          </Link>
          <p style={{ fontWeight: "bold", margin: 0 }}>
            {guide.avgRating}
            <FontAwesomeIcon icon={faStar} />({guide.numOfRatings})
          </p>
          {displayAuthor ? (
            <p className="guide-created">
              Created by{" "}
              <Link className="created" to={`/user/${guide.User.id}`}>
                {guide.User.firstName} {guide.User.lastName}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default GuideShort;
