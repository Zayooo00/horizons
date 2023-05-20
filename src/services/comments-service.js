import {
  collection,
  query,
  where,
  addDoc,
  getDocs,
  orderBy,
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

export async function addComment(postId, author, text) {
  await addDoc(commentsCollection, {
    postId,
    author,
    text,
    timestamp: serverTimestamp(),
  });
}
