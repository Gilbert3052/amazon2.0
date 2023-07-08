
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAtdT8e5a6c0_OtX_SXh4UHqWwUXnO4wls",
    authDomain: "gilbert-2.firebaseapp.com",
    projectId: "gilbert-2",
    storageBucket: "gilbert-2.appspot.com",
    messagingSenderId: "800703635592",
    appId: "1:800703635592:web:ad1f8d4d250d86d530bf3d"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  const auth = getAuth(app)

  export { db, auth}