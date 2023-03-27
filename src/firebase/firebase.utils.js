import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAoTXUHlRAl_lkGDt4JD1bl9Jhx13msaQ8",
    authDomain: "crwn-db-ffe2a.firebaseapp.com",
    projectId: "crwn-db-ffe2a",
    storageBucket: "crwn-db-ffe2a.appspot.com",
    messagingSenderId: "1090346209432",
    appId: "1:1090346209432:web:99fb2ef38f17fb78b280ed",
    measurementId: "G-CL6TT3XN52"
};

const firebaseApp = initializeApp(config);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider(auth);
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

