const BASE_URL = 'https://dummyjson.com';

export const fetchEvents = async () => {
    try {
        // Görev belgesinde istenen endpoint ve limit [cite: 13, 30]
        const response = await fetch(`${BASE_URL}/products?limit=20`);
        const data = await response.json();
        return data.products; // DummyJSON verileri 'products' dizisi içinde döner
    } catch (error) {
        console.error("Etkinlikler çekilirken hata oluştu:", error);
        return [];
    }
};