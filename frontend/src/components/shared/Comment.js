import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faReply } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../css/Comment.css";
import AddComment from "../AddComment";

const Comment = ({ comment }) => {
  const [reply, setReply] = useState(false);
  return (
    <div>
      <div className="comment-container">
        <p className="author">
          <FontAwesomeIcon icon={faUser} />
          {"  "}
          <Link to={`/user/${comment.author.id}`}>{comment.author.name}</Link>
        </p>
        <p className="date-added">
          <FontAwesomeIcon icon={faClock} />
          {"  "} A date
        </p>
        <br />
        <hr />
        <p className="comment-text">{comment.text}</p>
        {/* <Button
          variant="light"
          onClick={() => {
            setReply(!reply);
          }}
        >
          Reply <FontAwesomeIcon icon={faReply} />
        </Button> */}
      </div>
      {reply ? <AddComment /> : null}
    </div>
  );
};

export default Comment;
