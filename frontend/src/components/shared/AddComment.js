import React from "react";
import axios from "../../utils/axiosProxy";
import UseTextInput from "../../hooks/UseTextInput";
import { TextField, Button } from "@material-ui/core";

const AddComment = ({ parentId, guideId, onAdd }) => {
  const [text, setText] = UseTextInput("");

  const onSave = async (text) => {
    const token = localStorage.getItem("token");
    const headers = {
      "X-Auth-Token": token,
    };
    const response = await axios.post(
      "/api/comment/new",
      { text, parentId, guideId },
      { headers }
    );
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        multiline
        autoFocus
        rows={6}
        variant="outlined"
        margin="normal"
        fullWidth
        label="Comment"
        placeholder="Add a comment"
        value={text}
        onChange={setText}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave(text)}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AddComment;
