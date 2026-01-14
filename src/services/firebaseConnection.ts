import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getFirestore} from "firebase/firestore"
import { getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-leFf4hl-9QIg5rcE6lcjR8cHivPT2f0",
  authDomain: "wordpet-83372.firebaseapp.com",
  projectId: "wordpet-83372",
  storageBucket: "wordpet-83372.firebasestorage.app",
  messagingSenderId: "280163256734",
  appId: "1:280163256734:web:8234b0c6beb6c8648a6e8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db , auth , storage}