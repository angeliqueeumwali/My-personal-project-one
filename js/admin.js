

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
window.location.href = "index.html";
}


const userEmailSpan = document.getElementById("userEmail");
if (userEmailSpan) {
userEmailSpan.textContent = currentUser.name;
}


function loadReports() {
const reports = JSON.parse(localStorage.getItem("reports")) || [];
const categoryFilter = document.getElementById("categoryFilter").value;
const statusFilter = document.getElementById("statusFilter").value;


let filtered = reports;

if (categoryFilter !== "all") {
filtered = filtered.filter(function(r) {
return r.category === categoryFilter;
});
}

if (statusFilter !== "all") {
filtered = filtered.filter(function(r) {
return r.status === statusFilter;
});
}

displayReports(filtered);
}


function displayReports(reports) {
const reportsList = document.getElementById("reportsList");
reportsList.innerHTML = "";

if (reports.length === 0) {
reportsList.innerHTML = "<p>No reports found.</p>";
return;
}

reports.forEach(function(report) {
const card = document.createElement("div");
card.classList.add("report-card");
card.innerHTML = `
<h3>${report.title}</h3>
<p><strong>Category:</strong> ${report.category}</p>
<p><strong>Location:</strong> ${report.location}</p>
<p><strong>Description:</strong> ${report.description}</p>
<p><strong>Date:</strong> ${report.createdAt}</p>
<p><strong>Status:</strong>
<span class="status-badge status-${report.status}">
${report.status}
</span>
</p>
`;
reportsList.appendChild(card);
});
}


document.getElementById("categoryFilter").addEventListener("change", loadReports);
document.getElementById("statusFilter").addEventListener("change", loadReports);


document.getElementById("logoutBtn").addEventListener("click", function() {
localStorage.removeItem("currentUser");
window.location.href = "index.html";
});


loadReports();