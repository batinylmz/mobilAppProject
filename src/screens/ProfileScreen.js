import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventImage from '../components/EventImage';
import { AuthContext } from '../context/AuthContext';
import { EventContext } from '../context/EventContext';

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

function ProfileScreen({ navigation }) {
  const { user, hydrateMe, token } = useContext(AuthContext);
  const { registrations, favorites, unregister, updateStock } =
    useContext(EventContext);

  useEffect(() => {
    if (token) hydrateMe();
  }, [token, hydrateMe]);

  const displayName =
    user?.firstName || user?.lastName
      ? [user?.firstName, user?.lastName].filter(Boolean).join(' ')
      : user?.username || 'Kullanıcı';

  const avatarUri = user?.image || user?.avatar || user?.profileImage;

  const Header = (
    <View style={styles.headerBlock}>
      <View style={styles.avatarWrap}>
        <ProfileAvatar uri={avatarUri} displayName={displayName} />
      </View>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.email}>{user?.email || ''}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Etkinlikler</Text>
          <Text style={styles.statNum}>{registrations.length}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Favoriler</Text>
          <Text style={styles.statNum}>{favorites.length}</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Katıldığım Etkinlikler</Text>
        <Pressable onPress={() => navigation.navigate('Feed')}>
          <Text style={styles.seeAll}>Tümünü Gör</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderEventCard = ({ item }) => (
    <View style={styles.eventCard}>
      <EventImage
        uri={item.thumbnail}
        fallbacks={item.thumbnailFallbacks}
        lastResort={item.thumbnailLastResort}
        style={styles.eventThumb}
      />
      <Pressable
        style={styles.eventTextCol}
        onPress={() => navigation.navigate('Detail', { eventId: item.id })}
      >
        <Text style={styles.eventTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.eventDate}>{formatEventDate(item.date)}</Text>
        <Text style={styles.eventQuota}>{kontenjanDurumu(item)}</Text>
      </Pressable>
      <Pressable
        style={styles.trashBtn}
        onPress={() => {
          unregister(item.id);
          updateStock(item.id, +1);
        }}
        accessibilityLabel="Etkinlikten çık"
      >
        <Text style={styles.trashIcon}>🗑</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <FlatList
        data={registrations}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={Header}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Henüz kayıtlı etkinliğiniz yok.
          </Text>
        }
        renderItem={renderEventCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: P.pageBg },
  listContent: { paddingHorizontal: 18, paddingBottom: 32 },
  headerBlock: { alignItems: 'center', paddingTop: 8, marginBottom: 8 },
  avatarWrap: { marginBottom: 16 },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: P.text,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: P.muted,
    marginTop: 4,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    marginBottom: 22,
    width: '100%',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: P.statBg,
    borderRadius: P.statRadius,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statLabel: { fontSize: 14, color: P.text, fontWeight: '600' },
  statNum: { fontSize: 22, fontWeight: '700', color: P.text, marginTop: 4 },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: P.text },
  seeAll: { fontSize: 14, fontWeight: '600', color: P.accentLink },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: P.cardBg,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 10,
  },
  eventThumb: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  eventTextCol: { flex: 1, minWidth: 0 },
  eventTitle: {
    color: P.cardText,
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 20,
  },
  eventDate: {
    color: P.cardMuted,
    fontSize: 12,
    marginTop: 4,
  },
  eventQuota: {
    color: P.cardMuted,
    fontSize: 12,
    marginTop: 2,
  },
  trashBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trashIcon: { fontSize: 22 },
  empty: {
    textAlign: 'center',
    color: P.muted,
    marginTop: 8,
    paddingHorizontal: 12,
  },
});

export default ProfileScreen;
