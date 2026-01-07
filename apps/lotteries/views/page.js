// apps/lotteries/views/page.js
// Renders the Lotteries app shell (sidebar + tabs) and exposes DOM helpers.

/**
 * Renders the page structure and returns helpers for the app controller.
 *
 * The controller (index.js) is responsible for:
 *  - Wiring events (Simulate button, tab clicks).
 *  - Parsing/validating inputs.
 *  - Computing models and updating tab contents.
 *
 * @param {HTMLElement} mount
 * @param {{ lang: "pt" | "en" }} ctx
 * @returns {{
 *   els: Record<string, HTMLElement>,
 *   getRawInputs: () => { values1: string, probs1: string, values2: string, probs2: string, nMax: number },
 *   setError: (lines: string[]) => void,
 *   clearError: () => void,
 *   setActiveTab: (tabId: string) => void,
 * }}
 */
export function renderPage(mount, { lang }) {
  const isEn = lang === "en";
  const title = isEn ? "Lotteries & Expected Value" : "Loterias e Valor Esperado";
  const back = isEn ? "Back to Apps" : "Voltar para Apps";

  // Labels
  const labels = {
    lottery1: isEn ? "Lottery 1" : "Loteria 1",
    lottery2: isEn ? "Lottery 2" : "Loteria 2",
    payoffs: isEn ? "Payoffs" : "Payoffs",
    probs: isEn ? "Probabilities" : "Probabilidades",
    simulations: isEn ? "Simulations" : "Simulações",
    nMax: isEn ? "Maximum number of simulations" : "Número máximo de simulações",
    simulate: isEn ? "Simulate" : "Simular",
    about: isEn ? "About" : "Sobre",
    tabL1: isEn ? "Lottery 1" : "Loteria 1",
    tabL2: isEn ? "Lottery 2" : "Loteria 2",
    comparisons: isEn ? "Simulation Comparisons" : "Comparações",
    instructions: isEn ? "Instructions" : "Instruções",
    placeholder:
      isEn
        ? "This section will be populated in the next milestones (description, charts, and simulations)."
        : "Esta seção será preenchida nas próximas etapas (descrição, gráficos e simulações).",
  };

  // Defaults from the Shiny app.
  const defaults = {
    values1: "20; 40; 0",
    probs1: "0.25; 0.25; 0.5",
    values2: "120; 140; -100",
    probs2: "0.25; 0.25; 0.5",
    nMax: 500,
  };

  mount.innerHTML = `
    <section class="card" style="padding: 0; overflow: hidden;">
      <header style="padding: 18px 18px 10px 18px; display:flex; justify-content:space-between; gap:12px; align-items:flex-start;">
        <div>
          <h1 style="margin:0; line-height: 1.15;">${title}</h1>
          <p style="margin:8px 0 0 0; opacity: .85;">
            ${labels.placeholder}
          </p>
        </div>
        <a href="#/${lang}/apps" class="btn" style="white-space:nowrap;">${back}</a>
      </header>

      <div style="display:grid; grid-template-columns: 320px 1fr; gap: 0; border-top: 1px solid rgba(0,0,0,.08);">
        <!-- Sidebar -->
        <aside style="padding: 16px 16px 18px 16px; border-right: 1px solid rgba(0,0,0,.08);">
          <div id="lotteries-error" style="display:none; margin-bottom: 12px; padding: 10px 12px; border: 1px solid rgba(220,38,38,.35); border-radius: 10px;">
            <div style="font-weight: 700; margin-bottom: 6px; color: rgb(220,38,38);">${isEn ? "Incorrect input" : "Entrada incorreta"}</div>
            <ul id="lotteries-error-list" style="margin:0; padding-left: 18px;"></ul>
          </div>

          <h3 style="margin: 0 0 10px 0;">${labels.lottery1}</h3>
          <label style="display:block; font-weight:600; margin: 8px 0 6px 0;">${labels.payoffs}</label>
          <input id="values_1" type="text" value="${defaults.values1}" style="width:100%;" />
          <label style="display:block; font-weight:600; margin: 10px 0 6px 0;">${labels.probs}</label>
          <input id="probs_1" type="text" value="${defaults.probs1}" style="width:100%;" />

          <h3 style="margin: 16px 0 10px 0;">${labels.lottery2}</h3>
          <label style="display:block; font-weight:600; margin: 8px 0 6px 0;">${labels.payoffs}</label>
          <input id="values_2" type="text" value="${defaults.values2}" style="width:100%;" />
          <label style="display:block; font-weight:600; margin: 10px 0 6px 0;">${labels.probs}</label>
          <input id="probs_2" type="text" value="${defaults.probs2}" style="width:100%;" />

          <h3 style="margin: 16px 0 10px 0;">${labels.simulations}</h3>
          <label style="display:block; font-weight:600; margin: 8px 0 6px 0;">${labels.nMax}</label>
          <input id="simulation_n" type="range" min="100" max="1000" step="50" value="${defaults.nMax}" style="width:100%;" />
          <div style="display:flex; justify-content:space-between; font-size: 12px; opacity: .85; margin-top: 4px;">
            <span>100</span>
            <span id="simulation_n_value">${defaults.nMax}</span>
            <span>1000</span>
          </div>

          <button id="simulate_btn" class="btn primary" style="width:100%; margin-top: 14px;">${labels.simulate}</button>
        </aside>

        <!-- Main content -->
        <main style="padding: 16px 18px 18px 18px;">
          <nav style="display:flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
            <button class="btn" data-tab="about">${labels.about}</button>
            <button class="btn" data-tab="lottery1">${labels.tabL1}</button>
            <button class="btn" data-tab="lottery2">${labels.tabL2}</button>
            <button class="btn" data-tab="comparisons">${labels.comparisons}</button>
            <button class="btn" data-tab="instructions">${labels.instructions}</button>
          </nav>

          <section id="tab_about" data-tab-panel="about"></section>
          <section id="tab_lottery1" data-tab-panel="lottery1" hidden></section>
          <section id="tab_lottery2" data-tab-panel="lottery2" hidden></section>
          <section id="tab_comparisons" data-tab-panel="comparisons" hidden></section>
          <section id="tab_instructions" data-tab-panel="instructions" hidden></section>
        </main>
      </div>
    </section>
  `;

  const els = {
    errorBox: mount.querySelector("#lotteries-error"),
    errorList: mount.querySelector("#lotteries-error-list"),
    values1: mount.querySelector("#values_1"),
    probs1: mount.querySelector("#probs_1"),
    values2: mount.querySelector("#values_2"),
    probs2: mount.querySelector("#probs_2"),
    nMax: mount.querySelector("#simulation_n"),
    nMaxValue: mount.querySelector("#simulation_n_value"),
    simulateBtn: mount.querySelector("#simulate_btn"),
    tabButtons: Array.from(mount.querySelectorAll("button[data-tab]")),
    tabPanels: Array.from(mount.querySelectorAll("[data-tab-panel]")),
    tabAbout: mount.querySelector("#tab_about"),
    tabLottery1: mount.querySelector("#tab_lottery1"),
    tabLottery2: mount.querySelector("#tab_lottery2"),
    tabComparisons: mount.querySelector("#tab_comparisons"),
    tabInstructions: mount.querySelector("#tab_instructions"),
  };

  // Seed tab contents with placeholders for now.
  els.tabAbout.innerHTML = `
    <h2 style="margin-top:0;">${labels.about}</h2>
    <p style="margin: 8px 0;">${labels.placeholder}</p>
  `;
  els.tabLottery1.innerHTML = `<h2 style="margin-top:0;">${labels.tabL1}</h2><p>${labels.placeholder}</p>`;
  els.tabLottery2.innerHTML = `<h2 style="margin-top:0;">${labels.tabL2}</h2><p>${labels.placeholder}</p>`;
  els.tabComparisons.innerHTML = `<h2 style="margin-top:0;">${labels.comparisons}</h2><p>${labels.placeholder}</p>`;
  els.tabInstructions.innerHTML = `<h2 style="margin-top:0;">${labels.instructions}</h2><p>${labels.placeholder}</p>`;

  // Keep the slider label in sync.
  els.nMax.addEventListener("input", () => {
    els.nMaxValue.textContent = String(Number(els.nMax.value));
  });

  function getRawInputs() {
    return {
      values1: String(els.values1.value ?? ""),
      probs1: String(els.probs1.value ?? ""),
      values2: String(els.values2.value ?? ""),
      probs2: String(els.probs2.value ?? ""),
      nMax: Number(els.nMax.value),
    };
  }

  function setError(lines) {
    els.errorList.innerHTML = "";
    for (const line of lines) {
      const li = document.createElement("li");
      li.textContent = line;
      els.errorList.appendChild(li);
    }
    els.errorBox.style.display = "block";
  }

  function clearError() {
    els.errorBox.style.display = "none";
    els.errorList.innerHTML = "";
  }

  function setActiveTab(tabId) {
    for (const btn of els.tabButtons) {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("primary", isActive);
    }
    for (const panel of els.tabPanels) {
      const isTarget = panel.dataset.tabPanel === tabId;
      panel.hidden = !isTarget;
    }
  }

  // Default tab.
  setActiveTab("about");

  return { els, getRawInputs, setError, clearError, setActiveTab };
}
