import React, { createContext, useCallback, useMemo, useState } from 'react';
import { fetchMe, loginRequest } from '../services/authService';

export const AuthContext = createContext(null);

function mapLoginUser(data) {
  if (!data) return null;
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    image: data.image,
    gender: data.gender,
  };
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  const hydrateMe = useCallback(async () => {
    if (!token) return;
    try {
      const me = await fetchMe(token);
      setUser(mapLoginUser(me));
    } catch {
      setToken(null);
      setUser(null);
    }
  }, [token]);

  const login = useCallback(async (username, password) => {
    const u = (username || '').trim();
    const p = password || '';
    if (!u || !p) {
      return { ok: false, message: 'Kullanıcı adı ve şifre gerekli.' };
    }
    setLoginLoading(true);
    try {
      const data = await loginRequest(u, p);
      const accessToken = data.accessToken;
      if (!accessToken) {
        return { ok: false, message: 'Sunucudan token alınamadı.' };
      }
      setToken(accessToken);
      setUser(mapLoginUser(data));
      return { ok: true };
    } catch (e) {
      return {
        ok: false,
        message: e?.message || 'Giriş başarısız.',
      };
    } finally {
      setLoginLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      login,
      logout,
      loginLoading,
      hydrateMe,
    }),
    [user, token, login, logout, loginLoading, hydrateMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
