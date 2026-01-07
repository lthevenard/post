// Lotteries app entry (skeleton).
// Must export `mountApp(mount, { lang })` for the central router.

import { renderPage } from "./views/page.js";

export async function mountApp(mount, { lang }) {
  renderPage(mount, { lang });
}
