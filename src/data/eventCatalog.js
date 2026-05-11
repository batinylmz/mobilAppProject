/**
 * DummyJSON ürün id’si ile eşlenen sabit etkinlik meta verisi (konser / sinema / maç).
 * API’den sadece stok ve id tutarlılığı için kullanılır; başlık ve görseller etkinlik odaklıdır.
 */
export const EVENT_CATALOG = [
  {
    title: 'Murat Boz İstanbul Konseri',
    category: 'Konser',
    price: 890,
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94be800?w=600&q=80',
    description:
      'Sahne performansı, canlı orkestra ve sevilen şarkılarla dolu bir akşam. Kapı açılış saatinden en az bir saat önce gelmenizi öneririz. 8 yaş altı çocuklar refakatçi ile kabul edilir.',
  },
  {
    title: 'Caz Gecesi: Blue Night Quartet',
    category: 'Konser',
    price: 350,
    thumbnail: 'https://images.unsplash.com/photo-1415201365744-f8f17322d99a?w=600&q=80',
    description:
      'Akustik düzenlemeler ve doğaçlama sololarla sıcak bir caz deneyimi. Oturma düzeni salona göre değişebilir; biletinizde blok bilgisi yer alır.',
  },
  {
    title: 'Dune: Part Two — IMAX Gösterimi',
    category: 'Sinema',
    price: 220,
    thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cedd3ba?w=600&q=80',
    description:
      'IMAX salonunda geniş ekran ve güçlü ses sistemiyle gösterim. Türkçe altyazılıdır. Gösterimden sonra salon boşaltma süresine uyunuz; yiyecek-içecek fuaye alanından temin edilebilir.',
  },
  {
    title: 'Galatasaray – Fenerbahçe Derbisi',
    category: 'Spor',
    price: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-30fec9ce6174?w=600&q=80',
    description:
      'Süper Lig karşılaşması. Stadyum güvenlik kuralları geçerlidir; çift taraflı bilet kontrolü yapılır. Yağmur durumunda etkinlik aynı tarihte oynanır; erteleme halinde bilet iade politikası geçerlidir.',
  },
  {
    title: 'Yıldızlar Altında Açık Hava Sineması',
    category: 'Sinema',
    price: 0,
    thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80',
    description:
      'Ücretsiz açık hava gösterimi; battaniye veya sandalye getirebilirsiniz. Ses kulaklığı dağıtımı girişte yapılır. Hava koşullarına göre tarih güncellenebilir, duyuru uygulamadan yapılır.',
  },
  {
    title: 'Basketbol: Türkiye Kupası Yarı Final',
    category: 'Spor',
    price: 280,
    thumbnail: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    description:
      'Tek maç eleme formatı. Tribün girişinde çanta araması uygulanır. Maç süresi uzarsa bilet ek ücret gerektirmez; oturma yeriniz biletteki kategoriye göredir.',
  },
  {
    title: 'Sezen Aksu Klasikleri Akustik',
    category: 'Konser',
    price: 750,
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80',
    description:
      'Akustik düzen ve minimal sahne ışıklarıyla nostaljik bir repertuvar. Ses seviyesi salon akustiğine göre ayarlanır; hassas işitme için kulak tıkacı getirebilirsiniz.',
  },
  {
    title: 'Animasyon Festivali — Aile Seansı',
    category: 'Sinema',
    price: 120,
    thumbnail: 'https://images.unsplash.com/photo-1524712246334-27c11f6eadf0?w=600&q=80',
    description:
      'Çocuklar için özel seçki; süre toplam 90 dakikadır. Salon içi yiyecek kapalıdır; fuaye alanında atıştırmalık satılır. Yaş sınırı genel izleyici olarak işaretlenmiştir.',
  },
  {
    title: 'Voleybol: Kadınlar Süper Lig Play-off',
    category: 'Spor',
    price: 95,
    thumbnail: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80',
    description:
      'Play-off turu beş set üzerinden oynanır. Deplasman tribünü ayrı girişlidir; forma ve düdük gibi ses çıkaran nesneler yasaktır. Etkinlik süresi yaklaşık iki saattir.',
  },
  {
    title: 'Rock Station Festival Günü 1',
    category: 'Konser',
    price: 650,
    thumbnail: 'https://images.unsplash.com/photo-1459749411175-04bf5292ce57?w=600&q=80',
    description:
      'Birden fazla sahnede sıralı performanslar. Biletiniz günlük giriş içindir; bilekliğinizi kaybetmeyin. İlk yardım ve su istasyonları harita üzerinde işaretlidir.',
  },
  {
    title: 'Oscar Ödüllü Filmler Maratonu',
    category: 'Sinema',
    price: 180,
    thumbnail: 'https://images.unsplash.com/photo-1598899134739-24d46d6ac077?w=600&q=80',
    description:
      'Üç film üst üste gösterim; aralarda kısa mola vardır. Oturma numarası seçilemez; salon düzeni “önce gelen yer kapar” değildir, koltuk bilette yazılıdır.',
  },
  {
    title: 'Tenis: ATP Challenger Final',
    category: 'Spor',
    price: 200,
    thumbnail: 'https://images.unsplash.com/photo-1622279454076-16245f8a4480?w=600&q=80',
    description:
      'Tekler finali, hakem ve çizgi hakemleri ile oynanır. Güneş koruyucu ve şapka önerilir. Yağmur gecikmesinde saha kuruluşuna göre başlangıç saati kayabilir.',
  },
  {
    title: 'Senfoni Orkestrası — Bahar Konseri',
    category: 'Konser',
    price: 420,
    thumbnail: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&q=80',
    description:
      'Klasik repertuvar ve tek solist konçerto. Sessiz cep telefonu zorunludur; perde aralarında fotoğraf çekimi yasaktır. Program broşürü gişede ücretsizdir.',
  },
  {
    title: 'Korku Gecesi — Gece Yarısı Seansı',
    category: 'Sinema',
    price: 160,
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    description:
      '18 yaş ve üzeri önerilir; ani ses ve flaş efektleri içerir. Gece yarısı seansı sonrası servis çıkışları kısıtlı olabilir; toplu taşıma saatlerini kontrol edin.',
  },
  {
    title: 'Futbol: UEFA Avrupa Ligi Maçı',
    category: 'Spor',
    price: 550,
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    description:
      'Uluslararası maç günü güvenlik protokolü uygulanır. Pasaport veya kimlik ibrazı istenebilir. Deplasman bloğu için ayrı turnike kullanılır.',
  },
  {
    title: 'Elektronik Müzik — DJ Set & Işık Şovu',
    category: 'Konser',
    price: 480,
    thumbnail: 'https://images.unsplash.com/photo-1571266028243-e4733dcb0bdd?w=600&q=80',
    description:
      'Işık şovu epilepsi hassasiyeti olanlar için uyarı içerebilir. Kulak koruyucu fuayede satılır. Etkinlik alanı 18+ olarak düzenlenmiştir.',
  },
  {
    title: 'Yerli Komedi Filmi Gala Gösterimi',
    category: 'Sinema',
    price: 140,
    thumbnail: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&q=80',
    description:
      'Gala sonrası kısa söyleşi ve imza seansı planlanmıştır. Süre yaklaşık 105 dakikadır. Türkçe seslendirmedir; altyazı yoktur.',
  },
  {
    title: 'Hokey: Buz Pisti Ligi Finali',
    category: 'Spor',
    price: 310,
    thumbnail: 'https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=600&q=80',
    description:
      'Buz pisti sıcaklığı düşük olduğundan mont önerilir. Maç üç periyot üzerinden oynanır; uzatmalar ve penaltı atışları kurallara göre eklenir.',
  },
  {
    title: 'Türk Halk Müziği Korosu',
    category: 'Konser',
    price: 180,
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80',
    description:
      'Koro ve bağlama eşliğinde yöresel eserler. Oturma düzeni numaralıdır; geç girişlerde ara molaya kadar bekletme uygulanabilir.',
  },
  {
    title: 'Belgesel Sinema: Doğa ve İklim',
    category: 'Sinema',
    price: 90,
    thumbnail: 'https://images.unsplash.com/photo-1440404653325-ab12749ad78d?w=600&q=80',
    description:
      '60 dakikalık belgesel ve 20 dakikalık söyleşi. Çevre temalı etkinlik; geri dönüşüm kutuları girişte belirtilmiştir. Öğrenci indirimi kasada sorulur.',
  },
];
