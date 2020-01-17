import React from "react";
import Grid from "@material-ui/core/Grid";
import Description from "./Description";
import SocialLinks from "./SocialLinks";
import FollowButton from "./shared/FollowButton";
import "../css/ProfileDescription.css";

const ProfileDescription = ({ user, currentUserId }) => {
  return (
    <div className="description-container">
      <h2 style={{ textAlign: "center" }}>
        {user.firstName} {user.lastName}
      </h2>
      <Grid container alignContent="center" direction="column">
        <FollowButton targetId={user.id} />
      </Grid>
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
