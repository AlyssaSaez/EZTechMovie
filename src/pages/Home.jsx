import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to EZTechMovie</h1>
      <p className="muted" style={{ marginTop: '-0.5rem' }}>
        Manage subscriptions, accessories, discover movies & build your Streamlist.
      </p>

      <div className="grid" style={{ marginTop: '1.25rem' }}>
        {/* New tiles */}
        <Link to="/movies" className="card">
          <div className="row">
            <h3>Search for Movies</h3>
          </div>
          <button>Open Movies</button>
        </Link>

        <Link to="/watchlist" className="card">
          <div className="row">
            <h3>View Your Streamlist</h3>
          </div>
          <button>Open Watchlist</button>
        </Link>

        {/* Existing app tiles (keep or arrange as you like) */}
        <Link to="/subscriptions" className="card">
          <div className="row">
            <h3>Subscriptions</h3>
          </div>
          <button>Browse Subscriptions</button>
        </Link>

        <Link to="/accessories" className="card">
          <div className="row">
            <h3>Accessories</h3>
          </div>
          <button>Browse Accessories</button>
        </Link>
      </div>
    </div>
  );
}
