// src/pages/Watchlist.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../watchlist/WatchlistContext";
import WatchlistItem from "../components/WatchlistItem";

export default function Watchlist() {
  const { list, clear } = useWatchlist();

  const isEmpty = list.length === 0;
  const remaining = list.reduce((acc, m) => acc + (m.watched ? 0 : 1), 0);

  return (
    <div className="page">
      <h1>Your StreamList</h1>

      {isEmpty ? (
        // Empty state with link to Movies page
        <p className="muted">
          No movies added yet — find some on the{" "}
          <Link
            to="/movies"
            style={{
              color: "#f0c27b",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Movies
          </Link>{" "}
          page.
        </p>
      ) : (
        <>
          {/* Remaining count */}
          <p
            className="muted"
            aria-live="polite"
            aria-atomic="true"
            style={{ marginTop: "-0.25rem" }}
          >
            {remaining} {remaining === 1 ? "movie" : "movies"} remaining
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "1rem",
            }}
          >
            <button className="link" onClick={clear}>
              Clear Streamlist
            </button>
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
