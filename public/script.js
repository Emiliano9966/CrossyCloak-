function openInBlank() {
  const url = document.getElementById("urlInput").value.trim();
  const error = document.getElementById("error");

  if (!url || !isValidUrl(url)) {
    error.textContent = "Please enter a valid URL!";
    error.style.display = "block";
    return;
  }

  error.style.display = "none";

  const win = window.open("https://google.com/");
  if (win) {
    win.document.write(`
      <html>
        <head>
          <title>Google Classroom</title>
          <link rel="icon" href="/public/ico.png" type="image/png">
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
