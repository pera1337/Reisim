import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
import axios from "axios";

const SearchResults = props => {
  const [guides, setGuides] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  async function populate() {
    const limit = 3;
    const response = await axios.get(
      `http://localhost:5000/api/guide/search${props.location.search}&offset=${offset}&limit=${limit}`
    );
    if (response.data.length === limit) {
      setGuides(guides.concat(response.data));
      setOffset(offset + limit);
      setHasMore(true);
    } else {
      setHasMore(false);
      if (response.data.length !== 0) setGuides(guides.concat(response.data));
    }
  }
  useEffect(() => {
    populate();
  }, []);
  return (
    <GuidesList
      hasMore={hasMore}
      next={populate}
      guides={guides}
      displayAuthor={true}
    />
  );
};

export default SearchResults;
