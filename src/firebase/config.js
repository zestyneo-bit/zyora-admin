// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBF6wac1nEgBFwEWh5rVE2w0gIs2PWfnNY",
  authDomain: "zyora-86720.firebaseapp.com",
  projectId: "zyora-86720",
  storageBucket: "zyora-86720.firebaseapp.com",
  messagingSenderId: "382434590728",
  appId: "1:382434590728:web:c9fa2f938872f5d4fcd1bd",
  measurementId: "G-8C1PT5ZCK3"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
