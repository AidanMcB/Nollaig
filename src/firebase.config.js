// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT-ayS4nKmCffYTmb9w9QtSk_mlp8xPsw",
  authDomain: "nollaig-42945.firebaseapp.com",
  projectId: "nollaig-42945",
  storageBucket: "nollaig-42945.appspot.com",
  messagingSenderId: "869209963273",
  appId: "1:869209963273:web:2dba8f1479cc0b935031d8",
  measurementId: "G-7HQZP7N6E5"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();

export { app, db }


