import "@testing-library/jest-dom";
import axios from "axios";
import { jest } from "@jest/globals";

// Mock axios
jest.mock("axios");

beforeEach(() => {
  axios.post.mockResolvedValue({
    data: {
      authorized: true,
      recommendation: ["Song1", "Song2"],
      spotify_link: "http://spotify.com/playlist/123",
    },
  });
});
