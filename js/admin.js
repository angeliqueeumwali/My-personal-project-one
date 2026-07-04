
import { auth, db } from "./firebase-config.js";
import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
collection,
query,
orderBy,
onSnapshot,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


onAuthStateChanged(auth, (user) => {
if (!user) {
window.location.href = "index.html";
} else {
document.getElementById("userEmail").textContent = user.email;
loadAllReports();
}
});


function loadAllReports() {
const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
let reports = [];
snapshot.forEach((doc) => {
reports.push({ id: doc.id, ...doc.data() });
});

updateStats(reports);
displayAdminReports(reports);
});
}


function updateStats(reports) {
document.getElementById("totalReports").textContent = reports.length;
document.getElementById("pendingReports").textContent =
reports.filter((r) => r.status === "pending").length;
document.getElementById("inprogressReports").textContent =
reports.filter((r) => r.status === "inprogress").length;
document.getElementById("resolvedReports").textContent =
reports.filter((r) => r.status === "resolved").length;
}


function displayAdminReports(reports) {
const list = document.getElementById("adminReportsList");
list.innerHTML = "";

if (reports.length === 0) {
list.innerHTML = "<p>No reports yet.</p>";
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
<p><strong>Current Status:</strong>
<span class="status-badge status-${report.status}">
${report.status}
</span>
</p>
${report.photoURL ? `<img src="${report.photoURL}" alt="photo" style="width:100%;max-width:300px;margin-top:10px;border-radius:5px;" />` : ""}
<div style="margin-top:10px;">
<label>Update Status:</label>
<select id="status-${report.id}">
<option value="pending" ${report.status === "pending" ? "selected" : ""}>Pending</option>
<option value="inprogress" ${report.status === "inprogress" ? "selected" : ""}>In Progress</option>
<option value="resolved" ${report.status === "resolved" ? "selected" : ""}>Resolved</option>
</select>
<button onclick="updateStatus('${report.id}')">Update</button>
</div>
`;
list.appendChild(card);
});
}


window.updateStatus = async (reportId) => {
const newStatus = document.getElementById(`status-${reportId}`).value;
try {
await updateDoc(doc(db, "reports", reportId), {
status: newStatus
});
alert("Status updated successfully!");
loadAllReports(); // Refresh the list to reflect the updated status
} catch (error) {
alert("Error updating status: " + error.message);
}
};


document.getElementById("logoutBtn").addEventListener("click", async () => {
const { signOut } = await import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js");
await signOut(auth);
window.location.href = "index.html";
});
