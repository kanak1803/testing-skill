// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "skill-buddy-recruiter",
  appId: "1:503368685999:web:c0089d38de6b2094ccb75a",
  storageBucket: "skill-buddy-recruiter.firebasestorage.app",
  apiKey: "AIzaSyBfJB7ceC5e20_fTBI-kwP71C_5rZC8dA0",
  authDomain: "skill-buddy-recruiter.firebaseapp.com",
  messagingSenderId: "503368685999",
  measurementId: "G-8N6YVX7M9Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { app, auth };
