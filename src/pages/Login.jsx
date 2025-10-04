import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { isAuthenticated, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
      return;
    }
    // Render Google button into this container
    loginWithGoogle("google-btn-container");
  }, [isAuthenticated, navigate, from, loginWithGoogle]);

  return (
    <div className="page">
      <h1>Sign in</h1>
      <p className="muted">
        Please sign in with Google to continue to the app.
      </p>
      <div id="google-btn-container" style={{ marginTop: "1rem" }} />
    </div>
  );
}
