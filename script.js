// script.js
const app = document.getElementById('app');
document.getElementById('year').textContent = new Date().getFullYear();

const SUPPORTED_LANGS = ['pt','en'];
const routes = {
  '': renderHome,
  'blog': renderBlogIndex,
  'post': renderBlogPost,
  'cv': renderCV,
  'publications': renderPublications,
  'slides': renderSlides,
  'projects': renderProjectsIndex,
  'project': renderProjectPage,
  'apps': renderApps,
  'archived': renderArchivedSlides
};

const ENABLE_SLIDE_LANGUAGE_SWITCH = false;

const cache = {};
async function getJSON(path) {
  if (cache[path]) return cache[path];
  const r = await fetch(path);
  const j = await r.json();
  cache[path] = j;
  return j;
}
function counterpartByGroup(list, group, otherLang) {
  return list.find(x => x.group && x.group === group && x.lang === otherLang);
}
function findPostBySlugAndLang(list, slug, lang) {
  return list.find(p => p.slug === slug && p.lang === lang);
}

// Strings UI
const i18n = {
  pt: {
    title: 'Lucas Thevenard — Pesquisa, Blog, Slides',
    tagline: 'Regulação, pesquisa empírica e ciência de dados',
    nav: { home:'Início', blog:'Blog', cv:'CV', publications:'Publicações', slides:'Slides', projects:'Projetos', apps: 'Apps' },
    toggle: '🇺🇸 English Version',
    homeTitle: 'Bem-vindo!',
    homeIntro:
      'Sou o <strong>Lucas Thevenard</strong> e este é o meu site pessoal, onde trato de temas relacionados às minhas atividades como pesquisador e professor universitário. Aqui você encontra meu <a href="#/pt/blog">blog</a>, meu <a href="#/pt/cv">CV</a> e minhas <a href="#/pt/publications">publicações</a> acadêmicas, e também um repositório de <a href="#/pt/slides">slides</a> (Marp) agrupados por <a href="#/pt/projects">projetos</a>, que uso em minhas aulas, conferências e outras apresentações.',
    latestPosts: 'Últimos posts',
    backToBlog: '← Voltar ao blog',
    blogIntro: 'Textos diversos sobre projetos dos quais eu faço parte. Minha principal área de interesse é o uso de técnicas de ciência de dados, como machine learning e grandes modelos de linguagem, para estudar e aprimorar a regulação estatal.',
    slidesIntro:
      'Repositório de slides utilizados em apresentações avulsas, cursos de graduação e pós-graduação, entre outros. Cada apresentação está acompanhada de uma versão <strong>HTML</strong> para visualização online e um arquivo <strong>PDF</strong> para download.',
    seeOnline: 'Ver online',
    downloadPDF: 'Baixar PDF',
    notFound: 'Página não encontrada',
    errorTitle: 'Ops…',
    errorBody: 'Algo deu errado ao carregar o conteúdo.',
    projectsIntro: 'Coleções de slides por projeto/aula. Cada página reúne apenas os slides daquele projeto, em ordem cronológica.',
    viewProject: 'Ver projeto',
    backToProjects: '← Voltar aos projetos',
    seeArchived: 'Ver slides arquivados →',
    archivedTitle: 'Slides Arquivados',
    archivedIntro: 'Lista simples de PDFs de apresentações antigas (repositório leve).',
    backToSlides: '← Voltar para Slides',
    pubsTitle: 'Publicações',
    pubsIntro: 'Artigos acadêmicos, livros e capítulos, relatórios de pesquisa, artigos de opinião (op-eds) e repositórios/código.',
    pubsTypes: {
      "article": "Artigos acadêmicos",
      "book-chapter": "Livros e capítulos",
      "report": "Relatórios",
      "op-ed": "Op-eds",
      "repo": "Repositórios / código"
    },
    openLink: 'Acessar',
    doi: 'DOI',
    selectedPubsTitle: 'Publicações selecionadas'
  },
  en: {
    title: 'Lucas Thevenard — Research, Blog, Slides',
    tagline: 'Regulation, empirical research and data science',
    nav: { home:'Home', blog:'Blog', cv:'CV', slides:'Slides', projects:'Projects', publications:'Publications', apps: 'Apps' },
    toggle: '🇧🇷 Versão em Português',
    homeTitle: 'Welcome!',
    homeIntro:
      'I’m <strong>Lucas Thevenard</strong> and this is my personal website, where I address topics related to my activities as a researcher and university professor. Here you can find my <a href="#/pt/blog">blog</a>, my <a href="#/pt/cv">CV</a> and academic <a href="#/pt/publications”>publications”</a>, as well as a repository of <a href="#/pt/slides">slides</a> (Marp), grouped by <a href="#/pt/projects”>project</a>, that I use for teaching, to present at academic conferences and similar activities.',
    latestPosts: 'Latest posts',
    backToBlog: '← Back to blog',
    blogIntro: 'Miscellaneous writings on projects I’m involved in. My main area of interest is the use of data science techniques—such as machine learning and large language models—to study and to improve government regulation.',
    slidesIntro:
      'Repository of slides used in standalone presentations, undergraduate and graduate courses, among others. Each presentation has an <strong>HTML</strong> version for online viewing and a <strong>PDF</strong> for download.',
    seeOnline: 'View online',
    downloadPDF: 'Download PDF',
    notFound: 'Page not found',
    errorTitle: 'Oops…',
    errorBody: 'Something went wrong while loading content.',
    projectsIntro: 'Slide collections by project/course. Each page shows only the slides for that project, in chronological order.',
    viewProject: 'See project',
    backToProjects: '← Back to projects',
    seeArchived: 'See archived slides →',
    archivedTitle: 'Archived Slides',
    archivedIntro: 'Simple list of PDFs from older decks (lightweight repository).',
    backToSlides: '← Back to Slides',
    pubsTitle: 'Publications',
    pubsIntro: 'Academic articles, books and chapters, reports, op-eds, and repositories/code.',
    pubsTypes: {
      "article": "Academic articles",
      "book-chapter": "Books & chapters",
      "report": "Reports",
      "op-ed": "Op-eds",
      "repo": "Repositories / code"
    },
    openLink: 'Access',
    doi: 'DOI',
    selectedPubsTitle: 'Selected publications'
  }
};

