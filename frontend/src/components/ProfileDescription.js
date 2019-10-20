import React from "react";
import Button from "react-bootstrap/Button";
import "../css/ProfileDescription.css";

const ProfileDescription = ({
  user,
  currentUserId,
  isFollowing,
  followUser
}) => {
  return (
    <div className="description-container">
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      {currentUserId !== -1 && currentUserId !== user.id ? (
        <Button variant="success" onClick={followUser}>
          {isFollowing ? "Following" : "Follow"}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileDescription;
