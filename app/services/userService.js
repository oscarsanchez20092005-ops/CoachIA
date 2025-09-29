import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from './firebaseConfig';

const usersCollection = 'users';

export function userDocRef(userId) {
  return doc(db, usersCollection, userId);
}

export async function saveUserProfile(userId, profile) {
  const ref = userDocRef(userId);
  await setDoc(
    ref,
    {
      ...profile,
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function getUserProfile(userId) {
  const ref = userDocRef(userId);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export function listenUserProfile(userId, callback) {
  const ref = userDocRef(userId);
  return onSnapshot(ref, snapshot => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    } else {
      callback(null);
    }
  });
}