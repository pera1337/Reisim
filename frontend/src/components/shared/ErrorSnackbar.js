import React from "react";
import { Snackbar, SnackbarContent, IconButton } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes
} from "@fortawesome/free-solid-svg-icons";

const ErrorSnackbar = ({ open, error, onClose }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      onClose={onClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
    >
      <SnackbarContent
        message={
          <span>
            <FontAwesomeIcon
              icon={faExclamationCircle}
              style={{ color: "white" }}
            />
            {`  ${error}`}
          </span>
        }
        style={{ backgroundColor: "#d62e22" }}
        action={
          <IconButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} color="white" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default ErrorSnackbar;
