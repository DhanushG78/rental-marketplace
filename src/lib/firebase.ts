// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu8AQLn3FbRF21JCnD_WBOrP21r0_8ik8",
  authDomain: "rental-marketplace-11680.firebaseapp.com",
  projectId: "rental-marketplace-11680",
  storageBucket: "rental-marketplace-11680.firebasestorage.app",
  messagingSenderId: "301434015723",
  appId: "1:301434015723:web:4d5104a420532b8a6553ae"
};

// Initialize Firebase (singleton pattern for Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
