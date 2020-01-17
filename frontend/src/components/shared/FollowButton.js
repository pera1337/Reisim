import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";

const FollowButton = ({ targetId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
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
      } catch (e) {
        console.log("e :", e);
      }
    }
  }

  return (
    <Button variant="contained" color="primary" onClick={followUser}>
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default FollowButton;
