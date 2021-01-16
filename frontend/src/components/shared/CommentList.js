import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosProxy";
import {
  Divider,
  ListItem,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const CommentList = ({ guideId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/api/comment/comments/${guideId}`);
      setComments(response.data);
    }
    getData();
  }, []);
  return (
    <List style={{ marginTop: "20px" }}>
      {comments.map((comment) => {
        return (
          <>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar src={`${comment.User.profileImage}`} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{ display: "block", marginBottom: "5px" }}
                    >
                      <Link
                        className="created"
                        to={`/user/${comment.User.username}`}
                      >
                        {`${comment.User.firstName} ${comment.User.lastName}`}
                      </Link>
                    </Typography>
                    {comment.text}
                  </React.Fragment>
                }
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
};

export default CommentList;
