import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "../css/EditDescription.css";
import UseTextInput from "../hooks/UseTextInput";
const EditDescription = ({ onSave, onCancel, initialValue }) => {
  const [description, setDescription] = UseTextInput(initialValue);
  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <FormControl
        placeholder="Enter description..."
        autoFocus
        as="textarea"
        rows="6"
        type="text"
        value={description}
        onChange={setDescription}
      />
      <div>
        <Button
          className="edit-button"
          type="button"
          onClick={() => onSave(description)}
        >
          Save
        </Button>
        <Button className="edit-button right" type="button" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditDescription;
