// Apply saved theme on page load
(function() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
})();

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

// Highlight current page in nav
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// Splash animation
window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");

  if (!localStorage.getItem("splashPlayed") && splash) {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
    tl.to("#circle", { strokeDashoffset: 0, duration: 1.2 })
      .to("#branch-left", { strokeDashoffset: 0 }, "-=0.8")
      .to("#branch-right", { strokeDashoffset: 0 }, "-=0.8")
      .to("#logo-text", { opacity: 1, duration: 0.8 }, "-=0.3")
      .to("#splash", { opacity: 0, duration: 1, onComplete: () => {
          splash.classList.add("hidden");
          localStorage.setItem("splashPlayed", "true");
      }}, "+=0.5");
  } else {
    splash?.classList.add("hidden");
  }

  // Video mute/unmute
  const iframe = document.getElementById("hero-video");
  const muteToggle = document.getElementById("mute-toggle");
  let isMuted = true;

  function postMessageToPlayer(command) {
    iframe?.contentWindow.postMessage(JSON.stringify({ event: "command", func: command }), "*");
  }

  muteToggle?.addEventListener("click", () => {
    if (!iframe) return;
    if (isMuted) { postMessageToPlayer("unMute"); muteToggle.textContent = "🔇"; }
    else { postMessageToPlayer("mute"); muteToggle.textContent = "🔊"; }
    isMuted = !isMuted;
  });
});
