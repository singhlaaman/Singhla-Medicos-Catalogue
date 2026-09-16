import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3WJklzmANyXP7VtRFf-XVMT1O80mSTAU",
  authDomain: "singhla-medicos-497712.firebaseapp.com",
  projectId: "singhla-medicos-497712",
  storageBucket: "singhla-medicos-497712.firebasestorage.app",
  messagingSenderId: "24082575206",
  appId: "1:24082575206:web:6732558db5eb1c6e2a22a7"
};

const app = initializeApp(firebaseConfig);
// Initialize Firestore using the specific database ID provisioned for the applet
const db = getFirestore(app, "ai-studio-singhlamedicosca-1d965afa-73ba-46e1-bbe6-c1ceafb5d22f");

export { app, db };

