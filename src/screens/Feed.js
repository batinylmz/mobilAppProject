import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';
import { fetchEvents } from '../services/api';

const Feed = () => {
    const [search, setSearch] = useState('');
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Ekran ilk açıldığında API'den verileri çeker
    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        setLoading(true);
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />

            {/* Veriler yüklenirken ekranda dönen yükleniyor ikonu gösterir */}
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.cardBackground} style={styles.loader} />
            ) : (
                <FlatList
                    data={events}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <EventCard
                            event={item} // Artık API'den gelen gerçek title, category, stock ve thumbnail kullanılıyor
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