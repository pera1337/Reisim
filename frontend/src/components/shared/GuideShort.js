import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "../../css/GuideShort.css";

const useStyles = makeStyles(theme => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3)
  }
}));

const GuideShort = ({ guide, displayAuthor, history }) => {
  const classes = useStyles();
  const handleSpanClick = e => {
    e.stopPropagation();
    history.push(`/user/${guide.User ? guide.User.id : guide.userId}`);
  };
  const image = guide.User ? guide.User.profileImage : guide.profileImage;
  return (
    <div key={guide.id}>
      <span className="guide-title">{guide.title}</span>
      <p style={{ fontWeight: "bold", margin: 0 }}>
        {guide.avgRating}
        <FontAwesomeIcon icon={faStar} />({guide.numOfRatings})
      </p>
      {displayAuthor ? (
        <div className="guide-created">
          Created by{"    "}
          <span className="author-name" onClick={handleSpanClick}>
            {guide.User ? guide.User.firstName : guide.firstName}{" "}
            {guide.User ? guide.User.lastName : guide.lastName}
          </span>
          <Avatar
            className={classes.small}
            src={`http://localhost:5000/${image}`}
          />
        </div>
      ) : null}
      <p className="guide-created">{moment(guide.createdAt).fromNow()}</p>
    </div>
  );
};

export default withRouter(GuideShort);
