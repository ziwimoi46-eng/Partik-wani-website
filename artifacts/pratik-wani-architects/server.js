import http from 'http';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '21585', 10);
const ROOT = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.xml':  'text/xml',
  '.txt':  'text/plain',
};

http.createServer((req, res) => {
  let p = (req.url || '/').split('?')[0];
  if (p === '/' || p === '') p = '/index.html';

  const filePath = path.join(ROOT, p);
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, 'index.html'), (e2, d2) => {
        if (e2) { res.writeHead(404); res.end('Not Found'); }
        else { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(d2); }
      });
      return;
    }
    const ct = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': ct });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log('Static server → http://0.0.0.0:' + PORT);
});
