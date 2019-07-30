import React from "react";
import GuideShort from "./GuideShort";
import "../../css/GuideList.css";

const GuidesList = ({ guides, displayAuthor = false }) => {
  return (
    <div className="guides">
      {guides.map(element => {
        return (
          <GuideShort
            key={element.id}
            guide={element}
            displayAuthor={displayAuthor}
          />
        );
      })}
    </div>
  );
};

export default GuidesList;
