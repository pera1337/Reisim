import React from "react";
import Grid from "@material-ui/core/Grid";
import Description from "./Description";
//import SocialLinks from "./SocialLinks";
import FollowButton from "./shared/FollowButton";
import ProfilePicture from "./shared/ProfilePicture";
import "../css/ProfileDescription.css";

const ProfileDescription = ({ user, currentUserId }) => {
  return (
    <div className="description-container">
      <Grid container alignContent="center" direction="column">
        <ProfilePicture
          imgSrc={user.profileImage}
          userId={user.id}
          currentUserId={currentUserId}
        />
      </Grid>
      <h2 style={{ textAlign: "center", marginTop: "9px", marginBottom: "0" }}>
        {user.firstName} {user.lastName}
      </h2>
      <p
        style={{
          textAlign: "center",
          fontStyle: "italic",
          margin: "0",
          opacity: "0.8"
        }}
      >
        @{user.username}
      </p>
      {user.id !== currentUserId && (
        <Grid container alignContent="center" direction="column">
          <FollowButton targetId={user.id} />
        </Grid>
      )}
      <Description
        profileDescription={user.profileDescription}
        id={user.id}
        currentUserId={currentUserId}
      />
    </div>
  );
};

export default ProfileDescription;
