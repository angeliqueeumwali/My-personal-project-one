
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
window.location.href = "index.html";
}


const reportForm = document.getElementById("reportForm");
if (reportForm) {
reportForm.addEventListener("submit", function(e) {
e.preventDefault();

const title = document.getElementById("title").value;
const category = document.getElementById("category").value;
const location = document.getElementById("location").value;
const description = document.getElementById("description").value;


const reports = JSON.parse(localStorage.getItem("reports")) || [];


const newReport = {
id: Date.now(),
title,
category,
location,
description,
status: "pending",
userId: currentUser.email,
createdAt: new Date().toLocaleDateString()
};


reports.push(newReport);
localStorage.setItem("reports", JSON.stringify(reports));

document.getElementById("successMsg").textContent = "Report submitted successfully!";
reportForm.reset();


setTimeout(function() {
window.location.href = "dashboard.html";
}, 2000);
});
}