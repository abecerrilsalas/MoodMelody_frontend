import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// rendering and display logic
// handling of user inputs and events
// any conditional rendering logic
// integreation with any custom hooks or utility functions

describe("App", () => {
  //renders without crashing
  test("renders without crashing", () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText("Home Component")).toBeInTheDocument();
  });

  // Home component rendered
  expect(screen.getByText("Home Component")).toBeInTheDocument();

  // App routes to Playlist component
  test("routes correctly to the Home and Playlist components", () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Going to playlist
    window.history.pushState({}, "", "/playlist");
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByText("Playlist Component")).toBeInTheDocument();
  });
});

//Header component renders
test("always renders the Header component", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  expect(screen.getByText("Header Component")).toBeInTheDocument();
});
