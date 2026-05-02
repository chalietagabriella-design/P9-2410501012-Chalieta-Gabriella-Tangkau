import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, role, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.circleTop} />
      <View style={styles.circleBottom} />

      <View style={styles.card}>
        <Text style={styles.badge}>PROTECTED ROUTE</Text>

        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Kamu berhasil masuk ke halaman yang hanya bisa diakses oleh user login.
        </Text>

        <View style={styles.profileBox}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.email}>{user?.email}</Text>

            <Text style={styles.label}>Role</Text>
            <Text style={styles.role}>{role}</Text>
          </View>
        </View>

        <Text style={styles.info}>
          Protected routes aktif. Jika user logout, halaman ini tidak bisa
          diakses dan aplikasi akan kembali ke Login.
        </Text>

        {role === 'admin' && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('Admin')}
          >
            <Text style={styles.adminButtonText}>Masuk ke Admin Panel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
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
    opacity: 0.7,
  },
  circleBottom: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#A8E6CF',
    bottom: -90,
    left: -90,
    opacity: 0.8,
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
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 14,
  },
  title: {
    fontSize: 31,
    fontWeight: '900',
    color: '#0F4C5C',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 22,
    color: '#4F7C82',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  profileBox: {
    flexDirection: 'row',
    backgroundColor: '#F2FBFA',
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: '#CDEDEA',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0EA5A4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  label: {
    color: '#5B8A8E',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  email: {
    color: '#0F4C5C',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 3,
  },
  role: {
    alignSelf: 'flex-start',
    marginTop: 6,
    backgroundColor: '#A8E6CF',
    color: '#075985',
    fontSize: 13,
    fontWeight: '900',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 999,
    overflow: 'hidden',
    textTransform: 'uppercase',
  },
  info: {
    color: '#4F7C82',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 20,
  },
  adminButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  adminButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
  },
  logoutButton: {
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#7DD3FC',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#075985',
    fontWeight: '900',
    fontSize: 15,
  },
});