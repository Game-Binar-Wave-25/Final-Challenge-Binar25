import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAkU-MKBPMs6uyE3H8gn71pglqupzAxbEQ",
    authDomain: "challenge-chapter-11-6f462.firebaseapp.com",
    databaseURL: "https://challenge-chapter-11-6f462-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "challenge-chapter-11-6f462",
    storageBucket: "challenge-chapter-11-6f462.appspot.com",
    messagingSenderId: "559514672557",
    appId: "1:559514672557:web:3c8dc41234dd8971991524",
    measurementId: "G-NHSZK79L35"
};

const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app)
const database = getDatabase(app)

export {
    database,
}

export default authFirebase