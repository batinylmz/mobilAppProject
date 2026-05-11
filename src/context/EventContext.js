import React, { createContext, useState } from 'react';
import { mapProductToEvent } from '../utils/eventFormat';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [favorites, setFavorites] = useState([]); // Favori etkinlikleri tutacak dizi
    const [registrations, setRegistrations] = useState([]);

    // Favorilere ekleme fonksiyonu
    const addFavorite = (event) => {
        const normalized = mapProductToEvent(event);
        setFavorites((prev) => {
            if (prev.some((fav) => fav.id === normalized.id)) return prev;
            return [...prev, normalized];
        });
    };

    // Favorilerden çıkarma fonksiyonu
    const removeFavorite = (eventId) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== eventId));
    };

    const isFavorite = (eventId) => favorites.some((f) => f.id === eventId);
    const isRegistered = (eventId) => registrations.some((r) => r.id === eventId);

    const register = (event) => {
        if (!event || isRegistered(event.id)) return;
        setRegistrations((prev) => [...prev, mapProductToEvent(event)]);
    };

    const unregister = (eventId) => {
        setRegistrations((prev) => prev.filter((r) => r.id !== eventId));
    };

    const updateStock = (eventId, changeAmount) => {
        setEvents((prev) =>
            prev.map((e) => (e.id === eventId ? { ...e, stock: Math.max(0, (e.stock ?? 0) + changeAmount) } : e))
        );
        setFavorites((prev) =>
            prev.map((e) => (e.id === eventId ? { ...e, stock: Math.max(0, (e.stock ?? 0) + changeAmount) } : e))
        );
        setRegistrations((prev) =>
            prev.map((e) => (e.id === eventId ? { ...e, stock: Math.max(0, (e.stock ?? 0) + changeAmount) } : e))
        );
    };

    return (
        <EventContext.Provider
            value={{
                events,
                setEvents,
                favorites,
                registrations,
                addFavorite,
                removeFavorite,
                register,
                unregister,
                isFavorite,
                isRegistered,
                updateStock,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};