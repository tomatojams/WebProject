// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzlKfzSoC25SAc8iVXUc6oOImoxT9izyI",
  authDomain: "starlifeeducation-da5d9.firebaseapp.com",
  projectId: "starlifeeducation-da5d9",
  storageBucket: "starlifeeducation-da5d9.appspot.com",
  messagingSenderId: "455634767390",
  appId: "1:455634767390:web:d0b0ed7b8141b858fca08f",
  measurementId: "G-CT9N9V85BR"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
