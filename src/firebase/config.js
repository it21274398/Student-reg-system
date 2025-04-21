// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQS23GyrHWiECzt-2XS2aaOWpEkhuJj7I",
  authDomain: "sqa-student-register.firebaseapp.com",
  projectId: "sqa-student-register",
  storageBucket: "sqa-student-register.appspot.com",
  messagingSenderId: "702197592869",
  appId: "1:702197592869:web:9855d5eb9afdebd9fa20cc",
  measurementId: "G-LT3863LTW5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore (we don't need analytics here)
const db = getFirestore(app);

export { db };
