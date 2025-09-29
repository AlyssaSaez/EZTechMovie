// src/cart/CartContext.jsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { cartReducer, initialState } from './cartReducer';

const CartContext = createContext(null);
const LS_KEY = 'eztech_cart_v1';

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState,
    (init) => {
      try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) : init;
      } catch {
        return init;
      }
    }
  );

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to persist cart', e);
    }
  }, [state]);

  const value = {
    items: state.items,
    warning: state.warning,
    addItem: (item) => dispatch({ type: 'ADD_ITEM', payload: item }),
    incQty: (id) => dispatch({ type: 'INC_QTY', payload: id }),
    decQty: (id) => dispatch({ type: 'DEC_QTY', payload: id }),
    removeItem: (id) => dispatch({ type: 'REMOVE_ITEM', payload: id }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    clearWarning: () => dispatch({ type: 'CLEAR_WARNING' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
