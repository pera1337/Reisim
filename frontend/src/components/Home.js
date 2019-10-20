import React from "react";
import Search from "./Search";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-container" />
      <h1 className="search-header">Where would you like to go?</h1>
      <Search />
    </div>
  );
};

export default Home;
