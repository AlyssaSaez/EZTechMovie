import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
const LS_AUTH_KEY = "eztech_auth_v1";

function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.accounts) return resolve();
    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.async = true;
    s.defer = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_AUTH_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      if (user) localStorage.setItem(LS_AUTH_KEY, JSON.stringify(user));
      else localStorage.removeItem(LS_AUTH_KEY);
    } catch {}
  }, [user]);

  const loginWithGoogle = useCallback(async (buttonContainerId) => {
    await loadGoogleScript();
    const clientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";
    google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        google.accounts.id.decodeJwt
          ? handleJwt(response.credential)
          : setUser({ name: "Google User", credential: response.credential });
      },
    });
    google.accounts.id.renderButton(
      document.getElementById(buttonContainerId),
      { theme: "filled_black", size: "large", width: 260 }
    );
  }, []);

  function handleJwt(jwt) {
    try {
      const payload = JSON.parse(atob(jwt.split(".")[1]));
      setUser({
        name: payload.name || "Google User",
        email: payload.email,
        picture: payload.picture,
        credential: jwt,
      });
    } catch {
      setUser({ name: "Google User", credential: jwt });
    }
  }

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = { user, isAuthenticated, loginWithGoogle, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/* ---------- LOGIN PAGE COMPONENT ---------- */
export function AuthSignIn() {
  const { loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, redirect to home
    if (isAuthenticated) {
      navigate("/");
    } else {
      loginWithGoogle("google-signin-btn");
    }
  }, [isAuthenticated, navigate, loginWithGoogle]);

  return (
    <div className="page" style={{ textAlign: "center", marginTop: "10%" }}>
      <h1>SIGN IN</h1>
      <p>Please sign in with Google to continue to the app.</p>
      <div
        id="google-signin-btn"
        style={{ display: "inline-block", marginTop: "1rem" }}
      ></div>
    </div>
  );
}
