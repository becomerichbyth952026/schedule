import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState,useEffect } from 'react';
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';





 const firebaseConfig = {
  apiKey: "AIzaSyA_MGfmKC8vm8Cf23RhgvTpQ19OaXPrVQQ",
  authDomain: "schedule-d6809.firebaseapp.com",
  databaseURL: "https://schedule-d6809-default-rtdb.firebaseio.com",
  projectId: "schedule-d6809",
  storageBucket: "schedule-d6809.appspot.com",
  messagingSenderId: "931472786465",
  appId: "1:931472786465:web:b0d1fdde613e97b6438f60"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useData = (path, transform) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
          const val = snapshot.val();
          if (devMode) { console.log(val); }
          setData(transform ? transform(val) : val);
          setLoading(false);
          setError(null);
      }, (error) => {
          setData(null);
          setLoading(false);
          setError(error);
      });
  }, [path, transform]);

  return [data, loading, error];
};

export const setData = (path, value) => (
  set(ref(database, path), value)
);


export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};