import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyDADEPazK9Ic2gS3QRc3rJVbLjfLUAo0hY",
authDomain: "community-reporter-app.firebaseapp.com",
projectId: "community-reporter-app",
storageBucket: "community-reporter-app.firebasestorage.app",
messagingSenderId: "894514638326",
appId: "1:894514638326:web:61d74a721f2797bf29abd7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };