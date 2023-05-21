import {
  collection,
  query,
  where,
  addDoc,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
  increment,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const likesCollection = collection(db, 'likes');

export async function getLikeCount(postIds) {
  const likeCounts = await Promise.all(
    postIds.map(async (postId) => {
      const q = query(likesCollection, where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    })
  );
  return likeCounts.reduce((a, b) => a + b, 0);
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

  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { likeCount: increment(1) });
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

    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, { likeCount: increment(-1) });
  }
}
