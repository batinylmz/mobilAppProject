import React, { useContext } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import EventImage from '../components/EventImage';
import { EventContext } from '../context/EventContext';
import { ThemeContext } from '../context/ThemeContext';

function FavoritesScreen({ navigation }) {
  const { favorites, removeFavorite, isRegistered } = useContext(EventContext);
  const { palette } = useContext(ThemeContext);
  const styles = createStyles(palette);

  const renderItem = ({ item }) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('Detail', { eventId: item.id })}>
      <EventImage
        uri={item.thumbnail}
        fallbacks={item.thumbnailFallbacks}
        lastResort={item.thumbnailLastResort}
        style={styles.avatar}
      />
      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.text}>Kontenjan: {item.stock}</Text>
        {isRegistered(item.id) ? <Text style={styles.tag}>Kayıtlı</Text> : null}
      </View>
      <Pressable onPress={() => removeFavorite(item.id)}>
        <Text style={styles.remove}>Kaldır</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Henüz favori eklemediniz.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
}

const createStyles = (palette) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: palette.background },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 18, color: palette.subtle },
    card: { backgroundColor: palette.card, flexDirection: 'row', padding: 15, marginBottom: 10, borderRadius: 10, elevation: 2, alignItems: 'center' },
    avatar: { width: 56, height: 56, borderRadius: 8, marginRight: 15 },
    cardInfo: { flex: 1 },
    name: { fontSize: 16, fontWeight: 'bold', color: palette.text },
    text: { fontSize: 14, color: palette.subtle, marginTop: 2 },
    tag: { color: '#22c55e', marginTop: 5, fontWeight: '700' },
    remove: { color: palette.danger, fontWeight: '700' },
  });

export default FavoritesScreen;