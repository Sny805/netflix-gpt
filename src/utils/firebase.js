// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCOrg5n7dLuISQ8JF_2NAFSqSZu9NyHt0E",
    authDomain: "netflixgpt-6f042.firebaseapp.com",
    projectId: "netflixgpt-6f042",
    storageBucket: "netflixgpt-6f042.firebasestorage.app",
    messagingSenderId: "767897142352",
    appId: "1:767897142352:web:6ef3e17a07d479bc157d55",
    measurementId: "G-NB42Z6Z93F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();