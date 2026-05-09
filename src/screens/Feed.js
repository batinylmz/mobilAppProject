import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const Feed = () => {
    const [search, setSearch] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Etkinlik ara..."
                value={search}
                onChangeText={setSearch}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    searchInput: {
        backgroundColor: COLORS.white,
        margin: SIZES.padding,
        padding: 12,
        borderRadius: 20,
    }
});

export default Feed;