
import { auth, db } from "./firebase-config.js";
import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
if (!user) {
window.location.href = "index.html";
}
});

// SUBMIT REPORT
const reportForm = document.getElementById("reportForm");
if (reportForm) {
reportForm.addEventListener("submit", async (e) => {
e.preventDefault();

const title = document.getElementById("title").value;
const category = document.getElementById("category").value;
const location = document.getElementById("location").value;
const description = document.getElementById("description").value;

try {
await addDoc(collection(db, "reports"), {
title,
category,
location,
description,
photoURL: "",
status: "pending",
userId: auth.currentUser.uid,
createdAt: serverTimestamp()
});

document.getElementById("successMsg").textContent = "Report submitted successfully!";
reportForm.reset();

} catch (error) {
document.getElementById("errorMsg").textContent = error.message;
}
});
}