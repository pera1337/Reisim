import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
// import axios from "axios";
import axios from "../utils/axiosProxy";

const TopGuides = () => {
  const [guides, setGuides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  async function populate() {
    const results = await axios.get(`/api/guide/top?offset=${offset}&limit=20`);
    if (results.data.length === 0) {
      setHasMore(false);
    } else {
      setGuides(guides.concat(results.data));
      setOffset(offset + 20);
    }
  }
  useEffect(() => {
    populate();
  }, []);
  return (
    <div
      style={{
        margin: "10px"
      }}
    >
      <h1>Top guides</h1>
      <GuidesList
        guides={guides}
        hasMore={hasMore}
        next={populate}
        displayAuthor
      />
    </div>
  );
};

export default TopGuides;
