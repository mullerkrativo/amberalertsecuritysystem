import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAD-dTvg63O7s8fd_Cn4pWYfODb7DXsmcE",
  authDomain: "amberalertdemo.firebaseapp.com",
  projectId: "amberalertdemo",
  storageBucket: "amberalertdemo.firebasestorage.app",
  messagingSenderId: "859664231016",
  appId: "1:859664231016:web:09699ed43d6b8551aaa9dd"
};

export const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);