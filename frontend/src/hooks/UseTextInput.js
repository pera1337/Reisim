import { useState } from "react";

export default initialValue => {
  const [text, setText] = useState(initialValue);

  function handleChange(e) {
    if (!e.target) setText(e);
    else setText(e.target.value);
  }

  return [text, handleChange];
};
