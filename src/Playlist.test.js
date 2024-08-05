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
