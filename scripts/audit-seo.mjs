import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { load } from 'cheerio';
import { XMLParser } from 'fast-xml-parser';
import { canonicalUrl, htmlFiles, mapStrings, site, walkObjects } from './site-utils.mjs';

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
  assert.equal(url, canonicalUrl(`/${relative(dist, file).replaceAll('\\', '/')}`), `${file}: canonical must identify this page`);
  assert.equal($('meta[property="og:url"]').attr('content'), url, `${file}: Open Graph URL must match canonical`);
  assert.ok(!pages.has(url), `${file}: duplicate canonical`);
  assert.ok(!titles.has($('title').text()), `${file}: duplicate title`);
  titles.add($('title').text());
  assert.ok($('meta[name="description"]').attr('content'), `${file}: description`);
  $('script[type="application/ld+json"]').each((_, element) => {
    const data = JSON.parse($(element).text());
    mapStrings(data, (value) => {
      if (/^https?:\/\/(www\.)?licong\.me(?:[/:?#]|$)/.test(value)) {
        assert.equal(value, canonicalUrl(value), `${file}: redirecting JSON-LD URL ${value}`);
      }
      return value;
    });
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
    assert.equal(target.href, canonicalUrl(target.href), `${url}: redirecting internal URL ${href}`);
    const path = decodeURIComponent(target.pathname);
    if (target.hash && pages.has(target.origin + path)) {
      const id = decodeURIComponent(target.hash.slice(1));
      assert.ok(pages.get(target.origin + path)('[id]').toArray().some((item) => item.attribs.id === id), `${url}: missing anchor ${href}`);
    }
    if (path === '/' || pages.has(target.origin + path)) return;
    assert.ok([path, `${path}.html`, `${path}/index.html`].some((item) => existsSync(resolve(dist, `.${item}`))), `${url}: broken local link ${href}`);
  });
}

// Check generated sources as well as dist, so publication never depends on
// a later build step repairing redirecting canonicals from the generator.
for (const file of htmlFiles(resolve('public'))) {
  const $ = load(readFileSync(file, 'utf8'));
  if (($('meta[name="robots"]').attr('content') || '').includes('noindex')) continue;
  const url = $('link[rel="canonical"]').attr('href');
  assert.equal(url, canonicalUrl(`/${relative(resolve('public'), file).replaceAll('\\', '/')}`), `${file}: source canonical disagrees with route`);
}

const manifest = JSON.parse(readFileSync(resolve(dist, 'data/paper-analyses.json'), 'utf8'));
const index = pages.get(`${site}/papers/`);
assert.equal(index('.paper-grid .paper-card').length, manifest.papers.length, 'Topic groups must include every paper exactly once');
assert.equal(new Set(index('.paper-grid .paper-card h3 a').map((_, element) => index(element).attr('href')).get()).size, manifest.papers.length, 'Topic groups must not duplicate papers');
for (const paper of manifest.papers.filter((paper) => paper.readingNote)) {
  const page = pages.get(paper.url);
  assert.ok(page('.reading-note').length, `${paper.slug}: reviewed content missing`);
  for (const source of paper.readingNote.sources) {
    assert.ok(page('.reading-note a').toArray().some((element) => element.attribs.href === source.url), `${paper.slug}: missing original source ${source.url}`);
  }
  assert.ok(page('.reading-note time').text().includes(paper.readingNote.reviewedAt), `${paper.slug}: source review date missing`);
}
const home = pages.get(`${site}/`);
assert.ok(home('#root h1').text().includes('李聪'), 'Homepage must be readable without JavaScript');
assert.ok(home('#root').text().includes('cong_li@fudan.edu.cn'), 'Static contact missing');
assert.equal(home('noscript').length, 0, 'Do not publish a different crawler-only homepage');
assert.ok(home('#root a[href^="https://doi.org/"]').length >= 6, 'Verified publication sources missing');
assert.ok(!readFileSync(resolve(dist, '_redirects'), 'utf8').includes('/* /index.html 200'), 'Soft 404 fallback');
assert.ok(readFileSync(resolve(dist, '404.html'), 'utf8').includes('noindex'), '404 must not be indexed');
console.log(`SEO audit passed: ${pages.size} pages, canonical URLs, sitemap, JSON-LD, local links, static homepage and real 404 configuration.`);
