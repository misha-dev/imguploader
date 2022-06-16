// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5S7yfupNNl7dJUGZ51WLyXA4kKHmoMP4",
  authDomain: "uploadimages-c763f.firebaseapp.com",
  projectId: "uploadimages-c763f",
  storageBucket: "uploadimages-c763f.appspot.com",
  messagingSenderId: "982908399692",
  appId: "1:982908399692:web:5a5c20df11d90428ab44e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Storage
export const storage = getStorage(app);
