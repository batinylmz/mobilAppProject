import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '../hooks/useTheme';
import { COLORS } from '../constants/theme';

export default function AppearanceScreen({ navigation }) {
    const { theme, toggleTheme, colors } = useTheme();
    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: colors.screenBg }]} edges={['top']}>
            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Text style={[styles.back, { color: colors.text }]}>{'<'} Geri</Text>
                </Pressable>
                <Text style={[styles.title, { color: colors.text }]}>Görünüm</Text>
            </View>
            <Text style={[styles.body, { color: colors.muted }]}>
                Uygulama genelinde açık / koyu tema buradan veya Ayarlar ekranındaki anahtardan değiştirilir.
            </Text>
            <Pressable
                style={[styles.btn, { backgroundColor: COLORS.cardBurgundy }]}
                onPress={toggleTheme}
            >
                <Text style={styles.btnText}>
                    Şu an: {theme === 'dark' ? 'Koyu' : 'Açık'} — değiştir
                </Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: { flex: 1, paddingHorizontal: 20 },
    header: { marginBottom: 16 },
    back: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
    title: { fontSize: 24, fontWeight: '800' },
    body: { fontSize: 15, lineHeight: 22, marginBottom: 20 },
    btn: {
        borderRadius: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },
    btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
