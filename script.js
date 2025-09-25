/* SPA simples por hash + fetch de Markdown/JSON */
const app = document.getElementById('app');
document.getElementById('year').textContent = new Date().getFullYear();

const routes = {
  '/': renderHome,
  '/blog': renderBlogIndex,
  '/post': renderBlogPost,     // /post?slug=arquivo-sem-md
  '/cv': renderCV,
  '/slides': renderSlides
};

function navigate() {
  const { hash } = window.location;
  const [path, query] = hash.replace(/^#/, '').split('?');
  const route = routes[path || '/'] || renderNotFound;
  const params = new URLSearchParams(query || '');
  route(params).catch(err => renderError(err));
}
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

function setContent(html) {
  app.innerHTML = html;
}

function renderError(err) {
  setContent(`
    <section class="card prose">
      <h1>Ops…</h1>
      <p>Algo deu errado ao carregar o conteúdo.</p>
      <pre><code>${(err && (err.message || err)) || 'Erro desconhecido'}</code></pre>
    </section>
  `);
}

function renderNotFound() {
  setContent(`
    <section class="card prose">
      <h1>Página não encontrada</h1>
      <p>O caminho solicitado não existe.</p>
      <p><a href="#/">Voltar ao início</a></p>
    </section>
  `);
  return Promise.resolve();
}

async function renderHome() {
  setContent(`
    <section class="card prose">
      <h1>Bem-vindo!</h1>
      <p>Este é o site de <strong>Lucas Thevenard</strong>, com textos sobre regulação,
         ciência de dados e participação social. Aqui você encontra meu <a href="#/blog">blog</a>,
         meu <a href="#/cv">CV acadêmico</a> e um repositório de <a href="#/slides">slides</a> (Marp).</p>
    </section>
    <section class="card">
      <div class="list" id="latest"></div>
    </section>
  `);

  // carrega últimos posts do índice
  const res = await fetch('posts/posts.json');
  const posts = await res.json();
  const latest = posts.slice(0, 3);
  const list = document.getElementById('latest');
  list.innerHTML = `
    <div class="list-item" style="background:transparent;border:none;padding:0">
      <div class="list-item-title">Últimos posts</div>
    </div>
    ${latest.map(p => `
      <div class="list-item">
        <div>
          <div class="list-item-title">
            <a href="#/post?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
          </div>
          <div class="muted" style="color:#9ca3af;font-size:.9rem">${p.date} · ${p.tags.join(', ')}</div>
        </div>
        <span class="badge">Blog</span>
      </div>
    `).join('')}
    <div class="list-item">
      <a href="#/blog">Ver todos os posts →</a>
    </div>
  `;
}

async function renderBlogIndex() {
  setContent(`
    <section class="card prose">
      <h1>Blog</h1>
      <p>Textos sobre regulação, AIR/ARR, participação, NLP e mais.</p>
    </section>
    <section class="card">
      <div class="list" id="blog-list"></div>
    </section>
  `);
  const res = await fetch('posts/posts.json');
  const posts = await res.json();
  const list = document.getElementById('blog-list');
  list.innerHTML = posts.map(p => `
    <div class="list-item">
      <div>
        <div class="list-item-title">
          <a href="#/post?slug=${encodeURIComponent(p.slug)}">${p.title}</a>
        </div>
        <div class="muted" style="color:#9ca3af;font-size:.9rem">${p.date} · ${p.tags.join(', ')}</div>
      </div>
      <span class="badge">Post</span>
    </div>
  `).join('');
}

async function renderBlogPost(params) {
  const slug = params.get('slug');
  if (!slug) return renderNotFound();
  const mdPath = `posts/${slug}.md`;
  const res = await fetch(mdPath);
  if (!res.ok) throw new Error(`Não foi possível carregar ${mdPath}`);
  const md = await res.text();
  setContent(`
    <article class="card prose" id="post"></article>
    <div class="card"><a href="#/blog">← Voltar ao blog</a></div>
  `);
  document.getElementById('post').innerHTML = marked.parse(md, { breaks: true });
}

async function renderCV() {
  setContent(`
    <section class="card prose">
      <h1>CV Acadêmico</h1>
      <div id="cv-body">Carregando…</div>
    </section>
  `);
  const res = await fetch('cv/cv.md');
  const md = await res.text();
  document.getElementById('cv-body').innerHTML = marked.parse(md, { breaks: true });
}

async function renderSlides() {
  setContent(`
    <section class="card prose">
      <h1>Slides</h1>
      <p>Cada apresentação possui sua própria pasta em <code>/slides/&lt;slug&gt;/</code>, com
         um arquivo <strong>HTML</strong> para visualização online e um <strong>PDF</strong> para download.</p>
    </section>
    <section class="card">
      <div class="list" id="slides-list"></div>
    </section>
  `);

  const res = await fetch('slides/slides.json');
  const items = await res.json();

  const list = document.getElementById('slides-list');
  list.innerHTML = items.map(s => {
    const htmlHref = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.html)}`;
    const pdfHref  = `slides/${encodeURIComponent(s.slug)}/${encodeURIComponent(s.pdf)}`;
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
          <a class="badge" href="${htmlHref}" target="_blank" rel="noopener" style="text-decoration:none">Ver online</a>
          <a class="badge" href="${pdfHref}" download style="text-decoration:none">Baixar PDF</a>
        </div>
      </div>
    `;
  }).join('');
}
