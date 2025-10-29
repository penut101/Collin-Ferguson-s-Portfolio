// Page-specific JS for work.html
// Adds expand/collapse-all buttons and improves keyboard accessibility for <details>
(function () {
  const expandAll = document.getElementById("expandAll");
  const collapseAll = document.getElementById("collapseAll");
  const details = Array.from(document.querySelectorAll(".section-dropdown"));

  function setAll(open) {
    details.forEach((d) => {
      if (open) d.setAttribute("open", "");
      else d.removeAttribute("open");
    });
  }

  if (expandAll) expandAll.addEventListener("click", () => setAll(true));
  if (collapseAll) collapseAll.addEventListener("click", () => setAll(false));

  // Make summaries keyboard-friendly: Enter/Space toggle
  details.forEach((d) => {
    const summary = d.querySelector("summary");
    summary.setAttribute("tabindex", "0");
    summary.setAttribute("role", "button");

    summary.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (d.hasAttribute("open")) d.removeAttribute("open");
        else d.setAttribute("open", "");
      }
    });
  });

  // Improve focus outline for accessibility
  document.addEventListener("focusin", (e) => {
    if (e.target.closest(".section-dropdown")) {
      e.target.closest(".section-dropdown").classList.add("focused");
    }
  });
  document.addEventListener("focusout", (e) => {
    if (e.target.closest(".section-dropdown")) {
      e.target.closest(".section-dropdown").classList.remove("focused");
    }
  });
})();