// State of current navigation (to change language preserving the "same page")
let current = { lang: 'pt', path: '/', query: '' };

function parseHashOrRedirect() {
  const raw = location.hash.replace(/^#/, ''); // e.g. "/pt/blog?x=1"
  if (!raw || raw === '/') {
    location.replace('#/pt');
    return null;
  }
  // Ensures format /<lang>/<path...>
  const match = raw.match(/^\/(pt|en)(\/[^?]*)?(\?.*)?$/);
  if (!match) {
    // Possible hash without language (ex: "#/blog"); injects pt.
    const fix = raw.startsWith('/') ? raw : '/' + raw;
    location.replace('#/pt' + fix);
    return null;
  }
  const lang = match[1];
  const path = (match[2] || '/');
  const query = (match[3] || '');
  return { lang, path, query };
}

function navigate() {
  const parsed = parseHashOrRedirect();
  if (!parsed) return; // already redirected
  current = parsed;

  // Updates the UI for the current language (title, nav, button, lang atribute)
  updateUIForLang(current.lang);

  // Resolves the route
  const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0]; // '', 'blog', 'cv', ...
  const route = routes[seg] || renderNotFound;
  const params = new URLSearchParams(current.query.replace(/^\?/, ''));
  route(current.lang, params, current).catch(err => renderError(current.lang, err));
}

