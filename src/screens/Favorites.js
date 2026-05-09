import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import EventCard from '../components/EventCard';
import { COLORS, SIZES } from '../constants/theme';
// Context'i import et
import { EventContext } from '../context/EventContext';

const Favorites = () => {
    // API kullanmıyoruz, sadece Context'teki favorileri ve silme fonksiyonunu çekiyoruz
    const { favorites, removeFavorite } = useContext(EventContext);

    // Eğer favori dizisi boşsa gösterilecek ekran (Empty State)
    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Henüz favori eklemediniz</Text>
            </View>
        );
    }

    // Favoriler varsa listele
    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <EventCard
                        event={item}
                        isFavorite={true} // Bu ekrandaki her kart zaten favoridir
                        onPress={() => console.log('Detaya git:', item.id)}
                        onFavorite={() => removeFavorite(item.id)} // İkona tıklanınca Context'ten siler
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // İstediğin CCC7CD arkaplan
    },
    listContainer: {
        paddingHorizontal: SIZES.padding,
        paddingTop: 16,
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    }
});

export default Favorites;