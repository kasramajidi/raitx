/**
 * Serve the "out" folder so all static pages work (no 404 on /about, /contact, etc).
 * Handles trailing slash: /about -> /about/ -> about/index.html
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "..", "out");
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".xml": "application/xml",
};

function getPath(urlPath) {
  const decoded = decodeURIComponent(urlPath).replace(/^\/+/, "");
  const normalized = path.normalize(decoded).replace(/^(\.\.(\/|\\))+/, "");
  return path.join(OUT, normalized);
}

const server = http.createServer((req, res) => {
  let urlPath = (req.url || "/").split("?")[0] || "/";
  if (urlPath !== "/" && !urlPath.endsWith("/")) {
    const filePath = getPath(urlPath);
    const ext = path.extname(filePath);
    if (!ext || !fs.existsSync(filePath)) {
      res.writeHead(302, { Location: urlPath + "/" });
      res.end();
      return;
    }
  }
  if (urlPath.endsWith("/")) {
    urlPath += "index.html";
  }
  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  const filePath = getPath(urlPath);

  if (!filePath.startsWith(OUT) || !fs.existsSync(filePath)) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const stat = fs.statSync(filePath);
  if (stat.isDirectory()) {
    res.writeHead(302, { Location: req.url.replace(/\/?$/, "") + "/" });
    res.end();
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log("");
  console.log("  Static site: http://localhost:" + PORT);
  console.log("  Press Ctrl+C to stop.");
  console.log("");
});
