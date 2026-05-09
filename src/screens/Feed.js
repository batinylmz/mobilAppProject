import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';
import { fetchEvents, searchEvents } from '../services/api';

const Feed = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Debounce: Kullanıcı yazmayı bıraktıktan 500ms sonra çalışır
        const delayDebounceFn = setTimeout(async () => {
            setLoading(true);
            if (search.trim() === '') {
                const data = await fetchEvents();
                setEvents(data);
            } else {
                const data = await searchEvents(search);
                setEvents(data);
            }
            setLoading(false);
        }, 500);

        // Temizleme (Cleanup): Kullanıcı 500ms dolmadan yeni harf girerse eski sayacı iptal eder
        return () => clearTimeout(delayDebounceFn);
    }, [search]); // search state'i her değiştiğinde bu useEffect tetiklenir

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.cardBackground} style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
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