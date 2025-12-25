async function loadSidebar(activePage) {
    // load sidebar HTML
    const html = await fetch("sidebar.html").then(r => r.text());
    document.getElementById("sidebar-container").innerHTML = html;/* 
    document.getElementById("navbar-container").innerHTML = html; */

    // highlight active link
    const links = document.querySelectorAll("#sidebar-container a");
    links.forEach(link => {
        if (link.getAttribute("href") === activePage) {
            link.classList.add("active", "fw-bold");
        }
    });
}
