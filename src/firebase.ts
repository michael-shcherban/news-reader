import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2pwcZsO4ZZ6YcG02dhTpSPtQXRWXOF8U",
  authDomain: "awesome-blog-c1f42.firebaseapp.com",
  projectId: "awesome-blog-c1f42",
  storageBucket: "awesome-blog-c1f42.appspot.com",
  messagingSenderId: "887999405042",
  appId: "1:887999405042:web:01882a7b503a96b3d7a96b"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, firebaseApp, db };
