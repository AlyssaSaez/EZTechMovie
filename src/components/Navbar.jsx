import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../auth/AuthContext";
import { getCartCount } from "../cart/selectors";
import logo from "../assets/eztech.png";

export default function Navbar() {
  const { items } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const count = getCartCount(items);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <img src={logo} alt="EZTechMovie logo" className="logo" />
        EZTechMovie
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Movies
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Watchlist
        </NavLink>
        <NavLink
          to="/subscriptions"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Subscriptions
        </NavLink>
        <NavLink
          to="/accessories"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          Accessories
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "active cart-link" : "cart-link"
          }
          aria-label={
            count > 0
              ? `Cart with ${count} item${count === 1 ? "" : "s"}`
              : "Cart"
          }
        >
          Cart {count > 0 ? <span className="cart-badge">{count}</span> : null}
        </NavLink>

        {/* Show Sign Out only when authenticated */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="link"
            style={{ marginLeft: "1rem", background: "#b04f4f" }}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
}
