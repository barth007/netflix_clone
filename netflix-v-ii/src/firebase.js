import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// import 'firebase/firebase-storage';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyACovrxHUQ150TVdjCC6iuE0XFNi7VwqpY",
    authDomain: "netflixv2-50dbe.firebaseapp.com",
    projectId: "netflixv2-50dbe",
    storageBucket: "netflixv2-50dbe.appspot.com",
    messagingSenderId: "261315058812",
    appId: "1:261315058812:web:1826c6a0d1ceaeb8fefdf9",
    measurementId: "G-XNDEQGPMJX"
  };
  // const firebase = require("firebase");
  // require("firebase/firestore");
  const firebaseApp =firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const authentication = firebase.auth();

  export {authentication};
  export default db;
