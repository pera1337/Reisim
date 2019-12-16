import React from "react";
import { useState, useEffect } from "react";
import GuideList from "./shared/GuidesList";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import ProfileDescription from "./ProfileDescription";
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
      if (user.id !== userId) {
        const response = await axios.get(
          `http://localhost:5000/api/account/isfollowing/${result.data.id}`,
          { headers }
        );
        setIsFollowing(response.data);
      }
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
      <h1>UP</h1>
    </div>
    // <Row>
    //   <Col lg={3}>
    //     <ProfileDescription
    //       user={user}
    //       currentUserId={userId}
    //       isFollowing={isFollowing}
    //       followUser={followUser}
    //     />
    //   </Col>
    //   <Col lg={9}>
    //     <GuideList guides={guides} />
    //   </Col>
    // </Row>
  );
};

export default UserProfile;
