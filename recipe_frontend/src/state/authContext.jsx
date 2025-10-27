import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getItem, setItem, removeItem } from '../utils/storage';
import { login as svcLogin, logout as svcLogout } from '../services/authService';

const AuthContext = createContext(null);

const LS_TOKEN = 'auth_token';
const LS_USER = 'auth_user';

/**
 * PUBLIC_INTERFACE
 * AuthProvider provides authentication state and actions.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getItem(LS_TOKEN) || null);
  const [user, setUser] = useState(() => {
    const stored = getItem(LS_USER);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) setItem(LS_TOKEN, token);
    else removeItem(LS_TOKEN);
  }, [token]);

  useEffect(() => {
    if (user) setItem(LS_USER, JSON.stringify(user));
    else removeItem(LS_USER);
  }, [user]);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    const res = await svcLogin(email, password);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    svcLogout();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useAuth hook to access auth state/actions.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
