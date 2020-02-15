import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
const ProfilePicture = ({ imgSrc, userId, currentUserId }) => {
  return (
    <div style={{ position: "relative" }}>
      <Avatar
        style={{ width: "150px", height: "150px" }}
        src={`http://localhost:5000/uploads/${imgSrc}`}
      />
      {userId === currentUserId && (
        <Fab
          style={{ position: "absolute", top: "70%", left: "70%" }}
          color="primary"
        >
          <FontAwesomeIcon icon={faCamera} />
        </Fab>
      )}
    </div>
  );
};

export default ProfilePicture;
