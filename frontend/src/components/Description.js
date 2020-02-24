import React, { useState } from "react";
import EditDescription from "./EditDescription";
import DescriptionText from "./DescriptionText";
// import axios from "axios";
import axios from "../utils/axiosProxy";

const Description = ({ profileDescription, id, currentUserId }) => {
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [desc, setDesc] = useState("");
  const onEditClick = () => {
    setIsEditingDescription(!isEditingDescription);
  };
  const onEditSave = async description => {
    const token = localStorage.getItem("token");
    const headers = {
      "X-Auth-Token": token
    };
    axios
      .put(
        "/api/account/description",
        { profileDescription: description },
        { headers }
      ) //TODO:res.send the new description
      .then(() => {
        axios.get(`/api/account/description/${id}`).then(res => {
          setDesc(res.data);
          setIsEditingDescription(!isEditingDescription);
        });
      });
  };
  return isEditingDescription ? (
    <EditDescription
      onSave={onEditSave}
      onCancel={onEditClick}
      initialValue={desc ? desc : profileDescription}
    />
  ) : (
    <DescriptionText
      isCurrentUser={currentUserId === id}
      profileDescription={desc ? desc : profileDescription}
      onEdit={onEditClick}
    />
  );
};

export default Description;
