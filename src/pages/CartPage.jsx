import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cart/CartContext";
import { getCartCount, getCartTotal } from "../cart/selectors";

export default function CartPage() {
  const { items, incQty, decQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p>Cart is empty.</p>
      </div>
    );
  }

  const count = getCartCount(items);
  const total = getCartTotal(items);

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <div>
              <strong>{item.name}</strong>
            </div>
            <div className="qty-controls">
              <button
                onClick={() => decQty(item.id)}
                aria-label={`Decrease ${item.name}`}
              >
                -
              </button>
              <span aria-live="polite">{item.qty}</span>
              <button
                onClick={() => incQty(item.id)}
                aria-label={`Increase ${item.name}`}
              >
                +
              </button>
            </div>
            <div className="price">${(item.price * item.qty).toFixed(2)}</div>
            <button className="link" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>Items: {count}</p>
        <p>Total: ${total.toFixed(2)}</p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button className="link" onClick={() => navigate("/checkout")}>
            Proceed to Checkout
          </button>
          <button onClick={clearCart}>Clear cart</button>
        </div>
      </div>
    </div>
  );
}
