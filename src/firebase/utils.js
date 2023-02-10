import {initializeApp, getApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

import {initializeFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBmcufsJaqb39rmcNUtg1GGBhOs7kDnQVI',
  authDomain: 'wordsbag.firebaseapp.com',
  projectId: 'wordsbag',
  storageBucket: 'wordsbag.appspot.com',
  messagingSenderId: '1049303087692',
  appId: '1:1049303087692:web:b193a9c1b8637892d9d2e9',
  measurementId: 'G-BFN64EY6MC',
};
initializeApp(firebaseConfig);
const auth = getAuth();
const app = getApp();
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage(app);

export {app, auth, storage, db};
