import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { getCartCount } from '../cart/selectors';

export default function Navbar() {
  const { items } = useCart();
  const count = getCartCount(items);

  return (
    <nav className="navbar">
      <Link to="/" className="brand">EZTechMovie</Link>
      <div className="nav-links">
        <NavLink to="/subscriptions">Subscriptions</NavLink>
        <NavLink to="/accessories">Accessories</NavLink>
        <NavLink to="/cart">Cart{count > 0 ? ` (${count})` : ''}</NavLink>
      </div>
    </nav>
  );
}
