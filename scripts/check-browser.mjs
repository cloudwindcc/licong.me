import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const dist = resolve('dist');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const paths = pathname === '/' ? ['/index.html'] : pathname.endsWith('/') ? [`${pathname}index.html`] : [pathname, `${pathname}.html`];
  const file = paths.map((path) => resolve(dist, `.${path}`)).find((path) => path.startsWith(dist) && existsSync(path));
  const target = file || resolve(dist, '404.html');
  response.writeHead(file ? 200 : 404, { 'Content-Type': types[extname(target)] || 'text/plain' });
  response.end(readFileSync(target));
});
await new Promise((ready) => server.listen(0, '127.0.0.1', ready));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_EXECUTABLE ? { executablePath: process.env.CHROME_EXECUTABLE } : {}) });
mkdirSync('artifacts', { recursive: true });
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }, { width: 320, height: 740 }]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (/hydrat|did not match|server HTML/i.test(message.text())) errors.push(message.text()); });
    for (const path of ['/', '/about', '/papers/', '/papers/balancer-temporal-knowledge-graph-embedding', '/papers/spectral-radius-when-nodes-removed', '/papers/botscan-unsupervised-bot-detection']) {
      const response = await page.goto(base + path, { waitUntil: 'domcontentloaded' });
      assert.equal(response.status(), 200);
      await page.locator('h1').waitFor({ state: 'visible' });
      assert.ok((await page.locator('h1').innerText()).length > 0);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${path}: horizontal overflow at ${viewport.width}`);
      if (path === '/papers/') {
        assert.equal(await page.locator('.paper-grid .paper-card').count(), 65);
        await page.locator('.paper-topic-nav a[href="#applications"]').click();
        assert.equal(new URL(page.url()).hash, '#applications');
        assert.ok(await page.locator('#applications h2').isVisible());
        await page.locator('#reading-notes a[href="/papers/spectral-radius-when-nodes-removed"]').click();
        assert.equal(new URL(page.url()).origin, base, 'Paper navigation must stay on the preview host');
        await page.locator('.reading-note').waitFor({ state: 'visible' });
        await page.goBack({ waitUntil: 'domcontentloaded' });
      }
      if (path.includes('spectral-radius-when-nodes-removed') || path.includes('botscan-unsupervised-bot-detection')) {
        assert.ok(await page.locator('.reading-note').isVisible());
        assert.equal(await page.locator('.reading-note time').innerText(), '2026-10-27');
        await page.locator('.reading-note').scrollIntoViewIfNeeded();
      }
      await page.screenshot({ path: `artifacts/${viewport.width}-${path.replaceAll('/', '_') || 'home'}.png`, fullPage: false });
    }
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.locator('.site-hero-actions > button.site-toolbar-button').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'en');
    assert.ok((await page.locator('h1').innerText()).includes('Cong Li'));
    for (let index = 0; index < 6; index++) await page.locator('.site-hero-actions > button').click();
    assert.equal(await page.locator('html').getAttribute('lang'), 'zh-CN');
    const paper = page.getByRole('button').filter({ hasText: 'Balancer' });
    await paper.click();
    assert.ok(await page.locator('a[href="https://doi.org/10.1016/j.knosys.2025.114984"]').isVisible());
    assert.deepEqual(errors, [], 'Browser/hydration errors');
    await context.close();
  }
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await noJs.newPage();
  await page.goto(base);
  assert.ok((await page.locator('#root').innerText()).includes('cong_li@fudan.edu.cn'));
  await page.screenshot({ path: 'artifacts/mobile-no-javascript.png', fullPage: true });
  await noJs.close();
  console.log('Browser checks passed: desktop/390px/320px, paper topic navigation, reading notes, language switching, paper disclosure, no-JS content and hydration.');
} finally {
  await browser.close();
  await new Promise((done) => server.close(done));
}
