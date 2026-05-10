import React, { createContext, useCallback, useMemo, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = Boolean(token);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data?.message || 'Giriş başarısız.' };
      }

      const authToken = data?.accessToken || data?.token || '';
      setToken(authToken);
      setUser(data);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Sunucuya ulaşılamadı.' };
    } finally {
      setLoading(false);
    }
  }, []);

  const hydrateMe = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch('https://dummyjson.com/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) return;
      const data = await response.json();
      setUser(data);
    } catch (error) {
      // no-op
    }
  }, [token]);

  const logout = useCallback(() => {
    setToken('');
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ token, user, isLoggedIn, loading, login, logout, hydrateMe }),
    [token, user, isLoggedIn, loading, login, logout, hydrateMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};