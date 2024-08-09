import React from "react";

function TextInput({ value, onChange, placeholder, readOnly }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      className="text-input"
    />
  );
}

export default TextInput;
