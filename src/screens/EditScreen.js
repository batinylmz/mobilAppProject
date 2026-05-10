import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EventContext } from '../context/EventContext';

const P = {
  pageBg: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  statBg: '#eceff3',
  cardBg: '#6f123f',
  cardText: '#ffffff',
  cardMuted: 'rgba(255,255,255,0.85)',
  primary: '#6f123f',
  primaryText: '#ffffff',
  accentLink: '#6f123f',
  warning: '#f59e0b',
  danger: '#ea580c',
};

function formatDate(iso) {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function EditScreen({ route, navigation }) {
  const { eventId } = route.params;
  const { events, favorites, registrations } = useContext(EventContext);
  const event = [...events, ...favorites, ...registrations].find((item) => item.id === eventId);

  if (!event) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Etkinlik bulunamadı.</Text>
          <Pressable style={styles.secondaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.secondaryBtnText}>Geri Dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const eventDate = formatDate(event.date);
  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <View style={styles.previewPad}>
        <Text style={styles.title}>{event.title}</Text>
        {!!eventDate && <Text style={styles.date}>{eventDate}</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: P.pageBg },
  previewPad: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: P.text },
  date: { color: P.muted, marginTop: 8, fontSize: 14 },
  secondaryBtn: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
  },
  secondaryBtnText: { color: P.text, fontSize: 15, fontWeight: '700' },
  notFoundWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  notFoundTitle: { color: P.text, fontSize: 22, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
});

export default EditScreen;
