import React from "react";
import { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";
import axios from "axios";

const Home = () => {
  const [guides, setGuides] = useState([]);
  useEffect(() => {
    const populate = async () => {
      const result = await axios.get("http://localhost:5000/api/guide");
      setGuides(result.data);
    };
    populate();
  }, []);
  return <GuidesList guides={guides} displayAuthor={true} />;
};

export default Home;
