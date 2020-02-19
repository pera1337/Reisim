import React from "react";
import GuideShort from "./GuideShort";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withRouter } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";
import { CircularProgress, Grid } from "@material-ui/core";
import "../../css/GuideList.css";

const GuidesList = ({
  guides,
  displayAuthor = false,
  next,
  hasMore,
  history
}) => {
  const loader = (
    <Grid item container spacing={1} direction="row" justify="center">
      <CircularProgress />
    </Grid>
  );
  const handleLinkClick = element => {
    history.push(`/guide/${element.id}`);
  };
  return (
    <div className="guides">
      <List style={{ margin: "10px 30px" }} component="nav">
        <InfiniteScroll
          pageStart={0}
          loadMore={next}
          initialLoad={true}
          hasMore={hasMore}
          loader={loader}
        >
          {guides.map((element, index) => {
            return (
              <ListItem
                key={index}
                onClick={() => handleLinkClick(element)}
                divider
                button
              >
                <GuideShort
                  //key={element.id}
                  guide={element}
                  username={element.username ? element.username : ""}
                  displayAuthor={displayAuthor}
                />
              </ListItem>
            );
          })}
        </InfiniteScroll>
      </List>
    </div>
  );
};

export default withRouter(GuidesList);
