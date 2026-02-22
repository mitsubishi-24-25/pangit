document.addEventListener("DOMContentLoaded", function () {
  const message = "Action disabled by Clarence.";

  document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (key === "i" || key === "j")) ||
      (e.ctrlKey && ["u", "c", "x"].includes(key))
    ) {
      e.preventDefault();
      showToast(message); 
      closeExpanded();
    }
  });

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    showToast(message);
    closeExpanded();
  });

  document.addEventListener("copy", function (e) {
    e.preventDefault();
    showToast(message);
    closeExpanded();
  });

  document.addEventListener("cut", function (e) {
    e.preventDefault();
    showToast(message);
    closeExpanded();
  });

  document.addEventListener("dragstart", function (e) {
    e.preventDefault();
    showToast(message);
    closeExpanded();
  });

  document.addEventListener("touchstart", function (e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
  });
});
