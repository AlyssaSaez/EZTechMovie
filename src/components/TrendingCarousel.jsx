import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getTrending, imgUrl } from '../api/tmdb';
import { useWatchlist } from '../watchlist/WatchlistContext';

export default function TrendingCarousel({ title = 'Trending Movies' }) {
  const [period, setPeriod] = useState('day'); // 'day' | 'week'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const trackRef = useRef(null);
  const { list, add, remove } = useWatchlist();

  // arrow visibility
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 2); // small tolerance
    setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
  }, []);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr('');
    getTrending(period, 1)
      .then((data) => {
        if (!alive) return;
        setItems(data.results?.slice(0, 18) ?? []);
      })
      .catch((e) => {
        if (!alive) return;
        setErr('Could not load trending movies.');
        console.error(e);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
        // wait a tick so layout is ready, then compute arrows
        requestAnimationFrame(updateArrows);
      });
    return () => {
      alive = false;
    };
  }, [period, updateArrows]);

  // scroll helpers
  const SCROLL_STEP = 4; // tiles per click
  function scrollByTiles(dir = 1) {
    const el = trackRef.current;
    if (!el) return;
    const tile = el.querySelector('.carousel-item');
    const step = tile ? tile.getBoundingClientRect().width + 12 : 200;
    el.scrollBy({ left: dir * step * SCROLL_STEP, behavior: 'smooth' });
    // after smooth scroll, recalc when it finishes
    setTimeout(updateArrows, 350);
  }

  return (
    <section className="trending">
      <div className="trending-head">
        <h2 className="trending-title">{title}</h2>
        <div className="trending-tabs" role="tablist" aria-label="Trending period">
          <button
            role="tab"
            aria-selected={period === 'day'}
            className={`tab ${period === 'day' ? 'active' : ''}`}
            onClick={() => setPeriod('day')}
          >
            Today
          </button>
          <button
            role="tab"
            aria-selected={period === 'week'}
            className={`tab ${period === 'week' ? 'active' : ''}`}
            onClick={() => setPeriod('week')}
          >
            This Week
          </button>
        </div>
      </div>

      {err && <p className="warn" style={{ marginTop: '.25rem' }}>{err}</p>}
      {loading ? (
        <p className="muted" style={{ marginTop: '.25rem' }}>Loading…</p>
      ) : (
        <div className="carousel-wrap">
          {/* arrows */}
          <button
            className={`car-arrow left ${canLeft ? '' : 'is-disabled'}`}
            aria-label="Scroll left"
            onClick={() => canLeft && scrollByTiles(-1)}
          >
            ‹
          </button>

          <div
            className="carousel"
            ref={trackRef}
            onScroll={updateArrows}
          >
            {items.map((m) => {
              const inList = list.some((x) => x.id === m.id);
              const rating =
                typeof m.vote_average === 'number'
                  ? m.vote_average.toFixed(1)
                  : null;

              return (
                <div key={m.id} className="carousel-item">
                  <div className="poster-wrap">
                    {m.poster_path ? (
                      <img
                        src={imgUrl(m.poster_path, 'w342')}
                        alt={`${m.title || 'Movie'} poster`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="poster-empty">No image</div>
                    )}
                    {rating && <span className="badge">★ {rating}</span>}
                  </div>

                  <div className="caption" title={m.title}>{m.title}</div>

                  <button
                    className={`pill-btn ${inList ? 'pill-in' : 'pill-out'}`}
                    onClick={() =>
                      inList
                        ? remove(m.id)
                        : add({
                            id: m.id,
                            title: m.title,
                            poster_path: m.poster_path,
                            release_date: m.release_date,
                            overview: m.overview,
                          })
                    }
                    aria-label={inList ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    {inList ? 'Remove' : 'Add'}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            className={`car-arrow right ${canRight ? '' : 'is-disabled'}`}
            aria-label="Scroll right"
            onClick={() => canRight && scrollByTiles(1)}
          >
            ›
          </button>

          <div className={`edge-fade left ${canLeft ? '' : 'hide'}`} />
          <div className={`edge-fade right ${canRight ? '' : 'hide'}`} />
        </div>
      )}
    </section>
  );
}
