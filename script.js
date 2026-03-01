// ============================================================================
// Bootstrap & DOM References
// ============================================================================

const app = document.getElementById('app');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============================================================================
// Header / Navigation
// ============================================================================
const siteHeader = document.getElementById('siteHeader');
const navToggleBtn = document.getElementById('navToggle');

/**
 * Closes the mobile navigation menu if it is open.
 * @returns {void}
 */
function closeMobileNav() {
  if (!siteHeader || !navToggleBtn) return;
  siteHeader.classList.remove('nav-open');
  navToggleBtn.setAttribute('aria-expanded', 'false');
}

if (siteHeader && navToggleBtn) {
  navToggleBtn.addEventListener('click', () => {
    const open = siteHeader.classList.toggle('nav-open');
    navToggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ============================================================================
// Routing & Configuration
// ============================================================================

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
  'archived': renderArchivedSlides,
  'illustrations': renderHeroGallery,
};

const ENABLE_SLIDE_LANGUAGE_SWITCH = false;

// ============================================================================
// Hidden / Password-gated pages (weak protection, by design)
// ============================================================================

// Route segments (not linked in the UI).
const SECRET_ROUTES = {
  home: 'secret',
  slides: 'secret-slides',
  projects: 'secret-projects',
  project: 'secret-project',
};

// Configure the password by setting the SHA-256 hash (hex) below.
// Tip: `node tools/sha256.mjs "your password"` prints the hash.
const SECRET_PASSWORD_SHA256 = '514cedc5a74404407cb25627410a3e8287d284f3da11ac4fea1725a649b9f987'; // <-- set this
const SECRET_AUTH_STORAGE_KEY = 'lt_secret_unlocked_v1';

Object.assign(routes, {
  [SECRET_ROUTES.home]: renderSecretHome,
  [SECRET_ROUTES.slides]: renderSecretSlides,
  [SECRET_ROUTES.projects]: renderSecretProjectsIndex,
  [SECRET_ROUTES.project]: renderSecretProjectPage,
});

// ============================================================================
// Data Fetching & Caching
// ============================================================================

const cache = {};

/**
 * Fetches a JSON file with basic in-memory caching.
 * @param {string} path
 * @returns {Promise<any>}
 */
async function getJSON(path) {
  if (cache[path]) return cache[path];
  const r = await fetch(path);
  const j = await r.json();
  cache[path] = j;
  return j;
}

const PUBLICATIONS_BY_TYPE_PATH = {
  'article': 'publications/articles.json',
  'book-chapter': 'publications/book-chapters.json',
  'report': 'publications/reports.json',
  'op-ed': 'publications/op-eds.json',
  'repo': 'publications/repos.json',
};

let _publicationsMergedCache = null;

/**
 * Loads all publication files and merges them into a single list.
 * @returns {Promise<Array<object>>}
 */
async function getAllPublications() {
  if (_publicationsMergedCache) return _publicationsMergedCache;

  const parts = await Promise.all(
    Object.values(PUBLICATIONS_BY_TYPE_PATH).map(p => getJSON(p))
  );

  // avoids Array.prototype.flat() compatibility issues
  _publicationsMergedCache = [].concat(...parts);
  return _publicationsMergedCache;
}

/**
 * Finds a counterpart item in the other language using a shared group id.
 * @param {Array<object>} list
 * @param {string} group
 * @param {"pt"|"en"} otherLang
 * @returns {object|undefined}
 */
function counterpartByGroup(list, group, otherLang) {
  return list.find(x => x.group && x.group === group && x.lang === otherLang);
}

/**
 * Finds a post by slug and language.
 * @param {Array<object>} list
 * @param {string} slug
 * @param {"pt"|"en"} lang
 * @returns {object|undefined}
 */
function findPostBySlugAndLang(list, slug, lang) {
  return list.find(p => p.slug === slug && p.lang === lang);
}

/**
 * Returns true when a post should be visible in listings.
 * Defaults to true when the field is missing.
 * @param {object} post
 * @returns {boolean}
 */
function isPostPublished(post) {
  return post?.posted !== false;
}

/**
 * Returns true when a slide should be visible in listings.
 * Defaults to true when the field is missing.
 * @param {object} slide
 * @returns {boolean}
 */
function isSlidePublished(slide) {
  return slide?.posted !== false;
}

/**
 * Returns true when a slide is marked as hidden from public listings.
 * Defaults to false when the field is missing.
 * @param {object} slide
 * @returns {boolean}
 */
function isSlideHidden(slide) {
  return slide?.hide === true;
}

// ============================================================================
// UI Strings
// ============================================================================
const i18n = {
  pt: {
    title: 'Lucas Thevenard — Pesquisa, Blog, Slides',
    tagline: 'Regulação, pesquisa empírica e ciência de dados',
    nav: { home:'Início', blog:'Blog', cv:'CV', publications:'Publicações', slides:'Slides', projects:'Projetos', apps: 'Apps' },
    toggle: '🇺🇸 English Version',
    homeTitle: 'Bem-vindo!',
    homeIntro:
      'Sou o <strong>Lucas Thevenard</strong> e este é o meu site pessoal, onde trato de temas relacionados às minhas atividades como pesquisador e professor universitário. Aqui você encontra meu <a href="#/pt/blog">blog</a>, minhas <a href="#/pt/publications">publicações</a> acadêmicas, um repositório de <a href="#/pt/slides">slides</a> (Marp) agrupados por <a href="#/pt/projects">projetos</a>, alguns  <a href="#/pt/apps">aplicativos interativos</a> e dashboards que desenvolvo para fins de pesquisa, ensino e divulgação acadêmica, assim como meu <a href="#/pt/cv">CV</a>.',
    latestPosts: 'Últimos posts',
    backToBlog: '← Voltar ao blog',
    blogIntro: 'Textos diversos sobre projetos dos quais eu faço parte. Minha principal área de interesse é o uso de técnicas de ciência de dados, como machine learning e grandes modelos de linguagem, para estudar e aprimorar a regulação estatal.',
    slidesIntro:
      'Repositório de slides utilizados em apresentações avulsas, cursos de graduação e pós-graduação, entre outros. Cada apresentação está acompanhada de uma versão <strong>HTML</strong> para visualização online e um arquivo <strong>PDF</strong> para download.',
    seeOnline: 'Ver online',
    downloadPDF: 'Baixar PDF',
    secretTitle: 'Área restrita',
    secretPasswordLabel: 'Senha',
    secretUnlock: 'Entrar',
    secretWrongPassword: 'Senha incorreta.',
    secretNotConfigured: 'Área restrita não configurada (defina `SECRET_PASSWORD_SHA256` em `script.js`).',
    secretLogout: 'Sair',
    secretSlidesAll: 'Slides',
    secretProjectsAll: 'Projetos',
    hiddenBadge: 'Oculto',
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
      "report": "Relatórios de Pesquisa e Outros Trabalhos Acadêmicos",
      "op-ed": "Op-eds",
      "repo": "Repositórios / código"
    },
    openLink: 'Acessar',
    doi: 'DOI',
    issn: 'ISSN',
    selectedPubsTitle: 'Publicações selecionadas'
  },
  en: {
    title: 'Lucas Thevenard — Research, Blog, Slides',
    tagline: 'Regulation, empirical research and data science',
    nav: { home:'Home', blog:'Blog', cv:'CV', slides:'Slides', projects:'Projects', publications:'Publications', apps: 'Apps' },
    toggle: '🇧🇷 Versão em Português',
    homeTitle: 'Welcome!',
    homeIntro:
      'I’m <strong>Lucas Thevenard</strong> and this is my personal website, where I address topics related to my activities as a researcher and university professor. Here you can find my <a href="#/en/blog">blog</a>, my academic <a href="#/en/publications">publications</a>, a repository of <a href="#/en/slides">slides</a> (Marp), grouped by <a href="#/en/projects">project</a>, along with <a href="#/en/apps">interactive apps</a> and research dashboards developed for teaching, research, and academic outreach, as well as my <a href="#/en/cv">CV</a>.',
    latestPosts: 'Latest posts',
    backToBlog: '← Back to blog',
    blogIntro: 'Miscellaneous writings on projects I’m involved in. My main area of interest is the use of data science techniques—such as machine learning and large language models—to study and to improve government regulation.',
    slidesIntro:
      'Repository of slides used in standalone presentations, undergraduate and graduate courses, among others. Each presentation has an <strong>HTML</strong> version for online viewing and a <strong>PDF</strong> for download.',
    seeOnline: 'View online',
    downloadPDF: 'Download PDF',
    secretTitle: 'Restricted area',
    secretPasswordLabel: 'Password',
    secretUnlock: 'Unlock',
    secretWrongPassword: 'Wrong password.',
    secretNotConfigured: 'Restricted area not configured (set `SECRET_PASSWORD_SHA256` in `script.js`).',
    secretLogout: 'Log out',
    secretSlidesAll: 'Slides',
    secretProjectsAll: 'Projects',
    hiddenBadge: 'Hidden',
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
      "report": "Reports and Other Academic Works",
      "op-ed": "Op-eds",
      "repo": "Repositories / code"
    },
    openLink: 'Access',
    doi: 'DOI',
    issn: 'ISSN',
    selectedPubsTitle: 'Selected publications'
  }
};

