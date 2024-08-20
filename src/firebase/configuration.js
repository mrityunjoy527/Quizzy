import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGR8RGXZWm2CKWGich8xd9eL9qvpRTQ3s",
  authDomain: "quizzy-e42cf.firebaseapp.com",
  projectId: "quizzy-e42cf",
  storageBucket: "quizzy-e42cf.appspot.com",
  messagingSenderId: "606975627699",
  appId: "1:606975627699:web:c0b2778682076b654ffbc6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
