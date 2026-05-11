import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../context/ThemeContext';
import { formatEventDate, kontenjanDurumu } from '../utils/eventFormat';

const thumbUri = (event) =>
  event.thumbnail || (Array.isArray(event.images) && event.images[0]) || '';

const EventCard = ({ event, onPress, onFavorite, isFavorite, variant = 'feed' }) => {
  const { colors } = useAppTheme();
  const isSoldOut = (event.stock ?? 0) === 0;
  const uri = thumbUri(event);
  const dateLine = formatEventDate(event.date);
  const quotaLine = kontenjanDurumu(event);
  const rowIcon = colors.rowOnCard;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: colors.cardBg },
        isSoldOut && { backgroundColor: colors.soldOut, opacity: 0.65 },
      ]}
      onPress={onPress}
      disabled={isSoldOut}
      activeOpacity={0.9}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.ph]} />
      )}
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.cardText }]} numberOfLines={2}>
          {event.title}
        </Text>
        {!!dateLine && (
          <Text style={[styles.meta, { color: colors.cardMuted }]}>{dateLine}</Text>
        )}
        <Text style={[styles.quota, { color: colors.cardText }]}>{quotaLine}</Text>
      </View>
      {variant === 'favorite' ? (
        <View style={styles.rightCol}>
          <TouchableOpacity style={styles.ticket} onPress={onPress} hitSlop={8}>
            <Ionicons name="ticket-outline" size={22} color={rowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favBtn} onPress={onFavorite} hitSlop={8}>
            <Ionicons name="close" size={24} color={rowIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.favBtn} onPress={onFavorite}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#ffb3c6' : colors.heartEmpty}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    gap: 10,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  ph: { alignItems: 'center', justifyContent: 'center' },
  info: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  meta: {
    fontSize: 12,
    marginTop: 4,
    opacity: 0.95,
  },
  quota: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  rightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ticket: { padding: 6 },
  favBtn: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EventCard;
