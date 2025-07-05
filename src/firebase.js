// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore,doc,setDoc} from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWqY80FS8zCCYtwlEdGAc6eOBZV28KaOI",
  authDomain: "financely-d27fa.firebaseapp.com",
  projectId: "financely-d27fa",
  storageBucket: "financely-d27fa.firebasestorage.app",
  messagingSenderId: "801579872996",
  appId: "1:801579872996:web:f06b54d61b5463bc2172f1",
  measurementId: "G-0L302RDJDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth=  getAuth(app);
const provider= new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};