import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const WatchlistContext = createContext(null);
const LS_KEY = 'eztech_watchlist_v1';

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'ADD': {
      const exists = state.find(m => m.id === action.payload.id);
      if (exists) return state;
      return [
        ...state,
        {
          id: action.payload.id,
          title: action.payload.title,
          poster_path: action.payload.poster_path || '',
          release_date: action.payload.release_date || '',
          overview: action.payload.overview || '',
          watched: false,
          notes: '',
        },
      ];
    }

    case 'REMOVE':
      return state.filter(m => m.id !== action.payload);

    case 'CLEAR':
      return [];

    case 'TOGGLE_WATCHED':
      return state.map(m => (m.id === action.payload ? { ...m, watched: !m.watched } : m));

    case 'UPDATE_TITLE': {
      const { id, title } = action.payload;
      return state.map(m => (m.id === id ? { ...m, title } : m));
    }

    case 'UPDATE_NOTES': {
      const { id, notes } = action.payload;
      return state.map(m => (m.id === id ? { ...m, notes } : m));
    }

    default:
      return state;
  }
}

export function WatchlistProvider({ children }) {
  const [list, dispatch] = useReducer(
    reducer,
    [],
    () => {
      try {
        return JSON.parse(localStorage.getItem(LS_KEY)) || [];
      } catch {
        return [];
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch {}
  }, [list]);

  const value = useMemo(
    () => ({
      list,
      add: (movie) => dispatch({ type: 'ADD', payload: movie }),
      remove: (id) => dispatch({ type: 'REMOVE', payload: id }),
      clear: () => dispatch({ type: 'CLEAR' }),
      toggleWatched: (id) => dispatch({ type: 'TOGGLE_WATCHED', payload: id }),
      updateTitle: (id, title) => dispatch({ type: 'UPDATE_TITLE', payload: { id, title } }),
      updateNotes: (id, notes) => dispatch({ type: 'UPDATE_NOTES', payload: { id, notes } }),
    }),
    [list]
  );

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be used within WatchlistProvider');
  return ctx;
}
