import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const profilesCollection = collection(db, 'profiles');

export async function checkIfUserDocExists(userId) {
  const userDocRef = doc(profilesCollection, userId);
  const userDocSnap = await getDoc(userDocRef);

  return userDocSnap.exists();
}

export async function uploadUserInfo(profile, avatar, userId) {
  const userDocRef = doc(profilesCollection, userId);
  await setDoc(userDocRef, {
    ...profile,
    avatar,
  });
}

export async function getUserById(userId) {
  const userDocRef = doc(profilesCollection, userId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    return null;
  }
}
