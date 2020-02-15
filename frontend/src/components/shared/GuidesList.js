import React from "react";
import GuideShort from "./GuideShort";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withRouter, Link } from "react-router-dom";
import "../../css/GuideList.css";

const GuidesList = ({ guides, displayAuthor = false }) => {
  return (
    <div className="guides">
      <List style={{ margin: "10px 30px" }} component="nav">
        {guides.map((element, index) => {
          return (
            <ListItem
              key={index}
              component={Link}
              to={`/guide/${element.id}`}
              divider
              button
            >
              <GuideShort
                key={element.id}
                guide={element}
                displayAuthor={displayAuthor}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default withRouter(GuidesList);
