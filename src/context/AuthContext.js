import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import React from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    const GoogleProvider = new GoogleAuthProvider();
    window.sessionStorage.setItem('pending', 1);
    signInWithPopup(auth, GoogleProvider);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser.uid));
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists()) {
          await setDoc(doc(db, 'users', currentUser.uid), {
            emailAddress: currentUser.email.toLowerCase(),
            dateCreated: currentUser.metadata.creationTime,
          });
          console.log(currentUser)
          navigate('/dashboard');
        }
      }
    });

    return unsubscribe;
  }, [navigate]);

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        user,
        createUser,
        logout,
        signIn,
        googleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};
