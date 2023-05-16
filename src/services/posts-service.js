import {
  setDoc,
  getDocs,
  doc,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const postsCollection = collection(db, 'posts');

export async function createPost(post) {
  const postId = uuidv4();
  const userDocRef = doc(postsCollection, postId);

  await setDoc(userDocRef, {
    ...post,
    postId,
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

export async function getPostById(postId) {
  const q = query(postsCollection, where('postId', '==', postId));
  const querySnapshot = await getDocs(q);
  const post = querySnapshot.docs[0]?.data();
  return post;
}
