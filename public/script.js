// Load particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 60 },
    color: { value: '#9c5eff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3 },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#9c5eff',
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' }
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 }
    }
  }
});

// Open entered URL in a new tab with iframe
function openInBlank() {
  const url = document.getElementById("urlInput").value.trim();
  const error = document.getElementById("error");

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    error.textContent = "Invalid URL! Please use http or https.";
    error.classList.remove("hidden");
    return;
  }

  error.classList.add("hidden");

  const newWindow = window.open("about:blank", "_blank");
  if (newWindow) {
    newWindow.document.write(`
      <iframe src="${url}" style="border:none;width:100vw;height:100vh;"></iframe>
    `);
  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }
}
