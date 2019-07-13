import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../css/Home.css";
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
  return (
    <div className="guides">
      {guides.map((element, index) => {
        return (
          <div className="container" key={element.id}>
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <Link className="guide-title" to={`/guide/${element.id}`}>
                  {element.title}
                </Link>
                <p style={{ fontWeight: "bold" }}>
                  {element.avgRating}
                  <FontAwesomeIcon icon={faStar} />({element.numOfRatings})
                </p>
                <p className="guide-created">
                  Created by{" "}
                  <Link className="created" to={`/user/${element.User.id}`}>
                    {element.User.firstName} {element.User.lastName}
                  </Link>
                </p>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
