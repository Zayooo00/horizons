import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const categoriesCollection = collection(db, 'categories');

export async function getAllCategories() {
  const querySnapshot = await getDocs(categoriesCollection);
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push(doc.data());
  });
  return categories;
}
