import axios from 'axios';
import React, { useMemo, useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const response = await axios.get("http://localhost:5000/api/user/me", {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });

          setToken(storedToken);
          setUser(response.data);
        } catch (error) {
          console.error("Authentication check failed:", error);
          setToken(null);
          setUser(null);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();

  }, []);

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const contextValue = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout
  }), [user, token, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);;
}

