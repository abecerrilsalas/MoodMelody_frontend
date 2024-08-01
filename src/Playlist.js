import React from "react";
import { useLocation } from "react-router-dom";

const Playlist = () => {
  const location = useLocation();
  const { recommendations, spotifyLink } = location.state || {
    recommendations: [],
    spotifyLink: null,
  };

  return (
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
  );
};

export default Playlist;

// import React from "react";
// import { useLocation } from "react-router-dom";

// const Playlist = () => {
//   const location = useLocation();
//   const { recommendations, spotifyLink } = location.state || {
//     recommendations: [],
//     spotifyLink: null,
//   };

//   return (
//     <div>
//       {recommendations.length > 0 && (
//         <div>
//           <h2>Recommendations</h2>
//           <ul>
//             {recommendations.map((rec, index) => (
//               <li key={index}>{rec}</li>
//             ))}
//           </ul>
//           {spotifyLink && (
//             <div>
//               <h2>Spotify Playlist</h2>
//               <p>
//                 <a href={spotifyLink} target="_blank" rel="noopener noreferrer">
//                   Open Playlist on Spotify
//                 </a>
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Playlist;