// ============================================================================
// Navigation State & Hash Routing
// ============================================================================

// Keeps the current route to enable language switching within the same page.
let current = { lang: 'pt', path: '/', query: '' };

/**
 * Parses the location hash and enforces the /<lang>/<path> format.
 * Redirects when the hash is missing or invalid.
 * @returns {{lang: "pt"|"en", path: string, query: string} | null}
 */
function parseHashOrRedirect() {
  const raw = location.hash.replace(/^#/, ''); // e.g. "/pt/blog?x=1"

  // Use current.lang as fallback to preserve language when clicking hash links without /pt|/en.
  const fallbackLang = SUPPORTED_LANGS.includes(current?.lang) ? current.lang : 'pt';

  if (!raw || raw === '/') {
    const next = `#/${fallbackLang}`;
    if (location.hash !== next) location.replace(next);
    return { lang: fallbackLang, path: '/', query: '' };
  }

  // Ensures format /<lang>/<path...>
  const match = raw.match(/^\/(pt|en)(\/[^?]*)?(\?.*)?$/);
  if (!match) {
    // Hash without language (ex: "#/blog"); inject fallbackLang.
    const fix = raw.startsWith('/') ? raw : '/' + raw;
    const nextHash = `#/${fallbackLang}` + fix;
    if (location.hash !== nextHash) location.replace(nextHash);

    const fixedRaw = `/${fallbackLang}` + fix;
    const fixedMatch = fixedRaw.match(/^\/(pt|en)(\/[^?]*)?(\?.*)?$/);
    if (!fixedMatch) return { lang: fallbackLang, path: '/', query: '' };
    return { lang: fixedMatch[1], path: (fixedMatch[2] || '/'), query: (fixedMatch[3] || '') };
  }

  const lang = match[1];
  const path = (match[2] || '/');
  const query = (match[3] || '');
  return { lang, path, query };
}

/**
 * Resolves the current route and renders the matching page.
 * @returns {void}
 */
function navigate() {
  const parsed = parseHashOrRedirect();
  if (!parsed) return; // already redirected
  current = parsed;

  closeMobileNav();

  // Updates the UI for the current language (title, nav, button, lang attribute).
  updateUIForLang(current.lang);

  // Resolve the route.
  const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0]; // '', 'blog', 'cv', ...
  const route = routes[seg] || renderNotFound;
  const params = new URLSearchParams(current.query.replace(/^\?/, ''));
  route(current.lang, params, current).catch(err => renderError(current.lang, err));
}

// ============================================================================
// Language Switching & UI Updates
// ============================================================================

/**
 * Computes the hash for the same page in the other language.
 * @param {"pt"|"en"} lang
 * @returns {Promise<string>}
 */
async function computeOtherLangHash(lang) {
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
      targetHash = (there && isPostPublished(there))
        ? `#/${other}/post?slug=${encodeURIComponent(there.slug)}`
        : `#/${other}/blog`;
    }
  } else if (seg === 'project') {
    const [projects, slidesAll] = await Promise.all([
      getJSON('projects/projects.json'),
      getJSON('slides/slides.json')
    ]);
    const hiddenKeys = hiddenSlideKeySet(slidesAll);
    const params = new URLSearchParams(current.query.replace(/^\?/, ''));
    const slug = params.get('slug');
    const here = findProjectBySlugAndLang(projects, slug, lang);
    if (here && here.group) {
      const there = counterpartByGroup(projects, here.group, other);
      if (there) {
        const thereHasSlides = slidesAll.some(s => s.lang === other && s.project === there.slug && !s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s)));
        targetHash = thereHasSlides ? `#/${other}/project?slug=${encodeURIComponent(there.slug)}` : `#/${other}/projects`;
      } else {
        targetHash = `#/${other}/projects`;
      }
    } else {
      targetHash = `#/${other}/projects`;
    }
  } else if (seg === SECRET_ROUTES.project) {
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
        const thereHasSlides = slidesAll.some(s => s.lang === other && s.project === there.slug && !s.archive && isSlidePublished(s));
        targetHash = thereHasSlides
          ? `#/${other}/${SECRET_ROUTES.project}?slug=${encodeURIComponent(there.slug)}`
          : `#/${other}/${SECRET_ROUTES.projects}`;
      } else {
        targetHash = `#/${other}/${SECRET_ROUTES.projects}`;
      }
    } else {
      targetHash = `#/${other}/${SECRET_ROUTES.projects}`;
    }
  }

  return targetHash;
}

/**
 * Updates all UI strings and navigation links for the current language.
 * @param {"pt"|"en"} lang
 * @returns {void}
 */
