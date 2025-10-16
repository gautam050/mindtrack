import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1owvPrs_Y2Mpza0IDfHKMpudUI__JrS4",
  authDomain: "mind-track-ca065.firebaseapp.com",
  databaseURL: "https://mind-track-ca065-default-rtdb.firebaseio.com",
  projectId: "mind-track-ca065",
  storageBucket: "mind-track-ca065.firebasestorage.app",
  messagingSenderId: "996867555959",
  appId: "1:996867555959:web:39e3a96b1f9095fe0c7c72",
  measurementId: "G-JWVTW0P15F"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
