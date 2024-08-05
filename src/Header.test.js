import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  // renders
  test("renders without crashing", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toBeInTheDocument();
  });

  // check logo renders
  test("renders logo with correct src and alt text", () => {
    render(<Header />);
    const logo = screen.getByRole("img", { name: /mood melody logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/images/logo.jpg");
    expect(logo).toHaveAttribute("alt", "Mood Melody logo");
  });

  // cheks that title shows up
  test('displays the correct title "Mood Melody"', () => {
    render(<Header />);
    const title = screen.getByText("Mood Melody");
    expect(title).toBeInTheDocument(); // checking its in the document
    expect(title).toBeVisible(); // checks its visible
  });

  // checks the description shows up
  test("displays the correct description", () => {
    render(<Header />);
    const description = screen.getByText(/discover music that fits your mood/i);
    expect(description).toBeInTheDocument();
    expect(description).toBeVisible();
  });
});
