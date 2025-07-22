import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Firebase configuration
// Replace these values with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "your-project.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Connect to Firestore emulator in development (optional)
if (
  import.meta.env.DEV &&
  import.meta.env.VITE_USE_FIRESTORE_EMULATOR === "true"
) {
  try {
    connectFirestoreEmulator(db, "localhost", 8080);
    console.log("Connected to Firestore emulator");
  } catch (error) {
    console.log("Firestore emulator connection failed:", error);
  }
}

export default app;
