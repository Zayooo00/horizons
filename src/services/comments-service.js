import {
  collection,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  orderBy,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const commentsCollection = collection(db, 'comments');

export async function fetchPostComments(postId) {
  const q = query(
    commentsCollection,
    where('postId', '==', postId),
    orderBy('timestamp', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push(doc.data());
  });
  return comments;
}

export async function getCommentCount(postIds) {
  const commentCounts = await Promise.all(
    postIds.map(async (postId) => {
      const q = query(commentsCollection, where('postId', '==', postId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    })
  );
  return commentCounts.reduce((a, b) => a + b, 0);
}

export async function addComment(postId, author, text) {
  await addDoc(commentsCollection, {
    postId,
    author,
    text,
    timestamp: serverTimestamp(),
  });

  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { commentCount: increment(1) });
}
