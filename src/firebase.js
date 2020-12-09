import firebase from "firebase/app";
import "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyCxncbNWc05xc1-OE0GeqFj93BIlPHCU88",
    authDomain: "project6-60da1.firebaseapp.com",
    projectId: "project6-60da1",
    storageBucket: "project6-60da1.appspot.com",
    messagingSenderId: "864738316885",
    appId: "1:864738316885:web:87f7139af069f0c8fd3adc"
};
firebase.initializeApp(firebaseConfig);
export default firebase;