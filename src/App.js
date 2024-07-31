import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import TextInput from "./TextInput";
import Button from "./Button";
import Rectangle1 from "./Rectangle1";
import "./App.css";

function App() {
  const [description, setDescription] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [spotifyLink, setSpotifyLink] = useState(null);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get("session_id");
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }
  }, []);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/recommend`,
        { description },
        { params: { session_id: sessionId } }
      );
      if (response && response.data) {
        if (response.data.authorized) {
          setRecommendations(response.data.recommendation);
          setSpotifyLink(response.data.spotify_link);
          setError(null);
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } else {
        console.error("Unexpected response structure:", response);
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setError("Error fetching recommendation. Please try again.");
      if (error.response && error.response.status === 401) {
        setAuthorized(false);
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="App">
      <Header />
      <Rectangle1
        title="Mood Melody"
        description="Discover music that fits your mood. + add description"
      />

      <TextInput
        value={description}
        onChange={handleInputChange}
        placeholder="Enter the desired song qualities or mood..."
      />
      <br />
      <Button
        type="button"
        label={loading ? "Loading..." : "Get Recommendations"}
        onClick={handleGetRecommendations}
        disabled={loading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!authorized && (
        <div>
          <p style={{ color: "red" }}>You are not authorized in Spotify.</p>
          <Button
            type="button"
            label="Authorize"
            onClick={() =>
              (window.location.href = "http://localhost:5000/auth/login")
            }
          />
        </div>
      )}
      {authorized && recommendations.length > 0 && (
        <div>
          <h2>Recommendations</h2>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
          {spotifyLink && (
            <div>
              <h2>Spotify Playlist</h2>
              <p>
                <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
                  Open Playlist on Spotify
                </a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
