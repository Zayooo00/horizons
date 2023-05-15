import {
  setDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const postsCollection = collection(db, 'posts');

export async function createPost(post) {
  const userDocRef = doc(postsCollection);
  await setDoc(userDocRef, {
    ...post,
  });
}

export async function getAllPosts() {
  const querySnapshot = await getDocs(postsCollection);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
}

export async function getUserPosts(currentUserId) {
  const q = query(postsCollection, where('author', '==', currentUserId));
  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  return posts;
}
