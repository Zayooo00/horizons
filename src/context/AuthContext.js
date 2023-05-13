import { createContext, useContext, useEffect, useState, useMemo } from 'react';
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
import PropTypes from 'prop-types';

import { auth, db } from '../firebase/firebase';

const AuthContext = createContext();

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

          navigate('/dashboard');
        }
      }
    });

    return unsubscribe;
  }, [navigate]);

  const value = useMemo(
    () => ({
      user,
      createUser,
      logout,
      signIn,
      googleSignIn,
    }),
    [user, createUser, logout, signIn, googleSignIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
