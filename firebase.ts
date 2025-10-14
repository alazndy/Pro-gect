// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqsfFkUfVN684gamXrDzAeNyCbmDcCb1w",
  authDomain: "prorgect.firebaseapp.com",
  projectId: "prorgect",
  storageBucket: "prorgect.appspot.com", // Corrected to .appspot.com which is more common
  messagingSenderId: "426965788385",
  appId: "1:426965788385:web:3492d569c15268a00079a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and firestore instances
export const auth = getAuth(app);
export const db = getFirestore(app);