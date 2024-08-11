import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SpotifyPlayer from "./SpotifyPlayer";
import TextInput from "./TextInput";
import Button from "./Button";
import Header from "./Header";
import "./Playlist.css";

const apiUrl = process.env.REACT_APP_API_URL;

const RequestHistory = ({ history, onSelectRequest }) => (
  <div className="request-history">
    <h3>Request History</h3>
    <ul>
      {history.map((item, index) => (
        <li key={index} onClick={() => onSelectRequest(item)}>
          {item.description} - {new Date(item.timestamp).toLocaleString()}
        </li>
      ))}
    </ul>
  </div>
);

const Playlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { spotifyLink, sessionId } = location.state || {
    spotifyLink: null,
    sessionId: null,
  };

  const [description, setDescription] = useState(
    localStorage.getItem("description") || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSpotifyLink, setCurrentSpotifyLink] = useState(
    localStorage.getItem("currentSpotifyLink") || spotifyLink
  );
  const [requestHistory, setRequestHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("requestHistory");
    if (storedHistory) {
      setRequestHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("description", description);
  }, [description]);

  useEffect(() => {
    localStorage.setItem("currentSpotifyLink", currentSpotifyLink);
  }, [currentSpotifyLink]);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/recommend`,
        {
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            session_id: sessionId,
          },
        }
      );

      if (response.data.spotify_link) {
        setCurrentSpotifyLink(response.data.spotify_link);
        const newRequest = {
          description,
          spotifyLink: response.data.spotify_link,
          timestamp: new Date().toISOString(),
        };
        const updatedHistory = [...requestHistory, newRequest];
        setRequestHistory(updatedHistory);
        localStorage.setItem("requestHistory", JSON.stringify(updatedHistory));
      } else {
        setError(
          "Failed to fetch recommendations. No Spotify link found in the response."
        );
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError(`Error fetching recommendation: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError("");

    await getRecommendations();
  };

  const handleSelectRequest = (request) => {
    setCurrentSpotifyLink(request.spotifyLink);
    setDescription(request.description);
  };

  return (
    <div className="playlist-page">
      <Header />
      <main className="playlist-container">
        <div className="input-section">
          <h2>Enter Your Mood</h2>
          <TextInput
            value={description}
            onChange={handleInputChange}
            placeholder="Enter the desired song qualities or mood..."
          />
          <Button
            label={loading ? "Loading..." : "Get Recommendations"}
            onClick={handleGetRecommendations}
            disabled={loading}
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="player-section">
          {currentSpotifyLink ? (
            <>
              <SpotifyPlayer
                key={currentSpotifyLink}
                spotifyLink={currentSpotifyLink}
              />
              <a
                href={currentSpotifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="spotify-link"
              >
                Open Full Playlist on Spotify
              </a>
            </>
          ) : (
            <p>
              No playlist selected yet. Get recommendations to see a playlist
              here!
            </p>
          )}
        </div>
        <RequestHistory
          history={requestHistory}
          onSelectRequest={handleSelectRequest}
        />
        <div className="about-button-container">
          <Button label="About MoodMelody" onClick={() => navigate("/about")} />
        </div>
      </main>
    </div>
  );
};

export default Playlist;
