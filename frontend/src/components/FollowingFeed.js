import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
import axios from "axios";

const FollowingFeed = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    async function populate() {
      const token = localStorage.getItem("token");
      const headers = {
        "X-Auth-Token": token
      };
      const response = await axios.get(
        `http://localhost:5000/api/account/feed`,
        {
          headers
        }
      );
      setGuides(response.data);
    }
    populate();
  }, []);

  return (
    <div
      style={{
        margin: "10px"
      }}
    >
      <GuidesList guides={guides} displayAuthor={true} />
    </div>
  );
};

export default FollowingFeed;
