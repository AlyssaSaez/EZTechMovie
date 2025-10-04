// src/pages/CartPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import { getCartCount, getCartTotal } from '../cart/selectors';

const TAX_RATE = 0.086; // 8.6% — change to your desired rate

function money(n) {
  return `$${n.toFixed(2)}`;
}

export default function CartPage() {
  const { items, incQty, decQty, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p>Cart is empty.</p>
        <Link className="link" to="/subscriptions">Go to Subscriptions</Link>
      </div>
    );
  }

  const itemCount = getCartCount(items);
  const subTotal = getCartTotal(items);
  const tax = subTotal * TAX_RATE;
  const grandTotal = subTotal + tax;

  return (
    <div className="page">
      <h1>Your Cart</h1>

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <div><strong>{item.name}</strong></div>

            <div className="qty-controls">
              <button onClick={() => decQty(item.id)} aria-label={`Decrease ${item.name}`}>-</button>
              <span aria-live="polite">{item.qty}</span>
              <button onClick={() => incQty(item.id)} aria-label={`Increase ${item.name}`}>+</button>
            </div>

            <div className="price">{money(item.price * item.qty)}</div>

            <button className="link" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary" style={{ marginTop: '1rem' }}>
        <p>Items: {itemCount}</p>
        <p>Subtotal: {money(subTotal)}</p>
        <p>Tax ({(TAX_RATE * 100).toFixed(2)}%): {money(tax)}</p>
        <p style={{ fontWeight: 700 }}>Total: {money(grandTotal)}</p>

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
          <button onClick={clearCart}>Clear cart</button>
          <Link to="/checkout" className="link" aria-label="Proceed to checkout">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
