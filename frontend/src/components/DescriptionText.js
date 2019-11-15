import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
const DescriptionText = ({ profileDescription, onEdit, isCurrentUser }) => {
  return profileDescription ? (
    <p style={{ cursor: "pointer", fontStyle: "italic" }} onClick={onEdit}>
      {profileDescription}
      {isCurrentUser ? (
        <button
          style={{
            border: "none",
            backgroundColor: "white",
            color: "#046b94"
          }}
          onClick={onEdit}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      ) : null}
    </p>
  ) : isCurrentUser ? (
    <div style={{ cursor: "pointer" }} onClick={onEdit}>
      Tell people about yourself...
      <button
        style={{ border: "none", backgroundColor: "white", color: "#046b94" }}
        onClick={onEdit}
      >
        <FontAwesomeIcon icon={faEdit} />
      </button>
    </div>
  ) : null;
};

export default DescriptionText;
