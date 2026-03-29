import {readFileSync} from 'node:fs';
import path from 'node:path';

import {describe, expect, it} from 'vitest';

const jpegSignature = [0xff, 0xd8, 0xff];
const pngSignature = [0x89, 0x50, 0x4e, 0x47];

function readAsset(fileName: string) {
  return readFileSync(path.join(process.cwd(), 'src/assets', fileName));
}

function expectSignature(fileName: string, signature: number[]) {
  const asset = readAsset(fileName);

  expect(Array.from(asset.subarray(0, signature.length))).toEqual(signature);
}

describe('asset files', () => {
  it('keeps the published logos and images as valid image binaries', () => {
    expectSignature('logo-fun-run-5k.png', pngSignature);
    expectSignature('citraland-megah-warna.png', pngSignature);
    expectSignature('peta-rute.png', pngSignature);
    expectSignature('bib.jpg', jpegSignature);
    expectSignature('jersey.jpg', jpegSignature);
    expectSignature('medals-and-lanyard.jpg', jpegSignature);
    expectSignature('tas-running.jpg', jpegSignature);
  });
});
