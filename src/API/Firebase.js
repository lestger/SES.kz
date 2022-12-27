import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import {setDoc,doc,updateDoc,getDocs,Timestamp} from 'firebase/firestore';
import {getStorage} from "firebase/storage";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage";
import {getDoc} from "firebase/firestore";
import {collection,arrayUnion} from "firebase/firestore";
import { updateEmail, updatePassword} from "firebase/auth"
export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG,
    authDomain: "ses-kz.firebaseapp.com",
    projectId: "ses-kz",
    storageBucket: "ses-kz.appspot.com",
    messagingSenderId: "259487532789",
    appId: "1:259487532789:web:4caceac29911a0d21a67bc"
};

const app = initializeApp(firebaseConfig);
const auth= getAuth();
const db = getFirestore(app);
const storage=getStorage(app);
export{auth,getFirestore,db,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut,getAuth};
export {setDoc,doc,Timestamp,updateDoc,storage,ref,getDownloadURL,uploadBytes,getDoc,collection,getDocs,arrayUnion, updateEmail, updatePassword}
