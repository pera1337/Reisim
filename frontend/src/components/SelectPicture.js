import React, { useState, useRef } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import ReactCrop from "react-image-crop";
import { image64toCanvasRef, canvasReftoFile } from "../utils/ImageUtils";
import "react-image-crop/dist/ReactCrop.css";

const SelectPicture = ({ open, onClose, onConfirm }) => {
  const [src, setSrc] = useState(null);
  const imagePreviewCanvasRef = useRef(null);
  const imageRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 55,
    height: 55,
    aspect: 1 / 1
  });

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onImageLoaded = image => {
    imageRef.current = image;
  };
  const onCropComplete = crop => {
    const canvasRef = imagePreviewCanvasRef.current;
    image64toCanvasRef(canvasRef, src, crop, imageRef.current);
  };
  const onCropChange = (crop, percentCrop) => {
    setCrop(percentCrop);
  };
  const handleConfirmClick = () => {
    if (src) {
      const croppedFile = canvasReftoFile(imagePreviewCanvasRef.current, src);
      onConfirm(croppedFile);
    }
  };

  return (
    <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set profile picture</DialogTitle>
      <div>
        <div>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={onSelectFile}
          />
        </div>
        {src && (
          <>
            <ReactCrop
              src={src}
              crop={crop}
              locked
              circularCrop
              onImageLoaded={onImageLoaded}
              onComplete={onCropComplete}
              onChange={onCropChange}
            />
            <canvas ref={imagePreviewCanvasRef}></canvas>
          </>
        )}
      </div>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleConfirmClick} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectPicture;
