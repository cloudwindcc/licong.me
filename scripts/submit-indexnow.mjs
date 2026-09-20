import { readFileSync } from 'node:fs';
import { XMLParser } from 'fast-xml-parser';
import { site } from './site-utils.mjs';

const key = '117c0918772047dad7f71976006ce6f3';
const keyLocation = `${site}/${key}.txt`;
const xml = new XMLParser().parse(readFileSync('dist/sitemap.xml', 'utf8'));
const urlList = xml.urlset.url.map(({ loc }) => loc);
if (urlList.some((url) => new URL(url).origin !== site)) throw new Error('Unexpected sitemap host');
const payload = { host: new URL(site).hostname, key, keyLocation, urlList };

if (!process.argv.includes('--submit')) {
  console.log(JSON.stringify({ endpoint: 'https://api.indexnow.org/indexnow', ...payload }, null, 2));
  console.log('Dry run. Deploy first, then pass --submit to notify participating engines.');
} else {
  const verification = await fetch(keyLocation, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (!verification.ok || (await verification.text()).trim() !== key) throw new Error('Deployed IndexNow key does not match');
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000),
  });
  console.log(`IndexNow HTTP ${response.status}: ${urlList.length} URLs. ${await response.text()}`);
  if (![200, 202].includes(response.status)) process.exitCode = 1;
  else console.log('Submission received; crawling, indexing and ranking are not guaranteed.');
}
