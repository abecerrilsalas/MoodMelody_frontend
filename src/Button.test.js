import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  test("renders button with label", () => {
    render(<Button label="Click me" />);
    const buttonElement = screen.getByRole("button", { name: "Click me" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    const buttonElement = screen.getByRole("button", { name: "Click me" });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("displays loading state correctly", () => {
    render(<Button label="Submit" loading={true} />);
    const buttonElement = screen.getByRole("button", { name: "Loading..." });
    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveTextContent("Loading...");
  });

  test("handles large button styling", () => {
    render(<Button label="Big Button" large={true} />);
    const buttonElement = screen.getByRole("button", { name: "Big Button" });
    expect(buttonElement).toHaveClass("largeButton");
  });
});
