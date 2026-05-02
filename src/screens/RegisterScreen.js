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

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Gagal', 'Email dan password wajib diisi.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Gagal', 'Password minimal 6 karakter.');
      return;
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      await setDoc(doc(db, 'users', credential.user.uid), {
        email: email.trim(),
        role: 'user',
      });

      await sendEmailVerification(credential.user);

      Alert.alert(
        'Sukses',
        'Akun berhasil dibuat. Silakan cek email untuk verifikasi.'
      );
    } catch (error) {
      Alert.alert('Register gagal', error.message);
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
        <Text style={styles.badge}>CREATE ACCOUNT</Text>

        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>
          Buat akun baru untuk mengakses fitur authentication dan protected route.
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
          placeholder="Minimal 6 karakter"
          placeholderTextColor="#7BA6A8"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryButtonText}>Daftar</Text>
        </TouchableOpacity>

        <Text style={styles.note}>
          Setelah daftar, cek email kamu dan klik link verifikasi dari Firebase.
        </Text>

        <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>
          Sudah punya akun? <Text style={styles.loginLink}>Login</Text>
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
  note: {
    marginTop: 16,
    color: '#4F7C82',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#4F7C82',
    fontSize: 14,
  },
  loginLink: {
    color: '#0F766E',
    fontWeight: '900',
  },
});