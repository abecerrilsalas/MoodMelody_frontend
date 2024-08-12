import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Playlist from "./Playlist";
import { useNavigate } from "react-router-dom";

// Mocking axios and useNavigate
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Playlist Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial state", () => {
    render(
      <MemoryRouter>
        <Playlist />
      </MemoryRouter>
    );

    // Check if the header, input, button, and default message are rendered
    expect(screen.getByText(/Enter Your Mood/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(
        /Enter the desired song qualities or mood.../i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Get Recommendations/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/No playlist selected yet/i)).toBeInTheDocument();
  });

  test("updates input value when typing", () => {
    render(
      <MemoryRouter>
        <Playlist />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      /Enter the desired song qualities or mood.../i
    );
    fireEvent.change(input, { target: { value: "Happy" } });

    expect(input.value).toBe("Happy");
  });

  test("handles API failure gracefully", async () => {
    axios.post.mockRejectedValueOnce(
      new Error("Failed to fetch recommendations")
    );

    render(
      <MemoryRouter>
        <Playlist />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        /Enter the desired song qualities or mood.../i
      ),
      { target: { value: "Happy" } }
    );
    fireEvent.click(
      screen.getByRole("button", { name: /Get Recommendations/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /Error fetching recommendation: Failed to fetch recommendations/i
        )
      ).toBeInTheDocument();
    });
  });

  test("navigates to About page when clicking the About button", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    render(
      <MemoryRouter>
        <Playlist />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/About MoodMelody/i));

    expect(navigate).toHaveBeenCalledWith(
      "/about",
      expect.objectContaining({
        state: expect.any(Object),
      })
    );
  });
});
