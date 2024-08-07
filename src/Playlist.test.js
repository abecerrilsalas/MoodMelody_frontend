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
  // check if the component renders
  test("renders Playlist component without crashing", () => {
    renderWithRouter(<Playlist />);
    expect(
      screen.getByPlaceholderText("Enter the desired song qualities or mood...")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Recommendations")).toBeInTheDocument();
  });

  // verify input handling
  test("handles input change correctly", () => {
    renderWithRouter(<Playlist />);
    const input = screen.getByPlaceholderText(
      "Enter the desired song qualities or mood..."
    );
    fireEvent.change(input, { target: { value: "Happy" } });
    expect(input.value).toBe("Happy");
  });

  // check API interaction and response handling
  test("fetches recommendations on button click and updates link", async () => {
    const mockResponse = {
      data: { spotify_link: "http://spotify.com/playlist/123" },
    };
    axios.post.mockResolvedValue(mockResponse);

    renderWithRouter(<Playlist />);
    fireEvent.change(
      screen.getByPlaceholderText(
        "Enter the desired song qualities or mood..."
      ),
      { target: { value: "Happy" } }
    );
    fireEvent.click(screen.getByText("Get Recommendations"));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(
      screen.getByText("Open Full Playlist on Spotify")
    ).toBeInTheDocument();
  });
});

// import React from "react";
// import { render, screen } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import Playlist from "./Playlist";
// import { useLocation } from "react-router-dom";
// import { toBeInTheDocument } from "@testing-library/jest-dom";

// // Mock useLocation
// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useLocation: jest.fn(),
// }));

// // describe("Playlist Component", () => {
// //   test("displays recommendations when provided", () => {
// //     // Setup useLocation to return specific test data
// //     useLocation.mockReturnValue({
// //       state: { recommendations: ["Song 1", "Song 2"], spotifyLink: null },
// //     });

// //     // Render the Playlist component within the context of a MemoryRouter
// //     render(<Playlist />, { wrapper: MemoryRouter });

// //     // Check for the presence of each recommendation
// //     expect(screen.getByText("Song 1")).toBeInTheDocument();
// //     expect(screen.getByText("Song 2")).toBeInTheDocument();
// //     // Ensure the "Open Playlist on Spotify" link does not appear
// //     expect(screen.queryByText("Open Playlist on Spotify")).toBeNull();
// //   });
// // });
