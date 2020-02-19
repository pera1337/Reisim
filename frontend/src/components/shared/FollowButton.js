import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  following: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      background: "#f44336"
    }
  }
}));

const FollowButton = ({ targetId }) => {
  const classes = useStyles();
  const [isFollowing, setIsFollowing] = useState(false);
  const [buttonText, setButtonText] = useState("Following");
  useEffect(() => {
    async function getData() {
      const token = localStorage.getItem("token") || "";
      if (token) {
        const headers = {
          "X-Auth-Token": localStorage.getItem("token")
        };
        const result = await axios.get(
          `http://localhost:5000/api/account/isfollowing/${targetId}`,
          { headers }
        );
        setIsFollowing(result.data);
      }
    }
    getData();
  });

  const enterText = () => {
    setButtonText("Unfollow");
  };

  const leaveText = () => {
    setButtonText("Following");
  };

  async function followUser() {
    // if (userId === -1) return params.history.push("/login");
    const headers = {
      "x-auth-token": localStorage.getItem("token")
    };
    if (isFollowing) {
      try {
        await axios.delete(
          `http://localhost:5000/api/account/unfollow/${targetId}`,
          { headers }
        );
        setIsFollowing(false);
      } catch (e) {
        console.log("e :", e);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:5000/api/account/follow/${targetId}`,
          null,
          { headers }
        );
        setIsFollowing(true);
        setButtonText("Following");
      } catch (e) {
        console.log("e :", e);
      }
    }
  }

  return (
    // <Button variant="contained" color="primary" onClick={followUser}>
    //   {isFollowing ? "Following" : "Follow"}
    // </Button>
    isFollowing ? (
      <Button
        variant="contained"
        className={classes.following}
        color="primary"
        onClick={followUser}
        onMouseEnter={enterText}
        onMouseLeave={leaveText}
      >
        {buttonText}
      </Button>
    ) : (
      <Button variant="contained" color="primary" onClick={followUser}>
        Follow
      </Button>
    )
  );
};

export default FollowButton;
