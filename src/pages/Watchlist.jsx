import React from 'react';
import { useWatchlist } from '../watchlist/WatchlistContext';
import WatchlistItem from '../components/WatchlistItem';

export default function Watchlist() {
  const { list, clear } = useWatchlist();

  return (
    <div className="page">
      <h1>Your Watchlist</h1>

      {list.length === 0 ? (
        <p className="muted">No movies added yet. Find some on the Movies page.</p>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
            <button className="link" onClick={clear}>Clear Watchlist</button>
          </div>

          <ul className="wl-list">
            {list.map((m) => (
              <WatchlistItem key={m.id} movie={m} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
