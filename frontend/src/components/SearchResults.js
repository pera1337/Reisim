import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
import axios from "axios";

const SearchResults = props => {
  const [guides, setGuides] = useState([]);
  useEffect(() => {
    async function populate() {
      const response = await axios.get(
        `http://localhost:5000/api/guide/search${props.location.search}`
      );
      setGuides(response.data);
    }
    populate();
  }, []);
  return <GuidesList guides={guides} displayAuthor={true} />;
};

export default SearchResults;
