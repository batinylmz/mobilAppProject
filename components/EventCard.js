import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const EventCard = () => {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.title}>Etkinlik Başlığı</Text>
                <Text style={styles.category}>Kategori</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.cardBackground,
        borderRadius: SIZES.radius,
        padding: 10,
        marginBottom: 12,
    },
    info: {
        marginLeft: 12,
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
    }
});

export default EventCard;