import React from "react";
import { useField } from "formik";
import { default as MUITextField } from "@material-ui/core/TextField";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <MUITextField
      fullWidth
      error={meta.error && meta.touched}
      {...field}
      {...props}
      label={meta.error && meta.touched ? "Error" : label}
      helperText={meta.error && meta.touched ? meta.error : ""}
      variant="outlined"
    />
  );
};

export default TextField;
