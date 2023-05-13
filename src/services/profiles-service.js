import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const profilesCollection = collection(db, 'profiles');

export async function checkIfUserDocExists(currentUserId) {
  const userDocRef = doc(profilesCollection, currentUserId);
  const userDocSnap = await getDoc(userDocRef);

  return userDocSnap.exists();
}

export async function uploadUserInfo(
  username,
  description,
  avatar,
  currentUserId
) {
  const userDocRef = doc(profilesCollection, currentUserId);
  await setDoc(userDocRef, {
    username,
    description,
    avatar,
  });
}

export async function fetchUserProfile(currentUserId) {
  const userDocRef = doc(profilesCollection, currentUserId);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    return userDocSnap.data();
  } else {
    return null;
  }
}
