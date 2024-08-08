import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";

const About = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { sessionId, requestHistory, currentSpotifyLink, description } =
        location.state || {};

    const navigateBack = () => {
        navigate("/playlist", {
            state: {
                sessionId,
                requestHistory,
                currentSpotifyLink,
                description,
            },
        });
    };

    return (
        <div>
            <Header />
            <main className="about-content">
                <h1>About MoodMelody</h1>
                <p>Insert here the story about how the idea came about.</p>
                <p>Insert here a little blurb about the team.</p>
                <p>maybe add some pics?</p>
                <p>Insert here a little blurb about Masha.</p>
                <p>Insert here a little blurb about Alma.</p>
                <h2>Thank you!</h2>
                <Button label="Back to Playlist" onClick={navigateBack} />
            </main>
            <Footer />
        </div>
    );
};

export default About;
