import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID, VARIANT } from '../common/environments';

const firebase = initializeApp({
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
});
firebase.automaticDataCollectionEnabled = false;
const auth = getAuth(firebase);
if (VARIANT === 'LOCAL') {
  connectAuthEmulator(auth, 'http://localhost:4000');
}
auth.setPersistence(indexedDBLocalPersistence);
export { auth };
