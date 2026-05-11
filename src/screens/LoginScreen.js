import React, { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import useAuth from '../hooks/useAuth';
import { COLORS, SIZES } from '../constants/theme';

function CornerOrnament({ style, rotate = '0deg' }) {
    return (
        <Text style={[styles.ornament, { transform: [{ rotate }] }, style]}>❋</Text>
    );
}

export default function LoginScreen() {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async () => {
        setError('');
        if (!email.trim() || !password.trim()) {
            setError('Alanlar boş olamaz.');
            return;
        }
        const res = await login(email.trim(), password);
        if (!res.ok) {
            setError(res.error || 'e-posta veya şifre yanlış!');
        }
    };

    return (
        <View style={styles.root}>
            <CornerOrnament style={styles.cornerTL} />
            <CornerOrnament style={styles.cornerTR} rotate="90deg" />
            <CornerOrnament style={styles.cornerBL} rotate="-90deg" />
            <CornerOrnament style={styles.cornerBR} rotate="180deg" />

            <View style={styles.inner}>
                <MaterialCommunityIcons name="cat" size={56} color="#000" />
                <Text style={styles.logoTitle}>LOGİN</Text>
                {error ? <Text style={styles.err}>{error}</Text> : null}

                <TextInput
                    style={styles.input}
                    placeholder="e-posta:"
                    placeholderTextColor="#333"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passWrap}>
                    <TextInput
                        style={[styles.input, styles.passInput]}
                        placeholder="şifre"
                        placeholderTextColor="#333"
                        secureTextEntry={!showPass}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Pressable style={styles.eye} onPress={() => setShowPass((s) => !s)} hitSlop={12}>
                        <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={22} color="#000" />
                    </Pressable>
                </View>

                <Pressable
                    style={[styles.btn, loading && styles.btnDisabled]}
                    onPress={onSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={styles.btnText}>GİRİŞ</Text>
                    )}
                </Pressable>

                <Pressable style={styles.moreBtn} onPress={() => {}}>
                    <Text style={styles.moreDots}>...</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.loginBg,
        justifyContent: 'center',
        paddingHorizontal: 28,
    },
    inner: { alignItems: 'center' },
    ornament: {
        position: 'absolute',
        fontSize: 36,
        color: COLORS.loginGold,
        opacity: 0.85,
    },
    cornerTL: { top: 48, left: 16 },
    cornerTR: { top: 48, right: 16 },
    cornerBL: { bottom: 48, left: 16 },
    cornerBR: { bottom: 48, right: 16 },
    logoTitle: {
        marginTop: 12,
        fontSize: 28,
        fontWeight: '800',
        fontStyle: 'italic',
        color: '#000',
    },
    err: {
        marginTop: 8,
        color: COLORS.error,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: COLORS.loginInput,
        borderRadius: SIZES.radiusPill,
        paddingVertical: 16,
        paddingHorizontal: 22,
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
        fontStyle: 'italic',
        color: '#000',
    },
    passWrap: {
        width: '100%',
        maxWidth: 340,
        marginTop: 14,
        position: 'relative',
        justifyContent: 'center',
    },
    passInput: {
        marginTop: 0,
        paddingRight: 52,
    },
    eye: {
        position: 'absolute',
        right: 18,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
    },
    btn: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: COLORS.loginInput,
        borderRadius: SIZES.radiusPill,
        paddingVertical: 16,
        marginTop: 22,
        alignItems: 'center',
    },
    btnDisabled: { opacity: 0.75 },
    btnText: {
        fontSize: 17,
        fontWeight: '800',
        fontStyle: 'italic',
        color: '#000',
    },
    moreBtn: {
        marginTop: 14,
        paddingVertical: 10,
        paddingHorizontal: 28,
        backgroundColor: COLORS.loginInput,
        borderRadius: SIZES.radiusPill,
    },
    moreDots: {
        fontSize: 20,
        fontWeight: '900',
        color: '#000',
        letterSpacing: 2,
    },
});
