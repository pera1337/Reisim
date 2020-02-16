import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "../../css/GuideShort.css";

const GuideShort = ({ guide, displayAuthor, history }) => {
  const handleSpanClick = e => {
    e.stopPropagation();
    history.push(`/user/${guide.User.id}`);
  };
  return (
    <div key={guide.id}>
      <span className="guide-title">{guide.title}</span>
      <p style={{ fontWeight: "bold", margin: 0 }}>
        {guide.avgRating}
        <FontAwesomeIcon icon={faStar} />({guide.numOfRatings})
      </p>
      {displayAuthor ? (
        <div>
          <p className="guide-created">
            Created by{" "}
            <span className="author-name" onClick={handleSpanClick}>
              {guide.User.firstName} {guide.User.lastName}
            </span>
          </p>
        </div>
      ) : null}
      <p className="guide-created">{moment(guide.createdAt).fromNow()}</p>
    </div>
  );
};

export default withRouter(GuideShort);
