import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDrEXVuKV-fvM--ULatELX9EVJZ5uWnYSE",
  authDomain: "reels-app-cc387.firebaseapp.com",
  projectId: "reels-app-cc387",
  storageBucket: "reels-app-cc387.appspot.com",
  messagingSenderId: "109908015394",
  appId: "1:109908015394:web:c16eed00f3819ffbe38d7b"
};

firebase.initializeApp(firebaseConfig); 

//flag -> using Google

let provider = new firebase.auth.GoogleAuthProvider();

//object jiske andar login , logout and signup hae

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export const signInWithGoogle = ()=>{
  auth.signInWithPopup(provider)
}

export default firebase;



