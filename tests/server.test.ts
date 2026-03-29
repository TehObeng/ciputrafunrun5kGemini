/** @vitest-environment node */

import {mkdtemp, mkdir, rm, writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach, describe, expect, it} from 'vitest';

import {createStaticServer} from '../server';

type ServerWithClose = {
  close: (callback: (error?: Error) => void) => void;
  listen: (port: number, host: string, callback: () => void) => void;
  address: () => {port: number} | null;
};

const createdDirs: string[] = [];

async function setupFixture() {
  const rootDir = await mkdtemp(path.join(tmpdir(), 'ciputra-static-server-'));
  const assetsDir = path.join(rootDir, 'assets');

  createdDirs.push(rootDir);

  await mkdir(assetsDir, {recursive: true});
  await writeFile(path.join(rootDir, 'index.html'), '<html><body>home page</body></html>');
  await writeFile(path.join(assetsDir, 'app.js'), 'console.log("ok");');

  return rootDir;
}

function startServer(rootDir: string): Promise<{server: ServerWithClose; baseUrl: string}> {
  const server = createStaticServer(rootDir) as ServerWithClose;

  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();

      if (!address) {
        throw new Error('Server did not expose an address');
      }

      resolve({
        server,
        baseUrl: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

function stopServer(server: ServerWithClose): Promise<void> {
  return new Promise((resolve, reject) => {
    server.close((error?: Error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

afterEach(async () => {
  await Promise.all(createdDirs.splice(0).map((dir) => rm(dir, {recursive: true, force: true})));
});

describe('createStaticServer', () => {
  it('serves the home document for root requests', async () => {
    const rootDir = await setupFixture();
    const {server, baseUrl} = await startServer(rootDir);

    try {
      const response = await fetch(`${baseUrl}/`);
      expect(response.status).toBe(200);
      expect(response.headers.get('content-type')).toMatch(/text\/html/);
      expect(await response.text()).toMatch(/home page/);
    } finally {
      await stopServer(server);
    }
  });

  it('falls back to index.html for extensionless routes', async () => {
    const rootDir = await setupFixture();
    const {server, baseUrl} = await startServer(rootDir);

    try {
      const response = await fetch(`${baseUrl}/event-info`);
      expect(response.status).toBe(200);
      expect(await response.text()).toMatch(/home page/);
    } finally {
      await stopServer(server);
    }
  });

  it('returns 404 for missing asset files', async () => {
    const rootDir = await setupFixture();
    const {server, baseUrl} = await startServer(rootDir);

    try {
      const response = await fetch(`${baseUrl}/assets/missing.js`);
      expect(response.status).toBe(404);
    } finally {
      await stopServer(server);
    }
  });
});
