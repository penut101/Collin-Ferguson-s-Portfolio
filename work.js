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

  // Audio play/pause functionality for WPTS section
  const audioMap = new Map();
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("play-icon")) {
      const icon = e.target;
      const li = icon.closest("li");
      const progress = li.querySelector(".audio-progress");
      const btn = li.querySelector(".play-pause-btn");
      const audioSrc = icon.getAttribute("data-audio");
      if (audioSrc && progress && btn) {
        icon.style.display = "none";
        progress.style.display = "inline-block";
        btn.style.display = "inline-block";
        let audio = audioMap.get(btn);
        if (!audio) {
          audio = new Audio(audioSrc);
          audioMap.set(btn, audio);
          audio.addEventListener("loadedmetadata", () => {
            progress.max = audio.duration;
          });
          audio.addEventListener("timeupdate", () => {
            progress.value = audio.currentTime;
          });
          audio.addEventListener("ended", () => {
            btn.textContent = "▶";
            progress.style.display = "none";
            btn.style.display = "none";
            icon.style.display = "inline-block";
          });
        }
        audio
          .play()
          .then(() => {
            btn.textContent = "⏸";
          })
          .catch((err) => console.error("Error playing audio:", err));
      }
    } else {
      const btn = e.target.closest(".play-pause-btn");
      if (btn) {
        const progress = btn.previousElementSibling;
        if (progress && progress.classList.contains("audio-progress")) {
          let audio = audioMap.get(btn);
          if (audio) {
            if (audio.paused) {
              audio
                .play()
                .then(() => {
                  btn.textContent = "⏸";
                  progress.style.display = "inline-block";
                })
                .catch((err) => console.error("Error playing audio:", err));
            } else {
              audio.pause();
              btn.textContent = "▶";
            }
          }
        }
      }
    }
  });
})();
