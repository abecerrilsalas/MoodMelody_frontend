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
    axios.post.mockResolvedValue({
      data: {
        authorized: true,
        recommendation: ["Song1", "Song2"],
        spotify_link: "http://spotify.com/playlist/123",
      },
    });
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

    const button = screen.getByRole("button", { name: "Get Recommendations" });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:5000/recommend",
        { description: "" },
        { params: { session_id: null } }
      );
    });
  });

  test("displays error when not authorized", async () => {
    axios.post.mockRejectedValueOnce({
      response: { status: 401 },
    });

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