// ---- UI helpers
function updateUIForLang(lang) {
  const t = i18n[lang];

  document.documentElement.setAttribute('lang', lang);
  document.title = t.title;

  document.getElementById('brandLink').setAttribute('href', `#/${lang}`);
  document.getElementById('tagline').innerHTML = t.tagline;

  const map = {
    navHome: '', navBlog: 'blog', navCV: 'cv',
    navSlides: 'slides', navProjects: 'projects',
    navPublications: 'publications'
  };
  Object.entries(map).forEach(([id, p]) => {
    const a = document.getElementById(id);
    a.textContent = i18n[lang].nav[id.replace('nav','').toLowerCase()];
    a.setAttribute('href', `#/${lang}/${p}`.replace(/\/$/, ''));
  });

  const toggle = document.getElementById('langToggle');
  toggle.textContent = t.toggle;
  toggle.onclick = async () => {
    const other = lang === 'pt' ? 'en' : 'pt';
    const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0];
    let targetHash = `#/${other}${current.path}${current.query}`;

    if (seg === 'post') {
      const posts = await getJSON('posts/posts.json');
      const params = new URLSearchParams(current.query.replace(/^\?/, ''));
      const slug = params.get('slug');
      const here = findPostBySlugAndLang(posts, slug, lang);
      if (here && here.group) {
        const there = counterpartByGroup(posts, here.group, other);
        targetHash = there ? `#/${other}/post?slug=${encodeURIComponent(there.slug)}` : `#/${other}/blog`;
      }
    } else if (seg === 'project') {
      const [projects, slidesAll] = await Promise.all([
        getJSON('projects/projects.json'),
        getJSON('slides/slides.json')
      ]);
      const params = new URLSearchParams(current.query.replace(/^\?/, ''));
      const slug = params.get('slug');
      const here = findProjectBySlugAndLang(projects, slug, lang);
      if (here && here.group) {
        const there = counterpartByGroup(projects, here.group, other);
        if (there) {
          const thereHasSlides = slidesAll.some(s => s.lang === other && s.project === there.slug);
          targetHash = thereHasSlides ? `#/${other}/project?slug=${encodeURIComponent(there.slug)}` : `#/${other}/projects`;
        } else {
          targetHash = `#/${other}/projects`;
        }
      } else {
        targetHash = `#/${other}/projects`;
      }
    }


    location.hash = targetHash;
  };
}


function setContent(html) {
  app.innerHTML = html;
}

function renderError(lang, err) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.errorTitle}</h1>
      <p>${t.errorBody}</p>
      <pre><code>${(err && (err.message || err)) || 'Unknown error'}</code></pre>
    </section>
  `);
}

function renderNotFound(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.notFound}</h1>
      <p><a href="#/${lang}">${lang === 'pt' ? 'Voltar ao início' : 'Back to home'}</a></p>
    </section>
  `);
  return Promise.resolve();
}

function projectSlugsWithSlides(slides, lang) {
  const set = new Set();
  slides.forEach(s => {
    if (s.lang === lang && s.project && !s.archive) set.add(s.project);
  });
  return set;
}

function findProjectBySlugAndLang(list, slug, lang) {
  return list.find(p => p.slug === slug && p.lang === lang);
}

function fmtAuthors(authors) {
  if (!Array.isArray(authors) || !authors.length) return '';
  return authors.join(', ');
}

function safeSpan(value, cls='') {
  return value ? `<span class="${cls}">${value}</span>` : '';
}

// --- Flags
function langFlag(lang){ return lang === 'pt' ? '🇧🇷' : '🇺🇸'; }
function flagBadge(lang){
  const title = lang === 'pt' ? 'Português' : 'English';
  return `<span class="flag-badge" title="${title}">${langFlag(lang)}</span>`;
}

// --- Keys to group equivalent itens by language
function keyForSlide(s){
  // group is canonical; if it doesn't exist, we fall back to slug/pdf (singleton)
  return s.group || s.slug || `pdf:${s.pdf}`;
}
// --- If a PDF URL is provided, use it; otherwise, build local path
function resolvePdfHref(slide, { archived = false } = {}) {
  // 1) If an external PDF URL is provided, use it
  if (slide.pdf_url) return slide.pdf_url;

  // 2) Fallback: local PDF
  if (archived) return `slides/archived/${encodeURIComponent(slide.pdf)}`;
  return `slides/${encodeURIComponent(slide.slug)}/${encodeURIComponent(slide.pdf)}`;
}
function keyForPub(p){
  // priority: group > doi > url > title (fallback)
  return p.group || (p.doi ? `doi:${p.doi}` : (p.url ? `url:${p.url}` : `title:${p.title}`));
}

