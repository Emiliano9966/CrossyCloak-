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

  try {
    const safeUrl = new URL(url);
    if (!["http:", "https:"].includes(safeUrl.protocol)) throw new Error();
    error.classList.add("hidden");

    const newWindow = window.open("about:blank", "_blank", "noopener");
    if (!newWindow) return alert("Popup blocked!");

    newWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>Loading...</title></head>
      <body style="margin:0;overflow:hidden;background:#000;">
        <iframe src="/proxy?url=${encodeURIComponent(safeUrl.href)}" style="width:100vw;height:100vh;border:none;"></iframe>
      </body></html>
    `);
    newWindow.document.close();
  } catch {
    error.textContent = "❌ Invalid URL!";
    error.classList.remove("hidden");
  }
}