import React from 'react';
import { useCart } from '../cart/CartContext';
import { accessories } from '../data/Data'; 

export default function AccessoriesList() {
  const { addItem } = useCart();

  return (
    <div className="page">
      <h1>Accessories</h1>
      <div className="grid">
        {accessories.map(acc => (
          <div key={acc.id} className="card">
            <h3>{acc.name}</h3>
            <p>${acc.price.toFixed(2)}</p>
            <button onClick={() => addItem({ ...acc, type: 'accessory' })}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
