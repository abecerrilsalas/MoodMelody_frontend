import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img
        src="/images/moodMelody_logo.jpg"
        alt="Mood Melody logo"
        style={{ height: "50px", width: "auto" }}
      />
      <h1>Mood Melody</h1>
    </header>
  );
}

export default Header;
