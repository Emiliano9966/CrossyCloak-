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
          <title>YouTube Video</title>
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
  const newWindow = window.open("about:blank", "_blank");

  if (newWindow) {
    newWindow.document.write(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Google Classroom</title>
          <!-- Set the favicon to the Google Classroom icon from a hosted URL -->
          <link rel="icon" type="image/png" href="data:image/png;base64,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">

        </head>
        <body style="margin:0;overflow:hidden;">
          <iframe src="${url}" style="border:none;width:100vw;height:100vh;"></iframe>
        </body>
      </html>`
    );
  } else {
    alert("Popup blocked. Please allow popups for this site.");
  }
}
