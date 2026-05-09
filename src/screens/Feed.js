import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';
import { fetchEvents, searchEvents } from '../services/api';
// Context'i import et
import { EventContext } from '../context/EventContext';

const Feed = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Context'ten state ve fonksiyonları çekiyoruz
    const { favorites, addFavorite, removeFavorite } = useContext(EventContext);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            if (search.trim() === '') {
                await loadEvents();
            } else {
                const data = await searchEvents(search);
                setEvents(data);
            }
            setLoading(false);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const loadEvents = async () => {
        const data = await fetchEvents();
        setEvents(data);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setSearch('');
        await loadEvents();
        setRefreshing(false);
    }, []);

    // Kalp ikonuna tıklanınca çalışacak mantık
    const handleFavoritePress = (event) => {
        const isFav = favorites.some((fav) => fav.id === event.id);
        if (isFav) {
            removeFavorite(event.id);
        } else {
            addFavorite(event);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />

            {loading && !refreshing ? (
                <ActivityIndicator size="large" color={COLORS.cardBackground} style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.cardBackground} />
                    }
                    renderItem={({ item }) => {
                        // Etkinlik favoriler dizisinde var mı kontrol et
                        const isFavorite = favorites.some((fav) => fav.id === item.id);

                        return (
                            <EventCard
                                event={item}
                                isFavorite={isFavorite}
                                onPress={() => console.log('Detaya git:', item.id)}
                                onFavorite={() => handleFavoritePress(item)}
                            />
                        );
                    }}
                />
            )}
        </View>
    );
};

// ... styles objesi eskisi gibi kalıyor ...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    searchInput: { backgroundColor: COLORS.white, margin: SIZES.padding, padding: 12, borderRadius: 20 },
    listContainer: { paddingHorizontal: SIZES.padding, paddingBottom: 20 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default Feed;