// zyora-admin/src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBF6wac1nEgBFwEWh5rVE2w0gIs2PWfnNY",
  authDomain: "zyora-86720.firebaseapp.com",
  projectId: "zyora-86720",
  storageBucket: "zyora-86720.firebasestorage.app",
  messagingSenderId: "382434590728",
  appId: "1:382434590728:web:c9fa2f938872f5d4fcd1bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);

// IMPORTANT: force correct bucket or uploads fail
export const storage = getStorage(app, "gs://zyora-86720.firebasestorage.app");
