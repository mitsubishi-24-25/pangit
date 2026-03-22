(function () {
  const container = document.getElementById("chatbot-container");

  fetch("woah.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load woah.html");
      return response.text();
    })
    .then((html) => {
      // Inject HTML
      container.innerHTML = html;

      // Process scripts so they run
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          // External script
          newScript.src = oldScript.src;
          newScript.async = false; // preserve order
        } else {
          // Inline script
          newScript.textContent = oldScript.textContent;
        }

        // Append to body to execute
        document.body.appendChild(newScript);
        oldScript.remove();
      });

      // Optional: process external CSS links in the injected HTML
      const links = container.querySelectorAll('link[rel="stylesheet"]');
      links.forEach((link) => {
        const newLink = document.createElement("link");
        newLink.rel = "stylesheet";
        newLink.href = link.href;
        document.head.appendChild(newLink);
        link.remove();
      });
    })
    .catch((err) => console.error("Error loading chatbot:", err));
})();
