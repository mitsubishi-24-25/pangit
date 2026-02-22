async function loadSidebar(activePage) {
  
  const html = await fetch("../assets/html/sidebar.html").then((r) => r.text());
  document.getElementById("sidebar-container").innerHTML = html; 


  
  const links = document.querySelectorAll("#sidebar-container a");
  links.forEach((link) => {
    if (link.getAttribute("href") === activePage) {
      link.classList.add("active", "fw-bold");
    }
  });
}
