/**
 * DummyJSON ürünleri yalnızca id/stock/fiyat için kullanılır;
 * kullanıcıya konser, sinema, futbol, basketbol vb. etkinlik olarak gösterilir.
 */
export const EVENT_SKINS = [
    {
        key: 'konser',
        category: 'Konser',
        titles: [
            'Murat Boz Konseri',
            'Sezen Aksu Açık Hava',
            'Caz Gecesi: Blue Note',
            'Rock Festivali Ana Sahne',
        ],
        descriptions: [
            'Canlı performans, profesyonel ses ve ışık. Kapı açılış saatleri uygulamaya göre değişebilir.',
            'Yerli ve yabancı sanatçılarla unutulmaz bir akşam. Kontenjan sınırlıdır.',
        ],
        images: [
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
        ],
    },
    {
        key: 'sinema',
        category: 'Sinema',
        titles: [
            'IMAX Özel Gösterim',
            'Yerli Film Haftası Galası',
            'Gece Yarısı Sineması',
            'Film Festivali Seçkisi',
        ],
        descriptions: [
            'Dijital gösterim, altyazılı veya dublaj seçenekleri salon duyurusunda belirtilir.',
            'Ön gösterim ve söyleşi dahil seans. Yaş sınırı filme göre değişir.',
        ],
        images: [
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
            'https://images.unsplash.com/photo-1524985061719-9f39c5382d9d?w=600&q=80',
            'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
        ],
    },
    {
        key: 'futbol',
        category: 'Futbol',
        titles: [
            'Süper Lig Derbisi',
            'Şampiyonlar Ligi Canlı Yayın',
            'Stadyum Gecesi',
            'Gençler Ligi Finali',
        ],
        descriptions: [
            'Tribün blokları ve güvenlik kuralları bilette belirtilir. Seyirci kapasitesi sınırlıdır.',
            'Profesyonel lig maçı. Ertelenme durumunda bilet koşulları geçerlidir.',
        ],
        images: [
            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
            'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
            'https://images.unsplash.com/photo-1522778119023-d59f5860132c?w=600&q=80',
        ],
    },
    {
        key: 'basketbol',
        category: 'Basketbol',
        titles: [
            'EuroLeague Play-off',
            'NBA Canlı Yayın Etkinliği',
            'Üniversitelerarası Turnuva',
            '3x3 Sokak Basketbolu Finali',
        ],
        descriptions: [
            'Salon içi etkinlik; koltuk numarası biletinizde yer alır.',
            'Milli takım hazırlık maçı veya lig karşılaşması. Kontenjan stadyum kapasitesine bağlıdır.',
        ],
        images: [
            'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
            'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&q=80',
            'https://images.unsplash.com/photo-1517649763962-0c62306601b7?w=600&q=80',
        ],
    },
];

export function skinForProductId(productId) {
    const id = Number(productId) || 0;
    return EVENT_SKINS[Math.abs(id) % EVENT_SKINS.length];
}
