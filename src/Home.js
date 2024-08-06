import React, { useState, useEffect } from "react";
import axios from "axios";
import TextInput from "./TextInput";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [description, setDescription] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authorized, setAuthorized] = useState(true);
  // const [setRecommendations] = useState([]);
  // const [setSpotifyLink] = useState(null);
  const navigate = useNavigate();

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
        `http://127.0.0.1:5000/recommend`,
        { description },
        { params: { session_id: sessionId } }
      );
      if (response && response.data) {
        if (response.data.authorized) {
          // setRecommendations(response.data.recommendation);
          // setSpotifyLink(response.data.spotify_link);
          setError(null);
          setAuthorized(true);
          navigate("/playlist", {
            state: {
              recommendations: response.data.recommendation,
              spotifyLink: response.data.spotify_link,
            },
          });
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
    <div>
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
              (window.location.href = "http://127.0.0.1:5000/auth/login")
            }
          />
        </div>
      )}
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import TextInput from "./TextInput";
// import Button from "./Button";
// import Rectangle1 from "./Rectangle1";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [description, setDescription] = useState("");
//   const [sessionId, setSessionId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [authorized, setAuthorized] = useState(true);
//   const [recommendations, setRecommendations] = useState([]);
//   const [spotifyLink, setSpotifyLink] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const sessionIdParam = urlParams.get("session_id");
//     if (sessionIdParam) {
//       setSessionId(sessionIdParam);
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     setDescription(e.target.value);
//   };

//   const handleGetRecommendations = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `http://127.0.0.1:5000/recommend`,
//         { description },
//         { params: { session_id: sessionId } }
//       );
//       if (response && response.data) {
//         if (response.data.authorized) {
//           setRecommendations(response.data.recommendation);
//           setSpotifyLink(response.data.spotify_link);
//           setError(null);
//           setAuthorized(true);
//           // Navigate to Playlist page with recommendations and Spotify link
//           navigate("/playlist", {
//             state: {
//               recommendations: response.data.recommendation,
//               spotifyLink: response.data.spotify_link,
//             },
//           });
//         } else {
//           setAuthorized(false);
//         }
//       } else {
//         console.error("Unexpected response structure:", response);
//       }
//     } catch (error) {
//       console.error("Error fetching recommendation:", error);
//       setError("Error fetching recommendation. Please try again.");
//       if (error.response && error.response.status === 401) {
//         setAuthorized(false);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Rectangle1
//         title="Mood Melody"
//         description="Discover music that fits your mood. + add description"
//       />
//       <TextInput
//         value={description}
//         onChange={handleInputChange}
//         placeholder="Enter the desired song qualities or mood..."
//       />
//       <br />
//       <Button
//         type="button"
//         label={loading ? "Loading..." : "Get Recommendations"}
//         onClick={handleGetRecommendations}
//         disabled={loading}
//       />
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {!authorized && (
//         <div>
//           <p style={{ color: "red" }}>You are not authorized in Spotify.</p>
//           <Button
//             type="button"
//             label="Authorize"
//             onClick={() =>
//               (window.location.href = "http://127.0.0.1:5000/auth/login")
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;
