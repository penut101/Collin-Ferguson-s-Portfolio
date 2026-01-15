// Typed.js initialization for the headshot section
// Make sure to include this script after loading Typed.js library

document.addEventListener("DOMContentLoaded", function () {
  var typedElement = document.getElementById("typed-headshot");
  if (typedElement && window.Typed) {
    new Typed("#typed-headshot", {
      strings: ["Collin Ferguson"],
      typeSpeed: 50,
      backSpeed: 25,
      loop: false,
      showCursor: false,
    });
  }

  var subtitleElement = document.getElementById("typed-subtitle");
  if (subtitleElement && window.Typed) {
    new Typed("#typed-subtitle", {
      strings: ["Sports Broadcaster", "Play-by-Play", "Radio Host"],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    });
  }
});
