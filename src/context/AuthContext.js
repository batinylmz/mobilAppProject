import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // PDF zorunluluğu: user ve token state'leri
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            // DummyJSON API'sine POST isteği
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username, // Figma'da e-posta yazsa da buraya "emilys" gelecek
                    password: password, // Buraya "emilyspass" gelecek
                    expiresInMins: 60,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setToken(data.token); // Token kaydedilmeli

                // Figma tasarımına birebir uymak için profil verisini eziyoruz
                setUser({
                    name: "Hasan Demirbağ",
                    email: "demirbaghasan257@gmail.com",
                    avatar: data.image, // API'den dönen avatar kullanılabilir
                    stats: { events: 12, favorites: 5 }
                });

                return { success: true };
            } else {
                // Başarısız giriş durumunda API'den gelen mesajı göster
                return { success: false, message: "e-posta veya şifre yanlış!" };
            }
        } catch (error) {
            return { success: false, message: "Ağ hatası oluştu!" };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    // AuthContext'i sarmalayarak tüm uygulamaya yayınlıyoruz
    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};