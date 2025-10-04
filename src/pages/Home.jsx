// src/pages/Home.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import TrendingCarousel from "../components/TrendingCarousel";

export default function Home() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleSignOut() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="page">
      <h1>Welcome to EZTechMovie</h1>
      <p className="muted" style={{ marginTop: "-0.5rem" }}>
        Manage subscriptions, accessories, discover movies & build your
        Streamlist.
      </p>
      <TrendingCarousel title="Trending Movies" />
      <div className="grid" style={{ marginTop: "1.25rem" }}>
        {/* Movies */}
        <Link to="/movies" className="card">
          <div className="row">
            <h3>Search for Movies</h3>
          </div>
          <p>
            Browse popular titles or search. Add favorites to your Streamlist.
          </p>
          <button>Open Movies</button>
        </Link>

        {/* Watchlist */}
        <Link to="/watchlist" className="card">
          <div className="row">
            <h3>View Your Streamlist</h3>
          </div>
          <p>
            Track what you want to watch. Mark watched, edit titles, or remove.
          </p>
          <button>Open Streamlist</button>
        </Link>

        {/* Subscriptions */}
        <Link to="/subscriptions" className="card">
          <div className="row">
            <h3>Subscriptions</h3>
          </div>
          <p>Choose a streaming subscription.</p>
          <button>Browse Subscriptions</button>
        </Link>

        {/* Accessories */}
        <Link to="/accessories" className="card">
          <div className="row">
            <h3>Accessories</h3>
          </div>
          <p>Add EZTech merch to your cart.</p>
          <button>Browse Accessories</button>
        </Link>

        {/* Cart */}
        <Link to="/cart" className="card">
          <div className="row">
            <h3>Your Cart</h3>
          </div>
          <p>Review items, adjust quantities, and proceed to checkout.</p>
          <button>View Cart</button>
        </Link>

        {/* Sign Out */}
        <div className="card">
          <div className="row">
            <h3>Sign Out</h3>
          </div>
          <p>Finish your session securely and return to the sign-in screen.</p>
          <button className="link" onClick={handleSignOut}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
