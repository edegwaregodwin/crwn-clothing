import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

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
export const db = getFirestore(firebaseApp);
export const authSignOut = signOut(auth);
export const authCreateUserWithEmailAndPassword = async (email, password, displayName ) => {
    const user = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            return error.message;
        });
    updateProfile(auth.currentUser, {
        displayName
    })
    return user;
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);
    const snapShot = await getDoc(userRef);

    if(!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

export function unsubscribe() {
    onAuthStateChanged(auth, async userAuth => {
        if (userAuth) {
            await createUserProfileDocument(userAuth);
        }
        this.setState({ currentUser: userAuth });
    });
}


const provider = new GoogleAuthProvider(auth);
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

