import { initializeApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID } from '../common/environments';

const firebase = initializeApp({
  apiKey: FIREBASE_API_KEY,
  projectId: FIREBASE_PROJECT_ID,
});
firebase.automaticDataCollectionEnabled = false;
const auth = getAuth(firebase);
auth.setPersistence(indexedDBLocalPersistence);
export { auth };
