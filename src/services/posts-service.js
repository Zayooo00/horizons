import { setDoc, doc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const postsCollection = collection(db, 'posts');

export async function createPost(post) {
  const userDocRef = doc(postsCollection);
  await setDoc(userDocRef, {
    ...post,
  });
}
