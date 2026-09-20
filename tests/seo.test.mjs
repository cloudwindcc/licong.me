import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalUrl } from '../scripts/site-utils.mjs';
import { onRequest } from '../functions/_middleware.js';

test('canonical URLs match Cloudflare Pages routes and preserve anchors', () => {
  assert.equal(canonicalUrl('/index.html'), 'https://www.licong.me/');
  assert.equal(canonicalUrl('/papers/index.html'), 'https://www.licong.me/papers/');
  assert.equal(canonicalUrl('/about.html#contact'), 'https://www.licong.me/about#contact');
  assert.equal(canonicalUrl('https://example.com/paper.html'), 'https://example.com/paper.html');
});

test('apex redirects to HTTPS www while retaining path and query', async () => {
  const response = await onRequest({ request: new Request('http://licong.me/about?source=test'), next: () => { throw new Error('Must redirect'); } });
  assert.equal(response.status, 301);
  assert.equal(response.headers.get('Location'), 'https://www.licong.me/about?source=test');
});

test('404 and deployment previews cannot inherit index headers', async () => {
  for (const [url, status] of [['https://www.licong.me/missing', 404], ['https://preview.licong-me.pages.dev/', 200]]) {
    const response = await onRequest({ request: new Request(url), next: async () => new Response('body', { status, headers: { 'X-Robots-Tag': 'index, follow' } }) });
    assert.equal(response.status, status);
    assert.equal(response.headers.get('X-Robots-Tag'), 'noindex, follow');
    assert.equal(await response.text(), 'body');
  }
});
