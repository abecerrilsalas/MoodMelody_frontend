import React from "react";

const SpotifyPlayer = ({ spotifyLink }) => {
  // Extracting the playlist ID from the URL
  const playlistId = spotifyLink.split("/").pop();
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;

  return (
    <iframe
      src={embedUrl}
      width="300"
      height="380"
      frameBorder="0"
      allow="encrypted-media"
      title="Spotify"
      style={{ width: "100%", maxWidth: "600px" }}
    ></iframe>
  );
};

export default SpotifyPlayer;
