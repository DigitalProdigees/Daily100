// Import the functions you need from the SDKs you need
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAot4foSyaGUMw3IlppyGmgvyv_yV0L8EI",
  authDomain: "mydaily100-c31ee.firebaseapp.com",
  projectId: "mydaily100-c31ee",
  storageBucket: "mydaily100-c31ee.firebasestorage.app",
  messagingSenderId: "1041844809828",
  appId: "1:1041844809828:web:e5ed4404606857dff7af71",
  measurementId: "G-Q1T7PFQBZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with React Native persistence
// Use try-catch to handle cases where auth might already be initialized
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('Firebase Auth initialized with AsyncStorage persistence');
} catch (error) {
  // If auth is already initialized, get the existing instance
  console.log('Firebase Auth already initialized, getting existing instance');
  auth = getAuth(app);
}

export { auth };

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;