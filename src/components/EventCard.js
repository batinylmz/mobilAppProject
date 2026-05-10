import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const EventCard = ({ event, onPress, onFavorite, isFavorite }) => {
    const isSoldOut = event.stock === 0;

    return (
        <TouchableOpacity
            style={[styles.card, isSoldOut && styles.cardSoldOut]}
            onPress={onPress}
            disabled={isSoldOut}
        >
            <Image source={{ uri: event.thumbnail }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title} numberOfLines={1}>{event.title}</Text>
                <Text style={styles.category}>{event.category}</Text>
                <Text style={styles.stock}>
                    {isSoldOut ? 'Kontenjan Doldu' : `Kontenjan: ${event.stock}`}
                </Text>
            </View>
            <TouchableOpacity style={styles.favBtn} onPress={onFavorite}>
                <Text style={styles.favIcon}>{isFavorite ? '♥' : '♡'}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.cardBackground,
        borderRadius: SIZES.radius,
        padding: 10,
        marginBottom: 12,
    },
    cardSoldOut: {
        backgroundColor: COLORS.soldOut,
        opacity: 0.6,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 6,
    },
    info: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
    },
    title: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    category: {
        color: COLORS.textLight,
        fontSize: 12,
        marginTop: 4,
    },
    stock: {
        color: COLORS.white,
        fontSize: 12,
        marginTop: 8,
        fontWeight: '500',
    },
    favBtn: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    favIcon: {
        color: COLORS.white,
        fontSize: 22,
    }
});

export default EventCard;