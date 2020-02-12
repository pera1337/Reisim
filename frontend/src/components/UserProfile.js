import React from "react";
import { useState, useEffect } from "react";
import GuideList from "./shared/GuidesList";
import ProfileDescription from "./ProfileDescription";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

const UserProfile = params => {
  const [user, setUser] = useState({});
  const [guides, setGuides] = useState([]);
  const [userId, setUserId] = useState(-1);
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
    };
    populate();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} direction="column">
        <ProfileDescription user={user} currentUserId={userId} />
      </Grid>
      <Grid item xs={12} md={9}>
        <GuideList guides={guides} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
