import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrmnprGUp9uUh67btGoU6vjDcR6swBc0o",
  authDomain: "scmis-5b99d.firebaseapp.com",
  projectId: "scmis-5b99d",
  storageBucket: "scmis-5b99d.appspot.com",
  messagingSenderId: "402326987280",
  appId: "1:402326987280:web:1fc790c7c7ec338ea6e095"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);