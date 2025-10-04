import React, { useEffect, useState } from 'react';
import { getPopular, searchMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  async function loadPopular() {
    setLoading(true);
    setError('');
    try {
      const data = await getPopular(1);
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
      setError('Failed to load popular movies.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function doSearch(e) {
    e && e.preventDefault();
    setError('');
    if (!q.trim()) return loadPopular();

    setLoading(true);
    try {
      const data = await searchMovies(q.trim(), 1);
      setResults(data.results || []);
    } catch (e) {
      console.error(e);
      setError('Search failed.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <div className="page">
      <h1>Movies</h1>

      <form
        onSubmit={doSearch}
        style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}
      >
        <input
          type="text"
          placeholder="Search movies (TMDB)…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="input"
          style={{ flex: 1 }}
        />
        <button className="link" type="submit">
          Search
        </button>
      </form>

      {error && (
        <p className="warn" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {loading ? (
        <p className="muted">Loading…</p>
      ) : (
        <div className="grid">
          {results.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </div>
  );
}
