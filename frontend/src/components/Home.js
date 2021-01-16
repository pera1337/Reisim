import React, { useEffect, useState } from "react";
import Search from "./Search";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import axios from "../utils/axiosProxy";
import "../css/Home.css";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";

const Home = ({ history }) => {
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };
  const [open, setOpen] = useState(false);
  const [guideId, setGuideId] = useState(-1);
  useEffect(() => {
    const headers = {
      "X-Auth-Token": localStorage.getItem("token"),
    };
    async function getData() {
      const response = await axios.get("/api/guide/going", { headers });
      console.log("SIGNED UP RESPONSE < ", response);
      console.log("FIRST ELEMENT , ", response.data[0]);
      if (response.data[0]) {
        const firstData = new Date(response.data[0].nextTour);

        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const secondDate = new Date(Date.now());

        const diffDays = Math.round(
          Math.abs((firstData - secondDate) / oneDay)
        );
        console.log("DIFFERENCE , ", diffDays);
        if (diffDays === 1) {
          console.log("TRUE");
          createNotification("warning");
          setOpen(true);
          setGuideId(response.data[0].id);
        }
      }
    }
    getData();
  }, []);

  return (
    <>
      <div className="home-container">
        <h1 className="search-header">Where would you like to go?</h1>
        <Search />
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          style={{ cursor: "pointer" }}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          onClick={() => {
            history.push(`/guide/${guideId}`);
          }}
        >
          <SnackbarContent
            message={
              <span>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={{ color: "white", marginRight: "10px" }}
                />
                {`You have a tour tommorrow!`}
              </span>
            }
            style={{ backgroundColor: "#2196f3" }}
            action={
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} color="white" />
              </IconButton>
            }
          />
        </Snackbar>
      </div>
    </>
  );
};

export default withRouter(Home);
