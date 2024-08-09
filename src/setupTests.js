import "@testing-library/jest-dom";
import axios from "axios";
import { jest } from "@jest/globals";

// Load environment variables
require("dotenv").config({ path: "./.env.test" });

// Mock axios globally
jest.mock("axios");

// Global configuration for axios mocks
beforeEach(() => {
  axios.post.mockResolvedValue({
    data: {
      authorized: true,
      recommendation: ["Song1", "Song2"],
      spotify_link: "http://spotify.com/playlist/123",
    },
  });
});

// Mocking window.location.assign globally
beforeEach(() => {
  delete window.location;
  window.location = { assign: jest.fn() };
});

afterEach(() => {
  // Clear mocks after each test
  jest.clearAllMocks();
});
