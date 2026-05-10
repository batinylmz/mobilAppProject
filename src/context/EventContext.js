import React, { createContext, useCallback, useMemo, useState } from 'react';
import { getEvents } from '../services/eventService';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchEvents = useCallback(async (query = '') => {
    setLoading(true);
    setError('');
    try {
      const nextEvents = await getEvents(query);
      setEvents(nextEvents);
    } catch (e) {
      setError('Etkinlikler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  }, []);

  const isFavorite = useCallback(
    (eventId) => favorites.some((item) => item.id === eventId),
    [favorites]
  );

  const isRegistered = useCallback(
    (eventId) => registrations.some((item) => item.id === eventId),
    [registrations]
  );

  const addFavorite = useCallback((eventItem) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === eventItem.id)) {
        return prev.filter((item) => item.id !== eventItem.id);
      }
      return [...prev, eventItem];
    });
  }, []);

  const removeFavorite = useCallback((eventId) => {
    setFavorites((prev) => prev.filter((item) => item.id !== eventId));
  }, []);

  const updateStock = useCallback((eventId, delta) => {
    const updater = (list) =>
      list.map((item) => {
        if (item.id !== eventId) return item;
        const nextStock = Math.max(0, (item.stock || 0) + delta);
        return { ...item, stock: nextStock };
      });
    setEvents(updater);
    setFavorites(updater);
    setRegistrations(updater);
  }, []);

  const register = useCallback((eventItem) => {
    setRegistrations((prev) => {
      if (prev.some((item) => item.id === eventItem.id)) return prev;
      return [...prev, eventItem];
    });
  }, []);

  const unregister = useCallback((eventId) => {
    setRegistrations((prev) => prev.filter((item) => item.id !== eventId));
  }, []);

  const resetEvents = useCallback(() => {
    setEvents([]);
    setFavorites([]);
    setRegistrations([]);
    setError('');
  }, []);

  const value = useMemo(
    () => ({
      events,
      favorites,
      registrations,
      loading,
      error,
      fetchEvents,
      isFavorite,
      isRegistered,
      addFavorite,
      removeFavorite,
      register,
      unregister,
      updateStock,
      resetEvents,
    }),
    [
      events,
      favorites,
      registrations,
      loading,
      error,
      fetchEvents,
      isFavorite,
      isRegistered,
      addFavorite,
      removeFavorite,
      register,
      unregister,
      updateStock,
      resetEvents,
    ]
  );

  return <EventContext.Provider value={value}>{children}</EventContext.Provider>;
};
