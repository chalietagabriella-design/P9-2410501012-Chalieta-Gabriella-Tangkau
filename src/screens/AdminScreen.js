import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useAuth } from '../contexts/AuthContext';

export default function AdminScreen({ navigation }) {
  const { role } = useAuth();

  if (role !== 'admin') {
    return (
      <View style={styles.container}>
        <View style={styles.circleTop} />
        <View style={styles.circleBottom} />

        <View style={styles.card}>
          <Text style={styles.badge}>ACCESS DENIED</Text>

          <Text style={styles.title}>Akses Ditolak</Text>
          <Text style={styles.subtitle}>
            Halaman ini hanya boleh diakses oleh admin.
          </Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Kembali</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.card}>
        <Text style={styles.badge}>ADMIN PANEL</Text>

        <Text style={styles.title}>Welcome Admin</Text>
        <Text style={styles.subtitle}>
          Kamu berhasil mengakses halaman khusus admin menggunakan role-based authorization.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Fitur Admin</Text>
          <Text style={styles.infoText}>• Role-based access control</Text>
          <Text style={styles.infoText}>• Protected routes</Text>
          <Text style={styles.infoText}>• Secure authentication</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.primaryButtonText}>Kembali ke Home</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 20,
    color: '#4F7C82',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: '#F2FBFA',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CDEDEA',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F4C5C',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4F7C82',
    marginBottom: 4,
  },
  primaryButton: {
    backgroundColor: '#0EA5A4',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#7DD3FC',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#075985',
    fontSize: 15,
    fontWeight: '900',
  },
});