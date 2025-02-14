// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmARGmhW4wVKXyOTitM0-ADlMx4COXxdI",
  authDomain: "project2025-f7ace.firebaseapp.com",
  projectId: "project2025-f7ace",
  storageBucket: "project2025-f7ace.firebasestorage.app",
  messagingSenderId: "5875636716",
  appId: "1:5875636716:web:8821a490771493662c08c9",
  measurementId: "G-L6KWE9TWJP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
const analytics = getAnalytics(app);
