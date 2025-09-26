import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to EZTechMovie</h1>
      <p>Start by picking a subscription or adding some accessories.</p>
      <div className="grid">
        <Link to="/subscriptions" className="card">Browse Subscriptions</Link>
        <Link to="/accessories" className="card">Browse Accessories</Link>
      </div>
    </div>
  );
}
