import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjrw6DH5EMWAExQWHpeWjTMt0vG4ZY2B4",
  authDomain: "trivia-37541.firebaseapp.com",
  projectId: "trivia-37541",
  storageBucket: "trivia-37541.firebasestorage.app",
  messagingSenderId: "818907290034",
  appId: "1:818907290034:web:0e1c50731d167ce7adacab"
};

// Initialize Firebase
let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
  console.error('Please check your Firebase configuration and ensure your project is properly set up.');
}

export { auth, db }; 