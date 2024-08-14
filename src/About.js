import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Button from "./Button";
import './About.css'; 

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const playlistState = location.state || {};

  const navigateBack = () => {
    navigate("/playlist", { state: playlistState });
  };

  return (
    <div>
      <Header />
      <div className="about-content">
        <h1>About MoodMelody</h1>
        <p>
          Mood Melody was born out of a shared passion for music and technology. The idea sparked during a late-night brainstorming session when we realized how challenging it can be to find the perfect playlist that matches our ever-changing moods. We wanted to create an app that takes the guesswork out of music selection and offers a personalized experience that feels like it knows you better than your own playlist history!
        </p>
        <p>
          The Mood Melody team is a dynamic duo of tech enthusiasts who are equally passionate about creating delightful user experiences and exploring the endless possibilities of AI. Together, we’ve combined our expertise to bring you an app that not only understands your mood but also delivers the perfect tunes to match it.
        </p>
        <p>
          <strong>Masha</strong> is a backend wizard with a knack for turning complex algorithms into seamless user experiences. She’s the brains behind the AI integration and the one who ensures that Mood Melody runs as smoothly as your favorite chill playlist. When she’s not coding, you can find Masha exploring new tech trends or listening to the latest indie tracks.
        </p>
        <p>
          <strong>Alma</strong> is the creative force behind Mood Melody’s sleek design and user-friendly interface. With a background in UI/UX design, Alma makes sure that every interaction with Mood Melody feels intuitive and enjoyable. She’s also the one who adds that special touch of magic to the app, making sure it not only works great but looks great too. When she’s not designing, Alma enjoys curating playlists of her own and discovering new artists.
        </p>
        <p>We’re thrilled to share Mood Melody with you and hope it becomes your go-to app for all your musical needs. Whether you’re winding down after a long day or gearing up for an intense workout, Mood Melody is here to set the perfect soundtrack for every moment.</p>
        <h2>Thank you!</h2>
        <Button label="Back to Playlist" onClick={navigateBack} />
      </div>

      <Footer />
    </div>
  );
};

export default About;