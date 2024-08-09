import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// Mocks
jest.mock("axios");

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: Router });
};

describe("Home Component", () => {
  beforeEach(() => {
    // Set up default responses for axios
    axios.post.mockResolvedValue({
      data: {
        authorized: true,
        recommendation: ["Song1", "Song2"],
        spotify_link: "http://spotify.com/playlist/123",
      },
    });

    // Mock console.error to avoid logging to the console during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Clear all mocks
    axios.post.mockClear();
    console.error.mockRestore();
  });

  test("renders with input and button", () => {
    renderWithRouter(<Home />);
    expect(
      screen.getByPlaceholderText("Enter the desired song qualities or mood...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get Recommendations" })
    ).toBeInTheDocument();
  });

  test("allows input to be set", () => {
    renderWithRouter(<Home />);
    const input = screen.getByPlaceholderText(
      "Enter the desired song qualities or mood..."
    );
    fireEvent.change(input, { target: { value: "Relaxing" } });
    expect(input.value).toBe("Relaxing");
  });

  test("fetches recommendations and navigates on successful response", async () => {
    renderWithRouter(<Home />);
    const input = screen.getByPlaceholderText(
      "Enter the desired song qualities or mood..."
    );
    fireEvent.change(input, { target: { value: "Relaxing" } });
    const button = screen.getByRole("button", { name: "Get Recommendations" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_API_URL}/recommend`,
        { description: "Relaxing" },
        { params: { session_id: null } }
      );
    });
  });

  test("displays error when not authorized", async () => {
    axios.post.mockRejectedValueOnce({ response: { status: 401 } });
    renderWithRouter(<Home />);
    const button = screen.getByRole("button", { name: "Get Recommendations" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("You are not authorized in Spotify.")
      ).toBeInTheDocument();
    });
  });
});
