import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import axios from "../../utils/axiosProxy";

const useStyles = makeStyles((theme) => ({
  following: {
    backgroundColor: "#4CAF50",
    "&:hover": {
      background: "#f44336",
    },
  },
}));

const InterestedButton = ({ targetId, onClick, isGoing }) => {
  const classes = useStyles();
  const [buttonText, setButtonText] = useState("Going");

  const enterText = () => {
    setButtonText("Leave");
  };

  const leaveText = () => {
    setButtonText("Going");
  };

  return isGoing ? (
    <Button
      variant="contained"
      className={classes.following}
      color="primary"
      onClick={onClick}
      onMouseEnter={enterText}
      onMouseLeave={leaveText}
    >
      {buttonText}
    </Button>
  ) : (
    <Button variant="contained" color="primary" onClick={onClick}>
      Interested
    </Button>
  );
};

export default InterestedButton;
