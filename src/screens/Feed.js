import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';
import { fetchEvents, searchEvents } from '../services/api';

const Feed = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false); // Yeni state

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

    // Sayfayı ilk açılışta veya yenilemede dolduracak fonksiyon
    const loadEvents = async () => {
        const data = await fetchEvents();
        setEvents(data);
    };

    // Kullanıcı aşağı çektiğinde çalışacak fonksiyon
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        setSearch(''); // Yenileme yapınca aramayı da sıfırlayalım
        await loadEvents();
        setRefreshing(false);
    }, []);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />

            {loading && !refreshing ? ( // Aşağı çekerek yenileme sırasında ortadaki loader dönmesin diye
                <ActivityIndicator size="large" color={COLORS.cardBackground} style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    // Pull to refresh özelliğini ekliyoruz
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            tintColor={COLORS.cardBackground} // iOS loader rengi
                            colors={[COLORS.cardBackground]} // Android loader rengi
                        />
                    }
                    renderItem={({ item }) => (
                        <EventCard
                            event={item}
                            isFavorite={false}
                            onPress={() => console.log('Detaya git:', item.id)}
                            onFavorite={() => console.log('Favoriye tıklandı:', item.id)}
                        />
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    searchInput: {
        backgroundColor: COLORS.white,
        margin: SIZES.padding,
        padding: 12,
        borderRadius: 20,
    },
    listContainer: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 20,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Feed;