// Central apps router + lazy loader (skeleton only)

import { loadAppsCatalog } from "./shared/catalog.js";

export async function renderAppsIndex(mount, { route }) {
  const lang = route.startsWith("/en") ? "en" : "pt";
  const apps = await loadAppsCatalog();

  const title = lang === "en" ? "Apps" : "Apps";
  const intro = lang === "en"
    ? "Interactive tools hosted inside this site."
    : "Ferramentas interativas hospedadas dentro deste site.";

  const list = apps.map(a => `
    <li class="list-item">
      <a href="#/${lang}/apps/${a.slug}"><strong>${a.title[lang] || a.title.pt}</strong></a>
      <div class="muted">${a.description[lang] || a.description.pt}</div>
      <div class="badge-row">${(a.tags?.[lang] || a.tags?.pt || []).map(t => `<span class="badge">${t}</span>`).join("")}</div>
    </li>
  `).join("");

  mount.innerHTML = `
    <section class="card">
      <h1>${title}</h1>
      <p>${intro}</p>
      <ul class="list">${list}</ul>
    </section>
  `;
}

export async function renderAppRoute(mount, { route }) {
  const lang = route.startsWith("/en") ? "en" : "pt";
  const slug = route.split("/").pop();

  // Lazy load app entry
  // NOTE: each app exports `mountApp(mount, { lang })`
  try {
    const mod = await import(`./${slug}/index.js`);
    if (!mod?.mountApp) throw new Error("App entry must export mountApp()");
    await mod.mountApp(mount, { lang });
  } catch (err) {
    mount.innerHTML = `
      <section class="card">
        <h1>App not found</h1>
        <p>Slug: <code>${slug}</code></p>
        <p><a href="#/${lang}/apps">Back to Apps</a></p>
      </section>
    `;
    console.error(err);
  }
}
