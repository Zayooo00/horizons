import { setDoc, getDocs, doc, collection } from 'firebase/firestore';
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
