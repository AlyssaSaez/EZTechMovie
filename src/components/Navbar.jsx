import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { getCartCount } from '../cart/selectors';
import logo from '../assets/eztech.png';

function Toast({ message, onClose }) {
  const containerRef = useRef(null);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    function onClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="toast-overlay">
      <div ref={containerRef} className="toast" role="alert" aria-live="assertive">
        <div className="toast-content">
          <span className="toast-icon">⚠️</span>
          <span className="toast-text">{message}</span>
          <button className="toast-close" onClick={onClose} aria-label="Close alert">×</button>
        </div>
      </div>
    </div>
  );
}


function CartBadge({ count }) {
  if (count <= 0) return null;
  return (
    <span className="cart-badge" aria-live="polite" aria-atomic="true" role="status">
      {count}
    </span>
  );
}

export default function Navbar() {
  const { items, warning, clearWarning } = useCart();
  const count = getCartCount(items);

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="brand">
          <img src={logo} alt="EZTechMovie logo" className="logo" />
          EZTechMovie
        </Link>

        <div className="nav-links">
          <NavLink to="/subscriptions" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Subscriptions
          </NavLink>
          <NavLink to="/accessories" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Accessories
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? 'active cart-link' : 'cart-link')}
            aria-label={count > 0 ? `Cart with ${count} item${count === 1 ? '' : 's'}` : 'Cart'}
          >
            Cart <CartBadge count={count} />
          </NavLink>
        </div>
      </nav>

      <Toast message={warning} onClose={clearWarning} />
    </>
  );
}
