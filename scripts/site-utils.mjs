import { readdirSync } from 'node:fs';
import { join } from 'node:path';

export const site = 'https://www.licong.me';
export const facultyProfile = 'https://fit.fudan.edu.cn/Data/View/1178';

export function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : [];
  });
}

export function canonicalUrl(input) {
  const url = new URL(input, site);
  if (!['licong.me', 'www.licong.me'].includes(url.hostname)) return input;
  url.protocol = 'https:';
  url.hostname = 'www.licong.me';
  url.pathname = url.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
  if (url.pathname === '/papers') url.pathname = '/papers/';
  return url.href;
}

export function mapStrings(value, transform) {
  if (typeof value === 'string') return transform(value);
  if (Array.isArray(value)) return value.map((item) => mapStrings(item, transform));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, mapStrings(item, transform)]));
  }
  return value;
}

export function walkObjects(value, visit) {
  if (!value || typeof value !== 'object') return;
  visit(value);
  for (const item of Object.values(value)) walkObjects(item, visit);
}
