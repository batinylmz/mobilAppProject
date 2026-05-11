import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAppTheme } from '../context/ThemeContext';

/** EVENTLOOP — sol üst kutu (Login hariç) */
export default function BrandInfinity({ style }) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.row, style]}>
      <View style={[styles.box, { backgroundColor: colors.logoBox }]}>
        <Text style={styles.infinity}>∞</Text>
        <Text style={styles.brand}>EVENTLOOP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 4,
    paddingBottom: 8,
  },
  box: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 72,
  },
  infinity: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ff6b9d',
    lineHeight: 26,
  },
  brand: {
    fontSize: 8,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    marginTop: 2,
  },
});
