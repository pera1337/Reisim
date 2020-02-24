import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import SelectPicture from "../SelectPicture";
// import axios from "axios";
import axios from "../../utils/axiosProxy";

const ProfilePicture = ({ imgSrc, userId, currentUserId }) => {
  const [open, setOpen] = useState(false);
  const [newSrc, setNewSrc] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async file => {
    const formData = new FormData();
    formData.append("profileImage", file, file.name);
    const token = localStorage.getItem("token") || "";
    if (token) {
      const headers = {
        "X-Auth-Token": localStorage.getItem("token")
      };
      if (imgSrc) {
        const response = await axios.put(
          `/api/upload/${currentUserId}`,
          formData,
          { headers }
        );
        setNewSrc(response.data);
      } else {
        const response = await axios.post(
          `/api/upload/${currentUserId}`,
          formData,
          { headers }
        );
        setNewSrc(response.data);
      }
    }
    setOpen(false);
  };
  return (
    <div style={{ position: "relative" }}>
      <Avatar
        style={{ width: "150px", height: "150px" }}
        src={axios.defaults.baseURL + "/" + (newSrc ? newSrc : imgSrc)}
      />
      {userId === currentUserId && (
        <>
          <Fab
            style={{ position: "absolute", top: "70%", left: "70%" }}
            color="primary"
            onClick={handleClickOpen}
          >
            <FontAwesomeIcon icon={faCamera} />
          </Fab>
          <SelectPicture
            open={open}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        </>
      )}
    </div>
  );
};

export default ProfilePicture;
