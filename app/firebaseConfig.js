// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDKQt1uHPcIuywGAjyzp63CaBPdXj0OE4E",
//   authDomain: "dynamic-pricepj.firebaseapp.com",
//   projectId: "dynamic-pricepj",
//   storageBucket: "dynamic-pricepj.firebasestorage.app",
//   messagingSenderId: "879524386294",
//   appId: "1:879524386294:web:cb5932d336105005d023d7",
//   // measurementId: "G-Q78ZTJ9GSB"
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
