import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { canonicalUrl, htmlFiles, site, walkObjects } from './site-utils.mjs';

const dist = resolve('dist');
const pages = new Map();
const titles = new Set();
for (const file of htmlFiles(dist)) {
  const $ = load(readFileSync(file, 'utf8'));
  assert.equal($('h1').length, 1, `${file}: exactly one h1`);
  assert.ok($('meta[name="viewport"]').length, `${file}: viewport`);
  if (($('meta[name="robots"]').attr('content') || '').includes('noindex')) continue;
  const url = $('link[rel="canonical"]').attr('href');
  assert.ok(url?.startsWith(site), `${file}: canonical host`);
  assert.equal(url, canonicalUrl(url), `${file}: redirecting canonical`);
  assert.ok(!pages.has(url), `${file}: duplicate canonical`);
  assert.ok(!titles.has($('title').text()), `${file}: duplicate title`);
  titles.add($('title').text());
  assert.ok($('meta[name="description"]').attr('content'), `${file}: description`);
  $('script[type="application/ld+json"]').each((_, element) => {
    const data = JSON.parse($(element).text());
    walkObjects(data, (node) => {
      if (node['@type'] === 'ScholarlyArticle' && node.sameAs) {
        assert.ok(!JSON.stringify(node.sameAs).includes('scholar.google.com/citations'), `${file}: article incorrectly identifies author profile as paper`);
      }
    });
  });
  assert.ok(!$('main').text().includes('从题名和公开索引信息看'), `${file}: unverified generated analysis`);
  pages.set(url, $);
}

const xml = new XMLParser().parse(readFileSync(resolve(dist, 'sitemap.xml'), 'utf8'));
const sitemap = xml.urlset.url.map((entry) => entry.loc);
assert.equal(sitemap.length, new Set(sitemap).size, 'Duplicate sitemap URLs');
assert.deepEqual(new Set(sitemap), new Set(pages.keys()), 'Sitemap must match indexable canonical HTML');

for (const [url, $] of pages) {
  $('a[href], link[rel="stylesheet"], script[src], img[src]').each((_, element) => {
    const href = $(element).attr('href') || $(element).attr('src');
    if (!href || /^(mailto:|tel:|data:)/.test(href)) return;
    const target = new URL(href, url);
    if (target.origin !== site) return;
    const path = decodeURIComponent(target.pathname);
    if (path === '/' || pages.has(target.origin + path)) return;
    assert.ok([path, `${path}.html`, `${path}/index.html`].some((item) => existsSync(resolve(dist, `.${item}`))), `${url}: broken local link ${href}`);
  });
}
const home = pages.get(`${site}/`);
assert.ok(home('#root h1').text().includes('李聪'), 'Homepage must be readable without JavaScript');
assert.ok(home('#root').text().includes('cong_li@fudan.edu.cn'), 'Static contact missing');
assert.equal(home('noscript').length, 0, 'Do not publish a different crawler-only homepage');
assert.ok(home('#root a[href^="https://doi.org/"]').length >= 6, 'Verified publication sources missing');
assert.ok(!readFileSync(resolve(dist, '_redirects'), 'utf8').includes('/* /index.html 200'), 'Soft 404 fallback');
assert.ok(readFileSync(resolve(dist, '404.html'), 'utf8').includes('noindex'), '404 must not be indexed');
console.log(`SEO audit passed: ${pages.size} pages, canonical URLs, sitemap, JSON-LD, local links, static homepage and real 404 configuration.`);
