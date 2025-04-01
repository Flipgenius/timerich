import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX78RRoFHQZjNPDIjvGaDAne4w6FCjI5o",
  authDomain: "timerich-web.firebaseapp.com",
  projectId: "timerich-web",
  storageBucket: "timerich-web.firebasestorage.app",
  messagingSenderId: "1054514106589",
  appId: "1:1054514106589:web:ae78ac115ae0cb15a80b34",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