function updateUIForLang(lang) {
  const t = i18n[lang];

  // 1) Set the HTML language attribute.
  document.documentElement.setAttribute('lang', lang);

  // 2) Brand + tagline.
  const brandLink = document.getElementById('brandLink');
  if (brandLink) {
    brandLink.textContent = t.brand ?? brandLink.textContent;
    brandLink.setAttribute('href', `#/${lang}`);
  }

  const tagline = document.getElementById('tagline');
  if (tagline && t.tagline) tagline.textContent = t.tagline;

  // 3) Nav labels + hrefs (keeps the existing route structure).
  const navMap = [
    ['navHome', 'home', ''],
    ['navBlog', 'blog', '/blog'],
    ['navPublications', 'publications', '/publications'],
    ['navSlides', 'slides', '/slides'],
    ['navApps', 'apps', '/apps'],
    ['navCV', 'cv', '/cv'],
  ];

  for (const [id, key, suffix] of navMap) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (t.nav && t.nav[key]) el.textContent = t.nav[key];
    el.setAttribute('href', `#/${lang}${suffix}`);
  }

  // 4) Active item detection:
  //    - home: path "/" or "/home"
  //    - others: first path segment
  const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0];
  for (const [id, key] of navMap) {
    const el = document.getElementById(id);
    if (!el) continue;

    const isActive =
      (key === 'home' && (seg === '' || seg === 'home')) ||
      (key !== 'home' && seg === key);

    el.classList.toggle('active', isActive);
    el.setAttribute('aria-current', isActive ? 'page' : 'false');
  }

  // 5) Language switching.
  const other = lang === 'pt' ? 'en' : 'pt';

  // Desktop: full text button.
  const toggleDesktop = document.getElementById('langToggle');
  if (toggleDesktop) {
    toggleDesktop.textContent = t.toggle;
    toggleDesktop.setAttribute(
      'aria-label',
      other === 'pt' ? 'Mudar para Português' : 'Switch to English'
    );
    toggleDesktop.onclick = async () => {
      location.hash = await computeOtherLangHash(lang);
    };
  }

  // Mobile: compact link with flag + language code.
  const toggleMobile = document.getElementById('langToggleMobile');
  if (toggleMobile) {
    toggleMobile.innerHTML =
      other === 'pt'
        ? `🇧🇷 <span class="lang-code">PT</span>`
        : `🇺🇸 <span class="lang-code">EN</span>`;

    toggleMobile.setAttribute(
      'aria-label',
      other === 'pt' ? 'Mudar para Português' : 'Switch to English'
    );

    toggleMobile.onclick = async (e) => {
      e.preventDefault();
      location.hash = await computeOtherLangHash(lang);
    };
  }

  // 6) Optional document title hook (if defined in i18n).
  // if (t.siteTitle) document.title = t.siteTitle;
}


/**
 * Replaces the main app container with new HTML.
 * @param {string} html
 * @returns {void}
 */
function setContent(html) {
  app.innerHTML = html;
}

/**
 * Renders a generic error page.
 * @param {"pt"|"en"} lang
 * @param {Error|string} err
 * @returns {void}
 */
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

/**
 * Renders a 404 page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
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

// ============================================================================
// Shared Helpers
// ============================================================================

/**
 * Returns a set of project slugs that have at least one active slide for a language.
 * @param {Array<object>} slides
 * @param {"pt"|"en"} lang
 * @returns {Set<string>}
 */
function projectSlugsWithSlides(slides, lang) {
  const hiddenKeys = hiddenSlideKeySet(slides);
  const set = new Set();
  slides.forEach(s => {
    if (s.lang === lang && s.project && !s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s))) set.add(s.project);
  });
  return set;
}

/**
 * Finds a project by slug and language.
 * @param {Array<object>} list
 * @param {string} slug
 * @param {"pt"|"en"} lang
 * @returns {object|undefined}
 */
function findProjectBySlugAndLang(list, slug, lang) {
  return list.find(p => p.slug === slug && p.lang === lang);
}

/**
 * Formats an array of author names into a comma-separated string.
 * @param {Array<string>} authors
 * @returns {string}
 */
function fmtAuthors(authors) {
  if (!Array.isArray(authors) || !authors.length) return '';
  return authors.join(', ');
}


/**
 * Returns a flag emoji for a language code.
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function langFlag(lang){ return lang === 'pt' ? '🇧🇷' : '🇺🇸'; }

/**
 * Returns a small HTML badge with the language flag.
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function flagBadge(lang){
  const title = lang === 'pt' ? 'Português' : 'English';
  return `<span class="flag-badge" title="${title}">${langFlag(lang)}</span>`;
}

/**
 * Returns a small HTML badge to indicate a hidden slide.
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function hiddenBadge(lang) {
  const label = i18n?.[lang]?.hiddenBadge || (lang === 'pt' ? 'Oculto' : 'Hidden');
  return ` <span title="${label}" aria-label="${label}">👁️</span>`;
}

/**
 * Returns a subtle eye icon to indicate partial hidden content.
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function partialHiddenBadge(lang) {
  const label = i18n?.[lang]?.partialHiddenBadge || (lang === 'pt' ? 'Parcialmente oculto' : 'Partially hidden');
  return ` <span title="${label}" aria-label="${label}" style="opacity:.5">👁️</span>`;
}

/**
 * Builds a stable key for slide equivalence across languages.
 * @param {object} s
 * @returns {string}
 */
function keyForSlide(s){
  // Group is canonical; if missing, fall back to slug/pdf (singleton).
  return s.group || s.slug || `pdf:${s.pdf}`;
}

/**
 * Returns a set of slide keys that are hidden from public pages.
 * If any language variant is hidden, the whole deck is hidden.
 * @param {Array<object>} slides
 * @returns {Set<string>}
 */
function hiddenSlideKeySet(slides) {
  const set = new Set();
  (slides || []).forEach(s => {
    if (isSlidePublished(s) && isSlideHidden(s)) set.add(keyForSlide(s));
  });
  return set;
}

/**
 * Resolves the directory (under /slides) where this deck lives.
 * Supports nested folders via `dir` in slides.json.
 * @param {object} slide
 * @returns {string}
 */
function slideDir(slide) {
  const slug = String(slide?.slug || '')
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '');

  const rawDir = String(slide?.dir || '')
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '');

  const dirParts = rawDir.split('/').filter(Boolean);
  const slugParts = slug.split('/').filter(Boolean);

  const safeDir = dirParts.some(p => p === '.' || p === '..') ? '' : dirParts.join('/');
  const safeSlug = slugParts.some(p => p === '.' || p === '..') ? '' : slugParts.join('/');

  // Default layout: slides/<slug>/...
  if (!safeDir) return safeSlug;

  // If slug is missing, treat `dir` as the full directory.
  if (!safeSlug) return safeDir;

  // If `dir` already includes the slug at the end, assume it is the full deck dir.
  if (safeDir === safeSlug || safeDir.endsWith(`/${safeSlug}`)) return safeDir;

  // Otherwise, treat `dir` as a parent folder.
  return `${safeDir}/${safeSlug}`;
}

/**
 * Encodes a "/" separated path, segment by segment.
 * @param {string} path
 * @returns {string}
 */
function encodePath(path) {
  return String(path || '')
    .split('/')
    .filter(Boolean)
    .map(encodeURIComponent)
    .join('/');
}

/**
 * Resolves the HTML href for a slide (local).
 * @param {object} slide
 * @returns {string}
 */
function resolveHtmlHref(slide) {
  const dir = slideDir(slide);
  return `slides/${encodePath(dir)}/${encodeURIComponent(slide.html)}`;
}

/**
 * Resolves the PDF href for a slide (local or external).
 * @param {object} slide
 * @param {{archived?: boolean}} [opts]
 * @returns {string}
 */
function resolvePdfHref(slide, { archived = false } = {}) {
  // 1) If an external PDF URL is provided, use it.
  if (slide.pdf_url) return slide.pdf_url;

  // 2) Fallback: local PDF.
  if (archived) return `slides/archived/${encodeURIComponent(slide.pdf)}`;
  const dir = slideDir(slide);
  return `slides/${encodePath(dir)}/${encodeURIComponent(slide.pdf)}`;
}

