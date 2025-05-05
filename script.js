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
  const url = document.getElementById("urlInput").value.trim();
  const error = document.getElementById("error");

  if (!url || !isValidUrl(url)) {
    error.textContent = "Invalid URL!";
    error.style.display = "block";
    return;
  }

  error.style.display = "none";

  const win = window.open("https://google.com/");
  if (win) {
    win.document.write(`
      <html>
        <head>
          <title>about:blank</title>
          <style>
            html, body {
              margin: 0;
              height: 100%;
              overflow: hidden;
              background: black;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe src="${url}" allow="fullscreen"></iframe>
        </body>
      </html>
    `);
    win.document.close();
  } else {
    error.textContent = "Popup blocked! Please allow popups for this site.";
    error.style.display = "block";
  }
}

function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

