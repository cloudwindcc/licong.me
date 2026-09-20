# SEO and AI search maintenance

Reviewed: 2026-09-20. Production: https://www.licong.me/.

## Evidence and priorities

Google's current [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) prioritizes useful original content, accessible pages, technical quality and reliable sources. It explicitly rejects special AI markup, artificial mentions and mass-produced query-variant pages as shortcuts. Its guidance says llms.txt does not affect Google visibility. Keep the existing file as an optional export, not a ranking mechanism.

[Bing's webmaster guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) cover search and grounded AI answers. [IndexNow](https://www.indexnow.org/documentation) can notify participating engines when public URLs change; acceptance is not indexing or ranking. Do not describe it as a Google or Doubao submission API.

[Baidu Search Resource Platform](https://ziyuan.baidu.com/site/index) provides ownership verification, ordinary submission, crawl diagnostics and indexing reports. Submission requires the actual site's verified account and quota. No site-specific Baidu token has been configured here. No official public Doubao mechanism guaranteeing inclusion was established in this audit.

## Implemented

- Prerender the same React homepage served to people and crawlers, then hydrate its interactive controls. Background animation loads separately after initial rendering.
- Match Cloudflare's clean URL redirects in canonicals, internal links and sitemap. Return a real 404 for unknown paths. Deployment preview hosts use noindex.
- Maintain a stable Person identifier, with exact faculty/lab/Scholar profiles in sameAs; the school is an affiliation, not the same person.
- Use [the current faculty profile](https://fit.fudan.edu.cn/Data/View/1178) for role, contact and degree facts. Its role differs from the older CAN Lab profile, so the current faculty record takes precedence.
- Replace the unverified homepage publication list with six DOI-backed publications from the faculty bibliography. The source data lives in src/data/verified-publications.json.
- Remove title-inferred methods/contributions and undated citation counts from paper pages. Keep bibliographic records, source links and related papers. Only six DOI records were newly checked; do not call all 65 records independently verified.
- Separate a paper's identity (DOI) from its author's profile. Correct the 2020 Chinese book ISBN to 978-7-04-054605-7; 978-94-6186-364-5 belongs to the 2014 Delft work.
- Generate the sitemap from indexable HTML only. Omit lastmod rather than changing every date on every build. Google ignores priority/changefreq; omit them.
- Preserve existing Sogou verification. Its previously blocked account-side verification is a separate unfinished task.

## Build and publish

Use Node.js 22. Run npm ci, npm run build, npm test, and npx tsc -p tsconfig.app.json --noEmit. The build regenerates paper pages, prerenders the homepage, normalizes metadata and audits every generated page. npm run check:seo reruns the audit.

Deploy dist with Cloudflare Pages project licong-me and branch main. After deployment, verify the root, representative pages, /sitemap.xml, old .html redirects and a random missing path against production.

npm run submit:indexnow is a dry run. npm run submit:indexnow -- --submit checks the public verification key before sending the sitemap URLs. The key is intentionally public, not a credential. Use this after meaningful content changes, not as repeated ping traffic.

scripts/check-browser.mjs runs desktop/mobile and no-JavaScript checks. Supply PLAYWRIGHT_MODULE (module path/URL) and CHROME_EXECUTABLE when using a shared local browser runtime. Screenshots are local ignored artifacts.

## Ongoing editorial work

Verify remaining bibliography entries against publisher pages, DOI metadata or the faculty list before expanding them. Add paper-specific explanations only after reading the abstract/full text and checking methods, conditions and limitations. Do not reconstruct findings from titles. Preserve a source and review date per verified entry; do not invent authorship, citation counts or original research claims.

For the query 李聪 复旦, emphasize the positive identity: current school, department, research topics, cong_li@fudan.edu.cn and exact faculty URL. Ask the actual faculty/lab page maintainers to link to the canonical homepage; this external edit has not been performed. Do not manufacture backlinks or try to suppress the other scholar.

## Measurement

Record a dated baseline in verified Google Search Console, Bing Webmaster Tools and Baidu accounts: indexed canonical pages, impressions/clicks for 李聪 复旦 and 李聪 复旦 信息学院, crawl errors and referral traffic. Where available, inspect Google's Generative AI report and Bing's AI Performance report. An index check or crawler allowance alone does not establish AI citation.

For Doubao and other assistants, run a small fixed set of identity/research queries, recording date, product/model, answer identity, cited URL and whether the citation supports the claim. Separate observed citations from assumptions. Compare after 2-4 weeks; do not promise a rank or citation count. No fabricated baseline is stored in this repository.
