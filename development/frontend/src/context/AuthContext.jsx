import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    return typeof window !== "undefined" ? localStorage.getItem("aquaflow_token") : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCurrentUser() {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        if (response.success && response.data) {
          setUser(response.data);
        } else {
          logout();
        }
      } catch (err) {
        console.warn("Could not verify session token:", err.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    loadCurrentUser();
  }, [token]);

  const login = async (identifier, password) => {
    const res = await api.post("/auth/login", { identifier, password });
    if (res.success && res.data) {
      setToken(res.data.accessToken);
      setUser(res.data.user);
      localStorage.setItem("aquaflow_token", res.data.accessToken);
      return res.data;
    }
    throw new Error(res.message || "Login failed");
  };

  const register = async (formData) => {
    const res = await api.post("/auth/register", formData);
    if (res.success && res.data) {
      setToken(res.data.accessToken);
      setUser(res.data.user);
      localStorage.setItem("aquaflow_token", res.data.accessToken);
      return res.data;
    }
    throw new Error(res.message || "Registration failed");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("aquaflow_token");
    api.post("/auth/logout", {}).catch(() => {});
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
