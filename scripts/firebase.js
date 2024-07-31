import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvK3eXpHbvhttWIhVuvi8_PkZra88cuwc",
    authDomain: "ecomerse-642ae.firebaseapp.com",
    projectId: "ecomerse-642ae",
    storageBucket: "ecomerse-642ae.appspot.com",
    messagingSenderId: "1078438368078",
    appId: "1:1078438368078:web:9616aab88dd0ef4d87c41f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    db,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    onSnapshot
};