// --- Hybrid selection (pt/en)
function selectHybrid(items, lang, keyFn){
  const byKey = new Map();
  for (const it of items){
    const k = keyFn(it);
    if (!byKey.has(k)) byKey.set(k, []);
    byKey.get(k).push(it);
  }
  const out = [];
  for (const arr of byKey.values()){
    const hasPT = arr.some(x => x.lang === 'pt');
    const hasEN = arr.some(x => x.lang === 'en');
    if (hasPT && hasEN){
      // choose the current language version
      const chosen = arr.find(x => x.lang === lang);
      if (chosen) out.push(chosen);
    } else {
      // if only one language exists => show in both versions
      out.push(arr[0]);
    }
  }
  return out;
}

function sortPostsNewestFirst(posts) {
  // Tries to sort by date (ISO or parseable). If not parseable, falls back to string compare.
  return [...posts].sort((a, b) => {
    const da = Date.parse(a.date);
    const db = Date.parse(b.date);

    if (!Number.isNaN(da) && !Number.isNaN(db)) return db - da;

    // fallback (useful if the date comes as a comparable string, e.g., "2025-01-06")
    return String(b.date).localeCompare(String(a.date));
  });
}

// ---- Pages
async function renderHome(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.homeTitle}</h1>
      <p>${t.homeIntro}</p>
    </section>
    <section class="card">
      <div class="list" id="latest"></div>
    </section>
  `);

  // Loads the last posts in the index (filtering by language)
  const res = await fetch('posts/posts.json');
  const posts = sortPostsNewestFirst((await res.json()).filter(p => p.lang === lang));
  const latest = posts.slice(0, 3);
  const list = document.getElementById('latest');
  list.innerHTML = `
    <div class="list-item" style="background:transparent;border:none;padding:0">
      <div class="list-item-title">${t.latestPosts}</div>
    </div>
    ${latest.map(p => `
      <div class="list-item">
        <div>
          <div class="list-item-title">
            <a href="#/${lang}/post?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">${p.date}${p.tags?.length ? ' · ' + p.tags.join(', ') : ''}</div>
        </div>
        <span class="badge">Blog</span>
      </div>
    `).join('')}
    <div class="list-item">
      <a href="#/${lang}/blog">${lang === 'pt' ? 'Ver todos os posts →' : 'See all posts →'}</a>
    </div>
  `;
}


async function renderBlogIndex(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>Blog</h1>
      <p>${t.blogIntro}</p>
    </section>
    <section class="card">
      <div class="list" id="blog-list"></div>
    </section>
  `);
  const res = await fetch('posts/posts.json');
  const posts = sortPostsNewestFirst((await res.json()).filter(p => p.lang === lang));
  const list = document.getElementById('blog-list');
  list.innerHTML = posts.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">
          <a href="#/${lang}/post?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        </div>
        <div class="muted" style="color:#9ca3af;font-size:.9rem">${p.date}${p.tags?.length ? ' · ' + p.tags.join(', ') : ''}</div>
      </div>
      <span class="badge">Post</span>
    </div>
  `).join('');
}

async function renderBlogPost(lang, params) {
  const slug = params.get('slug');
  if (!slug) return renderNotFound(lang);

  const posts = await getJSON('posts/posts.json');
  const item = findPostBySlugAndLang(posts, slug, lang);
  if (!item) {
    const msg = lang === 'pt' ? 'Post não disponível em português.' : 'Post not available in English.';
    setContent(`
      <section class="card prose">
        <h1>Blog</h1>
        <p>${msg}</p>
        <p><a href="#/${lang}/blog">${lang === 'pt' ? 'Voltar ao blog' : 'Back to blog'}</a></p>
      </section>
    `);
    return;
  }

  const mdRes = await fetch(item.file);
  if (!mdRes.ok) throw new Error(`Não foi possível carregar ${item.file}`);
  const md = await mdRes.text();

  // Link for the version in another language (when available)
  const other = lang === 'pt' ? 'en' : 'pt';
  const there = item.group ? counterpartByGroup(posts, item.group, other) : null;
  const switchLink = there
    ? `<a href="#/${other}/post?slug=${encodeURIComponent(there.slug)}">${lang === 'pt' ? 'See this post in English' : 'Veja este post em português'}</a>`
    : '';

  const t = i18n[lang];
  setContent(`
    <article class="card prose" id="post"></article>
    <div class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px">
      <a href="#/${lang}/blog">${t.backToBlog}</a>
      ${switchLink}
    </div>
  `);
  document.getElementById('post').innerHTML = marked.parse(md, { breaks: true });
}


async function renderProjectsIndex(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${lang === 'pt' ? 'Projetos' : 'Projects'}</h1>
      <p>${t.projectsIntro}</p>
    </section>
    <section class="card">
      <div class="list" id="projects-list"></div>
    </section>
  `);

  const [projectsAll, slidesAll] = await Promise.all([
    getJSON('projects/projects.json'),
    getJSON('slides/slides.json')
  ]);

  const allowed = projectSlugsWithSlides(slidesAll, lang);

  const projects = projectsAll
    .filter(p => p.lang === lang && allowed.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title, lang));

  const list = document.getElementById('projects-list');

  if (!projects.length) {
    list.innerHTML = `<div class="list-item">${lang === 'pt' ? 'Nenhum projeto com slides ainda.' : 'No projects with slides yet.'}</div>`;
    return;
  }

  list.innerHTML = projects.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">
          <a href="#/${lang}/project?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        </div>
        <div class="muted" style="color:#9ca3af;font-size:.9rem">
          ${p.tags?.join(' • ') || ''}
        </div>
      </div>
      <a class="badge" style="text-decoration:none" href="#/${lang}/project?slug=${encodeURIComponent(p.slug)}">
        ${lang === 'pt' ? 'Abrir' : 'Open'}
      </a>
    </div>
  `).join('');
}

async function renderApps(lang, params, current) {
  const mount = document.getElementById("app");

  if (!window.AppsRouter?.renderAppsIndex || !window.AppsRouter?.renderAppRoute) {
    mount.innerHTML = `<section class="card"><h1>Apps</h1><p>Apps router não carregou.</p></section>`;
    return;
  }

  // Ex.: current.path = "/apps" or "/apps/lotteries"
  const path = (current?.path || "/apps").replace(/\/+$/, "");
  const route = `/${lang}${path}`; // "/pt/apps" or "/pt/apps/lotteries"

  const parts = path.split("/").filter(Boolean); // ["apps"] or ["apps","lotteries"]
  if (parts.length >= 2) {
    await window.AppsRouter.renderAppRoute(mount, { route });
  } else {
    await window.AppsRouter.renderAppsIndex(mount, { route });
  }
}


async function renderProjectPage(lang, params) {
  const slug = params.get('slug');
  if (!slug) return renderNotFound(lang);

  const [projects, slidesAll] = await Promise.all([
    getJSON('projects/projects.json'),
    getJSON('slides/slides.json')
  ]);

  const project = findProjectBySlugAndLang(projects, slug, lang);
  if (!project) return renderNotFound(lang);

  // only active slides for this project
  const slides = slidesAll
    .filter(s => s.lang === lang && s.project === slug && !s.archive)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!slides.length) return renderNotFound(lang);

  const t = i18n[lang];

  // link to the sister project in the other language (if it has slides)
  const other = lang === 'pt' ? 'en' : 'pt';
  const twinProj = project.group ? counterpartByGroup(projects, project.group, other) : null;
  let switchLink = '';
  if (twinProj) {
    const twinHasSlides = slidesAll.some(s => s.lang === other && s.project === twinProj.slug && !s.archive);
    if (twinHasSlides) {
      switchLink = `<a class="badge" style="text-decoration:none" href="#/${other}/project?slug=${encodeURIComponent(twinProj.slug)}">
        ${lang === 'pt' ? 'Ver esta página em inglês' : 'See this page in Portuguese'}
      </a>`;
    }
  }

  setContent(`
    <section class="card prose">
      <h1>${project.title}</h1>
      <p>${project.description || ''}</p>
      <p class="muted" style="color:#9ca3af">${project.tags?.map(tag => `#${tag}`).join(' ') || ''}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a href="#/${lang}/projects">${t.backToProjects}</a>
        ${switchLink}
      </div>
    </section>
    <section class="card">
      <div class="list" id="proj-slides"></div>
    </section>
  `);

  const list = document.getElementById('proj-slides');
  list.innerHTML = slides.map(s => {
    const htmlHref = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.html)}`;
    const pdfHref = resolvePdfHref(s);
    return `
      <div class="list-item stacked">
        <div class="primary">
          <div class="list-item-title">
            <a href="${htmlHref}" target="_blank" rel="noopener">${s.title}</a>
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">
            ${(s.event || '')} ${s.date ? '· ' + s.date : ''}
          </div>
        </div>
        <div class="actions">
          <a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.seeOnline}</a>
          <a class="badge" href="${pdfHref}" target="_blank" rel="noopener" style="text-decoration:none">
            ${t.downloadPDF}
          </a>
        </div>
      </div>
    `;
  }).join('');
}


