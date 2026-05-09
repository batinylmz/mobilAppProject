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

    // Kişi C'nin kullanacağı kayıt ve stok mantığı (Şimdilik boş kalabilir)
    const register = (event) => {};
    const updateStock = (eventId, changeAmount) => {};

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
                updateStock
            }}
        >
            {children}
        </EventContext.Provider>
    );
};