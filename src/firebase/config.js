// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0LKtnfUGH0tmedz0pS1wqt1yeTwRmY3E",
  authDomain: "mini-blog-3175f.firebaseapp.com",
  projectId: "mini-blog-3175f",
  storageBucket: "mini-blog-3175f.appspot.com",
  messagingSenderId: "806489855377",
  appId: "1:806489855377:web:26bdd558b31c2ae06eb630",
  measurementId: "G-TWW8V4VYC0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

export default db;
