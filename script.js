/* SPA bilingue por hash:
   - Rotas: #/pt, #/pt/blog, #/en, #/en/blog, etc.
   - Blog e Slides filtram por lang via JSON.
*/
const app = document.getElementById('app');
document.getElementById('year').textContent = new Date().getFullYear();

const SUPPORTED_LANGS = ['pt','en'];
const routes = {
  '': renderHome,
  'blog': renderBlogIndex,
  'post': renderBlogPost,
  'cv': renderCV,
  'slides': renderSlides
};

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
    tagline: 'Regulação, dados e participação social',
    nav: { home: 'Início', blog: 'Blog', cv: 'CV', slides: 'Slides' },
    toggle: 'See this page in English',
    homeTitle: 'Bem-vindo!',
    homeIntro:
      'Este é o site de <strong>Lucas Thevenard</strong>, com textos sobre regulação, ciência de dados e participação social. Aqui você encontra meu <a href="#/pt/blog">blog</a>, meu <a href="#/pt/cv">CV acadêmico</a> e um repositório de <a href="#/pt/slides">slides</a> (Marp).',
    latestPosts: 'Últimos posts',
    backToBlog: '← Voltar ao blog',
    blogIntro: 'Textos sobre regulação, AIR/ARR, participação, NLP e mais.',
    slidesIntro:
      'Cada apresentação possui sua própria pasta em <code>/slides/&lt;slug&gt;/</code>, com um arquivo <strong>HTML</strong> para visualização online e um <strong>PDF</strong> para download.',
    seeOnline: 'Ver online',
    downloadPDF: 'Baixar PDF',
    notFound: 'Página não encontrada',
    errorTitle: 'Ops…',
    errorBody: 'Algo deu errado ao carregar o conteúdo.'
  },
  en: {
    title: 'Lucas Thevenard — Research, Blog, Slides',
    tagline: 'Regulation, data & public participation',
    nav: { home: 'Home', blog: 'Blog', cv: 'CV', slides: 'Slides' },
    toggle: 'Veja esta página em português',
    homeTitle: 'Welcome!',
    homeIntro:
      'This is <strong>Lucas Thevenard</strong>’s site with notes on regulation, data science, and public participation. Find my <a href="#/en/blog">blog</a>, my <a href="#/en/cv">academic CV</a>, and a <a href="#/en/slides">slides</a> repository (Marp).',
    latestPosts: 'Latest posts',
    backToBlog: '← Back to blog',
    blogIntro: 'Notes on regulation, RIA/ex post, participation, NLP, and more.',
    slidesIntro:
      'Each talk lives in <code>/slides/&lt;slug&gt;/</code>, with an <strong>HTML</strong> deck for viewing and a <strong>PDF</strong> for download.',
    seeOnline: 'View online',
    downloadPDF: 'Download PDF',
    notFound: 'Page not found',
    errorTitle: 'Oops…',
    errorBody: 'Something went wrong while loading content.'
  }
};

// Estado de navegação atual (para alternar idioma preservando a página)
let current = { lang: 'pt', path: '/', query: '' };

