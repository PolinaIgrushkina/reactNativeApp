import * as firebase from "firebase";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw1TjnuHdJHxCSSl1TObdsLWJMG4HqdDg",
  authDomain: "react-native-app-3d22c.firebaseapp.com",
  projectId: "react-native-app-3d22c",
  storageBucket: "react-native-app-3d22c.appspot.com",
  messagingSenderId: "1019056126526",
  appId: "1:1019056126526:web:922c66ca827ed49794af6f",
  measurementId: "G-CKC3BTVD8P",
};

export default firebase.initializeApp(firebaseConfig);
