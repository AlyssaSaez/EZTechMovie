import React from 'react';
import { useCart } from '../cart/CartContext';
import { subscriptions } from '../data/Data';

export default function SubscriptionsList() {
  const { items, addItem } = useCart();

  // Which subscription (if any) is in the cart?
  const currentSub = items.find(i => i.type === 'subscription');
  const subInCartId = currentSub ? currentSub.id : null;

  return (
    <div className="page">
      <h1>Subscriptions</h1>
      <div className="grid">
        {subscriptions.map(sub => {
          const isInCart = sub.id === subInCartId;
          const blocked = subInCartId !== null; // once any sub is in cart, adding any sub should trigger warning

          const handleClick = () => {
            // Always attempt to add; the reducer enforces the single-sub rule
            // and sets warning = "Only one subscription can be added at a time."
            addItem({
              ...sub,
              type: 'subscription',
              name: sub.service,
              qty: 1
            });
          };

          return (
            <div key={sub.id} className="card">
              <div className="row">
                <h3>{sub.service}</h3>
                <p>${sub.price.toFixed(2)}</p>
              </div>

              <button
                onClick={handleClick}
                // DO NOT use the HTML disabled attribute here, or the toast won't fire.
                aria-disabled={blocked}
                className={`${isInCart ? 'in-cart' : ''} ${blocked && !isInCart ? 'disabled' : ''}`.trim()}
              >
                {isInCart ? 'Subscription in cart' : 'Add'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
