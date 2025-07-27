// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { FirebaseStorage, getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "fir-nextjs-demo-3f5a3.firebaseapp.com",
  projectId: "fir-nextjs-demo-3f5a3",
  storageBucket: "fir-nextjs-demo-3f5a3.firebasestorage.app",
  messagingSenderId: "537441843614",
  appId: "1:537441843614:web:55b79d29594f7c1751fe8f",
};

// Initialize Firebase
const currentApps = getApps();
let auth: Auth;
let storage: FirebaseStorage;

if (!currentApps.length) {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
} else {
  const app = currentApps[0];
  auth = getAuth(app);
  storage = getStorage(app);
}

export { auth, storage };

// we can refer to them by using
// import {auth} from "@/firebase/client"
