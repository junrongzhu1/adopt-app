// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-adopt-bf2ed.firebaseapp.com",
  projectId: "pet-adopt-bf2ed",
  storageBucket: "pet-adopt-bf2ed.appspot.com",
  messagingSenderId: "715845226436",
  appId: "1:715845226436:web:da9dc6b3d9bf98d1859e91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)