
const registerForm = document.getElementById("registerForm");
if (registerForm) {
registerForm.addEventListener("submit", function(e) {
e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const role = document.getElementById("role").value;


const users = JSON.parse(localStorage.getItem("users")) || [];


const existingUser = users.find(function(user) {
return user.email === email;
});

if (existingUser) {
document.getElementById("errorMsg").textContent = "Email already registered!";
return;
}


users.push({ name, email, password, role });
localStorage.setItem("users", JSON.stringify(users));

alert("Account created successfully! Please login.");
window.location.href = "index.html";
});
}


const loginForm = document.getElementById("loginForm");
if (loginForm) {
loginForm.addEventListener("submit", function(e) {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(function(u) {
return u.email === email && u.password === password;
});

if (!user) {
document.getElementById("errorMsg").textContent = "Invalid email or password!";
return;
}


localStorage.setItem("currentUser", JSON.stringify(user));

if (user.role === "admin") {
window.location.href = "admin.html";
} else {
window.location.href = "dashboard.html";
}
});
}


const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
logoutBtn.addEventListener("click", function() {
localStorage.removeItem("currentUser");
window.location.href = "index.html";
});
}