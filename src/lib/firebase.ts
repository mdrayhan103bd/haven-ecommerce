import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCv-oWA0VQjrBXLcwr6BwnhkxlDynxYAlg",
  authDomain: "cavrozone-web.firebaseapp.com",
  projectId: "cavrozone-web",
  storageBucket: "cavrozone-web.firebasestorage.app",
  messagingSenderId: "590108345907",
  appId: "1:590108345907:web:7443432220f42df89d8546",
  measurementId: "G-YT2CB0ZB8F"
};

// Initialize Firebase safely (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
