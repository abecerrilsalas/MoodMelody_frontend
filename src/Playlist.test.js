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

// Helper to render the component with initial state
const renderWithInitialState = (state) => {
  return render(
    <MemoryRouter initialEntries={[{ pathname: "/playlist", state }]}>
      <Playlist />
    </MemoryRouter>
  );
};

describe("Playlist Component", () => {
  const initialState = {
    spotifyLink: "http://spotify.com/playlist",
    sessionId: "123",
    description: "Happy",
    initialHistory: [
      {
        description: "Previous mood",
        timestamp: Date.now(),
        spotifyLink: "http://spotify.com/previous",
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("updates input value when typing", () => {
    renderWithInitialState(initialState);

    const input = screen.getByPlaceholderText(
      /Enter the desired song qualities or mood.../i
    );
    fireEvent.change(input, { target: { value: "Excited" } });

    expect(input.value).toBe("Excited");
  });

  test("navigates to About page when clicking the About button", () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);

    renderWithInitialState(initialState);

    fireEvent.click(screen.getByText(/About MoodMelody/i));

    expect(navigate).toHaveBeenCalledWith(
      "/about",
      expect.objectContaining({
        state: expect.any(Object), // This needs to check for specific state fields if necessary
      })
    );
  });
});
