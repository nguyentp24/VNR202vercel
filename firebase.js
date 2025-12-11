import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAfqzdpIEFzK06dAnm7y6vhDO6aqs15AWY",
    authDomain: "chat-app-5396e.firebaseapp.com",
    projectId: "chat-app-5396e",
    storageBucket: "chat-app-5396e.appspot.com",
    messagingSenderId: "30357547888",
    appId: "1:30357547888:web:b1f337ef5271f78a25bdb5",
    measurementId: "G-15J84L6KTP"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

