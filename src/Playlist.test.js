import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Playlist from "./Playlist";

// Mocking axios for API calls
jest.mock("axios");

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

describe("Playlist Component", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear all mocks after each test to avoid interference
  });

  // Check if the component renders
  test("renders Playlist component without crashing", () => {
    renderWithRouter(<Playlist />);
    expect(
      screen.getByPlaceholderText("Enter the desired song qualities or mood...")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Recommendations")).toBeInTheDocument();
  });

  // Verify input handling
  test("handles input change correctly", () => {
    renderWithRouter(<Playlist />);
    const input = screen.getByPlaceholderText(
      "Enter the desired song qualities or mood..."
    );
    fireEvent.change(input, { target: { value: "Happy" } });
    expect(input.value).toBe("Happy");
  });

  // Check API interaction and response handling
  test("fetches recommendations on button click and updates link", async () => {
    const mockResponse = {
      data: { spotify_link: "http://spotify.com/playlist/123" },
    };
    axios.post.mockResolvedValueOnce(mockResponse);

    renderWithRouter(<Playlist />);
    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter the desired song qualities or mood..."
      ),
      { target: { value: "Happy" } }
    );
    fireEvent.click(screen.getByText("Get Recommendations"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText("Open Full Playlist on Spotify")
    ).toBeInTheDocument(); // Check if the Spotify link is rendered
  });

  // Simulate API failure and verify error handling
  test("handles API failure gracefully", async () => {
    axios.post.mockRejectedValueOnce(
      new Error("Failed to fetch recommendations")
    );

    renderWithRouter(<Playlist />);
    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter the desired song qualities or mood..."
      ),
      { target: { value: "Happy" } }
    );
    fireEvent.click(screen.getByText("Get Recommendations"));

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
    expect(
      screen.getByText(/Failed to fetch recommendations/i)
    ).toBeInTheDocument();
  });
});
