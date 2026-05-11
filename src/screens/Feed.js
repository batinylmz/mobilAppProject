import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BrandInfinity from '../components/BrandInfinity';
import EventCard from '../components/EventCard';
import { SIZES } from '../constants/theme';
import { useAppTheme } from '../context/ThemeContext';
import { fetchEvents, searchEvents } from '../services/api';
import { EventContext } from '../context/EventContext';
import { mapProductToEvent } from '../utils/eventFormat';

const Feed = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const tabBarH = useBottomTabBarHeight();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const {
    events,
    setEvents,
    favorites,
    addFavorite,
    removeFavorite,
  } = useContext(EventContext);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        tagline: {
          textAlign: 'center',
          fontStyle: 'italic',
          color: colors.tagline,
          fontSize: 15,
          marginBottom: 12,
          paddingHorizontal: SIZES.padding,
        },
        searchWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.searchBg,
          marginHorizontal: SIZES.padding,
          borderRadius: 22,
          paddingHorizontal: 14,
          marginBottom: 12,
        },
        searchIcon: { marginRight: 8 },
        searchInput: {
          flex: 1,
          paddingVertical: 12,
          fontSize: 16,
          color: colors.text,
        },
        listContainer: {
          paddingHorizontal: SIZES.padding,
          paddingBottom: tabBarH + 24,
        },
        loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
      }),
    [colors, tabBarH]
  );

  useEffect(() => {
    const q = search.trim();
    const debounceMs = q.length > 0 ? 500 : 0;
    const t = setTimeout(async () => {
      setLoading(true);
      const data = q ? await searchEvents(q) : await fetchEvents();
      setEvents(data.map(mapProductToEvent));
      setLoading(false);
    }, debounceMs);
    return () => clearTimeout(t);
  }, [search, setEvents]);

  const loadEvents = useCallback(async () => {
    const data = await fetchEvents();
    setEvents(data.map(mapProductToEvent));
  }, [setEvents]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setSearch('');
    await loadEvents();
    setRefreshing(false);
  }, [loadEvents]);

  const handleFavoritePress = (event) => {
    const isFav = favorites.some((fav) => fav.id === event.id);
    if (isFav) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <BrandInfinity style={{ paddingHorizontal: SIZES.padding }} />
      <Text style={styles.tagline}>Infinite Events, One Loop</Text>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={20} color={colors.muted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Etkinlik ara..."
          placeholderTextColor={colors.muted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading && !refreshing ? (
        <ActivityIndicator size="large" color={colors.cardBg} style={styles.loader} />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.cardBg}
            />
          }
          renderItem={({ item }) => {
            const isFavorite = favorites.some((fav) => fav.id === item.id);
            return (
              <EventCard
                event={item}
                isFavorite={isFavorite}
                variant="feed"
                onPress={() => navigation.navigate('Detail', { eventId: item.id })}
                onFavorite={() => handleFavoritePress(item)}
              />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Feed;
