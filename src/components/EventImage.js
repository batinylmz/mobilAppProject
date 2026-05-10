import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';

/**
 * Sıra: ana görsel → aynı etkinlik türünden diğer Unsplash’lar → türe özel son çare (Pexels).
 * Konu dışı rastgele foto (picsum) kullanılmaz.
 */
export default function EventImage({ uri, fallbacks = [], lastResort, style }) {
  const chain = useMemo(() => {
    const parts = [uri, ...(Array.isArray(fallbacks) ? fallbacks : [])];
    if (lastResort) parts.push(lastResort);
    const seen = new Set();
    return parts.filter((u) => {
      if (!u || seen.has(u)) return false;
      seen.add(u);
      return true;
    });
  }, [uri, fallbacks, lastResort]);

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setIdx(0);
  }, [uri, lastResort]);

  const safeIdx = Math.min(idx, Math.max(0, chain.length - 1));
  const currentUri = chain[safeIdx] || '';

  return (
    <Image
      source={{ uri: currentUri }}
      style={style}
      resizeMode="cover"
      onError={() => {
        setIdx((i) => (i < chain.length - 1 ? i + 1 : i));
      }}
    />
  );
}
