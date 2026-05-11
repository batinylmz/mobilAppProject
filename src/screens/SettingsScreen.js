import React, { useContext, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';

function Row({ icon, title, sub, right, iconTint, circleBg, textColor, subColor }) {
  return (
    <View style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: circleBg }]}>
        <Ionicons name={icon} size={20} color={iconTint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.rowSub, { color: subColor }]}>{sub}</Text>
      </View>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowTitle: { fontSize: 16, fontWeight: '700' },
  rowSub: { fontSize: 13, marginTop: 2 },
  sep: { height: 1, marginLeft: 64 },
});

export default function SettingsScreen() {
  const navigation = useNavigation();
  const tabBarH = useBottomTabBarHeight();
  const { user, logout } = useContext(AuthContext);
  const { colors, isDark, setDarkMode } = useAppTheme();
  const [pushOn, setPushOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);

  const layout = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: colors.background },
        header: {
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          backgroundColor: colors.cardBg,
        },
        headerTitle: {
          color: '#fff',
          fontSize: 22,
          fontWeight: '800',
          marginBottom: 16,
        },
        profileCard: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.25)',
          borderRadius: 16,
          padding: 14,
          gap: 12,
        },
        avatar: {
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.25)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        profileName: { color: '#fff', fontSize: 17, fontWeight: '700' },
        profileEmail: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 2 },
        bodyContent: { padding: 18, paddingBottom: tabBarH + 32 },
        sectionLabel: {
          color: colors.muted,
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.6,
          marginBottom: 8,
          marginTop: 8,
        },
        card: {
          backgroundColor: colors.surface,
          borderRadius: 16,
          paddingVertical: 6,
          paddingHorizontal: 4,
          marginBottom: 8,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.tabBarBorder,
        },
        logout: {
          marginTop: 24,
          alignItems: 'center',
          padding: 14,
          borderRadius: 14,
          backgroundColor: colors.cardBg,
        },
        logoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
      }),
    [colors, tabBarH]
  );

  const signOut = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
  };

  const name =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.username || 'Kullanıcı';

  const rowText = colors.text;
  const rowSub = colors.muted;
  const sepStyle = [styles.sep, { backgroundColor: colors.tabBarBorder }];

  return (
    <View style={layout.root}>
      <SafeAreaView edges={['top']} style={layout.header}>
        <Text style={layout.headerTitle}>Settings</Text>
        <Pressable style={layout.profileCard} onPress={() => {}}>
          <View style={layout.avatar}>
            <Ionicons name="person" size={28} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={layout.profileName}>{name}</Text>
            <Text style={layout.profileEmail}>{user?.email || ''}</Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#fff" />
        </Pressable>
      </SafeAreaView>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={layout.bodyContent}>
        <Text style={layout.sectionLabel}>NOTIFICATIONS</Text>
        <View style={layout.card}>
          <Row
            icon="notifications-outline"
            title="Push Notifications"
            sub="Receive event updates"
            iconTint={colors.cardBg}
            circleBg={colors.iconCircleBg}
            textColor={rowText}
            subColor={rowSub}
            right={
              <Switch
                value={pushOn}
                onValueChange={setPushOn}
                trackColor={{ false: '#888', true: '#333' }}
              />
            }
          />
          <View style={sepStyle} />
          <Row
            icon="mail-outline"
            title="Email Notifications"
            sub="Event reminders via email"
            iconTint={colors.cardBg}
            circleBg={colors.iconCircleBg}
            textColor={rowText}
            subColor={rowSub}
            right={
              <Switch
                value={emailOn}
                onValueChange={setEmailOn}
                trackColor={{ false: '#888', true: '#333' }}
              />
            }
          />
        </View>

        <Text style={layout.sectionLabel}>PREFERENCES</Text>
        <View style={layout.card}>
          <Row
            icon="color-palette-outline"
            title="Appearance"
            sub="Customize app theme"
            iconTint={colors.cardBg}
            circleBg={colors.iconCircleBg}
            textColor={rowText}
            subColor={rowSub}
            right={<Ionicons name="chevron-forward" size={20} color={colors.muted} />}
          />
          <View style={sepStyle} />
          <Row
            icon="moon-outline"
            title="Dark Mode"
            sub="Use dark theme"
            iconTint={colors.cardBg}
            circleBg={colors.iconCircleBg}
            textColor={rowText}
            subColor={rowSub}
            right={
              <Switch
                value={isDark}
                onValueChange={setDarkMode}
                trackColor={{ false: '#888', true: '#333' }}
              />
            }
          />
        </View>

        <Pressable style={layout.logout} onPress={signOut}>
          <Text style={layout.logoutText}>Çıkış yap</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
