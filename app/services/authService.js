import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from './firebaseConfig';

let cachedUserId = null;

export function getCurrentUserId() {
  return cachedUserId;
}

export async function ensureSignedIn() {
  if (auth.currentUser) {
    cachedUserId = auth.currentUser.uid;
    return cachedUserId;
  }
  try {
    const credential = await signInAnonymously(auth);
    cachedUserId = credential.user.uid;
    return cachedUserId;
  } catch (error) {
    throw error;
  }
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, user => {
    cachedUserId = user ? user.uid : null;
    callback(user);
  });
}