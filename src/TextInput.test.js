import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("renders without crashing", () => {
    render(<TextInput />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("displays the correct placeholder", () => {
    const placeholder = "Enter text here...";
    render(<TextInput placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("displays the correct value and is read-only", () => {
    const value = "Test value";
    render(<TextInput value={value} readOnly={true} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue(value);
    expect(input).toHaveAttribute("readOnly");
  });

  it("calls onChange when text is entered", () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies the correct CSS class", () => {
    const className = "text-input"; // Define class name to check
    render(<TextInput className={className} />);
    expect(screen.getByRole("textbox")).toHaveClass(className);
  });

  it("updates value when typing", () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Typed text" } });
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Typed text",
        }),
      })
    );
  });
});
