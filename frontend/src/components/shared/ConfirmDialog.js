import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const ConfirmDialog = ({
  buttonText,
  title,
  contentText,
  onConfirm,
  confirmBtnText,
  startIcon = undefined,
  endIcon = undefined
}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <div>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        variant="contained"
        color="secondary"
        onClick={handleShow}
      >
        {buttonText}
      </Button>
      <Dialog
        open={show}
        onClose={handleHide}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleHide} color="primary">
            Close
          </Button>
          <Button onClick={onConfirm} color="primary" autoFocus>
            {confirmBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
