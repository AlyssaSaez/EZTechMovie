import React, { useState } from 'react';
import { useWatchlist } from '../watchlist/WatchlistContext';
import { imgUrl } from '../api/tmdb';

export default function WatchlistItem({ movie }) {
  const { remove, toggleWatched, updateTitle } = useWatchlist();
  const [editing, setEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(movie.title || 'Untitled');

  function save() {
    const clean = tempTitle.trim();
    if (clean && clean !== movie.title) updateTitle(movie.id, clean);
    setEditing(false);
  }

  return (
    <li className={`wl-item checklist ${movie.watched ? 'wl-watched' : ''}`}>
      {/* circle check control */}
      <button
        className={`wl-check ${movie.watched ? 'is-checked' : ''}`}
        aria-pressed={movie.watched}
        aria-label={movie.watched ? 'Mark unwatched' : 'Mark watched'}
        onClick={() => toggleWatched(movie.id)}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* poster (small) */}
      <div className="wl-poster mini">
        {movie.poster_path ? (
          <img src={imgUrl(movie.poster_path, 'w185')} alt={`${movie.title} poster`} />
        ) : (
          <div className="wl-poster--empty">No image</div>
        )}
      </div>

      {/* main content */}
      <div className="wl-body">
        <div className="wl-title-row">
          {editing ? (
            <input
              className="input wl-title-input"
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && save()}
              autoFocus
            />
          ) : (
            <h3 className="wl-title">{movie.title}</h3>
          )}
        </div>

        {movie.overview && <p className="wl-overview">{movie.overview}</p>}
      </div>

      {/* icon actions */}
      <div className="wl-actions icons">
        {editing ? (
          <>
            <button className="icon-btn" onClick={save} aria-label="Save title">
              {/* save (check) */}
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M20 6L9 17l-5-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="icon-btn" onClick={() => setEditing(false)} aria-label="Cancel edit">
              {/* cancel (x) */}
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </>
        ) : (
          <button className="icon-btn" onClick={() => setEditing(true)} aria-label="Edit title">
            {/* pencil */}
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path d="M3 21l3.75-.6L20 7.15 16.85 4 4.35 16.5 3 21z" fill="currentColor" />
            </svg>
          </button>
        )}

        <button className="icon-btn danger" onClick={() => remove(movie.id)} aria-label="Remove from watchlist">
          {/* trash */}
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M3 6h18M8 6V4h8v2m-9 3l1 11h8l1-11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
