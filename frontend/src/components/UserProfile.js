import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import GuideList from "./shared/GuidesList";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

const UserProfile = params => {
  const [user, setUser] = useState({});
  const [guides, setGuides] = useState([]);
  const [userId, setUserId] = useState(-1);
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const populate = async () => {
      const result = await axios.get(
        `http://localhost:5000/api/account/${params.id}`
      );
      setUser(result.data);
      setGuides(result.data.Guides);
      const token = localStorage.getItem("token") || "";
      if (token) {
        const decoded = await jsonwebtoken.decode(token);
        setUserId(Number(decoded.id));
      }

      const headers = {
        "X-Auth-Token": localStorage.getItem("token")
      };
      const response = await axios.get(
        `http://localhost:5000/api/account/isfollowing/${result.data.id}`,
        { headers }
      );
      setIsFollowing(response.data);
    };
    populate();
  }, []);

  async function followUser() {
    const headers = {
      "x-auth-token": localStorage.getItem("token")
    };
    if (isFollowing) {
      try {
        await axios.delete(
          `http://localhost:5000/api/account/unfollow/${user.id}`,
          { headers }
        );
        setIsFollowing(false);
      } catch (e) {
        console.log("e :", e);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:5000/api/account/follow/${user.id}`,
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
    <div>
      <div>
        <p>
          {user.firstName} {user.lastName}
        </p>
        {userId !== -1 && userId !== user.id ? (
          <Button variant="success" onClick={followUser}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        ) : (
          ""
        )}
      </div>
      <GuideList guides={guides} />
    </div>
  );
};

export default UserProfile;
