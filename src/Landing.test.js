import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Landing from "./Landing";

describe("Landing Component", () => {
  beforeEach(() => {
    // Mock window.location.assign to be a jest function
    delete window.location;
    window.location = { assign: jest.fn() };
    process.env.REACT_APP_API_URL = "http://127.0.0.1:5000";
  });

  test("redirects to the authorization endpoint on button click", () => {
    render(<Landing />);

    const authButton = screen.getByText("Authorize with Spotify");

    fireEvent.click(authButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}/auth/login`
    );
  });
});
