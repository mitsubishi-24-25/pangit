const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.username !== "Adviser") {
    window.location.href = "index.html";
}