/**
 * Builds a stable key for publication equivalence across languages.
 * @param {object} p
 * @returns {string}
 */
function keyForPub(p){
  // Priority: group > doi > issn > url > title (fallback).
  return p.group || (
    p.doi ? `doi:${p.doi}` :
    (p.issn ? `issn:${p.issn}` :
      (p.url ? `url:${p.url}` : `title:${p.title}`)
    )
  );
}

/**
 * Applies the hybrid language selection rule to a list of items.
 * @param {Array<object>} items
 * @param {"pt"|"en"} lang
 * @param {(item: object) => string} keyFn
 * @returns {Array<object>}
 */
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
      // Choose the current language version.
      const chosen = arr.find(x => x.lang === lang);
      if (chosen) out.push(chosen);
    } else {
      // If only one language exists, show it in both versions.
      out.push(arr[0]);
    }
  }
  return out;
}

/**
 * Returns true when the secret area is configured with a valid SHA-256 hash.
 * @returns {boolean}
 */
function isSecretConfigured() {
  return typeof SECRET_PASSWORD_SHA256 === 'string' && /^[0-9a-f]{64}$/i.test(SECRET_PASSWORD_SHA256);
}

/**
 * Returns whether the user has unlocked the secret area in this session.
 * @returns {boolean}
 */
function isSecretUnlocked() {
  try {
    return sessionStorage.getItem(SECRET_AUTH_STORAGE_KEY) === '1';
  } catch (e) {
    return false;
  }
}

/**
 * Sets the secret area unlock flag for this session.
 * @param {boolean} unlocked
 * @returns {void}
 */
function setSecretUnlocked(unlocked) {
  try {
    if (unlocked) sessionStorage.setItem(SECRET_AUTH_STORAGE_KEY, '1');
    else sessionStorage.removeItem(SECRET_AUTH_STORAGE_KEY);
  } catch (e) {
    // ignore (private mode / disabled storage)
  }
}

/**
 * Computes SHA-256(input) and returns a hex string.
 * @param {string} input
 * @returns {Promise<string>}
 */
