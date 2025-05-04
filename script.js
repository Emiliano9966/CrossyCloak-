// Initialize particles.js
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
      grab: { distance: 200, line_linked: { opacity: 0.5 }},
      push: { particles_nb: 4 }
    }
  }
});

function openInBlank() {
  const input = document.getElementById("urlInput");
  const error = document.getElementById("error");
  const url = input.value.trim();

  // Validate URL
  let safeUrl;
  try {
    safeUrl = new URL(url);
    if (!["http:", "https:"].includes(safeUrl.protocol)) {
      throw new Error();
    }
    error.classList.add("hidden");
  } catch {
    error.textContent = "❌ Please enter a valid URL (starting with http:// or https://)";
    error.classList.remove("hidden");
    return;
  }

  // Open a new window and write the iframe
  const newWindow = window.open("about:blank", "_blank", "noopener");

  if (!newWindow) {
    alert("❌ Popup blocked. Please allow popups for this site.");
    return;
  }

  newWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Crossy Cloak</title>
      <style>
        html, body { margin:0; padding:0; height:100%; overflow:hidden; background:#000; }
        iframe { width:100%; height:100%; border:none; }
      </style>
    </head>
    <body>
      <iframe src="${safeUrl}" sandbox="allow-same-origin allow-scripts allow-forms allow-popups"></iframe>
    </body>
    </html>
  `);
  newWindow.document.close();
}
