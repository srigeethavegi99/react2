// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAenUAk3CND5YcjCjZCaWpWBXbYPhH9G4k",
  authDomain: "cis658hw.firebaseapp.com",
  databaseURL: "https://cis658hw-default-rtdb.firebaseio.com",
  projectId: "cis658hw",
  storageBucket: "cis658hw.appspot.com",
  messagingSenderId: "292541339476",
  appId: "1:292541339476:web:5c47651e77c6928b411ac1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app