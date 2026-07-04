
import { auth, db } from "./firebase-config.js";
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// REGISTER
const registerForm = document.getElementById("registerForm");
if (registerForm) {
registerForm.addEventListener("submit", async (e) => {
e.preventDefault();
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;

try {
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

await setDoc(doc(db, "users", user.uid), {
name: name,
email: email,
role: role
});

window.location.href = "index.html";
} catch (error) {
document.getElementById("error-message").textContent = error.message;
}
});
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
loginForm.addEventListener("submit", async (e) => {
e.preventDefault();
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {
const userCredential = await signInWithEmailAndPassword(auth, email, password);
const user = userCredential.user;

const { getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js");
const userDoc = await getDoc(doc(db, "users", user.uid));

if (userDoc.exists()) {
const role = userDoc.data().role;
if (role === "admin") {
window.location.href = "admin.html";
} else {
window.location.href = "dashboard.html";
}
}
} catch (error) {
document.getElementById("error-message").textContent = error.message;
}
});
}

// LOGOUT
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
logoutBtn.addEventListener("click", async () => {
await signOut(auth);
window.location.href = "index.html";
});
}