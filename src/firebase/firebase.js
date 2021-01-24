import firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyC9sWlpwLfN6eICzeODf0q2e1wSoXo2gPA",
    authDomain: "elixir-fbae4.firebaseapp.com",
    projectId: "elixir-fbae4",
    storageBucket: "elixir-fbae4.appspot.com",
    messagingSenderId: "66522327354",
    appId: "1:66522327354:web:bcd7afb2f7d22290728803"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const storage = firebase.storage()
