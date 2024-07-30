// Button.js
import React from "react";
import "./Button.css"; // Import the specific button styles

function Button({ label, onClick, large = false, loading = false }) {
  const className = large ? "button largeButton" : "button";
  return (
    <button className={className} onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : label}
    </button>
  );
}

export default Button;
