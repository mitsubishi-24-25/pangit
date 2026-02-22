const users = [
  { username: "Adviser", password: "CardGen2025" },
  { username: "Sub-Teacher", password: "CardGen2025" } 
,
];

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../../index.html";
}
