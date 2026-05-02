# Auth Praktikum App

Aplikasi mobile authentication modern menggunakan React Native (Expo) dan Firebase dengan tema UI biru laut dan hijau pastel. Aplikasi ini dibuat untuk mempelajari konsep Authentication, Authorization, dan Security pada mobile app.


# Fitur Utama

## Authentication
- Register menggunakan Firebase Authentication
- Login menggunakan email dan password
- Email verification setelah register
- Reset password via email

## Security Enhancement
- Biometric Login (Face ID / Fingerprint)
- Penyimpanan credential menggunakan Expo SecureStore
- Validasi email sebelum login

## Protected Route
- User yang belum login tidak bisa akses halaman Home
- Redirect otomatis ke Login jika belum login
- Session dijaga menggunakan Auth Context

## Role-Based Authorization
Aplikasi memiliki 2 role:
- user
- admin

Role disimpan di Firestore (collection: users)
Behavior:
- Jika role = admin → Bisa akses Admin Panel
- Jika role = user → Tidak bisa akses halaman admin
Admin screen juga dilindungi agar tidak bisa diakses langsung.


# Teknologi
- React Native (Expo)
- Firebase Authentication
- Firebase Firestore
- Expo SecureStore
- Expo Local Authentication
- React Navigation


# Struktur Fitur
- Login Screen
- Register Screen
- Forgot Password Screen
- Home Screen (Protected)
- Admin Screen (Role-based)


# Cara Menjalankan
1. Install dependency
npm install
2. Jalankan aplikasi
npx expo start


# Fitur yang Dapat Diuji
- Register → verifikasi email → login
- Login menggunakan email dan password
- Login dengan biometric (Face ID / fingerprint / passcode)
- Reset password melalui email
- Protected route (akses Home hanya jika login)
- Logout → otomatis kembali ke Login
- Role-based access:
user → tidak bisa akses Admin
admin → bisa akses Admin Panel


# Link Video Demo
[Video Demo YouTube](https://youtube.com/shorts/z_6n6Xo-1Jo?si=WAAOXpceNDHgLGbu)
[Video Demo Google Drive](https://drive.google.com/file/d/1nlS8sRlzpySrwA4yVln5uBZqEAbsWCFx/view?usp=drivesdk)


# Kesimpulan

Aplikasi ini berhasil mengimplementasikan authentication dan authorization menggunakan Firebase pada React Native. Fitur seperti register, login, email verification, reset password, biometric login, protected route, dan role-based access (admin dan user) berjalan dengan baik.

Selain itu, aplikasi juga memiliki UI modern dengan tema biru laut dan hijau pastel sehingga meningkatkan pengalaman pengguna.
