import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDENbYLfFda2PBirtJLedTFypmAAU5ajLA",
  authDomain: "auth-praktikum-4757a.firebaseapp.com",
  projectId: "auth-praktikum-4757a",
  storageBucket: "auth-praktikum-4757a.firebasestorage.app",
  messagingSenderId: "274010108460",
  appId: "1:274010108460:web:778f28640051c0cb5c1789",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let authInstance;

try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);