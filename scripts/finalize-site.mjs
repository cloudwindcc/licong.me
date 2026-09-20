import { readFileSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { load } from 'cheerio';
import { XMLBuilder } from 'fast-xml-parser';
import { render } from '../dist-ssr/entry-server.js';
import { canonicalUrl, facultyProfile, htmlFiles, mapStrings, site, walkObjects } from './site-utils.mjs';

const dist = resolve('dist');
const homepage = resolve(dist, 'index.html');
const html = readFileSync(homepage, 'utf8');
if (!html.includes('<div id="root"></div>')) throw new Error('Missing homepage render target');
writeFileSync(homepage, html.replace('<div id="root"></div>', () => `<div id="root">${render()}</div>`));
const urls = [];

for (const file of htmlFiles(dist)) {
  const $ = load(readFileSync(file, 'utf8'));
  if (file === homepage) $('noscript').remove();
  const path = relative(dist, file).replaceAll('\\', '/');
  const canonical = canonicalUrl(`/${path}`);
  const noindex = ($('meta[name="robots"]').attr('content') || '').includes('noindex');
  if (!noindex) {
    $('link[rel="canonical"]').remove();
    $('head').append($('<link>').attr({ rel: 'canonical', href: canonical }));
    urls.push(canonical);
  }

  $('a[href], link[href]').each((_, element) => {
    const href = $(element).attr('href');
    if (!href || href.startsWith('#') || !/^(\/|https?:\/\/)/.test(href)) return;
    const normalized = canonicalUrl(href);
    $(element).attr('href', href.startsWith('/') && normalized.startsWith(site) ? normalized.slice(site.length) : normalized);
  });

  $('script[type="application/ld+json"]').each((_, element) => {
    const data = mapStrings(JSON.parse($(element).text()), (value) => value.startsWith(site) ? canonicalUrl(value) : value);
    walkObjects(data, (node) => {
      if (node['@type'] === 'Person' && node['@id'] === `${site}/#person` && node.name) {
        node.name = '李聪';
        node.alternateName = ['Cong Li', 'C. Li'];
        node.url = `${site}/`;
        node.sameAs = [facultyProfile, 'https://can.fudan.edu.cn/dr-cong-li/', 'https://scholar.google.com/citations?user=S7-6p4MAAAAJ', 'https://www.researchgate.net/profile/Cong-Li-27'];
        node.jobTitle = ['副研究员', '信息学院人才中心副主任'];
        node.affiliation = { '@type': 'Organization', '@id': 'https://fit.fudan.edu.cn/#organization', name: '复旦大学未来信息创新学院', url: 'https://fit.fudan.edu.cn/', parentOrganization: { '@type': 'CollegeOrUniversity', name: '复旦大学', url: 'https://www.fudan.edu.cn/' } };
      }
    });
    $(element).text(JSON.stringify(data).replaceAll('<', '\\u003c'));
  });

  if (!noindex) {
    const metadata = { 'og:url': canonical, 'og:title': $('title').text(), 'og:description': $('meta[name="description"]').attr('content'), 'og:site_name': '李聪 Cong Li | 复旦大学', 'og:locale': 'zh_CN' };
    for (const [property, content] of Object.entries(metadata)) {
      $(`meta[property="${property}"]`).remove();
      if (content) $('head').append($('<meta>').attr({ property, content }));
    }
    if (!$('meta[property="og:type"]').length) $('head').append('<meta property="og:type" content="website">');
  }
  writeFileSync(file, $.html());
}

// Only canonical HTML pages belong in the sitemap. Omit lastmod until maintained per page.
const sitemap = new XMLBuilder({ ignoreAttributes: false, format: true }).build({
  '?xml': { '@_version': '1.0', '@_encoding': 'UTF-8' },
  urlset: { '@_xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9', url: [...new Set(urls)].sort().map((loc) => ({ loc })) },
});
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap);
writeFileSync(resolve('public/sitemap.xml'), sitemap);

for (const path of ['ai-reference.json', 'data/paper-analyses.json']) {
  const data = JSON.parse(readFileSync(resolve(dist, path), 'utf8'));
  writeFileSync(resolve(dist, path), JSON.stringify(mapStrings(data, (value) => value.startsWith(site) ? canonicalUrl(value) : value), null, 2) + '\n');
}
console.log(`Prerendered homepage and normalized ${urls.length} canonical HTML pages.`);
