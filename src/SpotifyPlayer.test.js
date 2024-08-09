import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SpotifyPlayer from "./SpotifyPlayer";

describe("SpotifyPlayer", () => {
  const mockSpotifyLink =
    "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";

  it("renders without crashing", () => {
    render(<SpotifyPlayer spotifyLink={mockSpotifyLink} />);
    const iframeElement = screen.getByTitle("Spotify");
    expect(iframeElement).toBeInTheDocument();
  });

  it("extracts playlist ID correctly and constructs proper embed URL", () => {
    render(<SpotifyPlayer spotifyLink={mockSpotifyLink} />);
    const iframeElement = screen.getByTitle("Spotify");
    expect(iframeElement).toHaveAttribute(
      "src",
      "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
    );
  });

  it("has correct attributes", () => {
    render(<SpotifyPlayer spotifyLink={mockSpotifyLink} />);
    const iframeElement = screen.getByTitle("Spotify");
    expect(iframeElement).toHaveAttribute("width", "300");
    expect(iframeElement).toHaveAttribute("height", "380");
    expect(iframeElement).toHaveAttribute("frameBorder", "0");
    expect(iframeElement).toHaveAttribute("allow", "encrypted-media");
  });

  it("applies correct styles", () => {
    render(<SpotifyPlayer spotifyLink={mockSpotifyLink} />);
    const iframeElement = screen.getByTitle("Spotify");
    expect(iframeElement).toHaveStyle({
      width: "100%",
      maxWidth: "600px",
    });
  });

  it("handles different playlist IDs", () => {
    const anotherMockLink = "https://open.spotify.com/playlist/1234567890";
    render(<SpotifyPlayer spotifyLink={anotherMockLink} />);
    const iframeElement = screen.getByTitle("Spotify");
    expect(iframeElement).toHaveAttribute(
      "src",
      "https://open.spotify.com/embed/playlist/1234567890"
    );
  });
});
