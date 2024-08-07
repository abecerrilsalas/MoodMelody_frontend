import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Playlist from "./Playlist";
import About from "./About";
import Header from "./Header";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlist" element={<Playlist />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
