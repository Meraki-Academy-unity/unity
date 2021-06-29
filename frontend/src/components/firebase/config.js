import firebase from 'firebase/app'
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAac3P5Icdi8g-gmsXvUWDu6CgwDMq8UFE",
  authDomain: "unity-c982c.firebaseapp.com",
  projectId: "unity-c982c",
  storageBucket: "unity-c982c.appspot.com",
  messagingSenderId: "431237691422",
  appId: "1:431237691422:web:da308729903913f18d160f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();

export { projectStorage };