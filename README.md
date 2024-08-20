# MoodMelody Frontend

MoodMelody is a web application that provides personalized music recommendations based on your mood. The frontend is built with React and connects to a Flask backend that leverages GPT-4 for generating music suggestions and integrates with the Spotify API to create playlists.

## Table of Contents

- [MoodMelody Frontend](#moodmelody-frontend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Deployment](#deployment)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- Git

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abecerrilsalas/MoodMelody_frontend.git
   cd MoodMelody_frontend


2. **Install dependencies:**

   ```bash
    npm install

3. **Create a `.env` file in the root directory and add the following environment variables:**

   ```bash
   NODE_ENV=development
   REACT_APP_API_URL=<backend-url>
   Replace <backend-url> with the URL of the Flask backend.

### Running the Application

1. **Start the development server:**

   ```bash
   npm start

   this will start the development server at `http://localhost:3000`.

## Project Structure
The project structure is as follows:

```
moodmelody-frontend/
│
├── public/
│   ├── index.html
│   └── ...
│
├── src/
│   ├── assets/          # Images, logos, etc.
│   ├── components/      # Reusable components like Button, Header, Footer
│   ├── pages/           # Different pages of the application (Home, About, Playlist)
│   ├── App.js           # Main App component
│   ├── index.js         # Entry point of the React application
│   ├── App.css          # Global styles
│   ├── index.css        # Global styles
│   └── ...
│
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # This file

```

## Features

* **Mood-based Music Recommendations**: Enter your mood, and get a personalized playlist.
* **Spotify Integration**: Directly save recommended playlists to your Spotify account.
* **Responsive Design**: Optimized for various screen sizes using Flexbox and CSS Grid.
* **Persistent State**: Retain user inputs and playlist selections when navigating through pages.


## Technologies Used
* **React**: JavaScript library for building user interfaces.
* **React Router**: For navigation between pages.
* **Axios**: For making API requests to the backend.
* **CSS**: For layout management.
* **Jest and React Testing Library**: For testing components and hooks.

## Testing

To run tests, use the following command:

```bash
npm test
```
Mock API calls to avoid making actual requests during tests. Tests are located adjacent to their corresponding source files.

## Deployment
Deployment with GitHub Pages (or any preferred service)
1. **Build the application:**

   ```bash
   npm run build

2. **Set up Heroku CLI:**
If you haven't already, install the Heroku CLI and log in to your Heroku account using:

    ```bash
    heroku login

3. **Create a new Heroku app:**

    ```bash
    heroku create <app-name>

4. **Set Heroku environment variables:** 

    ```bash
    heroku config:set REACT_APP_API_URL=<backend-url>  

Replace <backend-url> with the actual URL of your deployed backend.

5. **Deploy to Heroku:**

    ```bash
    git add .
    git commit -m "Deploying to Heroku"
    git push heroku main
    