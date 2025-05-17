const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000; // You can change this port

// Enable CORS
app.use(cors());

// Proxy middleware
app.use('/proxy', createProxyMiddleware({
  target: '', // Target is set dynamically
  changeOrigin: true,
  secure: false,
  selfHandleResponse: false,

  router: (req) => {
    const url = new URL(req.url.slice(1), 'http://localhost'); // skip "/proxy/"
    return url.origin;
  },

  pathRewrite: (path, req) => {
    const url = new URL(req.url.slice(1), 'http://localhost');
    return url.pathname + url.search;
  },

  onProxyRes: (proxyRes, req, res) => {
    // Remove frame-blocking headers
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['content-security-policy-report-only'];
    delete proxyRes.headers['strict-transport-security'];
  }
}));

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