async function sha256Hex(input) {
  if (!globalThis.crypto?.subtle) throw new Error('WebCrypto not available');
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest('SHA-256', enc.encode(String(input)));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Returns display parts for publication titles (subtype + title).
 * @param {object} p
 * @param {"pt"|"en"} lang
 * @returns {{subtype: string, title: string}}
 */
function pubTitleParts(p, lang){
  if (!p || !p.title) return { subtype: '', title: '' };

  // Only report and book-chapter have subtypes on the publications page.
  if (p.type !== 'report' && p.type !== 'book-chapter') {
    return { subtype: '', title: p.title };
  }

  const subtype =
    lang === 'en'
      ? (p.subtype_en || p.subtype_pt || '')
      : (p.subtype_pt || p.subtype_en || '');

  return { subtype, title: p.title };
}

/**
 * Sorts posts by date (newest first), with a safe string fallback.
 * @param {Array<object>} posts
 * @returns {Array<object>}
 */
function sortPostsNewestFirst(posts) {
  // Tries to sort by date (ISO or parseable). If not parseable, fall back to string compare.
  return [...posts].sort((a, b) => {
    const da = Date.parse(a.date);
    const db = Date.parse(b.date);

    if (!Number.isNaN(da) && !Number.isNaN(db)) return db - da;

    // Fallback for comparable date strings (e.g., "2025-01-06").
    return String(b.date).localeCompare(String(a.date));
  });
}

// ============================================================================
// Hero (Illustration of the Month)
// ============================================================================

/**
 * Loads the hero gallery catalog.
 * @returns {Promise<object>}
 */
async function getHeroCatalog() {
  return await getJSON('assets/img/hero_gallery/hero.json');
}

/**
 * Returns the current year-month in YYYY-MM format.
 * @returns {string}
 */
function ymNow() {
  const d = new Date();
  const y = String(d.getFullYear());
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Picks the hero item for a given month (fallback: latest by YYYY-MM).
 * @param {object} catalog
 * @param {string} ym
 * @returns {object|null}
 */
function pickHeroItem(catalog, ym) {
  const items = Array.isArray(catalog?.items) ? catalog.items : [];
  if (!items.length) return null;

  const exact = items.find(it => it.month === ym);
  if (exact) return exact;

  // Fallback: latest by YYYY-MM.
  const sorted = [...items].sort((a,b) => String(b.month).localeCompare(String(a.month)));
  return sorted[0];
}

/**
 * Returns the localized text from a string or {pt,en} object.
 * @param {string|object} obj
 * @param {"pt"|"en"} lang
 * @param {string} [fallback]
 * @returns {string}
 */
function heroTextForLang(obj, lang, fallback='') {
  if (!obj) return fallback;
  if (typeof obj === 'string') return obj;
  if (typeof obj === 'object') return obj[lang] || obj.pt || obj.en || fallback;
  return fallback;
}

/**
 * Returns the base filename (without path/extension) for the hero image.
 * @param {object} item
 * @param {"pt"|"en"} lang
 * @returns {string|null}
 */
function heroBaseNameForLang(item, lang) {
  if (!item) return null;
  const b = item.base;
  if (!b) return null;
  if (typeof b === 'string') return b;
  if (typeof b === 'object') return b[lang] || b.pt || b.en || null;
  return null;
}


/**
 * Resolves the final image path based on archive status and language.
 * @param {object} item
 * @param {"pt"|"en"} lang
 * @returns {string|null}
 */
function heroSrcFromItem(item, lang) {
  const baseName = heroBaseNameForLang(item, lang);
  if (!baseName) return null;

  const dir = item.archived ? './assets/img/hero_gallery/' : './assets/img/';
  // Ensure .webp (in case an extension is passed by accident).
  return baseName.endsWith('.webp') ? (dir + baseName) : (dir + baseName + '.webp');
}

/**
 * Formats YYYY-MM into a localized month/year label.
 * @param {string} ym
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function formatMonthYear(ym, lang) {
  // ym: "YYYY-MM"
  if (!ym || typeof ym !== 'string') return '';

  const m = ym.match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym;

  const year = m[1];
  const monthIdx = parseInt(m[2], 10) - 1;

  const pt = [
    'janeiro','fevereiro','março','abril','maio','junho',
    'julho','agosto','setembro','outubro','novembro','dezembro'
  ];
  const en = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  if (monthIdx < 0 || monthIdx > 11) return ym;

  if (lang === 'pt') {
    // "December 2025" (pt format example).
    const name = pt[monthIdx];
    return name.charAt(0).toUpperCase() + name.slice(1) + ' de ' + year;
  }

  // "December 2025"
  return en[monthIdx] + ' ' + year;
}

// ============================================================================
// Pages
// ============================================================================
/**
 * Renders the home page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderHome(lang) {
  const t = i18n[lang];

  let heroItem = null;
  try {
    const catalog = await getHeroCatalog();
    heroItem = pickHeroItem(catalog, ymNow());
  } catch (e) {}

  const fallbackItem = {
    archived: false,
    base: lang === 'en' ? 'hero-methodology-en' : 'hero-methodology-pt',
    month: ymNow()
  };

  const item = heroItem || fallbackItem;

  const src = heroSrcFromItem(item, lang); // Resolves assets/img vs hero_gallery + .webp.
  const alt = heroTextForLang(
    item.alt,
    lang,
    lang === "en"
      ? "Cover illustration."
      : "Ilustração de capa."
  );
  const title = heroTextForLang(item.title, lang, '');
  const month = item.month || ymNow();

  setContent(`
    <section class="card prose">
      <h1>${t.homeTitle}</h1>
      <p>${t.homeIntro}</p>
    </section>

    <section class="hero">
      <figure class="hero__figure">
        <img class="hero__img" src="${src}" alt="${alt}" loading="lazy" />
      </figure>

      ${title ? `
        <div class="hero__meta">
          <span class="hero__caption-text">“${title}”</span>
          <span class="hero__caption-sep">&nbsp; | &nbsp;</span>
          <a class="hero__archive-link" href="#/${lang}/illustrations">
            ${lang === 'pt' ? '> ver meses anteriores' : '> see previous months'}
          </a>
        </div>
      ` : ''}
    </section>

    <section class="card">
      <div class="list" id="latest"></div>
    </section>
  `);

  // Loads the last posts in the index (filtering by language)
  const res = await fetch("posts/posts.json");
  const posts = sortPostsNewestFirst(
    (await res.json()).filter((p) => p.lang === lang && isPostPublished(p))
  );
  const latest = posts.slice(0, 3);
  const list = document.getElementById("latest");

  list.innerHTML = `
    <div class="list-item" style="background:transparent;border:none;padding:0">
      <div class="list-item-title">${t.latestPosts}</div>
    </div>
    ${latest
      .map(
        (p) => `
      <div class="list-item">
        <div>
          <div class="list-item-title">
            <a href="#/${lang}/post?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">${p.date}${
            p.tags?.length ? " · " + p.tags.join(", ") : ""
          }</div>
        </div>
        <span class="badge">Blog</span>
      </div>
    `
      )
      .join("")}
    <div class="list-item">
      <a href="#/${lang}/blog">${lang === "pt" ? "Ver todos os posts →" : "See all posts →"}</a>
    </div>
  `;
}

/**
 * Renders the blog index page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
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
  const posts = sortPostsNewestFirst((await res.json()).filter(p => p.lang === lang && isPostPublished(p)));
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

/**
 * Renders a blog post page by slug.
 * @param {"pt"|"en"} lang
 * @param {URLSearchParams} params
 * @returns {Promise<void>}
 */
async function renderBlogPost(lang, params) {
  const slug = params.get('slug');
  if (!slug) return renderNotFound(lang);

  const posts = await getJSON('posts/posts.json');
  const item = findPostBySlugAndLang(posts, slug, lang);
  if (!item || !isPostPublished(item)) {
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

/**
 * Renders the projects index page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
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

/**
 * Renders the Apps route (index or a specific app).
 * @param {"pt"|"en"} lang
 * @param {URLSearchParams} params
 * @param {{path: string}} current
 * @returns {Promise<void>}
 */
async function renderApps(lang, params, current) {
  const mount = document.getElementById("app");

  if (!window.AppsRouter?.renderAppsIndex || !window.AppsRouter?.renderAppRoute) {
    mount.innerHTML = `<section class="card"><h1>Apps</h1><p>Apps router não carregou.</p></section>`;
    return;
  }

  // Example: current.path = "/apps" or "/apps/lotteries".
  const path = (current?.path || "/apps").replace(/\/+$/, "");
  const route = `/${lang}${path}`; // "/pt/apps" or "/pt/apps/lotteries"

  const parts = path.split("/").filter(Boolean); // ["apps"] or ["apps","lotteries"]
  if (parts.length >= 2) {
    await window.AppsRouter.renderAppRoute(mount, { route });
  } else {
    await window.AppsRouter.renderAppsIndex(mount, { route });
  }
}

/**
 * Renders a project detail page.
 * @param {"pt"|"en"} lang
 * @param {URLSearchParams} params
 * @returns {Promise<void>}
 */
async function renderProjectPage(lang, params) {
  const slug = params.get('slug');
  if (!slug) return renderNotFound(lang);

  const [projects, slidesAll] = await Promise.all([
    getJSON('projects/projects.json'),
    getJSON('slides/slides.json')
  ]);
  const hiddenKeys = hiddenSlideKeySet(slidesAll);

  const project = findProjectBySlugAndLang(projects, slug, lang);
  if (!project) return renderNotFound(lang);

  // Only active slides for this project.
  const slides = slidesAll
    .filter(s => s.lang === lang && s.project === slug && !s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s)))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!slides.length) return renderNotFound(lang);

  const t = i18n[lang];

  // Link to the sister project in the other language (if it has slides).
  const other = lang === 'pt' ? 'en' : 'pt';
  const twinProj = project.group ? counterpartByGroup(projects, project.group, other) : null;
  let switchLink = '';
  if (twinProj) {
    const twinHasSlides = slidesAll.some(s => s.lang === other && s.project === twinProj.slug && !s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s)));
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
    const htmlHref = resolveHtmlHref(s);
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

/**
 * Renders the publications page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderPublications(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>${t.pubsTitle}</h1>
      <p>${t.pubsIntro}</p>
    </section>
    <section class="card" id="pubs"></section>
  `);

  const all = await getAllPublications();
  const selected = selectHybrid(all, lang, keyForPub)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const order = ['article', 'book-chapter', 'report', 'op-ed', 'repo'];
  const container = document.getElementById('pubs');

  const html = order.map(tp => {
    const items = selected.filter(p => p.type === tp);
    if (!items.length) return '';

    const cards = items.map(p => {
      const authors = fmtAuthors(p.authors);
      const metaParts = [p.publication, p.date].filter(Boolean).join(' · ');
      const idMeta = p.doi
        ? `<span class="meta">${t.doi}: ${p.doi}</span>`
        : (p.issn ? `<span class="meta">${t.issn}: ${p.issn}</span>` : '');

      // Helper already defined above.
      const { subtype, title } = pubTitleParts(p, lang);

      const titleNode = p.url
        ? `<a class="pub-title-link" href="${p.url}" target="_blank" rel="noopener">${title}</a>`
        : `<span class="pub-title-text">${title}</span>`;

      const subtypeNode = subtype
        ? `<span class="pub-subtype">${subtype}:</span> `
        : '';

      const btn = p.url
        ? `<a class="pub-access" href="${p.url}" target="_blank" rel="noopener">${t.openLink}</a>`
        : '';

      return `
        <div class="list-item pub-card">
          <div class="title">
            ${subtypeNode}${titleNode}
            ${flagBadge(p.lang)}
          </div>
          ${authors ? `<div class="authors">${authors}</div>` : ''}
          ${metaParts ? `<div class="meta">${metaParts}</div>` : ''}
          ${idMeta ? `<div class="meta">${idMeta}</div>` : ''}

          ${btn ? `<div class="pub-actions">${btn}</div>` : ''}
        </div>
      `;
    }).join('');

    // Keep all sections collapsed by default (no open attribute).
    return `
      <details class="pub-acc">
        <summary class="pub-acc__summary">
          <span class="pub-acc__title">${t.pubsTypes[tp]}</span>
          <span class="pub-acc__right">
            <span class="pub-acc__count">${items.length}</span>
            <span class="pub-acc__chev" aria-hidden="true">▾</span>
          </span>
        </summary>

        <div class="pub-acc__body">
          <div class="list">${cards}</div>
        </div>
      </details>
    `;
  }).join('');

  container.innerHTML =
    html || `<div class="list-item">${lang === 'pt' ? 'Nenhuma publicação ainda.' : 'No publications yet.'}</div>`;

  // Accordion behavior: opening one closes the others.
  const acc = Array.from(container.querySelectorAll('details.pub-acc'));
  acc.forEach(d => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      acc.forEach(other => { if (other !== d) other.open = false; });
    });
  });
}




/**
 * Renders the CV page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderCV(lang) {
  const path = `cv/cv.${lang}.md`;
  const res = await fetch(path);
  const md = await res.text();

  setContent(`
    <section class="card prose">
      <p class="cv-top">${lang === 'pt' ? 'CURRÍCULO &nbsp;ACADÊMICO' : 'ACADEMIC &nbsp;CV'}</p>
      <div id="cv-body">Carregando…</div>
    </section>
    <section class="card prose" id="cv-pubs"></section>
  `);
  document.getElementById('cv-body').innerHTML = marked.parse(md, { breaks: true });

  // Selected publications (cv:true).
  try {
    const all = (await getAllPublications())
      .filter(p => p.cv === true); // Only selected for CV.

    // Hybrid rules (pt/en) with publication keys.
    const chosen = selectHybrid(all, lang, keyForPub)
      .sort((a,b) => (a.date < b.date ? 1 : -1));

    if (chosen.length) {
      const wrap = document.getElementById('cv-pubs');
      const t = i18n[lang];
      const order = ['article','book-chapter','report','op-ed','repo'];

      const sections = order.map(tp => {
        const items = chosen.filter(p => p.type === tp);
        if (!items.length) return '';
        const list = items.map(p => {
          const parts = [];
          
          if (p.type === 'report' || p.type === 'book-chapter') {
            const subtype =
              lang === 'en'
                ? (p.subtype_en || p.subtype_pt)
                : (p.subtype_pt || p.subtype_en);

            if (subtype) parts.push(`<strong style="color:#9cc8ff">${subtype}</strong>`);
          }

          const authors = fmtAuthors(p.authors);
          if (authors) parts.push(authors);
          if (p.title) parts.push(`“${p.title}”`);

          const tail = [p.publication, p.date].filter(Boolean).join(', ');
          if (tail) parts.push(tail);

          const id = p.doi
            ? `${t.doi}: ${p.doi}`
            : (p.issn ? `${t.issn}: ${p.issn}` : '');
          if (id) parts.push(id);
          return `<li>${parts.join('. ')}</li>`;

        }).join('');
        const secTitle = i18n[lang].pubsTypes[tp] || tp;
        return `<h3  class="cv-subtitle">${secTitle}</h3><ul>${list}</ul>`;
      }).join('');

      wrap.innerHTML = `<h1 class="cv-title">${i18n[lang].selectedPubsTitle}</h1>${sections}`;
    }
  } catch (e) {
    // Ignore errors while loading publications.
}
}

/**
 * Renders the slides page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderSlides(lang) {
  const t = i18n[lang];
  setContent(`
    <section class="card prose">
      <h1>Slides</h1>
      <p>${t.slidesIntro}</p>
      <p>
        <a href="#/${lang}/projects">
          ${lang === 'pt'
            ? 'Veja os slides agrupados por projetos →'
            : 'See slides grouped by projects →'}
        </a>
      </p>
    </section>
    <section class="card">
      <div class="list" id="slides-list"></div>
    </section>
  `);


  const [allSlides, allProjects] = await Promise.all([
    getJSON('slides/slides.json'),
    getJSON('projects/projects.json')
  ]);

  // 1) Remove archived slides.
  const hiddenKeys = hiddenSlideKeySet(allSlides);
  const active = allSlides.filter(s => !s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s)));

  // 2) Hybrid selection (pt/en) with slide keys.
  const chosen = selectHybrid(active, lang, keyForSlide)
    .sort((a,b) => (a.date < b.date ? 1 : -1));

  // Project badge only if there is a project in the current language with ≥1 active slide.
  const allowedProjects = projectSlugsWithSlides(active, lang);

  const other = lang === 'pt' ? 'en' : 'pt';
  const list = document.getElementById('slides-list');

  list.innerHTML = chosen.map(s => {
    const htmlHref = resolveHtmlHref(s);
    const pdfLink = resolvePdfHref(s);

    const twin = (ENABLE_SLIDE_LANGUAGE_SWITCH && s.group)
      ? counterpartByGroup(allSlides, s.group, other)
      : null;
    const twinLink = (ENABLE_SLIDE_LANGUAGE_SWITCH && twin && !twin.archive && twin.slug && twin.html)
      ? `<a href="${resolveHtmlHref(twin)}" target="_blank" rel="noopener" class="badge" style="text-decoration:none">
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

/**
 * Renders the secret login gate (password prompt).
 * @param {"pt"|"en"} lang
 * @returns {void}
 */
function renderSecretGate(lang) {
  const t = i18n[lang];

  if (!isSecretConfigured()) {
    setContent(`
      <section class="card prose">
        <h1>${t.secretTitle}</h1>
        <p style="color:var(--muted)">${t.secretNotConfigured}</p>
        <p style="text-align:right;font-size:.8rem">
          <a href="#/${lang}">${lang === 'pt' ? '← Voltar ao início' : '← Back to home'}</a>
        </p>
      </section>
    `);
    return;
  }

  setContent(`
    <section class="card prose">
      <h1>${t.secretTitle}</h1>
      <form id="secretForm" style="display:flex;gap:10px;flex-wrap:wrap;align-items:center">
        <label style="display:flex;gap:10px;align-items:center;flex:1;min-width:260px">
          <span style="min-width:90px">${t.secretPasswordLabel}</span>
          <input
            id="secretPassword"
            type="password"
            autocomplete="current-password"
            style="flex:1;min-width:200px;padding:10px;border-radius:10px;border:1px solid var(--border);background:var(--panel);color:var(--text)"
          />
        </label>
        <button class="lang-btn" type="submit">${t.secretUnlock}</button>
      </form>
      <p id="secretMsg" style="margin-top:10px;color:var(--muted)"></p>
      <p style="text-align:right;font-size:.8rem">
        <a href="#/${lang}">${lang === 'pt' ? '← Voltar ao início' : '← Back to home'}</a>
      </p>
    </section>
  `);

  const form = document.getElementById('secretForm');
  const input = document.getElementById('secretPassword');
  const msg = document.getElementById('secretMsg');

  if (input) input.focus();

  if (!form || !input) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pw = String(input.value || '');

    try {
      const h = (await sha256Hex(pw)).toLowerCase();
      if (h === String(SECRET_PASSWORD_SHA256).toLowerCase()) {
        setSecretUnlocked(true);
        input.value = '';
        if (msg) msg.textContent = '';
        navigate();
        return;
      }
    } catch (err) {
      if (msg) msg.textContent = (err && (err.message || err)) || 'Error';
      return;
    }

    if (msg) msg.textContent = t.secretWrongPassword;
  });
}

