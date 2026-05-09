import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';

const Feed = () => {
    const [search, setSearch] = useState('');

    // Tasarımdaki sıraya ve verilere göre güncellenmiş sahte liste
    const dummyData = [
        { id: 1, title: 'Yapay Zeka Sanat Sergisi', category: 'Sanat', stock: 20, thumbnail: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Murat Boz Konseri', category: 'Müzik', stock: 0, thumbnail: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Basketbol Maçı', category: 'Spor', stock: 15, thumbnail: 'https://via.placeholder.com/150' },
    ];

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />
            <FlatList
                data={dummyData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        isFavorite={false}
                        onPress={() => console.log('Detaya git')}
                        onFavorite={() => console.log('Favoriye tıklandı')}
                    />
                )}
            />
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
    }
});

export default Feed;