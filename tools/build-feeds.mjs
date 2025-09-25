// tools/build-feeds.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SITE_URL =
  process.env.SITE_URL ||
  `https://${process.env.REPO_OWNER || 'your-username'}.github.io`; // ajuste se for "project page"

function rssDate(d) {
  return new Date(d).toUTCString();
}
function escapeXml(s='') {
  return s
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&apos;');
}
function stripMd(md='') {
  return md
    .replace(/```[\s\S]*?```/g, '')           // code blocks
    .replace(/`[^`]*`/g, '')                  // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g,'')      // images
    .replace(/\[[^\]]*\]\([^)]*\)/g,'')       // links
    .replace(/[#>*_~\-]+/g,'')                // markdown tokens
    .replace(/\s+/g,' ')
    .trim();
}

async function build() {
  const postsRaw = await readFile(resolve(ROOT, 'posts/posts.json'), 'utf8');
  const posts = JSON.parse(postsRaw);

  // Carrega brevemente os .md para extrair 1o parágrafo como descrição (opcional)
  async function enrich(p) {
    try {
      const md = await readFile(resolve(ROOT, p.file), 'utf8');
      const firstPara = stripMd(md.split(/\n\s*\n/)[0] || '');
      return { ...p, desc: firstPara || p.title };
    } catch {
      return { ...p, desc: p.title };
    }
  }
  const enriched = await Promise.all(posts.map(enrich));

  for (const lang of ['pt','en']) {
    const items = enriched
      .filter(p => p.lang === lang)
      .sort((a,b) => (a.date < b.date ? 1 : -1));
    const latest = items[0]?.date || new Date().toISOString().slice(0,10);

    const channelTitle = lang === 'pt'
      ? 'Lucas Thevenard — Blog (pt)'
      : 'Lucas Thevenard — Blog (en)';

    const channelLink = `${SITE_URL}/#/${lang}/blog`;
    const channelDesc = lang === 'pt'
      ? 'Posts sobre regulação, AIR/ARR, participação e NLP'
      : 'Posts on regulation, RIA/ex post, participation and NLP';

    const xml =
`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${channelLink}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${lang === 'pt' ? 'pt-BR' : 'en-US'}</language>
    <lastBuildDate>${rssDate(latest)}</lastBuildDate>
    ${items.map(p => {
      const link = `${SITE_URL}/#/${lang}/post?slug=${encodeURIComponent(p.slug)}`;
      const guid = link;
      return `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${guid}</guid>
      <pubDate>${rssDate(p.date)}</pubDate>
      ${p.tags?.map(tag => `<category>${escapeXml(tag)}</category>`).join('') || ''}
      <description><![CDATA[${escapeXml(p.desc)}]]></description>
    </item>`;
    }).join('\n')}
  </channel>
</rss>\n`;

    const outPath = resolve(ROOT, `rss-${lang}.xml`);
    await writeFile(outPath, xml, 'utf8');
    console.log(`Wrote ${outPath}`);
  }
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
