import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import EventImage from '../components/EventImage';
import { EventContext } from '../context/EventContext';
import { ThemeContext } from '../context/ThemeContext';

function HomeScreen({ navigation }) {
  const { events, loading, error, fetchEvents, addFavorite, isFavorite } = useContext(EventContext);
  const { palette } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fetchEvents(searchQuery);
    }, 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery, fetchEvents]);

  const renderItem = ({ item }) => (
    <Pressable
      style={[styles.card, { backgroundColor: palette.card }, item.stock === 0 && styles.soldOut]}
      onPress={() => navigation.navigate('Detail', { eventId: item.id })}
    >
      <EventImage
        uri={item.thumbnail}
        fallbacks={item.thumbnailFallbacks}
        lastResort={item.thumbnailLastResort}
        style={styles.thumb}
      />
      <View style={styles.cardInfo}>
        <Text style={[styles.name, { color: palette.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.text, { color: palette.subtle }]} numberOfLines={1}>
          {item.category}
        </Text>
        <Text style={[styles.text, { color: palette.text }]}>
          Kontenjan: {item.stock}
        </Text>
        {item.stock === 0 ? <Text style={styles.badge}>Kontenjan doldu</Text> : null}
      </View>
      <View style={styles.cardActions}>
        <Pressable onPress={() => addFavorite(item)}>
          <Text style={{ fontSize: 22 }}>{isFavorite(item.id) ? '⭐' : '☆'}</Text>
        </Pressable>
      </View>
    </Pressable>
  );

  const styles = useMemo(() => createStyles(palette), [palette]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: palette.text }]}>Etkinlikler ({events.length})</Text>
        <View style={styles.headerButtons}>
          <Pressable onPress={() => navigation.navigate('Favorites')}>
            <Text style={[styles.link, { color: palette.primary }]}>Favoriler</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Text style={[styles.link, { color: palette.primary }]}>Profil</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text style={[styles.link, { color: palette.primary }]}>Ayarlar</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.toolbar}>
        <TextInput
          style={[styles.searchInput, { color: palette.text }]}
          placeholder="Etkinlik ara..."
          placeholderTextColor={palette.subtle}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={palette.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          onRefresh={() => fetchEvents(searchQuery)}
          refreshing={loading}
        />
      )}
    </SafeAreaView>
  );
}

const createStyles = (palette) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, backgroundColor: palette.card, elevation: 3 },
    headerTitle: { fontSize: 20, fontWeight: 'bold' },
    headerButtons: { flexDirection: 'row', gap: 10 },
    link: { fontWeight: '700' },
    errorText: { color: 'red', textAlign: 'center', margin: 10 },
    toolbar: { padding: 10, backgroundColor: palette.card, marginBottom: 10 },
    searchInput: { borderWidth: 1, borderColor: '#64748b', padding: 10, borderRadius: 8 },
    card: { flexDirection: 'row', padding: 12, marginHorizontal: 10, marginBottom: 10, borderRadius: 10, elevation: 2, gap: 12 },
    soldOut: { opacity: 0.65 },
    thumb: { width: 70, height: 70, borderRadius: 8 },
    cardInfo: { flex: 1, justifyContent: 'center' },
    name: { fontSize: 16, fontWeight: 'bold' },
    text: { fontSize: 13, marginTop: 2 },
    badge: { marginTop: 6, color: '#dc2626', fontWeight: '700' },
    cardActions: { justifyContent: 'center', alignItems: 'center' },
  });

export default HomeScreen;