import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA542WTDln6BSpWJmEA8jqq58ArKOJ4mBI",
  authDomain: "laundry-mgmt-system.firebaseapp.com",
  projectId: "laundry-mgmt-system",
  storageBucket: "laundry-mgmt-system.firebasestorage.app",
  messagingSenderId: "120786013376",
  appId: "1:120786013376:web:da33570cddb3a585b4b125",
  measurementId: "G-WJJYML11FX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);