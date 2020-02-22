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
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const populate = async () => {
    if (user.id) {
      const results = await axios.get(
        `http://localhost:5000/api/account/guides/${user.id}?offset=${offset}&limit=${limit}`
      );
      if (results.data.length === limit) {
        setGuides(guides.concat(results.data));
        setOffset(offset + limit);
        setHasMore(true);
      } else {
        setHasMore(false);
        if (results.data.length !== 0) setGuides(guides.concat(results.data));
      }
    }
  };
  useEffect(() => {
    async function getUser() {
      const result = await axios.get(
        `http://localhost:5000/api/account/${params.username}`
      );
      setUser(result.data);
      const token = localStorage.getItem("token") || "";
      if (token) {
        const decoded = await jsonwebtoken.decode(token);
        setUserId(Number(decoded.id));
      }
    }
    getUser();
    populate();
  }, [params.username]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <ProfileDescription user={user} currentUserId={userId} />
      </Grid>
      <Grid item xs={12} md={9}>
        <GuideList hasMore={hasMore} next={populate} guides={guides} />
      </Grid>
    </Grid>
  );
};

export default UserProfile;
