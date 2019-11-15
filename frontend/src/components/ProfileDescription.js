import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../css/ProfileDescription.css";
import Description from "./Description";
import SocialLinks from "./SocialLinks";

const ProfileDescription = ({
  user,
  currentUserId,
  isFollowing,
  followUser
}) => {
  console.log(user);
  return (
    <div className="description-container">
      <h2 style={{ textAlign: "center" }}>
        {user.firstName} {user.lastName}
      </h2>
      {currentUserId !== -1 && currentUserId !== user.id ? (
        <Button variant="success" onClick={followUser}>
          {isFollowing ? "Following" : "Follow"}
        </Button>
      ) : (
        ""
      )}
      <Description
        profileDescription={user.profileDescription}
        id={user.id}
        currentUserId={currentUserId}
      />
      <hr />
      <SocialLinks
        isCurrentUser={currentUserId === user.id}
        links={user.SocialLinks ? user.SocialLinks : []}
      />
    </div>
  );
};

export default ProfileDescription;
