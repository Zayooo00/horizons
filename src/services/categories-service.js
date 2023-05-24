import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

import { revertFormatLinkPath } from '../helpers/Normalizer';

const categoriesCollection = collection(db, 'categories');

export async function getAllCategories() {
  const querySnapshot = await getDocs(categoriesCollection);
  const categories = [];
  querySnapshot.forEach((doc) => {
    categories.push(doc.data());
  });

  return categories;
}

export async function getCategoryByName(categoryName) {
  const revertedCategory = revertFormatLinkPath(categoryName);

  const q = query(
    categoriesCollection,
    where('categoryName', '==', revertedCategory)
  );
  const querySnapshot = await getDocs(q);
  const category = querySnapshot.docs[0]?.data();

  return category;
}