function parseHashOrRedirect() {
  const raw = location.hash.replace(/^#/, ''); // e.g. "/pt/blog?x=1"
  if (!raw || raw === '/') {
    location.replace('#/pt');
    return null;
  }
  // Garante formato /<lang>/<path...>
  const match = raw.match(/^\/(pt|en)(\/[^?]*)?(\?.*)?$/);
  if (!match) {
    // Possível hash sem idioma (ex: "#/blog"); injeta pt.
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
  if (!parsed) return; // já redirecionou
  current = parsed;

  // Atualiza UI para o idioma (título, nav, botão, atributo lang)
  updateUIForLang(current.lang);

  // Resolve rota
  const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0]; // '', 'blog', 'cv', ...
  const route = routes[seg] || renderNotFound;
  const params = new URLSearchParams(current.query.replace(/^\?/, ''));
  route(current.lang, params).catch(err => renderError(current.lang, err));
}

// ---- UI helpers
function updateUIForLang(lang) {
  const t = i18n[lang];

  document.documentElement.setAttribute('lang', lang);
  document.title = t.title;

  document.getElementById('brandLink').setAttribute('href', `#/${lang}`);
  document.getElementById('tagline').innerHTML = t.tagline;

  const map = { navHome: '', navBlog: 'blog', navCV: 'cv', navSlides: 'slides' };
  Object.entries(map).forEach(([id, p]) => {
    const a = document.getElementById(id);
    a.textContent = i18n[lang].nav[id.replace('nav','').toLowerCase()];
    a.setAttribute('href', `#/${lang}/${p}`.replace(/\/$/, ''));
  });

  const toggle = document.getElementById('langToggle');
  toggle.textContent = t.toggle;
  toggle.onclick = async () => {
    const other = lang === 'pt' ? 'en' : 'pt';
    // tenta preservar a "mesma" página ao trocar idioma
    const seg = current.path === '/' ? '' : current.path.slice(1).split('/')[0]; // '', 'blog', 'post', ...
    let targetHash = `#/${other}${current.path}${current.query}`;

    if (seg === 'post') {
      // se for um post, tenta mapear por group
      const posts = await getJSON('posts/posts.json');
      const params = new URLSearchParams(current.query.replace(/^\?/, ''));
      const slug = params.get('slug');
      const here = findPostBySlugAndLang(posts, slug, lang);
      if (here && here.group) {
        const there = counterpartByGroup(posts, here.group, other);
        if (there) targetHash = `#/${other}/post?slug=${encodeURIComponent(there.slug)}`;
        else {
          // se não existir, tenta mesmo slug no outro idioma; senão cai no índice
          const sameSlug = findPostBySlugAndLang(posts, slug, other);
          targetHash = sameSlug ? `#/${other}/post?slug=${encodeURIComponent(slug)}` : `#/${other}/blog`;
        }
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

// ---- Páginas
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

  // Carrega últimos posts do índice (filtrando por idioma)
  const res = await fetch('posts/posts.json');
  const posts = (await res.json()).filter(p => p.lang === lang);
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
  const posts = (await res.json()).filter(p => p.lang === lang);
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

  // Link para versão no outro idioma (quando existir)
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


async function renderCV(lang) {
  const path = `cv/cv.${lang}.md`;
  const res = await fetch(path);
  const md = await res.text();
  setContent(`
    <section class="card prose">
      <h1>${lang === 'pt' ? 'CV Acadêmico' : 'Academic CV'}</h1>
      <div id="cv-body">Carregando…</div>
    </section>
  `);
  document.getElementById('cv-body').innerHTML = marked.parse(md, { breaks: true });
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

  const all = await getJSON('slides/slides.json');
  const items = all.filter(s => s.lang === lang);
  const other = lang === 'pt' ? 'en' : 'pt';

  const list = document.getElementById('slides-list');
  list.innerHTML = items.map(s => {
    const htmlHref = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.html)}`;
    const pdfHref  = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.pdf)}`;

    const twin = s.group ? counterpartByGroup(all, s.group, other) : null;
    const twinLink = twin
      ? `<a href="slides/${encodeURIComponent(twin.slug)}/${encodeURIComponent(twin.html)}" target="_blank" rel="noopener" class="badge" style="text-decoration:none">
           ${lang === 'pt' ? 'Ver versão em inglês' : 'See Portuguese version'}
         </a>`
      : '';

    return `
      <div class="list-item" style="flex-wrap:wrap; gap:10px">
        <div style="min-width:250px">
          <div class="list-item-title">
            <a href="${htmlHref}" target="_blank" rel="noopener">${s.title}</a>
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">
            ${(s.event || '')} ${s.date ? '· ' + s.date : ''}
          </div>
        </div>
        <div style="display:flex; gap:10px; align-items:center">
          <a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">${t.seeOnline}</a>
          <a class="badge" href="${pdfHref}" download style="text-decoration:none">${t.downloadPDF}</a>
          ${twinLink}
        </div>
      </div>
    `;
  }).join('');
}

// Eventos
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);
