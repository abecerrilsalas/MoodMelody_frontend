import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import SpotifyPlayer from "./SpotifyPlayer";
import TextInput from "./TextInput";
import Button from "./Button";
import Header from "./Header";
import "./Playlist.css";
import "./Landing.css";

const apiUrl = process.env.REACT_APP_API_URL;

const RequestHistory = ({ history, onSelectRequest, onAboutClick }) => (
  <div className="request-history">
    <h3>Request History</h3>
    <div className="history-list">
      <ul>
        {history.map((item, index) => (
          <li key={index} onClick={() => onSelectRequest(item)}>
            {item.description} - {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
    <div className="about-button-container">
      <Button label="About MoodMelody" onClick={onAboutClick} />
    </div>
  </div>
);

const Playlist = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { spotifyLink, sessionId, description, initialHistory } =
    location.state || {};

  const [currentDescription, setCurrentDescription] = useState(
    description || ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSpotifyLink, setCurrentSpotifyLink] = useState(spotifyLink);
  const [requestHistory, setRequestHistory] = useState(initialHistory || []);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const fetchHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/history`, {
        params: { session_id: sessionId },
      });
      setRequestHistory(response.data);
    } catch (error) {
      console.error("Error fetching history:", error);
      setError("Failed to fetch request history.");
    }
  }, [sessionId]);

  useEffect(() => {
    if (!initialHistory) {
      fetchHistory();
    }
    if (spotifyLink) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowPlaylist(true);
      }, 5000);
    }
  }, [fetchHistory, spotifyLink, initialHistory]);

  const handleInputChange = (e) => {
    setCurrentDescription(e.target.value);
  };

  const getRecommendations = async () => {
    setLoading(true);
    setShowPlaylist(false);
    try {
      const response = await axios.post(
        `${apiUrl}/recommend`,
        {
          description: currentDescription,
        },
        {
          params: {
            session_id: sessionId,
          },
        }
      );

      if (response.data.spotify_link) {
        setCurrentSpotifyLink(response.data.spotify_link);
        setTimeout(() => {
          setLoading(false);
          setShowPlaylist(true);
        }, 5000);
        await fetchHistory(); // Fetch updated history after new recommendation
      } else {
        setError(
          "Failed to fetch recommendations. No Spotify link found in the response."
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError(`Error fetching recommendation: ${error.message}`);
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    setError("");
    await getRecommendations();
  };

  const handleSelectRequest = (request) => {
    setCurrentSpotifyLink(request.spotifyLink);
    setCurrentDescription(request.description);
    setShowPlaylist(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPlaylist(true);
    }, 5000);
  };

  const navigateToAbout = () => {
    navigate("/about", {
      state: {
        spotifyLink: currentSpotifyLink,
        sessionId: sessionId,
        description: currentDescription,
        requestHistory: requestHistory,
        showPlaylist: showPlaylist,
      },
    });
  };

  return (
    <div className="playlist-page">
      <Header />
      <main className="playlist-container">
        <div className="input-section">
          <h2>Enter Your Mood</h2>
          <TextInput
            value={currentDescription}
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
          {loading ? (
            <p>Loading your Playlist...</p>
          ) : showPlaylist && currentSpotifyLink ? (
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
          onAboutClick={navigateToAbout}
        />
      </main>
    </div>
  );
};

export default Playlist;
