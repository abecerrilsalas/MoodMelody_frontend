import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Landing from "./Landing";

describe("Landing Component", () => {
  test("renders Landing component correctly", () => {
    render(<Landing />);

    // Check if the content is rendered
    expect(screen.getByText("About Mood Melody")).toBeInTheDocument();
    expect(screen.getByText("Welcome to Mood Melody!")).toBeInTheDocument();
    expect(
      screen.getByText(/Authorize Your Spotify Account:/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Describe Your Mood:/i)).toBeInTheDocument();
    expect(screen.getByText(/Get Recommendations:/i)).toBeInTheDocument();
    expect(screen.getByText(/Enjoy Your Playlist:/i)).toBeInTheDocument();
    expect(screen.getByText(/Continuous Discovery:/i)).toBeInTheDocument();
  });

  test("redirects to the authorization endpoint on button click", () => {
    // Mock window.location.assign
    delete window.location;
    window.location = { assign: jest.fn() };

    render(<Landing />);

    fireEvent.click(screen.getByText("Authorize with Spotify"));

    // Update the test to match the actual URL being used
    expect(window.location.assign).toHaveBeenCalledWith(
      "http://127.0.0.1:5000/auth/login"
    );
  });
});
