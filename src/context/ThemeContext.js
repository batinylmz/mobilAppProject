import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const light = {
  mode: 'light',
  background: '#CCC7CD',
  text: '#111827',
  muted: '#6b7280',
  statBg: '#eceff3',
  cardBg: '#6f123f',
  cardText: '#ffffff',
  cardMuted: 'rgba(255,255,255,0.85)',
  accent: '#6f123f',
  surface: '#ffffff',
  tabBar: '#ddd8de',
  tabBarBorder: '#c4bec8',
  tabIconActive: '#111111',
  tabIconInactive: '#777777',
  searchBg: '#e4dfe6',
  tagline: '#333333',
  headerTint: '#111827',
  soldOut: '#555555',
  heartEmpty: '#111111',
  favTopBar: '#2a1f24',
  rowOnCard: '#111111',
  logoBox: '#1a0f14',
  secondaryBtnBg: '#ffffff',
  secondaryBtnBorder: '#d1d5db',
  danger: '#ea580c',
  favoriteBtnBg: '#eceff3',
  iconCircleBg: '#f5d0dc',
};

const dark = {
  mode: 'dark',
  background: '#0f0f12',
  text: '#f3f4f6',
  muted: '#9ca3af',
  statBg: '#252530',
  cardBg: '#6f123f',
  cardText: '#ffffff',
  cardMuted: 'rgba(255,255,255,0.88)',
  accent: '#e879a9',
  surface: '#1a1a22',
  tabBar: '#16161c',
  tabBarBorder: '#2d2d38',
  tabIconActive: '#f3f4f6',
  tabIconInactive: '#888888',
  searchBg: '#252530',
  tagline: '#d1d5db',
  headerTint: '#f3f4f6',
  soldOut: '#4b5563',
  heartEmpty: '#e5e7eb',
  favTopBar: '#0a0a0d',
  rowOnCard: '#f3f4f6',
  logoBox: '#0c0a10',
  secondaryBtnBg: '#252530',
  secondaryBtnBorder: '#3f3f4a',
  danger: '#ea580c',
  favoriteBtnBg: '#252530',
  iconCircleBg: '#3d2a35',
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');

  const colors = useMemo(() => (mode === 'dark' ? dark : light), [mode]);

  const toggleTheme = useCallback(() => {
    setMode((m) => (m === 'light' ? 'dark' : 'light'));
  }, []);

  const setDarkMode = useCallback((enabled) => {
    setMode(enabled ? 'dark' : 'light');
  }, []);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      colors,
      toggleTheme,
      setDarkMode,
    }),
    [mode, colors, toggleTheme, setDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme: ThemeProvider eksik');
  }
  return ctx;
}
