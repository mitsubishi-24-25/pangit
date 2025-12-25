const users = [
    { username: "Adviser", password: "CardGen2025" },
    { username: "Sub-Teacher", password: "CardGen2025" }/* ,
    { username: "Chris", password: "pass123"} */
];

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}