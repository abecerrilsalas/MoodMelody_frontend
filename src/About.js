import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const handleAuthorize = () => {
        // Redirect to backend authorization endpoint
        window.location.href = "http://127.0.0.1:5000/auth/login";
    };

    return (
        <div>
            <h1>About Mood Melody</h1>
            <h1>Welcome to Mood Melody!</h1>
            <p>
                <strong>Mood Melody</strong> is a unique music recommendation app designed to tailor Spotify playlists based on your current mood or desired musical atmosphere. Here's how you can enjoy a custom playlist experience:
            </p>
            <ol>
                <li><strong>Authorize Your Spotify Account:</strong> Securely link your Spotify account to allow Mood Melody to generate playlists and access songs that fit your mood descriptions.</li>
                <li><strong>Describe Your Mood:</strong> Navigate to the recommendation page and describe what you're feeling or the type of music you're looking for. Whether it's "relaxing jazz evening" or "high-energy rock", just type it in.</li>
                <li><strong>Get Recommendations:</strong> Click the "Get Recommendations" button to let Mood Melody use advanced AI to suggest songs that align with your input.</li>
                <li><strong>Enjoy Your Playlist:</strong> View your custom playlist on the next page. You can listen to the songs directly within the app or open your playlist in Spotify to enjoy it there.</li>
                <li><strong>Continuous Discovery:</strong> Ready for more? Just enter another mood or song description for new recommendations without needing to reauthorize or leave the playlist page.</li>
            </ol>
            <p>
                Mood Melody is the perfect companion for those looking to explore new music or for anyone who wants their music to match their mood without the hassle of searching. Let Mood Melody create the perfect soundtrack for any part of your day!
            </p>
            <button onClick={handleAuthorize}>Authorize with Spotify</button>
        </div>
    );
};

export default About;
