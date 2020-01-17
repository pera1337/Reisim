import React from "react";
import TextField from "@material-ui/core/TextField";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Button from "react-bootstrap/Button";
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
    // <Form
    //   onSubmit={e => {
    //     e.preventDefault();
    //   }}
    // >
    //   <FormControl
    //     placeholder="Enter description..."
    //     autoFocus
    //     as="textarea"
    //     rows="6"
    //     type="text"
    //     value={description}
    //     onChange={setDescription}
    //   />
    //   <div>
    //     <Button
    //       className="edit-button"
    //       type="button"
    //       onClick={() => onSave(description)}
    //     >
    //       Save
    //     </Button>
    //     <Button className="edit-button right" type="button" onClick={onCancel}>
    //       Cancel
    //     </Button>
    //   </div>
    // </Form>
  );
};

export default EditDescription;
