import { initializeApp } from 'firebase/app';
import { getAuth, indexedDBLocalPersistence } from 'firebase/auth';

const firebase = initializeApp({
  apiKey: 'AIzaSyCNwhdpTxJxprM1Ba9S0GFgNnNdQ-jO0LA',
  projectId: 'auto-clicker-autofill',
  storageBucket: 'auto-clicker-autofill.appspot.com',
  messagingSenderId: '15763641869',
  appId: '1:15763641869:web:fa0d6379857a759e062744',
  measurementId: 'G-SWL4B1QJG8',
});
export const auth = getAuth(firebase);
auth.setPersistence(indexedDBLocalPersistence);
