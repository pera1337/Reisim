import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../css/GuideShort.css";

const GuideShort = ({ guide, displayAuthor }) => {
  return (
    <div key={guide.id}>
      {/* <Link
        component={RouterLink}
        underline="none"
        className="guide-title"
        to={`/guide/${guide.id}`}
      >
        {guide.title}
      </Link> */}
      <span className="guide-title">{guide.title}</span>
      <p style={{ fontWeight: "bold", margin: 0 }}>
        {guide.avgRating}
        <FontAwesomeIcon icon={faStar} />({guide.numOfRatings})
      </p>
      {displayAuthor ? (
        <div>
          <p className="guide-created">
            Created by{" "}
            <Link
              component={RouterLink}
              underline="none"
              className="created"
              to={`/user/${guide.User.id}`}
            >
              {guide.User.firstName} {guide.User.lastName}
            </Link>
          </p>
        </div>
      ) : null}
      <p className="guide-created">{moment(guide.createdAt).fromNow()}</p>
    </div>
  );
};

export default GuideShort;
