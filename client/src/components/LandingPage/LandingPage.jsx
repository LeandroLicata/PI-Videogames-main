import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to the Videogames Page</h1>
      <Link to="/videogames">
        <button>Log In</button>
      </Link>
    </div>
  );
}
