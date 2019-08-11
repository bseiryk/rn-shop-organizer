import firebase from 'firebase'
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDyCdVD6fPIxP9YWsAMEyPqciXRkJ8C45Q",
    authDomain: "rn-course-1558297093568.firebaseapp.com",
    databaseURL: "https://rn-course-1558297093568.firebaseio.com",
    projectId: "rn-course-1558297093568",
    storageBucket: "rn-course-1558297093568.appspot.com",
    messagingSenderId: "154907015483",
    appId: "1:154907015483:web:7b6217cc217828c5"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export default db