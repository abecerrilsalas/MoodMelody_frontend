import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SpotifyPlayer from "./SpotifyPlayer";
import TextInput from "./TextInput";
import Button from "./Button";
import Header from "./Header";
import "./Playlist.css";

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
  const { spotifyLink } = location.state || { spotifyLink: null };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentSpotifyLink, setCurrentSpotifyLink] = useState(spotifyLink);
  const [debugInfo, setDebugInfo] = useState("");
  const [requestHistory, setRequestHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("requestHistory");
    if (storedHistory) {
      setRequestHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleInputChange = (e) => {
    console.log("Input changed:", e.target.value);
    setDescription(e.target.value);
  };

  const getRecommendations = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        {
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("API response:", response.data);
      setDebugInfo(`API response: ${JSON.stringify(response.data, null, 2)}`);

      if (response.data.spotifyLink) {
        setCurrentSpotifyLink(response.data.spotifyLink);
        const newRequest = {
          description,
          spotifyLink: response.data.spotifyLink,
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
    console.log("Get recommendations clicked");
    setLoading(true);
    setError("");
    setDebugInfo("");

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
          {debugInfo && (
            <div className="debug-info">
              <h3>Debug Info:</h3>
              <pre>{debugInfo}</pre>
            </div>
          )}
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
      </main>
    </div>
  );
};

export default Playlist;

// below is before the history stuff
// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import SpotifyPlayer from "./SpotifyPlayer";
// import TextInput from "./TextInput";
// import Button from "./Button";
// import Header from "./Header";
// import "./Playlist.css";

// const Playlist = () => {
//   const location = useLocation();
//   const { spotifyLink } = location.state || { spotifyLink: null };

//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentSpotifyLink, setCurrentSpotifyLink] = useState(spotifyLink);
//   const [debugInfo, setDebugInfo] = useState("");

//   const handleInputChange = (e) => {
//     console.log("Input changed:", e.target.value);
//     setDescription(e.target.value);
//   };

//   const getRecommendations = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/recommend",
//         {
//           description,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("API response:", response.data);
//       setDebugInfo(`API response: ${JSON.stringify(response.data, null, 2)}`);

//       if (response.data.spotifyLink) {
//         setCurrentSpotifyLink(response.data.spotifyLink);
//       } else {
//         setError(
//           "Failed to fetch recommendations. No Spotify link found in the response."
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching recommendation:", error);
//       setError(`Error fetching recommendation: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetRecommendations = async () => {
//     console.log("Get recommendations clicked");
//     setLoading(true);
//     setError("");
//     setDebugInfo("");

//     await getRecommendations();
//   };

//   return (
//     <div className="playlist-page">
//       <Header />
//       <main className="playlist-container">
//         <div className="input-section">
//           <h2>Enter Your Mood</h2>
//           <TextInput
//             value={description}
//             onChange={handleInputChange}
//             placeholder="Enter the desired song qualities or mood..."
//           />
//           <Button
//             label={loading ? "Loading..." : "Get Recommendations"}
//             onClick={handleGetRecommendations}
//             disabled={loading}
//           />
//           {error && <p className="error-message">{error}</p>}
//           {debugInfo && (
//             <div className="debug-info">
//               <h3>Debug Info:</h3>
//               <pre>{debugInfo}</pre>
//             </div>
//           )}
//         </div>
//         <div className="player-section">
//           {currentSpotifyLink ? (
//             <>
//               <SpotifyPlayer
//                 key={currentSpotifyLink}
//                 spotifyLink={currentSpotifyLink}
//               />
//               <a
//                 href={currentSpotifyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="spotify-link"
//               >
//                 Open Full Playlist on Spotify
//               </a>
//             </>
//           ) : (
//             <p>
//               No playlist selected yet. Get recommendations to see a playlist
//               here!
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Playlist;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import SpotifyPlayer from "./SpotifyPlayer";
// import TextInput from "./TextInput";
// import Button from "./Button";
// import Header from "./Header";
// import "./Playlist.css";

// const Playlist = () => {
//   const location = useLocation();
//   const { spotifyLink } = location.state || { spotifyLink: null };

//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentSpotifyLink, setCurrentSpotifyLink] = useState(spotifyLink);
//   const [debugInfo, setDebugInfo] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     console.log("Component mounted. Initial state:", {
//       description,
//       loading,
//       error,
//       spotifyLink,
//     });
//     checkAuthStatus();
//   }, []);

//   const handleInputChange = (e) => {
//     console.log("Input changed:", e.target.value);
//     setDescription(e.target.value);
//   };

//   const checkAuthStatus = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/auth/status");
//       setIsAuthenticated(response.data.is_authenticated);
//     } catch (error) {
//       console.error("Error checking auth status:", error);
//     }
//   };

//   const handleAuthentication = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:5000/auth/login", {
//         withCredentials: true,
//       });
//       if (response.data.success) {
//         setIsAuthenticated(true);
//         await getRecommendations();
//       } else {
//         setError("Authentication failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error during authentication:", error);
//       setError("Authentication failed. Please try again.");
//     }
//   };

//   const getRecommendations = async () => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:5000/recommend",
//         {
//           description,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       console.log("API response:", response.data);
//       setDebugInfo(`API response: ${JSON.stringify(response.data, null, 2)}`);

//       if (response.data.spotifyLink) {
//         setCurrentSpotifyLink(response.data.spotifyLink);
//       } else {
//         setError(
//           "Failed to fetch recommendations. No Spotify link found in the response."
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching recommendation:", error);
//       setError(`Error fetching recommendation: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetRecommendations = async () => {
//     console.log("Get recommendations clicked");
//     setLoading(true);
//     setError("");
//     setDebugInfo("");

//     if (!isAuthenticated) {
//       const authSuccess = await handleAuthentication();
//       if (!authSuccess) {
//         setError("Authentication failed. Please try again.");
//         setLoading(false);
//         return;
//       }
//     }
//     await getRecommendations();
//     setLoading(false);
//   };

//   return (
//     <div className="playlist-page">
//       <Header />
//       <main className="playlist-container">
//         <div className="input-section">
//           <h2>Enter Your Mood</h2>
//           <TextInput
//             value={description}
//             onChange={handleInputChange}
//             placeholder="Enter the desired song qualities or mood..."
//           />
//           <Button
//             label={
//               loading
//                 ? "Loading..."
//                 : isAuthenticated
//                 ? "Get Recommendations"
//                 : "Login and Get Recommendations"
//             }
//             onClick={handleGetRecommendations}
//             disabled={loading}
//           />
//           {error && <p className="error-message">{error}</p>}
//           {debugInfo && (
//             <div className="debug-info">
//               <h3>Debug Info:</h3>
//               <pre>{debugInfo}</pre>
//             </div>
//           )}
//         </div>
//         <div className="player-section">
//           {currentSpotifyLink ? (
//             <>
//               <SpotifyPlayer spotifyLink={currentSpotifyLink} />
//               <a
//                 href={currentSpotifyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="spotify-link"
//               >
//                 Open Full Playlist on Spotify
//               </a>
//             </>
//           ) : (
//             <p>
//               No playlist selected yet. Get recommendations to see a playlist
//               here!
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Playlist;
