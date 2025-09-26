import React from 'react';
import { useCart } from '../cart/CartContext';
import { subscriptions } from '../data/Data'; 

export default function SubscriptionsList() {
  const { items, addItem, warning } = useCart();
  const hasSub = items.some(i => i.type === 'subscription');

  return (
    <div className="page">
      <h1>Subscriptions</h1>
      <div className="grid">
        {subscriptions.map(sub => (
          <div key={sub.id} className="card">
            <h3>{sub.name}</h3>
            <p>${sub.price.toFixed(2)}</p>
            <button
              onClick={() => addItem({ ...sub, type: 'subscription' })}
              disabled={hasSub}
            >
              {hasSub ? 'Subscription in cart' : 'Add'}
            </button>
          </div>
        ))}
      </div>
      {warning && <p className="warn">{warning}</p>}
    </div>
  );
}
