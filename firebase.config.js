/** @format */

/** @format */

// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN94xXRCrj442vxvvsB0J88zKkTRVcQCE",
  authDomain: "school-network-app-4d87f.firebaseapp.com",
  projectId: "school-network-app-4d87f",
  storageBucket: "school-network-app-4d87f.appspot.com",
  messagingSenderId: "83783715032",
  appId: "1:83783715032:web:7ab13d44ec778589cb2fad",
  measurementId: "G-426WQ70HFQ",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = isSupported().then(() => {
//   getAnalytics(app);
// });
// export const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
