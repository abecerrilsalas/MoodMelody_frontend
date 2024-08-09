import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders Footer component correctly", () => {
  render(<Footer />);

  // Check if footer is rendered
  const footerText = screen.getByText(
    /© 2024 Mood Melody. All rights reserved./i
  );
  expect(footerText).toBeInTheDocument();
});
