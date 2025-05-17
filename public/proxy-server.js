const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (optional but useful for dev)
app.use(cors());

// Dynamic proxy route: /proxy/https://example.com
app.use('/proxy', createProxyMiddleware({
  changeOrigin: true,
  target: '', // Dynamic per request
  selfHandleResponse: false,
  secure: false,

  router: (req) => {
    const url = new URL(req.url.slice(1), 'http://localhost');
    return url.origin;
  },

  pathRewrite: (path, req) => {
    const url = new URL(req.url.slice(1), 'http://localhost');
    return url.pathname + url.search;
  },

  onProxyRes: (proxyRes) => {
    // Remove headers that prevent embedding
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['content-security-policy-report-only'];
    delete proxyRes.headers['strict-transport-security'];
  }
}));

app.listen(PORT, () => {
  console.log(`🚀 Proxy server running at http://localhost:${PORT}`);
});
