/** @vitest-environment node */

import {readFileSync} from 'node:fs';
import path from 'node:path';
import {describe, expect, it} from 'vitest';

describe('site shell copy', () => {
  it('uses Ciputra Batam Fun Run 5K branding in the document shell', () => {
    const indexHtml = readFileSync(path.join(process.cwd(), 'index.html'), 'utf8');

    expect(indexHtml).toContain('<title>Ciputra Batam Fun Run 5K</title>');
  });
});
