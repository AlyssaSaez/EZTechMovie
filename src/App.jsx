import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./cart/CartContext";
import { AuthProvider, AuthSignIn } from "./auth/AuthContext";
import { WatchlistProvider } from "./watchlist/WatchlistContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubscriptionsList from "./pages/SubscriptionsList";
import AccessoriesList from "./pages/AccessoriesList";
import CartPage from "./pages/CartPage";
import CreditCard from "./pages/CreditCard";
import Movies from "./pages/Movies";
import Watchlist from "./pages/Watchlist";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WatchlistProvider>
            <Navbar />
            <Routes>
              <Route path="/login" element={<AuthSignIn />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscriptions"
                element={
                  <ProtectedRoute>
                    <SubscriptionsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/accessories"
                element={
                  <ProtectedRoute>
                    <AccessoriesList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CreditCard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <Movies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlist"
                element={
                  <ProtectedRoute>
                    <Watchlist />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </WatchlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
