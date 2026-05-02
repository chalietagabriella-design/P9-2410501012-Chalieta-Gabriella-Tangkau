import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email) {
      Alert.alert('Gagal', 'Email wajib diisi.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      Alert.alert('Sukses', 'Email reset password telah dikirim.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Gagal', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.card}>
        <Text style={styles.badge}>RESET PASSWORD</Text>

        <Text style={styles.title}>Lupa Password</Text>
        <Text style={styles.subtitle}>
          Masukkan email kamu, kami akan kirim link untuk reset password.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan email"
          placeholderTextColor="#7BA6A8"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleReset}>
          <Text style={styles.primaryButtonText}>Kirim Email Reset</Text>
        </TouchableOpacity>

        <Text
          style={styles.backText}
          onPress={() => navigation.navigate('Login')}
        >
          ← Kembali ke Login
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF7F6',
    justifyContent: 'center',
    padding: 24,
  },
  circleTop: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#74C7C3',
    top: -70,
    right: -70,
    opacity: 0.75,
  },
  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#A8E6CF',
    bottom: -90,
    left: -90,
    opacity: 0.85,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    shadowColor: '#0F4C5C',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#CDEDEA',
  },
  badge: {
    alignSelf: 'center',
    backgroundColor: '#DDF7EF',
    color: '#0F766E',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
    marginBottom: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#0F4C5C',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    color: '#4F7C82',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  label: {
    color: '#0F4C5C',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#BFE7E4',
    backgroundColor: '#F2FBFA',
    padding: 14,
    marginBottom: 14,
    borderRadius: 16,
    color: '#0F4C5C',
    fontSize: 15,
  },
  primaryButton: {
    backgroundColor: '#0EA5A4',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  backText: {
    marginTop: 18,
    textAlign: 'center',
    color: '#075985',
    fontSize: 14,
    fontWeight: '900',
  },
});