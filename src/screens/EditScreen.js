import React, { useContext, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BrandInfinity from '../components/BrandInfinity';
import EventImage from '../components/EventImage';
import { EventContext } from '../context/EventContext';
import { useAppTheme } from '../context/ThemeContext';

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

function buildEditStyles(c, bottomPad) {
  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: c.background },
    content: { padding: 16, paddingBottom: bottomPad },
    hero: {
      width: '100%',
      height: 230,
      borderRadius: 16,
      marginBottom: 14,
    },
    card: {
      backgroundColor: c.cardBg,
      borderRadius: 16,
      paddingVertical: 14,
      paddingHorizontal: 14,
    },
    title: {
      color: c.cardText,
      fontSize: 22,
      fontWeight: '700',
      lineHeight: 28,
    },
    date: {
      color: c.cardMuted,
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
      color: c.cardMuted,
      fontSize: 12,
      fontWeight: '600',
    },
    badgeValue: {
      color: c.cardText,
      fontSize: 14,
      fontWeight: '700',
      marginTop: 4,
    },
    descriptionTitle: {
      color: c.cardText,
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 6,
    },
    description: {
      color: c.cardMuted,
      fontSize: 14,
      lineHeight: 21,
    },
    favoriteBtn: {
      marginTop: 14,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      backgroundColor: c.favoriteBtnBg,
    },
    favoriteBtnText: {
      color: c.accent,
      fontSize: 14,
      fontWeight: '700',
    },
    primaryBtn: {
      marginTop: 10,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      backgroundColor: c.cardBg,
    },
    cancelBtn: {
      marginTop: 10,
      borderRadius: 14,
      paddingVertical: 14,
      alignItems: 'center',
      backgroundColor: c.danger,
    },
    primaryBtnText: {
      color: c.cardText,
      fontSize: 15,
      fontWeight: '700',
    },
    secondaryBtn: {
      marginTop: 10,
      borderRadius: 14,
      paddingVertical: 13,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: c.secondaryBtnBorder,
      backgroundColor: c.secondaryBtnBg,
    },
    secondaryBtnText: {
      color: c.text,
      fontSize: 15,
      fontWeight: '700',
    },
    disabled: { opacity: 0.6 },
    notFoundWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
    notFoundTitle: {
      color: c.text,
      fontSize: 22,
      fontWeight: '700',
      marginBottom: 16,
      textAlign: 'center',
    },
  });
}

function EditScreen({ route, navigation }) {
  const { eventId } = route.params;
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => buildEditStyles(colors, Math.max(insets.bottom, 16) + 24),
    [colors, insets.bottom]
  );

  const {
    events,
    favorites,
    registrations,
    isFavorite,
    isRegistered,
    addFavorite,
    register,
    unregister,
    updateStock,
  } = useContext(EventContext);

  const event = [...events, ...favorites, ...registrations].find((item) => item.id === eventId);

  const handleRegister = () => {
    if (!event || event.stock <= 0 || isRegistered(event.id)) return;
    register(event);
    updateStock(event.id, -1);
  };

  const handleUnregister = () => {
    if (!event || !isRegistered(event.id)) return;
    unregister(event.id);
    updateStock(event.id, +1);
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <BrandInfinity style={{ paddingHorizontal: 16 }} />
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Etkinlik bulunamadı.</Text>
          <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Geri Dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const registered = isRegistered(event.id);
  const soldOut = event.stock <= 0;
  const eventDate = formatDate(event.date);
  const priceText = Number(event.price) > 0 ? `$${event.price}` : 'Ücretsiz';

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <BrandInfinity style={{ paddingHorizontal: 16 }} />
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
          <Text style={styles.description}>
            {event.description || 'Bu etkinlik için açıklama bulunmuyor.'}
          </Text>
        </View>

        <Pressable style={styles.favoriteBtn} onPress={() => addFavorite(event)}>
          <Text style={styles.favoriteBtnText}>
            {isFavorite(event.id) ? 'Favoriden Çıkar' : 'Favorilere Ekle'}
          </Text>
        </Pressable>

        {!registered ? (
          <Pressable
            style={[styles.primaryBtn, soldOut && styles.disabled]}
            onPress={handleRegister}
            disabled={soldOut}
          >
            <Text style={styles.primaryBtnText}>{soldOut ? 'Kontenjan Doldu' : 'Kayıt Ol'}</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.cancelBtn} onPress={handleUnregister}>
            <Text style={styles.primaryBtnText}>Kayıt İptal Et</Text>
          </Pressable>
        )}

        <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryBtnText}>Geri Dön</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditScreen;
