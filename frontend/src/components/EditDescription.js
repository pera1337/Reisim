import React from "react";
import TextField from "@material-ui/core/TextField";
import UseTextInput from "../hooks/UseTextInput";
import { Button } from "@material-ui/core";
const EditDescription = ({ onSave, onCancel, initialValue }) => {
  const [description, setDescription] = UseTextInput(initialValue);
  return (
    <form
      onSubmit={e => {
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
        label="Description"
        placeholder="Enter description..."
        value={description}
        onChange={setDescription}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave(description)}
        >
          Save
        </Button>
        <Button
          style={{ float: "right" }}
          variant="outlined"
          color="primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditDescription;
