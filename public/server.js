const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl || !targetUrl.startsWith('http')) {
    return res.status(400).send('Invalid URL');
  }

  request({ url: targetUrl, headers: { 'User-Agent': req.headers['user-agent'] || '' } })
    .on('response', (response) => {
      delete response.headers['content-security-policy'];
      delete response.headers['x-frame-options'];
      delete response.headers['frame-options'];
    })
    .pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});