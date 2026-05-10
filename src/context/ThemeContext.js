import React, { createContext, useMemo, useState } from 'react';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#f3f4f6',
  card: '#ffffff',
  text: '#111827',
  subtle: '#6b7280',
  danger: '#dc2626',
  primary: '#2563eb',
};

const darkTheme = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#e2e8f0',
  subtle: '#94a3b8',
  danger: '#f87171',
  primary: '#60a5fa',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const palette = theme === 'light' ? lightTheme : darkTheme;

  const value = useMemo(() => ({ theme, palette, toggleTheme }), [theme, palette]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
