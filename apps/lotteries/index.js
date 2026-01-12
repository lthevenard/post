// apps/lotteries/index.js
// Lotteries app entry. Must export `mountApp(mount, { lang })` for the central router.

import { renderPage } from "./views/page.js";
import { createAppState } from "./controller/state.js";
import { runSimulation } from "./controller/actions.js";
import { renderAfterSimulation } from "./controller/render.js";
import { wireTabs } from "./wiring/tabs.js";
import { wireInputs } from "./wiring/inputs.js";
import { wireSeed } from "./wiring/seed.js";

function ensureAppStyles() {
  const id = "lotteries-app-styles";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "apps/lotteries/styles.css";
  document.head.appendChild(link);
}

export async function mountApp(mount, { lang }) {
  ensureAppStyles();

  const ui = renderPage(mount, { lang });
  const state = createAppState({ lang });
  wireInputs(ui, state);
  wireSeed(ui, state);
  wireTabs(ui);

  ui.els.simulateBtn.addEventListener("click", () => {
    const res = runSimulation(state, state.inputs);

    if (!res.ok) {
      ui.setError(res.errors);
      ui.setActiveTab("home");
      return;
    }

    ui.clearError();

    renderAfterSimulation(ui, state);

    // comportamento atual: após simular, jogar para Lottery 1
    ui.setActiveTab("lottery1");
  });
}
