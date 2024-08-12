import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import About from "./About";

// Mock environment variable for the test
const originalEnv = process.env;

beforeAll(() => {
  process.env = {
    ...originalEnv,
    REACT_APP_API_URL: "http://test-api-url.com",
  };
});

afterAll(() => {
  process.env = originalEnv;
});

test("renders About component correctly", () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>
  );

  // Check if the header is rendered
  expect(screen.getByText(/About MoodMelody/i)).toBeInTheDocument();

  // Check if the button is rendered
  const backButton = screen.getByRole("button", { name: /Back to Playlist/i });
  expect(backButton).toBeInTheDocument();
});

test("navigates back to playlist on button click", () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(
    <Router location={history.location} navigator={history}>
      <About />
    </Router>
  );

  const backButton = screen.getByRole("button", { name: /Back to Playlist/i });
  fireEvent.click(backButton);

  expect(history.push).toHaveBeenCalledWith(
    expect.objectContaining({ pathname: "/playlist", hash: "", search: "" }),
    expect.anything(),
    expect.anything()
  );
});
