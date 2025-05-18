export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).send("Invalid URL.");
  }

  try {
    const response = await fetch(url);

    // Clone headers but exclude X-Frame and CSP
    const headers = {};
    response.headers.forEach((value, name) => {
      if (
        !["x-frame-options", "content-security-policy", "content-security-policy-report-only"].includes(name.toLowerCase())
      ) {
        headers[name] = value;
      }
    });

    const body = await response.text();
    res.setHeader("Content-Type", headers["content-type"] || "text/html");
    res.setHeader("Access-Control-Allow-Origin", "*"); // Optional: Allow frontend requests

    // Send response without X-Frame or CSP headers
    res.status(response.status).send(body);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
