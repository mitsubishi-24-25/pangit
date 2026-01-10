(function () {
  "use strict";

  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleBtn");
  const navbar = document.querySelector(".navbar");
  const mainContent = document.querySelector(".main-content");
  const navLinks = document.querySelectorAll(".no-link");

  if (!sidebar || !toggleBtn || !navbar || !mainContent) {
    return;
  }

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  function handleResize() {
    if (window.innerWidth < 992) {
      sidebar.classList.add("collapsed");
    } else {
      sidebar.classList.remove("collapsed");
    }
    adjustSidebarPadding();
    adjustMainPadding();
  }

  function adjustSidebarPadding() {
    if (window.innerWidth < 992) {
      sidebar.style.paddingTop = navbar.offsetHeight + "px";
    } else {
      sidebar.style.paddingTop = "";
    }
  }

  function adjustMainPadding() {
    mainContent.style.paddingTop = navbar.offsetHeight + 10 + "px";
  }

  document.addEventListener("click", function (e) {
    const isSmallScreen = window.innerWidth <= 991.98;
    if (
      isSmallScreen &&
      !sidebar.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      sidebar.classList.add("collapsed");
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const message = "This page is currently unavailable. Thank you!";
      if (typeof showToast === "function") {
        showToast(message);
      } else {
        alert(message);
      }
      sidebar.classList.add("collapsed");
    });
  });

  window.addEventListener("resize", handleResize);
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", handleResize);
  } else {
    handleResize();
  }
  window.addEventListener("resize", adjustMainPadding);
})();
