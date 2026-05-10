const BASE_URL = 'https://dummyjson.com';

const CITY_POOL = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Eskişehir'];

const VENUES = ['Arena', 'Anfi Tiyatro', 'Açık Hava Sahnesi', 'Kültür Merkezi', 'Konferans Salonu', 'Stadyum', 'Spor Salonu', 'Sinematek'];

/**
 * API’den sadece id / stock / price alıyoruz.
 * Başlık, görsel ve metin tamamen etkinlik kataloğundan — ürün resmi ve ürün adı kullanılmaz.
 */
const EVENT_KINDS = [
  {
    categoryLabel: 'Konser',
    titles: [
      'Yaz Açık Hava Gecesi',
      'Akustik Sahne',
      'İndie Buluşması',
      'Elektronik Gece',
      'Caz & Gün Batımı',
      'Blues Night',
    ],
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
      'https://images.unsplash.com/photo-1470229722913-7c0e332db695?w=600&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Sinema',
    titles: [
      'Seçki: Bağımsız Filmler',
      'Gece Yarısı Gösterimi',
      'Fil Arkası Söyleşi',
      'Kısa Film Maratonu',
      'Klasikler Tekrar',
      'Animasyon Günü',
    ],
    images: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
      'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Söyleşi',
    titles: [
      'Yazar Okuması',
      'Girişimcilik Paneli',
      'Teknoloji Sohbeti',
      'Şehir & İklim Buluşması',
      'Kariyer Hikayeleri',
      'Kitap Kulübü',
    ],
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Futbol',
    titles: [
      'Hafta Sonu Derbisi',
      'Gençler Ligi',
      'Kupa Turu',
      'Sezon Açılışı',
      'Yıldızlar Maçı',
      'Gece Maçı',
    ],
    images: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
      'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&q=80',
      'https://images.unsplash.com/photo-1522778119026-d647059059cf?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Basketbol',
    titles: [
      'Play-off Gecesi',
      '3x3 Turnuvası',
      'Üniversite Kupası',
      'All-Star Buluşması',
      'Genç Yetenekler',
      'Şehir Kupası',
    ],
    images: [
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
      'https://images.unsplash.com/photo-1519861536333-51a169aeca29?w=600&q=80',
      'https://images.unsplash.com/photo-1518611012118-696072aa345a?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Konferans',
    titles: [
      'Yapay Zeka Zirvesi',
      'Sürdürülebilir İş',
      'Ürün Lansmanı',
      'Sağlık Teknolojileri',
      'Finans & Yatırım',
      'Pazarlama 360',
    ],
    images: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
      'https://images.unsplash.com/photo-1544531586-228537633952c?w=600&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Tiyatro',
    titles: [
      'Modern Drama',
      'Komedi Gecesi',
      'Çocuk Oyunu',
      'Musical Gala',
      'Deneysel Sahne',
      'Monolog Gece',
    ],
    images: [
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&q=80',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&q=80',
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=600&q=80',
    ],
  },
  {
    categoryLabel: 'Stand-up',
    titles: [
      'Tek Mikrofon',
      'Yerel Komedyenler',
      'Gece Şovu',
      'İmprov Night',
      'Yeni Yetenekler',
      'Capsule Tour',
    ],
    images: [
      'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=600&q=80',
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
    ],
  },
];

const pickKind = (productId) => EVENT_KINDS[productId % EVENT_KINDS.length];

const buildTitle = (product) => {
  const kind = pickKind(product.id);
  const city = CITY_POOL[product.id % CITY_POOL.length];
  const venue = VENUES[(product.id * 3) % VENUES.length];
  const titleVariant = kind.titles[(product.id * 7) % kind.titles.length];
  return `${kind.categoryLabel}: ${titleVariant} · ${venue} · ${city}`;
};

const buildDescription = (product) => {
  const kind = pickKind(product.id);
  const city = CITY_POOL[product.id % CITY_POOL.length];
  return (
    `${city}'da gerçekleşecek ${kind.categoryLabel.toLowerCase()} etkinliği. ` +
    `Kontenjan ve bilet bilgisi listelenmiştir; kayıt sonrası kontenjan güncellenir.`
  );
};

/** Unsplash: crop + format — bazı cihazlarda kırılan linkleri azaltır */
const withUnsplashParams = (url) => {
  if (!url || !url.includes('images.unsplash.com')) return url;
  const join = url.includes('?') ? '&' : '?';
  return `${url}${join}ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`;
};

/**
 * Aynı türdeki tüm Unsplash görsellerini sıraya koy: biri cihazda patlarsa diğeri (hâlâ konuyla uyumlu) devreye girer.
 */
const buildThumbnails = (product) => {
  const kind = pickKind(product.id);
  const n = kind.images.length;
  const start = (product.id * 11) % n;
  const chain = [];
  for (let k = 0; k < n; k++) {
    const idx = (start + k) % n;
    chain.push(withUnsplashParams(kind.images[idx]));
  }
  return {
    thumbnail: chain[0],
    thumbnailFallbacks: chain.slice(1),
  };
};

/** Unsplash tamamen düşerse: türe özel Pexels (tek CDN, konuya yakın stok foto) */
const PEXELS_BY_CATEGORY = {
  Konser:
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
  Sinema:
    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800',
  Söyleşi:
    'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
  Futbol:
    'https://images.pexels.com/photos/47730/soccer-ball-soccer-field-sports-47730.jpeg?auto=compress&cs=tinysrgb&w=800',
  Basketbol:
    'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
  Konferans:
    'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
  Tiyatro:
    'https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Stand-up':
    'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800',
};

const mapProductToEvent = (product) => {
  const dayOffset = product.id % 28;
  const date = new Date();
  date.setDate(date.getDate() + dayOffset + 1);

  const kind = pickKind(product.id);
  const { thumbnail, thumbnailFallbacks } = buildThumbnails(product);

  return {
    id: product.id,
    title: buildTitle(product),
    description: buildDescription(product),
    category: kind.categoryLabel,
    thumbnail,
    thumbnailFallbacks,
    thumbnailLastResort: PEXELS_BY_CATEGORY[kind.categoryLabel] || PEXELS_BY_CATEGORY.Konser,
    stock: product.stock,
    /** İlk yüklemedeki toplam kontenjan; kayıtta stock düşer, bu sabit kalır (x/y gösterimi) */
    capacityTotal: product.stock,
    price: product.price,
    organizer: 'EventHub',
    location: CITY_POOL[product.id % CITY_POOL.length],
    date: date.toISOString(),
    rawProduct: product,
  };
};

const requestProducts = async (query = '') => {
  const endpoint = query.trim()
    ? `${BASE_URL}/products/search?q=${encodeURIComponent(query.trim())}`
    : `${BASE_URL}/products?limit=20`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || 'Products request failed');
  }

  return data?.products || [];
};

export const getEvents = async (query = '') => {
  const products = await requestProducts(query);
  return products.map(mapProductToEvent);
};
