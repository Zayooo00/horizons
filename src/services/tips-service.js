import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const tipsCollection = collection(db, 'tips');

export async function getRandomTip() {
  const querySnapshot = await getDocs(tipsCollection);
  const tips = [];
  querySnapshot.forEach((doc) => {
    tips.push(doc.data());
  });

  const randomIndex = Math.floor(Math.random() * tips.length);
  const randomTip = tips[randomIndex];

  return randomTip;
}
