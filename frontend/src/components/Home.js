import React from "react";
import Search from "./Search";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="search-header">Where would you like to go?</h1>
      <Search className="search-bar" />
    </div>
  );
};

export default Home;
