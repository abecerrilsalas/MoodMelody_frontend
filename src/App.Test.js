import { render, screen, test } from "@testing-library/react";
import { expect } from "@testing-library/jest-dom"; // Add this line
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
