import React, { useContext } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventImage from '../components/EventImage';
import { EventContext } from '../context/EventContext';

const P = {
  pageBg: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  statBg: '#eceff3',
  cardBg: '#6f123f',
  cardText: '#ffffff',
  cardMuted: 'rgba(255,255,255,0.85)',
  primary: '#6f123f',
  primaryText: '#ffffff',
  accentLink: '#6f123f',
  warning: '#f59e0b',
  danger: '#ea580c',
};

function formatDate(iso) {
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

function EditScreen({ route, navigation }) {
  const { eventId } = route.params;
  const { events, favorites, registrations } = useContext(EventContext);
  const event = [...events, ...favorites, ...registrations].find((item) => item.id === eventId);

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Etkinlik bulunamadı.</Text>
          <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Geri Dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const eventDate = formatDate(event.date);
  const priceText = Number(event.price) > 0 ? `$${event.price}` : 'Ücretsiz';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <EventImage
          uri={event.thumbnail}
          fallbacks={event.thumbnailFallbacks}
          lastResort={event.thumbnailLastResort}
          style={styles.hero}
        />

        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          {!!eventDate && <Text style={styles.date}>{eventDate}</Text>}

          <View style={styles.badgesRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Kategori</Text>
              <Text style={styles.badgeValue}>{event.category || 'Genel'}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Fiyat</Text>
              <Text style={styles.badgeValue}>{priceText}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeLabel}>Kontenjan</Text>
              <Text style={styles.badgeValue}>{event.stock}</Text>
            </View>
          </View>

          <Text style={styles.descriptionTitle}>Açıklama</Text>
          <Text style={styles.description}>{event.description || 'Bu etkinlik için açıklama bulunmuyor.'}</Text>
        </View>

        <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Geri Dön</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: P.pageBg },
  content: { padding: 16, paddingBottom: 28 },
  hero: {
    width: '100%',
    height: 230,
    borderRadius: 16,
    marginBottom: 14,
  },
  card: {
    backgroundColor: P.cardBg,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  title: {
    color: P.cardText,
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  date: {
    color: P.cardMuted,
    fontSize: 12,
    marginTop: 6,
    marginBottom: 14,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  badge: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
  },
  badgeLabel: {
    color: P.cardMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  badgeValue: {
    color: P.cardText,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  descriptionTitle: {
    color: P.cardText,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  description: {
    color: P.cardMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  secondaryBtn: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryBtnText: {
    color: P.text,
    fontSize: 15,
    fontWeight: '700',
  },
  notFoundWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  notFoundTitle: { color: P.text, fontSize: 22, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
});

export default EditScreen;
