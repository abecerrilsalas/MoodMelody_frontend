import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const [description, setDescription] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionIdParam = urlParams.get("session_id");
    if (sessionIdParam) {
      setSessionId(sessionIdParam);
    }

    const savedDescription = localStorage.getItem("description");
    if (savedDescription) {
      setDescription(savedDescription);
    }
  }, []);

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const fetchHistory = async (sessionId) => {
    try {
      const response = await axios.get(`${apiUrl}/history`, {
        params: { session_id: sessionId },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching history:", error);
      return [];
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    localStorage.setItem("description", description);
    try {
      const response = await axios.post(
        `${apiUrl}/recommend`,
        { description },
        { params: { session_id: sessionId } }
      );
      if (response && response.data) {
        if (response.data.authorized) {
          setError(null);
          setAuthorized(true);
          const history = await fetchHistory(sessionId);
          navigate("/playlist", {
            state: {
              recommendations: response.data.recommendation,
              spotifyLink: response.data.spotify_link,
              sessionId: sessionId,
              description: description,
              playlistId: response.data.playlist_id,
              userId: response.data.user_id,
              initialHistory: history,
            },
          });
          localStorage.removeItem("description");
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
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
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
            onClick={() => (window.location.href = `${apiUrl}/auth/login`)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
