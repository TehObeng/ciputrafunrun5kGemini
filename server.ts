import {createReadStream} from 'node:fs';
import {access} from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const CONTENT_TYPES = new Map<string, string>([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpeg', 'image/jpeg'],
  ['.jpg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
]);

function getFilePath(rootDir: string, requestPath: string) {
  const cleanPath = decodeURIComponent(requestPath.split('?')[0] ?? '/');
  const relativePath = cleanPath === '/' ? '/index.html' : cleanPath;
  const normalizedPath = path.posix.normalize(relativePath);

  return path.join(rootDir, normalizedPath.replace(/^\/+/, ''));
}

async function fileExists(filePath: string) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function sendFile(response: http.ServerResponse, filePath: string) {
  const contentType = CONTENT_TYPES.get(path.extname(filePath)) ?? 'application/octet-stream';
  response.writeHead(200, {'Content-Type': contentType});
  createReadStream(filePath).pipe(response);
}

function sendNotFound(response: http.ServerResponse) {
  response.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
  response.end('Not Found');
}

export function createStaticServer(rootDir: string) {
  return http.createServer(async (request, response) => {
    const url = request.url ?? '/';
    const requestedFile = getFilePath(rootDir, url);
    const hasExtension = path.posix.extname(url.split('?')[0] ?? '') !== '';

    if (hasExtension) {
      if (await fileExists(requestedFile)) {
        sendFile(response, requestedFile);
        return;
      }

      sendNotFound(response);
      return;
    }

    const indexFile = path.join(rootDir, 'index.html');
    if (await fileExists(indexFile)) {
      sendFile(response, indexFile);
      return;
    }

    sendNotFound(response);
  });
}

async function start() {
  const host = process.env.HOST ?? '127.0.0.1';
  const port = Number(process.env.PORT ?? '3200');
  const rootDir = path.join(process.cwd(), 'dist');
  const server = createStaticServer(rootDir);

  server.listen(port, host, () => {
    console.log(`Static site listening on http://${host}:${port}`);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  start().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