/**
 * Ensures the current session is unlocked before rendering secret pages.
 * @param {"pt"|"en"} lang
 * @returns {boolean}
 */
function ensureSecretAccess(lang) {
  if (isSecretUnlocked()) return true;
  renderSecretGate(lang);
  return false;
}

/**
 * Returns a small navigation bar for secret pages.
 * @param {"pt"|"en"} lang
 * @returns {string}
 */
function secretNav(lang) {
  const t = i18n[lang];
  return `
    <section class="card" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a href="#/${lang}/${SECRET_ROUTES.home}">${t.secretTitle}</a>
        <a href="#/${lang}/${SECRET_ROUTES.slides}">${t.secretSlidesAll}</a>
        <a href="#/${lang}/${SECRET_ROUTES.projects}">${t.secretProjectsAll}</a>
      </div>
      <button class="lang-btn" id="secretLogout" type="button">${t.secretLogout}</button>
    </section>
  `;
}

/**
 * Wires the logout button (if present).
 * @returns {void}
 */
function wireSecretLogout() {
  const btn = document.getElementById('secretLogout');
  if (!btn) return;
  btn.addEventListener('click', () => {
    setSecretUnlocked(false);
    navigate();
  });
}

/**
 * Renders the secret home page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderSecretHome(lang) {
  if (!ensureSecretAccess(lang)) return;
  const t = i18n[lang];

  setContent(`
    ${secretNav(lang)}
    <section class="card prose">
      <h1>${t.secretTitle}</h1>
      <ul>
        <li><a href="#/${lang}/${SECRET_ROUTES.slides}">${t.secretSlidesAll}</a></li>
        <li><a href="#/${lang}/${SECRET_ROUTES.projects}">${t.secretProjectsAll}</a></li>
      </ul>
      <p style="text-align:right;font-size:.8rem">
        <a href="#/${lang}">${lang === 'pt' ? '← Voltar ao início' : '← Back to home'}</a>
      </p>
    </section>
  `);

  wireSecretLogout();
}

/**
 * Renders the full slides index (includes hidden slides).
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderSecretSlides(lang) {
  if (!ensureSecretAccess(lang)) return;
  const t = i18n[lang];

  setContent(`
    ${secretNav(lang)}
    <section class="card prose">
      <h1>Slides</h1>
      <p>${t.slidesIntro}</p>
      <p>
        <a href="#/${lang}/${SECRET_ROUTES.projects}">
          ${lang === 'pt'
            ? 'Veja os slides agrupados por projetos →'
            : 'See slides grouped by projects →'}
        </a>
      </p>
    </section>
    <section class="card">
      <div class="list" id="secret-slides-list"></div>
    </section>
  `);

  wireSecretLogout();

  const [allSlides, allProjects] = await Promise.all([
    getJSON('slides/slides.json'),
    getJSON('projects/projects.json')
  ]);

  const hiddenKeys = hiddenSlideKeySet(allSlides);
  const activeAll = allSlides.filter(s => !s.archive && isSlidePublished(s));
  const chosen = selectHybrid(activeAll, lang, keyForSlide)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const list = document.getElementById('secret-slides-list');
  if (!list) return;

  if (!chosen.length) {
    list.innerHTML = `<div class="list-item">${lang === 'pt' ? 'Nenhum slide disponível.' : 'No slides available.'}</div>`;
    return;
  }

  list.innerHTML = chosen.map(s => {
    const hasHTML = Boolean(s.slug && s.html);
    const htmlHref = hasHTML ? resolveHtmlHref(s) : '';
    const pdfLink = resolvePdfHref(s);

    const proj = allProjects.find(p => p.lang === lang && p.slug === s.project);
    const projLink = proj
      ? `<a class="badge" style="text-decoration:none" href="#/${lang}/${SECRET_ROUTES.project}?slug=${encodeURIComponent(proj.slug)}">${t.viewProject}</a>`
      : '';

    const titleEl = hasHTML
      ? `<a href="${htmlHref}" target="_blank" rel="noopener">${s.title}</a>`
      : `<span>${s.title}</span>`;

    const hidden = hiddenKeys.has(keyForSlide(s)) ? hiddenBadge(lang) : '';

    return `
      <div class="list-item stacked">
        <div class="primary">
          <div class="list-item-title">
            ${titleEl}
            ${flagBadge(s.lang)}
            ${hidden}
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">
            ${(s.event || '')} ${s.date ? '· ' + s.date : ''}
          </div>
        </div>
        <div class="actions">
          ${hasHTML ? `<a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.seeOnline}</a>` : ''}
          <a class="badge" href="${pdfLink}" target="_blank" rel="noopener" style="text-decoration:none">${t.downloadPDF}</a>
          ${projLink}
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renders the full projects index (includes projects with only hidden slides).
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderSecretProjectsIndex(lang) {
  if (!ensureSecretAccess(lang)) return;
  const t = i18n[lang];

  setContent(`
    ${secretNav(lang)}
    <section class="card prose">
      <h1>${lang === 'pt' ? 'Projetos' : 'Projects'}</h1>
      <p>${t.projectsIntro}</p>
    </section>
    <section class="card">
      <div class="list" id="secret-projects-list"></div>
    </section>
  `);

  wireSecretLogout();

  const [projectsAll, slidesAll] = await Promise.all([
    getJSON('projects/projects.json'),
    getJSON('slides/slides.json')
  ]);

  const hiddenKeys = hiddenSlideKeySet(slidesAll);
  const statsByProject = new Map(); // projectSlug -> { hasSlides: boolean, hasVisible: boolean, hasHidden: boolean }
  slidesAll.forEach(s => {
    if (s.lang !== lang) return;
    if (!s.project || s.archive || !isSlidePublished(s)) return;

    const proj = String(s.project);
    const stats = statsByProject.get(proj) || { hasSlides: false, hasVisible: false, hasHidden: false };
    stats.hasSlides = true;
    if (hiddenKeys.has(keyForSlide(s))) stats.hasHidden = true;
    else stats.hasVisible = true;
    statsByProject.set(proj, stats);
  });

  const projects = projectsAll
    .filter(p => p.lang === lang && statsByProject.has(p.slug))
    .sort((a, b) => a.title.localeCompare(b.title, lang));

  const list = document.getElementById('secret-projects-list');
  if (!list) return;

  if (!projects.length) {
    list.innerHTML = `<div class="list-item">${lang === 'pt' ? 'Nenhum projeto com slides.' : 'No projects with slides.'}</div>`;
    return;
  }

  list.innerHTML = projects.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">
          <a href="#/${lang}/${SECRET_ROUTES.project}?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
          ${(() => {
            const st = statsByProject.get(p.slug);
            if (!st) return '';
            if (st.hasHidden && st.hasVisible) return partialHiddenBadge(lang);
            if (st.hasHidden) return hiddenBadge(lang);
            return '';
          })()}
        </div>
        <div class="muted" style="color:#9ca3af;font-size:.9rem">
          ${p.tags?.join(' • ') || ''}
        </div>
      </div>
      <a class="badge" style="text-decoration:none" href="#/${lang}/${SECRET_ROUTES.project}?slug=${encodeURIComponent(p.slug)}">
        ${lang === 'pt' ? 'Abrir' : 'Open'}
      </a>
    </div>
  `).join('');
}

/**
 * Renders a secret project detail page (includes hidden slides).
 * @param {"pt"|"en"} lang
 * @param {URLSearchParams} params
 * @returns {Promise<void>}
 */
