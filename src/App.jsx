import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './cart/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubscriptionsList from './pages/SubscriptionsList';
import AccessoriesList from './pages/AccessoriesList';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subscriptions" element={<SubscriptionsList />} />
          <Route path="/accessories" element={<AccessoriesList />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
