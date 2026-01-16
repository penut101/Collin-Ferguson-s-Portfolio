// Enhanced navigation behavior - modal and smooth scrolling only
(function () {
  // Smooth scroll to sections
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Headshot modal functionality
  const headshot = document.getElementById("headshot");
  const modal = document.getElementById("headshot-modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.querySelector(".modal-close");

  if (headshot && modal && modalImg && closeBtn) {
    headshot.addEventListener("click", () => {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    // Close modal on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("show")) {
        modal.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }
})();
