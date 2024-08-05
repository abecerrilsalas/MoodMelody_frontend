import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img
        src="/images/logo.jpg"
        alt="Mood Melody logo"
        className="header-logo"
      />
      <div className="header-content">
        <h1 className="rectangle-title">Mood Melody</h1>
        <p className="rectangle-description">
          Discover music that fits your mood.
        </p>
      </div>
    </header>
  );
}

export default Header;
