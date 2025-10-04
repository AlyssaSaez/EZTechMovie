// src/api/tmdb.js
const API = 'https://api.themoviedb.org/3';
const IMG = 'https://image.tmdb.org/t/p';
const KEY = import.meta.env.VITE_TMDB_API_KEY;

function ensureKey() {
  if (!KEY) {
    throw new Error(
      'TMDB API key missing. Add VITE_TMDB_API_KEY=YOUR_KEY to .env (then restart dev server).'
    );
  }
}

function url(path, params = {}) {
  ensureKey();
  const u = new URL(`${API}${path}`);
  u.searchParams.set('api_key', KEY);
  u.searchParams.set('language', 'en-US');
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, String(v)));
  return u.toString();
}

export function imgUrl(path, size = 'w342') {
  return path ? `${IMG}/${size}${path}` : '';
}

async function request(path, params) {
  const res = await fetch(url(path, params));
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`TMDB request failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

export async function getPopular(page = 1) {
  return request('/movie/popular', { page });
}

export async function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page, include_adult: 'false' });
}