async function renderPublications(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.pubsTitle}</h1>
      <p>${t.pubsIntro}</p>
    </section>
    <section class="card" id="pubs"></section>
  `);

  const all = await getJSON('publications/publications.json');
  const selected = selectHybrid(all, lang, keyForPub)
    .sort((a,b) => (a.date < b.date ? 1 : -1));

  const order = ['article','book-chapter','report','op-ed','repo'];
  const container = document.getElementById('pubs');

  const html = order.map(tp => {
    const items = selected.filter(p => p.type === tp);
    if (!items.length) return '';
    const cards = items.map(p => {
      const authors = fmtAuthors(p.authors);
      const metaParts = [p.publication, p.date].filter(Boolean).join(' · ');
      const doi = p.doi ? `<span class="meta">${t.doi}: ${p.doi}</span>` : '';
      const btn = p.url ? `<a class="badge" style="text-decoration:none" href="${p.url}" target="_blank" rel="noopener">${t.openLink}</a>` : '';

      return `
        <div class="list-item pub-card" style="flex-wrap:wrap; gap:10px">
          <div style="min-width:280px; max-width:700px">
            <div class="title">
              ${p.title || ''}
              ${flagBadge(p.lang)}
            </div>
            ${authors ? `<div class="authors">${authors}</div>` : ''}
            ${metaParts ? `<div class="meta">${metaParts}</div>` : ''}
            ${doi}
          </div>
          <div style="display:flex; gap:10px; align-items:center">${btn}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="prose"><h2>${t.pubsTypes[tp]}</h2></div>
      <div class="list">${cards}</div>
    `;
  }).join('');

  container.innerHTML = html || `<div class="list-item">${lang==='pt'?'Nenhuma publicação ainda.':'No publications yet.'}</div>`;
}


async function renderCV(lang) {
  const path = `cv/cv.${lang}.md`;
  const res = await fetch(path);
  const md = await res.text();

  setContent(`
    <section class="card prose">
      <h1>${lang === 'pt' ? 'CV Acadêmico' : 'Academic CV'}</h1>
      <div id="cv-body">Carregando…</div>
    </section>
    <section class="card prose" id="cv-pubs"></section>
  `);
  document.getElementById('cv-body').innerHTML = marked.parse(md, { breaks: true });

  // Selected publications (cv:true)
  try {
    const all = (await getJSON('publications/publications.json'))
      .filter(p => p.cv === true); // only selected for CV

    // hybrid rules (pt/en) with publication keys
    const chosen = selectHybrid(all, lang, keyForPub)
      .sort((a,b) => (a.date < b.date ? 1 : -1));

    if (chosen.length) {
      const wrap = document.getElementById('cv-pubs');
      const order = ['article','book-chapter','report','op-ed','repo'];

      const sections = order.map(tp => {
        const items = chosen.filter(p => p.type === tp);
        if (!items.length) return '';
        const list = items.map(p => {
          const parts = [];
          const authors = fmtAuthors(p.authors);
          if (authors) parts.push(authors);
          if (p.title)  parts.push(`“${p.title}”`);
          const tail = [p.publication, p.date].filter(Boolean).join(', ');
          if (tail) parts.push(tail);
          return `<li>${parts.join('. ')}</li>`;
        }).join('');
        const secTitle = i18n[lang].pubsTypes[tp] || tp;
        return `<h3>${secTitle}</h3><ul>${list}</ul>`;
      }).join('');

      wrap.innerHTML = `<h2>${i18n[lang].selectedPubsTitle}</h2>${sections}`;
    }
  } catch (e) {
    // ignore errors while loading publications
}
}


async function renderSlides(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>Slides</h1>
      <p>${t.slidesIntro}</p>
    </section>
    <section class="card">
      <div class="list" id="slides-list"></div>
    </section>
  `);

  const [allSlides, allProjects] = await Promise.all([
    getJSON('slides/slides.json'),
    getJSON('projects/projects.json')
  ]);

  // 1) removes archived slides
  const active = allSlides.filter(s => !s.archive);

  // 2) hybrid selection (pt/en) with slides keys
  const chosen = selectHybrid(active, lang, keyForSlide)
    .sort((a,b) => (a.date < b.date ? 1 : -1));

  // badge to see project only if there is a project in the current language with ≥1 active slide
  const allowedProjects = projectSlugsWithSlides(active, lang);

  const other = lang === 'pt' ? 'en' : 'pt';
  const list = document.getElementById('slides-list');

  list.innerHTML = chosen.map(s => {
    const htmlHref = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.html)}`;
    const pdfLink = resolvePdfHref(s);

    const twin = (ENABLE_SLIDE_LANGUAGE_SWITCH && s.group)
      ? counterpartByGroup(allSlides, s.group, other)
      : null;
    const twinLink = (ENABLE_SLIDE_LANGUAGE_SWITCH && twin && !twin.archive)
      ? `<a href="slides/${encodeURIComponent(twin.slug)}/${encodeURIComponent(twin.html)}" target="_blank" rel="noopener" class="badge" style="text-decoration:none">
          ${lang === 'pt' ? 'Ver versão em inglês' : 'See Portuguese version'}
        </a>`
      : '';

    const proj = allProjects.find(p => p.lang === lang && p.slug === s.project);
    const showProj = proj && allowedProjects.has(proj.slug);
    const projLink = showProj
      ? `<a class="badge" style="text-decoration:none" href="#/${lang}/project?slug=${encodeURIComponent(proj.slug)}">${t.viewProject}</a>`
      : '';

    return `
      <div class="list-item stacked">
        <div class="primary">
          <div class="list-item-title">
            <a href="${htmlHref}" target="_blank" rel="noopener">${s.title}</a>
            ${flagBadge(s.lang)}
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">
            ${(s.event || '')} ${s.date ? '· ' + s.date : ''}
          </div>
        </div>
        <div class="actions">
          <a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.seeOnline}</a>
          <a class="badge" href="${pdfLink}" target="_blank" rel="noopener" style="text-decoration:none">
            ${t.downloadPDF}
          </a>
          ${projLink}
          ${twinLink}
        </div>
      </div>
    `;
  }).join('') + `
    <div class="list-item" style="background:transparent;border:none;justify-content:flex-end">
      <a href="#/${lang}/archived">${t.seeArchived}</a>
    </div>
  `;
}


async function renderArchivedSlides(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.archivedTitle}</h1>
      <p>${t.archivedIntro}</p>
    </section>
    <section class="card prose">
      <div id="archived-list">Carregando…</div>
    </section>
    <section class="card">
      <a href="#/${lang}/slides">${t.backToSlides}</a>
    </section>
  `);

  const slides = (await getJSON('slides/slides.json'))
    .filter(s => s.lang === lang && s.archive)
    .sort((a,b) => (a.date < b.date ? 1 : -1));

  const el = document.getElementById('archived-list');

  if (!slides.length) {
    el.innerHTML = lang === 'pt' ? 'Nenhum slide arquivado ainda.' : 'No archived slides yet.';
    return;
  }

  // concise listing: date — title → PDF
  el.innerHTML = `
    <ul>
      ${slides.map(s => {
        const pdfHref = resolvePdfHref(s, { archived: true });
        const label = [s.date, s.title].filter(Boolean).join(' — ');
        return `<li><a href="${pdfHref}" target="_blank" rel="noopener">${label}</a></li>`;
      }).join('')}
    </ul>
  `;
}



// Events
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
