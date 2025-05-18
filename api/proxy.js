export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith("http")) {
    return res.status(400).send("Invalid URL.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const contentType = response.headers.get("content-type");
    const body = await response.text();

    res.setHeader("Content-Type", contentType || "text/html");
    res.status(response.status).send(body);
  } catch (error) {
    res.status(500).send("Proxy error: " + error.message);
  }
}
