// Enhanced navigation behavior
(function () {
  const btn = document.getElementById("menuButton");
  const menu = document.getElementById("menu");
  const dropdowns = document.querySelectorAll(".dropdown");

  function closeMenu() {
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    menu.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }

  // Mobile menu toggle
  btn.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
      btn.focus();
    }

    if (
      (e.key === "ArrowDown" || e.key === "Down") &&
      document.activeElement === btn
    ) {
      e.preventDefault();
      openMenu();
      const first = menu.querySelector("a");
      if (first) first.focus();
    }

    // Handle arrow keys for dropdown navigation
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      const dropdown = e.target.closest(".dropdown-menu");
      if (dropdown) {
        e.preventDefault();
        const items = [...dropdown.querySelectorAll("a")];
        const currentIndex = items.indexOf(document.activeElement);
        const direction = e.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + items.length) % items.length;
        items[nextIndex].focus();
      }
    }
  });

  // Enhance dropdowns for touch devices
  if ("ontouchstart" in window) {
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector(".dropdown-trigger");
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const isOpen = dropdown.classList.contains("touch-open");

        // Close all other dropdowns
        dropdowns.forEach((d) => d.classList.remove("touch-open"));

        if (!isOpen) {
          dropdown.classList.add("touch-open");
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".dropdown")) {
        dropdowns.forEach((d) => d.classList.remove("touch-open"));
      }
    });
  }

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
        closeMenu();
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
