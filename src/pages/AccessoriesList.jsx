import React from 'react';
import { useCart } from '../cart/CartContext';
import { accessories } from '../data/Data';

export default function AccessoriesList() {
  const { items, addItem } = useCart();

  const getQty = (id) => items.find(i => i.id === id)?.qty ?? 0;

  return (
    <div className="page">
      <h1>Accessories</h1>
      <div className="grid">
        {accessories.map(acc => {
          const qty = getQty(acc.id);
          return (
            <div key={acc.id} className="card">
              <h3>{acc.service}</h3>
              <p>${acc.price.toFixed(2)}</p>

              <div className="row">
                <button
                  onClick={() =>
                    addItem({
                      ...acc,
                      type: 'accessory',
                      name: acc.service,
                    })
                  }
                >
                  Add
                </button>
                {qty > 0 && <span className="pill">In cart ({qty})</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
