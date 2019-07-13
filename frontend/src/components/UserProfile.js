import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";
import "../css/Home.css";

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
        const response = await axios.delete(
          `http://localhost:5000/api/account/unfollow/${user.id}`,
          { headers }
        );
        setIsFollowing(false);
      } catch (e) {
        console.log("e :", e);
      }
    } else {
      try {
        const response = await axios.post(
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
        {userId !== user.id ? (
          <Button variant="success" onClick={followUser}>
            {isFollowing ? "Following" : "Follow"}
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="guides">
        {guides.map((element, index) => {
          return (
            <div className="container" key={element.id}>
              <div className="row">
                <div className="col-lg-8 col-md-10 mx-auto">
                  <Link className="guide-title" to={`/guide/${element.id}`}>
                    {element.title}
                  </Link>
                </div>
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
