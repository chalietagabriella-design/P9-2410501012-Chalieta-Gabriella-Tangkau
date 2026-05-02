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

import { signInWithEmailAndPassword } from 'firebase/auth';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password wajib diisi.');
      return;
    }

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      if (!credential.user.emailVerified) {
        Alert.alert(
          'Email belum diverifikasi',
          'Silakan cek email dan klik link verifikasi terlebih dahulu.'
        );
        return;
      }

      await SecureStore.setItemAsync('saved_email', email.trim());
      await SecureStore.setItemAsync('saved_password', password);

      Alert.alert('Berhasil', 'Login berhasil. Biometric sudah aktif.');
    } catch (error) {
      Alert.alert('Login gagal', error.message);
    }
  };

  const handleBiometric = async () => {
    try {
      const savedEmail = await SecureStore.getItemAsync('saved_email');
      const savedPassword = await SecureStore.getItemAsync('saved_password');

      if (!savedEmail || !savedPassword) {
        Alert.alert(
          'Belum ada session',
          'Silakan login dulu dengan email dan password.'
        );
        return;
      }

      const hasHardware = await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        Alert.alert('Gagal', 'Device tidak mendukung biometric.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert('Gagal', 'Fingerprint atau Face ID belum diatur.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login dengan biometric',
        fallbackLabel: 'Gunakan password',
        cancelLabel: 'Batal',
        disableDeviceFallback: false,
      });

      if (result.success) {
        await signInWithEmailAndPassword(auth, savedEmail, savedPassword);
        Alert.alert('Berhasil', 'Login biometric berhasil.');
      } else {
        Alert.alert('Gagal', 'Biometric tidak cocok atau dibatalkan.');
      }
    } catch (error) {
      Alert.alert('Biometric gagal', error.message);
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
        <Text style={styles.badge}>AUTH PRAKTIKUM</Text>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>
          Masuk untuk melanjutkan ke aplikasi dengan sistem authentication.
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

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan password"
          placeholderTextColor="#7BA6A8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.bioButton} onPress={handleBiometric}>
          <Text style={styles.bioButtonText}>Login dengan Biometric</Text>
        </TouchableOpacity>

        <Text
          style={styles.registerText}
          onPress={() => navigation.navigate('Register')}
        >
          Belum punya akun? <Text style={styles.registerLink}>Daftar</Text>
        </Text>

        <Text
          style={styles.forgotText}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Lupa password?
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
    fontSize: 34,
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
  bioButton: {
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#7DD3FC',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  bioButtonText: {
    color: '#075985',
    fontSize: 15,
    fontWeight: '900',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4F7C82',
    fontSize: 14,
  },
  registerLink: {
    color: '#0F766E',
    fontWeight: '900',
  },
  forgotText: {
    marginTop: 14,
    textAlign: 'center',
    color: '#075985',
    fontSize: 14,
    fontWeight: '900',
  },
});