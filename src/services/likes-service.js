import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const likesCollection = collection(db, 'likes');

export async function getLikeCount(postId) {
  const q = query(likesCollection, where('postId', '==', postId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.size;
}

export async function hasUserLikedPost(postId, userId) {
  const q = query(
    likesCollection,
    where('postId', '==', postId),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

export async function addLike(postId, userId) {
  await addDoc(likesCollection, { postId, userId });
}

export async function removeLike(postId, userId) {
  const q = query(
    likesCollection,
    where('postId', '==', postId),
    where('userId', '==', userId)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const likeDoc = querySnapshot.docs[0];

    await deleteDoc(doc(db, 'likes', likeDoc.id));
  }
}
