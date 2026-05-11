import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Çentik koruması için
import { COLORS, SIZES } from '../constants/theme';

export default function AppHeader() {
    return (
        // edges={['top']} sadece üstten boşluk bırakır, alt tasarımı bozmaz
        <SafeAreaView edges={['top']} style={{ backgroundColor: FIGMA_COLORS.background }}>
            <View style={styles.wrap}>
                <View style={styles.bar}>
                    <Text style={styles.infinity}>∞</Text>
                    <Text style={styles.brand}>EVENTLOOP</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrap: {
        paddingHorizontal: SIZES.padding,
        paddingTop: 4,
        paddingBottom: 8,
    },
    bar: {
        borderRadius: SIZES.radiusLg,
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    infinity: {
        fontSize: 28,
        color: '#e879a8',
        fontWeight: '300',
    },
    brand: {
        marginTop: 2,
        fontSize: 11,
        letterSpacing: 2,
        fontWeight: '700',
        color: COLORS.white,
    },
});