
import { auth, db } from "./firebase-config.js";
import {
onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
collection,
query,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


onAuthStateChanged(auth, (user) => {
if (!user) {
window.location.href = "index.html";
} else {
document.getElementById("userEmail").textContent = user.email;
loadReports();
}
});


function loadReports() {
const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
const categoryFilter = document.getElementById("categoryFilter").value;
const statusFilter = document.getElementById("statusFilter").value;

let reports = [];
snapshot.forEach((doc) => {
reports.push({ id: doc.id, ...doc.data() });
});


if (categoryFilter !== "all") {
reports = reports.filter((r) => r.category === categoryFilter);
}
if (statusFilter !== "all") {
reports = reports.filter((r) => r.status === statusFilter);
}

displayReports(reports);
});
}


function displayReports(reports) {
const reportsList = document.getElementById("reportsList");
reportsList.innerHTML = "";

if (reports.length === 0) {
reportsList.innerHTML = "<p>No reports found.</p>";
return;
}

reports.forEach((report) => {
const card = document.createElement("div");
card.classList.add("report-card");
card.innerHTML = `
<h3>${report.title}</h3>
<p><strong>Category:</strong> ${report.category}</p>
<p><strong>Location:</strong> ${report.location}</p>
<p><strong>Description:</strong> ${report.description}</p>
<p><strong>Status:</strong>
<span class="status-badge status-${report.status}">
${report.status}
</span>
</p>
${report.photoURL ? `<img src="${report.photoURL}" alt="Report photo" style="width:100%;max-width:300px;margin-top:10px;border-radius:5px;" />` : ""}
`;
reportsList.appendChild(card);
});
}


document.getElementById("categoryFilter").addEventListener("change", loadReports);
document.getElementById("statusFilter").addEventListener("change", loadReports);


document.getElementById("logoutBtn").addEventListener("click", async () => {
const { signOut } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
await signOut(auth);
window.location.href = "index.html";
});
