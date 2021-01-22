import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbEzkCSTL1YkLoP-7t397pkIfIkX7AJE4",
  authDomain: "sneakerheads-13901.firebaseapp.com",
  projectId: "sneakerheads-13901",
  storageBucket: "sneakerheads-13901.appspot.com",
  messagingSenderId: "683020464327",
  appId: "1:683020464327:web:b771af14f625e075294ee2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, db, timestamp };
