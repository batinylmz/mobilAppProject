import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Tasarım (Figma) ile uyumlu sabitler */
const P = {
  pageBg: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  statBg: '#eceff3',
  statRadius: 14,
  cardBg: '#6f123f',
  cardText: '#ffffff',
  cardMuted: 'rgba(255,255,255,0.85)',
  accentLink: '#6f123f',
};

function formatEventDate(iso) {
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

function kontenjanDurumu(item) {
  const total = item.capacityTotal;
  if (total != null && total > 0) {
    const dolu = Math.max(0, total - (item.stock ?? 0));
    return `Kontenjan Durumu ${dolu}/${total}`;
  }
  return `Kalan kontenjan: ${item.stock ?? 0}`;
}

function initialsAvatarUrl(name) {
  const q = encodeURIComponent((name || 'User').trim() || 'User');
  return `https://ui-avatars.com/api/?name=${q}&background=6f123f&color=ffffff&size=256&bold=true&rounded=true`;
}

/** API fotoğrafı + gölge/halka + kırpma; yoksa veya hata → baş harf avatarı */
function ProfileAvatar({ uri, displayName }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [uri]);

  const remote = uri && !failed ? uri : initialsAvatarUrl(displayName);

  return (
    <View style={avatarStyles.shell}>
      <View style={avatarStyles.ring}>
        <Image
          source={{ uri: remote }}
          style={avatarStyles.image}
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      </View>
    </View>
  );
}

const avatarStyles = StyleSheet.create({
  shell: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  ring: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#f1f5f9',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.draftPad}>
        <Text style={styles.draftTitle}>Profil ekranı</Text>
        <Text style={styles.draftSub}>Yardımcılar ve avatar hazır; liste bir sonraki adımda.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: P.pageBg },
  draftPad: { padding: 24 },
  draftTitle: { fontSize: 20, fontWeight: '700', color: P.text },
  draftSub: { marginTop: 8, color: P.muted, fontSize: 14 },
});

export default ProfileScreen;
