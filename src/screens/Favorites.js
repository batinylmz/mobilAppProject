import React, { useContext, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BrandInfinity from '../components/BrandInfinity';
import EventCard from '../components/EventCard';
import { SIZES } from '../constants/theme';
import { useAppTheme } from '../context/ThemeContext';
import { EventContext } from '../context/EventContext';

const Favorites = () => {
  const navigation = useNavigation();
  const { colors } = useAppTheme();
  const tabBarH = useBottomTabBarHeight();
  const { favorites, removeFavorite } = useContext(EventContext);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background },
        topBar: {
          backgroundColor: colors.favTopBar,
          paddingBottom: 10,
        },
        titleRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 10,
          backgroundColor: colors.background,
        },
        backBtn: { padding: 4, marginRight: 4 },
        pageTitle: {
          fontSize: 18,
          fontWeight: '700',
          color: colors.text,
        },
        listContainer: {
          paddingHorizontal: SIZES.padding,
          paddingBottom: tabBarH + 24,
        },
        emptyContainer: {
          flex: 1,
          backgroundColor: colors.background,
        },
        emptyCenter: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
        emptyText: {
          fontSize: 16,
          color: colors.muted,
        },
      }),
    [colors, tabBarH]
  );

  const Header = (
    <View>
      <View style={styles.topBar}>
        <BrandInfinity style={{ paddingHorizontal: SIZES.padding, paddingTop: 8 }} />
      </View>
      <View style={styles.titleRow}>
        <Pressable onPress={() => navigation.navigate('Home')} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.pageTitle}>Favori Etkinlikler</Text>
      </View>
    </View>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer} edges={['top']}>
        <View style={styles.topBar}>
          <BrandInfinity style={{ paddingHorizontal: SIZES.padding, paddingTop: 8 }} />
        </View>
        <View style={styles.titleRow}>
          <Pressable onPress={() => navigation.navigate('Home')} hitSlop={12} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={26} color={colors.text} />
          </Pressable>
          <Text style={styles.pageTitle}>Favori Etkinlikler</Text>
        </View>
        <View style={styles.emptyCenter}>
          <Text style={styles.emptyText}>Henüz favori eklemediniz</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        ListHeaderComponent={Header}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite
            variant="favorite"
            onPress={() => navigation.navigate('Detail', { eventId: item.id })}
            onFavorite={() => removeFavorite(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Favorites;
