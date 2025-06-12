import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const updateHighScore = async (userId, newScore) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    
    if (newScore > userData.highScore) {
      await updateDoc(userRef, {
        highScore: newScore,
        lastScore: newScore,
        lastPlayed: new Date().toISOString()
      });
      return true; // Score was updated
    }
    
    // Update last score even if it's not a high score
    await updateDoc(userRef, {
      lastScore: newScore,
      lastPlayed: new Date().toISOString()
    });
    
    return false; // Score was not updated
  } catch (error) {
    throw error;
  }
};

export const getHighScore = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userData = userDoc.data();
    return userData.highScore;
  } catch (error) {
    throw error;
  }
}; 