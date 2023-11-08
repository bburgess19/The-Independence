import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCEj_wrWXIlQkGLOL4N4K7QKUq8P8FdGP0",
    authDomain: "the-independence-a249f.firebaseapp.com",
    projectId: "the-independence-a249f",
    storageBucket: "the-independence-a249f.appspot.com",
    messagingSenderId: "1062265838293",
    appId: "1:1062265838293:web:ea360c8ff70c7cde57e05c",
    measurementId: "G-EK41TTPY3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// eslint-disable-next-line no-restricted-globals
if (location.hostname === '127.0.0.1') {
    db.useEmulator('127.0.0.1', 8080)
}