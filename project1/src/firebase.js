// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-d2106.firebaseapp.com",
  projectId: "estate-d2106",
  storageBucket: "estate-d2106.appspot.com",
  messagingSenderId: "490685729390",
  appId: "1:490685729390:web:ded69331f6ba1e38fc347f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);