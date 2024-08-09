import React from "react";

const SpotifyPlayer = ({ spotifyLink }) => {
  console.log("Spotify Link in Player:", spotifyLink);
  // Extracting the playlist ID from the URL
  const playlistId = spotifyLink.split("/").pop();
  console.log("Extracted Playlist ID:", playlistId);
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;

  return (
    <iframe
      src={embedUrl}
      width="300"
      height="380"
      frameBorder="0"
      allowTransparency="true"
      allow="encrypted-media"
      title="Spotify"
      style={{ width: "100%", maxWidth: "600px" }}
    ></iframe>
  );
};

export default SpotifyPlayer;
