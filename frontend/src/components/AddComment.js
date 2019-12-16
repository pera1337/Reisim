import React from "react";
// import Button from "react-bootstrap/Button";
// import FormControl from "react-bootstrap/FormControl";
// import Form from "react-bootstrap/Form";
import useTextInput from "../hooks/UseTextInput";

const AddComment = ({ parent }) => {
  const [comment, setComment] = useTextInput("");
  return (
    <div>
      <h1>Comment</h1>
    </div>
    // <Form style={{ overflow: "auto", marginBottom: "4px" }}>
    //   <FormControl
    //     placeholder="Add a comment"
    //     autoFocus
    //     type="text"
    //     as="textarea"
    //     rows="4"
    //     value={comment}
    //     onChange={setComment}
    //   />
    //   <Button style={{ float: "right" }} variant="success">
    //     Comment
    //   </Button>
    // </Form>
  );
};

export default AddComment;
