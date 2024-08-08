import React from "react";
import "./Button.css";

function Button({ label, onClick, large = false, loading = false }) {
  const className = large ? "button largeButton" : "button";
  return (
    <button className={className} onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : label}
    </button>
  );
}

export default Button;
