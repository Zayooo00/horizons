import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
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
  const [initializing, setInitializing] = useState(true);

  const createUser = useCallback((email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);

  const signIn = useCallback((email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const googleSignIn = useCallback(() => {
    const GoogleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, GoogleProvider);
  }, []);

  const logout = useCallback(() => {
    return signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setInitializing(false);

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
      initializing,
      createUser,
      logout,
      signIn,
      googleSignIn,
    }),
    [user, initializing, createUser, logout, signIn, googleSignIn]
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
