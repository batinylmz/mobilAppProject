import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../context/AuthContext';

const PURPLE = '#4a2d58';
const GOLD = '#c9a44a';
const PILL = '#dcd8de';

function CornerStars() {
  const star = (pos) => (
    <Text style={[ornament.pos, pos]} accessibilityElementsHidden>
      ✦
    </Text>
  );
  return (
    <>
      {star(ornament.tl)}
      {star(ornament.tr)}
      {star(ornament.bl)}
      {star(ornament.br)}
    </>
  );
}

const ornament = StyleSheet.create({
  pos: {
    position: 'absolute',
    color: GOLD,
    fontSize: 22,
    fontWeight: '300',
    zIndex: 2,
  },
  tl: { top: 12, left: 16 },
  tr: { top: 12, right: 16 },
  bl: { bottom: 12, left: 16 },
  br: { bottom: 12, right: 16 },
});

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, loginLoading } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async () => {
    setErrorMsg('');
    const result = await login(username, password);
    if (result.ok) {
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } else {
      setErrorMsg(result.message || 'Giriş başarısız.');
    }
  };

  return (
    <View style={styles.root}>
      <CornerStars />
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 6 : 0}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <MaterialCommunityIcons name="cat" size={72} color="#0a0a0a" style={styles.cat} />

            <Text style={styles.title}>LOGİN</Text>

            {errorMsg ? <Text style={styles.err}>{errorMsg}</Text> : <View style={{ height: 22 }} />}

            <TextInput
              style={styles.pillInput}
              placeholder="*e-posta:*"
              placeholderTextColor="#111"
              autoCapitalize="none"
              keyboardType="default"
              autoCorrect={false}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                setErrorMsg('');
              }}
            />

            <View style={styles.pillRow}>
              <TextInput
                style={styles.pillPw}
                placeholder="*şifre*"
                placeholderTextColor="#111"
                secureTextEntry={!show}
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  setErrorMsg('');
                }}
              />
              <Pressable
                onPress={() => setShow((s) => !s)}
                style={styles.eyeHit}
                hitSlop={8}
                accessibilityLabel={show ? 'Gizle' : 'Göster'}
              >
                <Ionicons name={show ? 'eye-off' : 'eye'} size={22} color="#111" />
              </Pressable>
            </View>

            <Pressable
              style={[styles.pillBtn, loginLoading && styles.pillBtnDisabled]}
              onPress={onSubmit}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <ActivityIndicator color="#111" />
              ) : (
                <Text style={styles.pillBtnText}>GİRİŞ</Text>
              )}
            </Pressable>

            <Pressable style={styles.pillDots} onPress={() => {}} hitSlop={8}>
              <Text style={styles.dots}>...</Text>
            </Pressable>

            <Text style={styles.hint}>Görev testi: emilys · emilyspass</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: PURPLE,
  },
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  cat: {
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#0a0a0a',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  err: {
    alignSelf: 'center',
    color: '#ffb4b4',
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
  },
  pillInput: {
    width: '100%',
    backgroundColor: PILL,
    borderRadius: 999,
    height: 54,
    paddingHorizontal: 22,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#111',
    marginBottom: 14,
    borderWidth: 0,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: PILL,
    borderRadius: 999,
    height: 54,
    paddingLeft: 22,
    paddingRight: 8,
    marginBottom: 14,
  },
  pillPw: {
    flex: 1,
    height: 54,
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#111',
  },
  eyeHit: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillBtn: {
    width: '100%',
    backgroundColor: PILL,
    borderRadius: 999,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  pillBtnDisabled: { opacity: 0.75 },
  pillBtnText: {
    fontSize: 17,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#0a0a0a',
    letterSpacing: 0.5,
  },
  pillDots: {
    alignSelf: 'center',
    minWidth: 88,
    height: 40,
    paddingHorizontal: 28,
    backgroundColor: PILL,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111',
    letterSpacing: 1,
    lineHeight: 22,
  },
  hint: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 11,
    color: 'rgba(255,255,255,0.55)',
  },
});
