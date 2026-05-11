import React, { useState } from 'react';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Kendi projenizdeki yollara göre güncelleyebilirsiniz
import useAuth from '../hooks/useAuth';
import useEvents from '../hooks/useEvents';
import useTheme from '../hooks/useTheme';

// Sabit Renkler (Figma'dan Birebir Alındı)
const FIGMA_COLORS = {
    header: '#6F123F',
    background: '#CCC7CD',
    card: '#F4F4F6',
    iconBg: '#E1CFD6',
    textDark: '#1A1A1A',
    textMuted: '#7A7A7A',
};

export default function SettingsScreen() {
    const navigation = useNavigation();

    // Hook'larınızın tanımlı olduğunu varsayıyoruz
    const { user, logout } = useAuth();
    const { resetSession } = useEvents();
    const { theme, toggleTheme } = useTheme();

    const [pushOn, setPushOn] = useState(true);
    const [emailOn, setEmailOn] = useState(false);

    // Profil ismini birleştirme
    const displayName = user?.name || "Hasan Demirbağ";
    const displayEmail = user?.email || "demirbaghasan257@gmail.com";
    const avatarUrl = user?.avatar || "https://randomuser.me/api/portraits/men/32.jpg";

    const onLogout = () => {
        if(resetSession) resetSession();
        if(logout) logout();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={FIGMA_COLORS.header} />

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

                {/* ÜST BORDO ALAN (HEADER) */}
                <View style={styles.hero}>
                    <Text style={styles.heroTitle}>Settings</Text>

                    <Pressable
                        style={styles.profileCard}
                        onPress={() => navigation.navigate('Profile')}
                    >
                        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.profileName}>{displayName}</Text>
                            <Text style={styles.profileEmail}>{displayEmail}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#1A1A1A" />
                    </Pressable>
                </View>

                {/* NOTIFICATIONS BÖLÜMÜ */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>NOTIFICATIONS</Text>
                    <View style={styles.card}>
                        <Row
                            icon="notifications"
                            title="Push Notifications"
                            subtitle="Receive event updates"
                            right={
                                <Switch
                                    value={pushOn}
                                    onValueChange={setPushOn}
                                    trackColor={{ false: '#D3D3D3', true: '#000000' }}
                                    thumbColor="#FFFFFF"
                                />
                            }
                        />
                        <View style={styles.divider} />
                        <Row
                            icon="notifications"
                            title="Email Notifications"
                            subtitle="Event reminders via email"
                            right={
                                <Switch
                                    value={emailOn}
                                    onValueChange={setEmailOn}
                                    trackColor={{ false: '#D3D3D3', true: '#000000' }}
                                    thumbColor="#FFFFFF"
                                />
                            }
                        />
                    </View>
                </View>

                {/* PREFERENCES BÖLÜMÜ */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>PREFERENCES</Text>
                    <View style={styles.card}>
                        <Pressable onPress={() => navigation.navigate('Appearance')}>
                            <Row
                                icon="color-palette"
                                title="Appearence"
                                subtitle="Customize app theme"
                                right={<Ionicons name="chevron-forward" size={20} color={FIGMA_COLORS.textDark} />}
                            />
                        </Pressable>
                        <View style={styles.divider} />
                        <Row
                            icon="moon"
                            title="Dark Mode"
                            subtitle="Use dark theme"
                            right={
                                <Switch
                                    value={theme === 'dark'}
                                    onValueChange={toggleTheme}
                                    trackColor={{ false: '#D3D3D3', true: '#000000' }}
                                    thumbColor="#FFFFFF"
                                />
                            }
                        />
                    </View>
                </View>

                {/* ÇIKIŞ YAP BÖLÜMÜ (Ödev Gereksinimi) */}
                <View style={[styles.section, { marginTop: 10 }]}>
                    <View style={styles.card}>
                        <Pressable style={styles.logoutRow} onPress={onLogout}>
                            <Ionicons name="log-out-outline" size={22} color="#D9534F" style={{ marginRight: 12 }} />
                            <Text style={styles.logoutText}>Çıkış Yap</Text>
                        </Pressable>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

// SATIR BİLEŞENİ (Figma Tasarımına Uygun)
function Row({ icon, title, subtitle, right }) {
    return (
        <View style={styles.row}>
            <View style={styles.iconCircle}>
                <Ionicons name={icon} size={20} color={FIGMA_COLORS.textDark} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.rowTitle}>{title}</Text>
                <Text style={styles.rowSub}>{subtitle}</Text>
            </View>
            {right}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: FIGMA_COLORS.background
    },
    scroll: {
        paddingBottom: 80 // Alt menü barı için boşluk
    },
    hero: {
        backgroundColor: FIGMA_COLORS.header,
        paddingHorizontal: 20,
        paddingTop: 60, // Üstten boşluk (Çentik alanı için)
        paddingBottom: 25,
    },
    heroTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 20,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.12)', // Hafif saydam beyaz arka plan
        borderRadius: 16,
        padding: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        backgroundColor: '#CCC',
    },
    profileName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2
    },
    profileEmail: {
        color: '#E0E0E0',
        fontSize: 13,
        fontWeight: '400'
    },
    section: {
        marginTop: 25,
        paddingHorizontal: 20,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: FIGMA_COLORS.textMuted,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: FIGMA_COLORS.card,
        borderRadius: 16,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    iconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: FIGMA_COLORS.iconBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    rowTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: FIGMA_COLORS.textDark,
        marginBottom: 2
    },
    rowSub: {
        fontSize: 12,
        color: FIGMA_COLORS.textMuted
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginLeft: 68, // İkonun hizasından sonra çizgi başlar
    },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    logoutText: {
        color: '#D9534F',
        fontWeight: '600',
        fontSize: 16
    },
});