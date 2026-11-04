import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';


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
