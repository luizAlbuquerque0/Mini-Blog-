
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB5IOsHoOaSnb4BxuVgwgIqwWjFgeTbPp4",
  authDomain: "mini-blog-be2b8.firebaseapp.com",
  projectId: "mini-blog-be2b8",
  storageBucket: "mini-blog-be2b8.appspot.com",
  messagingSenderId: "955795063462",
  appId: "1:955795063462:web:09b078e79bf310288daa67"
};


const app = initializeApp(firebaseConfig);

const db= getFirestore(app);

export {db};