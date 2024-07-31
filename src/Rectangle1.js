import React, { memo } from "react";
import "./Rectangle1.css"; // Make sure the path to the CSS file is correct

const Rectangle1 = ({
  title = "Default Title",
  description = "Default description here.",
}) => {
  return (
    <div className="rectangle">
      <h1 className="rectangle-title">{title}</h1>
      <p className="rectangle-description">{description}</p>
    </div>
  );
};

export default memo(Rectangle1);
