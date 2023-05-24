import {
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

const postsCollection = collection(db, 'posts');

export async function createPost(post, postId) {
  const postDocRef = doc(postsCollection, postId);

  await setDoc(postDocRef, {
    ...post,
  });
}

export async function updatePost(post, postId) {
  const postDocRef = doc(postsCollection, postId);
  await updateDoc(postDocRef, {
    ...post,
  });
}

export async function deletePost(postId) {
  const postDocRef = doc(postsCollection, postId);
  await deleteDoc(postDocRef);
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

export async function getPostById(postId) {
  const q = query(postsCollection, where('postId', '==', postId));
  const querySnapshot = await getDocs(q);
  const post = querySnapshot.docs[0]?.data();

  return post;
}
