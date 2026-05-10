import React, { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [favorites, setFavorites] = useState([]); // Favori etkinlikleri tutacak dizi
    const [registrations, setRegistrations] = useState([]);

    // Favorilere ekleme fonksiyonu
    const addFavorite = (event) => {
        setFavorites((prev) => {
            // Eğer zaten favorilerde varsa ekleme
            if (prev.some((fav) => fav.id === event.id)) return prev;
            return [...prev, event];
        });
    };

    // Favorilerden çıkarma fonksiyonu
    const removeFavorite = (eventId) => {
        setFavorites((prev) => prev.filter((fav) => fav.id !== eventId));
    };

    /** Kayıtlı etkinliklere ekle (aynı etkinlik iki kez eklenmez) */
    const register = (event) => {
        if (!event || event.id == null) return;
        setRegistrations((prev) => {
            if (prev.some((r) => r.id === event.id)) return prev;
            return [...prev, { ...event }];
        });
    };

    /** Kayıttan çıkar */
    const unregister = (eventId) => {
        setRegistrations((prev) => prev.filter((r) => r.id !== eventId));
    };

    /**
     * Kalan kontenjanı güncelle (kayıtta -1, iptalde +1).
     * events / favorites / registrations içindeki aynı id güncellenir.
     */
    const updateStock = (eventId, changeAmount) => {
        const bump = (item) => {
            if (item.id !== eventId) return item;
            const cur = item.stock ?? 0;
            let next = Math.max(0, cur + changeAmount);
            const cap = item.capacityTotal;
            if (typeof cap === 'number' && cap > 0) {
                next = Math.min(cap, next);
            }
            return { ...item, stock: next };
        };

        setEvents((prev) => prev.map(bump));
        setFavorites((prev) => prev.map(bump));
        setRegistrations((prev) => prev.map(bump));
    };

    const isFavorite = (eventId) => favorites.some((f) => f.id === eventId);
    const isRegistered = (eventId) => registrations.some((r) => r.id === eventId);

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
                updateStock,
                isFavorite,
                isRegistered,
            }}
        >
            {children}
        </EventContext.Provider>
    );
};