async function renderSecretProjectPage(lang, params) {
  if (!ensureSecretAccess(lang)) return;
  const slug = params.get('slug');
  if (!slug) return renderNotFound(lang);

  const [projects, slidesAll] = await Promise.all([
    getJSON('projects/projects.json'),
    getJSON('slides/slides.json')
  ]);
  const hiddenKeys = hiddenSlideKeySet(slidesAll);

  const project = findProjectBySlugAndLang(projects, slug, lang);
  if (!project) return renderNotFound(lang);

  const slides = slidesAll
    .filter(s => s.lang === lang && s.project === slug && !s.archive && isSlidePublished(s))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  if (!slides.length) return renderNotFound(lang);

  const t = i18n[lang];

  setContent(`
    ${secretNav(lang)}
    <section class="card prose">
      <h1>${project.title}</h1>
      <p>${project.description || ''}</p>
      <p class="muted" style="color:#9ca3af">${project.tags?.map(tag => `#${tag}`).join(' ') || ''}</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a href="#/${lang}/${SECRET_ROUTES.projects}">${t.backToProjects}</a>
      </div>
    </section>
    <section class="card">
      <div class="list" id="secret-proj-slides"></div>
    </section>
  `);

  wireSecretLogout();

  const list = document.getElementById('secret-proj-slides');
  if (!list) return;

  list.innerHTML = slides.map(s => {
    const hasHTML = Boolean(s.slug && s.html);
    const htmlHref = hasHTML ? resolveHtmlHref(s) : '';
    const pdfHref = resolvePdfHref(s);
    const hidden = hiddenKeys.has(keyForSlide(s)) ? hiddenBadge(lang) : '';

    return `
      <div class="list-item stacked">
        <div class="primary">
          <div class="list-item-title">
            ${hasHTML ? `<a href="${htmlHref}" target="_blank" rel="noopener">${s.title}</a>` : `<span>${s.title}</span>`}
            ${flagBadge(s.lang)}
            ${hidden}
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">
            ${(s.event || '')} ${s.date ? '· ' + s.date : ''}
          </div>
        </div>
        <div class="actions">
          ${hasHTML ? `<a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.seeOnline}</a>` : ''}
          <a class="badge" href="${pdfHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.downloadPDF}</a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Renders the archived slides page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
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

  const allSlides = await getJSON('slides/slides.json');
  const hiddenKeys = hiddenSlideKeySet(allSlides);

  const slides = allSlides
    .filter(s => s.lang === lang && s.archive && isSlidePublished(s) && !hiddenKeys.has(keyForSlide(s)))
    .sort((a,b) => (a.date < b.date ? 1 : -1));

  const el = document.getElementById('archived-list');

  if (!slides.length) {
    el.innerHTML = lang === 'pt' ? 'Nenhum slide arquivado ainda.' : 'No archived slides yet.';
    return;
  }

  // Concise listing: date — title → PDF.
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

/**
 * Renders the hero illustration gallery page.
 * @param {"pt"|"en"} lang
 * @returns {Promise<void>}
 */
async function renderHeroGallery(lang) {
  const pageTitle = lang === 'pt' ? 'Ilustração do Mês' : 'Illustration of the Month';
  const intro = lang === 'pt'
    ? 'Galeria de ilustrações de capa do site. Todas as ilustrações são criadas por mim, usando ferramentas de IA (ChatGPT, Gemini, etc.).'
    : 'Gallery of the cover illustrations I use in my site. All illustrations are created by me using AI tools (ChatGPT, Gemini, etc.).';

  let catalog = { items: [] };
  try {
    catalog = await getHeroCatalog();
  } catch (e) {
    catalog = { items: [] };
  }

  const itemsAll = Array.isArray(catalog?.items) ? catalog.items : [];
  const items = itemsAll.filter(it => it);

  const sorted = [...items].sort((a, b) => String(b.month).localeCompare(String(a.month)));

  const cards = sorted.map((it, idx) => {
    const src = heroSrcFromItem(it, lang);
    const title = heroTextForLang(it.title, lang, '');
    const desc = heroTextForLang(it.description, lang, '');
    const alt = heroTextForLang(it.alt, lang, title || it.month || 'Hero image');
    const niceMonth = formatMonthYear(it.month || '', lang);

    const media = src ? `
      <figure class="hero-g__figure">
        <button class="hero-g__thumb" type="button" data-src="${src}" data-alt="${alt}">
          <img class="hero-g__img" src="${src}" alt="${alt}" loading="lazy" />
        </button>
      </figure>
    ` : '';

    return `
      <article class="hero-g__card" data-idx="${idx}">
        ${media}
        <div class="hero-g__caption">
          <div class="hero-g__month">${niceMonth}</div>
          <div class="hero-g__title">${title}</div>
          ${desc ? `<div class="hero-g__desc">${desc}</div>` : ''}
        </div>
      </article>
    `;
  }).join('');

  const emptyState = `
    <div class="card">
      <p style="color:var(--muted);margin:0">
        ${lang === 'pt' ? 'Nenhuma ilustração arquivada ainda.' : 'No archived illustrations yet.'}
      </p>
    </div>
  `;

  setContent(`
    <section class="card prose">
      <h1>${pageTitle}</h1>
      <p>${intro}</p>
      <p style="text-align:right;font-size:.8rem">
        <a href="#/${lang}">${lang === 'pt' ? '← Voltar ao início' : '← Back to home'}</a>
      </p>
    </section>

    <section class="hero-g">
      ${cards || emptyState}
    </section>

    <div class="hero-g__lightbox" id="heroLightbox" aria-hidden="true">
      <button class="hero-g__lb-backdrop" type="button" aria-label="${lang === 'pt' ? 'Fechar' : 'Close'}"></button>
      <div class="hero-g__lb-panel" role="dialog" aria-modal="true" aria-label="${lang === 'pt' ? 'Imagem ampliada' : 'Expanded image'}">
        <button class="hero-g__lb-close" type="button" aria-label="${lang === 'pt' ? 'Fechar' : 'Close'}">×</button>
        <img class="hero-g__lb-img" src="" alt="" />
      </div>
    </div>
  `);

  // Wire up the lightbox.
  const lb = document.getElementById('heroLightbox');
  const lbImg = lb ? lb.querySelector('.hero-g__lb-img') : null;
  const btnClose = lb ? lb.querySelector('.hero-g__lb-close') : null;
  const btnBackdrop = lb ? lb.querySelector('.hero-g__lb-backdrop') : null;

  /**
   * Opens the lightbox with the given image.
   * @param {string} src
   * @param {string} alt
   * @returns {void}
   */
  function openLightbox(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }

  /**
   * Closes the lightbox and clears the image.
   * @returns {void}
   */
  function closeLightbox() {
    if (!lb || !lbImg) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    // Clear src to avoid flash when switching.
    lbImg.src = '';
    lbImg.alt = '';
    document.body.classList.remove('no-scroll');
  }

  document.querySelectorAll('.hero-g__thumb').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const alt = btn.getAttribute('data-alt');
      if (src) openLightbox(src, alt);
    });
  });

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnBackdrop) btnBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb && lb.classList.contains('is-open')) closeLightbox();
  }, { once: true });
}

// ============================================================================
// Events
// ============================================================================
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);

// Fallback for environments where DOMContentLoaded already fired.
if (document.readyState !== 'loading') navigate();
