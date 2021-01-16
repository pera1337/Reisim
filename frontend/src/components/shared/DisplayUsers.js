import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Avatar,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
} from "@material-ui/core";
import axios from "../../utils/axiosProxy";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, going, history } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        Users going to this tour
      </DialogTitle>
      <List>
        {going.map((el, index) => {
          return (
            <ListItem
              button
              onClick={() => {
                history.push(`/user/${el.User.username}`);
              }}
              key={el.User.id}
            >
              <ListItemAvatar>
                <Avatar
                  src={`${axios.defaults.baseURL}/${el.User.profileImage}`}
                  className={classes.avatar}
                ></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${el.User.firstName} ${el.User.lastName}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Dialog>
  );
}

const DisplayUsers = ({ going, history }) => {
  console.log(going);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <List
        style={{
          width: "300px",
          backgroundColor: "white",
          marginTop: "20px",
          padding: "10px",
          boxShadow: "0px 0px 5px 0px rgba(79, 77, 79, 0.6)",
        }}
      >
        {going.map((el, index) => {
          if (index < 5)
            return (
              <ListItem
                button
                onClick={() => {
                  history.push(`/user/${el.User.username}`);
                }}
                key={el.User.id}
              >
                <ListItemAvatar>
                  <Avatar
                    src={`${axios.defaults.baseURL}/${el.User.profileImage}`}
                    className={classes.avatar}
                  ></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${el.User.firstName} ${el.User.lastName}`}
                />
              </ListItem>
            );
        })}
        {going.length > 5 && (
          <ListItem
            button
            onClick={() => {
              setOpen(true);
            }}
            key={"10"}
          >
            <ListItemText primary={`View ${going.length - 5} more`} />
          </ListItem>
        )}
      </List>
      <SimpleDialog
        open={open}
        history={history}
        going={going}
        onClose={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default withRouter(DisplayUsers);
