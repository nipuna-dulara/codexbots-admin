import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnjvSH5Ugog2mfCrFuZxxfBAqZ4E48xKI",
    authDomain: "slportal-20697.firebaseapp.com",
    projectId: "slportal-20697",
    storageBucket: "slportal-20697.appspot.com",
    messagingSenderId: "823455017594",
    appId: "1:823455017594:web:2a68b3632499c1a38629c3",
    measurementId: "G-NN5EXP35E4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, getDocs, addDoc };