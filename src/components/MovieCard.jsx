import React from 'react';
import { imgUrl } from '../api/tmdb';
import { useWatchlist } from '../watchlist/WatchlistContext';

export default function MovieCard({ movie }) {
  const { list, add, remove } = useWatchlist();
  const inList = list.some((m) => m.id === movie.id);

  const handleToggle = () => {
    const pick = {
      id: movie.id,
      title: movie.title || movie.name,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview,
    };
    inList ? remove(movie.id) : add(pick);
  };

  const rating = typeof movie.vote_average === 'number'
    ? movie.vote_average.toFixed(1)
    : null;

  return (
    <article className="card movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img
            src={imgUrl(movie.poster_path, 'w342')}
            alt={`${movie.title || 'Movie'} poster`}
            loading="lazy"
          />
        ) : (
          <div className="movie-poster--empty">No image</div>
        )}

        {/* rating badge */}
        {rating && (
          <span className="movie-rating" aria-label={`Rating ${rating} out of 10`}>
            ★ {rating}
          </span>
        )}
      </div>

      <div className="movie-body">
        <div className="movie-title-row">
          <h3 className="movie-title">{movie.title || 'Untitled'}</h3>
        </div>
        <p className="movie-overview">
          {movie.overview || 'No overview available.'}
        </p>
      </div>

      <button
        onClick={handleToggle}
        className={`movie-btn ${inList ? 'in-cart' : ''}`}
        aria-label={inList ? 'Remove from Streamlist' : 'Add to Streamlist'}
      >
        {inList ? 'Remove from Streamlist' : 'Add to Streamlist'}
      </button>
    </article>
  );
}
