import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { flushSync } from 'react-dom'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type NextOrObserver, type User} from 'firebase/auth';
import {setDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

export const saveSelectedCourses = async (userId: string,courseId: string, selected: boolean) => {
  await setDoc(doc(firestore, `coursePlans`, userId), {
    selectedCourses: selected ? arrayUnion(courseId) : arrayRemove(courseId)
  }, { merge: true });
}


const firebaseConfig = {
  apiKey: "AIzaSyBht0WHlV7MgbjUjXtVA-tlD-jx3Zthdk0",
  authDomain: "react-challenges-ff2e3.firebaseapp.com",
  projectId: "react-challenges-ff2e3",
  storageBucket: "react-challenges-ff2e3.firebasestorage.app",
  messagingSenderId: "852557376863",
  appId: "1:852557376863:web:d14bdf9130813d66a01aea",
  measurementId: "G-3LNZQ3VPR4"
};

const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);
const auth = getAuth(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(auth, new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(auth);

export { firebaseSignOut as signOut };

export interface AuthState {
  user: User | null,
  isAuthenticated: boolean,
  isInitialLoading: boolean
}

export const addAuthStateListener = (fn: NextOrObserver<User>) => (
  onAuthStateChanged(auth, fn)
);

export const useAuthState = (): AuthState => {
  const [user, setUser] = useState(auth.currentUser)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const isAuthenticated = !!user;

  useEffect(() => addAuthStateListener((user) => {
      flushSync(() => {
        setUser(user);
        setIsInitialLoading(false);
      })
    }), [])

  return {user, isAuthenticated, isInitialLoading };
};


export const useDataQuery = (path: string): [unknown, boolean, Error | undefined] => {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setData(undefined);
    setLoading(true);
    setError(undefined);
    return onSnapshot(doc(firestore, path), (snapshot) => {
        setData( snapshot.data() );
        setLoading(false);
      }, (error) => {
        setError(error);
        setLoading(false);
      }
    );
  }, [ path ]);

  return [ data, loading, error ];
};
