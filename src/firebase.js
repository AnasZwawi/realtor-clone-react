// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGTwD1ax9BouINWV1hINR88q1kvuBbYgs",
  authDomain: "realtor-clone-b8aa6.firebaseapp.com",
  projectId: "realtor-clone-b8aa6",
  storageBucket: "realtor-clone-b8aa6.appspot.com",
  messagingSenderId: "935046797340",
  appId: "1:935046797340:web:3085f94f8d4307c63f67d9"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();