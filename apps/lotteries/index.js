// Lotteries app entry (skeleton).
// Must export `mountApp(mount, { lang })` for the central router.

import { renderPage } from "./views/page.js";

export async function mountApp(mount, { lang }) {
  function ensureAppStyles() {
  const id = "lotteries-app-styles";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "apps/lotteries/styles.css";
  document.head.appendChild(link);
}
  ensureAppStyles();
  renderPage(mount, { lang });
}
