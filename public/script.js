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

// Function to open URL or show error
function openInBlank() {
  const url = document.getElementById("urlInput").value;
  const error = document.getElementById("error");

  // Validate URL
  if (!url.startsWith("http") && !url.startsWith("www")) {
    error.textContent = "Invalid URL! Please enter a valid URL starting with http:// or https://";
    error.style.display = "block";
    return;
  }

  // Reset the error message if the URL is valid
  error.style.display = "none";

  // Check if the URL is a YouTube link
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      openYouTubeEmbed(videoId);
    } else {
      error.textContent = "Invalid YouTube URL!";
      error.style.display = "block";
    }
  } else {
    // Open other URLs in about:blank
    openInNewTab(url);
  }
}

// Extract video ID from YouTube URL
function extractYouTubeId(url) {
  let videoId = null;
  const youtubeUrlPattern = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeUrlPattern);

  if (match) {
    videoId = match[1];
  }

  return videoId;
}

// Open YouTube video in an embedded iframe inside about:blank
function openYouTubeEmbed(videoId) {
  const newWindow = window.open("about:blank", "_blank");

  if (newWindow) {
    newWindow.document.write(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Google Classroom</title>
          <link rel="icon" href="https://your-github-username.vercel.app/ico.png" type="image/png">
        </head>
        <body style="margin:0;overflow:hidden;">
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </body>
      </html>`
    );
  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }
}

// Open any other URL in a new tab with an iframe
function openInNewTab(url) {
  const proxyUrl = "http://localhost:3000/proxy/" + url;

  const newWindow = window.open("about:blank", "_blank");

  if (newWindow) {
    newWindow.document.write(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Proxied Page</title>
        </head>
        <body style="margin:0;overflow:hidden;">
          <iframe src="${proxyUrl}" style="border:none;width:100vw;height:100vh;"></iframe>
        </body>
      </html>`
    );
    
  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }
}


  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }
}
