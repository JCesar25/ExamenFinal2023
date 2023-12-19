// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage ,ref,uploadBytes} from "firebase/storage";
import { getDatabase } from "firebase/database"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {


  apiKey: "AIzaSyDI2HdfVLsdmji94z3ix9I9J9y0x-zISIY",
  authDomain: "final2023-3156a.firebaseapp.com",
  projectId: "final2023-3156a",
  storageBucket: "final2023-3156a.appspot.com",
  messagingSenderId: "168944501240",
  appId: "1:168944501240:web:a79f74c7ed4f20dab9d60d",
  measurementId: "G-QJSKV2MFW1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app);

