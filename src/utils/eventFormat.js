import { EVENT_CATALOG } from '../data/eventCatalog';

export function formatEventDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function kontenjanDurumu(item) {
  const total = item.capacityTotal;
  if (total != null && total > 0) {
    const dolu = Math.max(0, total - (item.stock ?? 0));
    return `Kontenjan Durumu ${dolu}/${total}`;
  }
  return `Kalan kontenjan: ${item.stock ?? 0}`;
}

export function mapProductToEvent(p) {
  const capacityTotal = p.capacityTotal ?? 50;
  const rawStock = Number(p.stock);
  const stock = Number.isFinite(rawStock)
    ? Math.min(capacityTotal, Math.max(0, rawStock))
    : Math.min(capacityTotal, Math.max(0, Number(p.stock) || 15));

  const idx = Math.abs(Number(p.id) || 0) % EVENT_CATALOG.length;
  const meta = EVENT_CATALOG[idx];
  const date =
    p.date || p.meta?.createdAt || new Date(2026, 2, 15).toISOString();

  return {
    ...p,
    id: p.id,
    title: meta.title,
    category: meta.category,
    description: meta.description,
    thumbnail: meta.thumbnail,
    thumbnailFallbacks: [],
    thumbnailLastResort: meta.thumbnail,
    price: meta.price,
    date,
    capacityTotal,
    stock,
  };
}
