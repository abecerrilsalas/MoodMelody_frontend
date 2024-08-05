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

  it("displays the correct value", () => {
    const value = "Test value";
    render(<TextInput value={value} />);
    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("calls onChange when text is entered", () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("applies the correct CSS class", () => {
    render(<TextInput />);
    expect(screen.getByRole("textbox")).toHaveClass("text-input");
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
