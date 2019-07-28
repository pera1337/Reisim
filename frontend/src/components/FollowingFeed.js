import React, { useState, useEffect } from "react";
import GuidesList from "./shared/GuidesList";

const FollowingFeed = () => {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    //get the feed and set state
  }, []);

  return (
    <div>
      <GuidesList guides={guides} displayAuthor={true} />
    </div>
  );
};

export default FollowingFeed;
