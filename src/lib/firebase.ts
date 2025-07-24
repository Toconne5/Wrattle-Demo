import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDr5RhjdaqkWxmFh9fcfv-ucLU9QbenJ1s",
  authDomain: "wrattle.firebaseapp.com",
  projectId: "wrattle",
  storageBucket: "wrattle.firebasestorage.app",
  messagingSenderId: "962594582355",
  appId: "1:962594582355:web:964f5ab36ad11055c1fba6",
  measurementId: "G-8EZ8X16YLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;