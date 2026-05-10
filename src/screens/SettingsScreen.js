import React, { useContext } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { EventContext } from '../context/EventContext';
import { ThemeContext } from '../context/ThemeContext';

function SettingsScreen() {
  const { logout, user } = useContext(AuthContext);
  const { resetEvents } = useContext(EventContext);
  const { theme, palette, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    resetEvents();
    logout();
  };

  return (
    <View style={[styles.container, { backgroundColor: palette.background }]}>
      <Text style={[styles.title, { color: palette.text }]}>Ayarlar</Text>
      <View style={[styles.card, { backgroundColor: palette.card }]}>
        <Text style={[styles.text, { color: palette.text }]}>Kullanıcı: {user?.username || '-'}</Text>
        <Text style={[styles.text, { color: palette.text }]}>E-posta: {user?.email || '-'}</Text>
        <View style={styles.row}>
          <Text style={[styles.text, { color: palette.text }]}>Dark mode</Text>
          <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  card: { padding: 20, borderRadius: 10, marginBottom: 30, elevation: 2, gap: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '500' },
  button: { backgroundColor: '#dc2626', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default SettingsScreen;