import {getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";

const firebaseConfig = {
   apiKey: "AIzaSyB_Fguu8a_rdW7IEzBa9kpeBrR4a7E2XUc",
   authDomain: "ghost-messenger-3f860.firebaseapp.com",
   projectId: "ghost-messenger-3f860",
   storageBucket: "ghost-messenger-3f860.appspot.com",
   messagingSenderId: "365635597304",
   appId: "1:365635597304:web:36eea56ba9419882925c0d",
   measurementId: "G-QR08DY1WNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);