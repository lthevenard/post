// apps/lotteries/views/page.js
// Renders the Lotteries app shell (sidebar + tabs) and exposes DOM helpers.

export function renderPage(mount, { lang }) {
  const isEn = lang === "en";

  const labels = {
    title: isEn ? "Lotteries & Expected Value" : "Loterias e Valor Esperado",
    back: isEn ? "Back to Apps" : "Voltar para Apps",
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
    incorrect: isEn ? "Incorrect input" : "Entrada incorreta",
  };

  const defaults = {
    values1: "20; 40; 0",
    probs1: "0.25; 0.25; 0.5",
    values2: "120; 140; -100",
    probs2: "0.25; 0.25; 0.5",
    nMax: 1000,
  };

  mount.innerHTML = `
    <section class="lotteries-fullbleed">
      <div class="lotteries-surface">
        <header class="lotteries-header">
          <div class="lotteries-brand">
            <div class="lotteries-logo-tile" aria-hidden="true">
              <img class="lotteries-logo" src="apps/lotteries/assets/logo.png" alt="" />
            </div>

            <div>
              <h1 class="lotteries-title">${labels.title}</h1>
              <p class="lotteries-subtitle">
                ${isEn ? "Simulate lotteries to understand concepts such as expected value, dispersion, and convergence of sample means." : "Simule loterias para entender conceitos como o de valor esperado, dispersão e convergência da média."}
              </p>
            </div>
          </div>

          <a href="#/${lang}/apps" class="lotteries-link-btn">${labels.back}</a>
        </header>


        <div class="lotteries-grid">
          <aside class="lotteries-sidebar">
            <div id="lotteries-error" style="display:none; margin-bottom: 12px; padding: 10px 12px; border: 1px solid rgba(220,38,38,.35); border-radius: 10px;">
              <div style="font-weight: 800; margin-bottom: 6px; color: rgb(220,38,38);">${labels.incorrect}</div>
              <ul id="lotteries-error-list" style="margin:0; padding-left: 18px;"></ul>
            </div>

            <h3 style="margin: 0 0 10px 0;">${labels.lottery1}</h3>
            <label style="display:block; font-weight:650; margin: 8px 0 6px 0;">${labels.payoffs}</label>
            <input id="values_1" type="text" value="${defaults.values1}" />
            <label style="display:block; font-weight:650; margin: 10px 0 6px 0;">${labels.probs}</label>
            <input id="probs_1" type="text" value="${defaults.probs1}" />

            <h3 style="margin: 16px 0 10px 0;">${labels.lottery2}</h3>
            <label style="display:block; font-weight:650; margin: 8px 0 6px 0;">${labels.payoffs}</label>
            <input id="values_2" type="text" value="${defaults.values2}" />
            <label style="display:block; font-weight:650; margin: 10px 0 6px 0;">${labels.probs}</label>
            <input id="probs_2" type="text" value="${defaults.probs2}" />

            <h3 style="margin: 16px 0 10px 0;">${labels.simulations}</h3>
            <label style="display:block; font-weight:650; margin: 8px 0 6px 0;">
              ${labels.nMax}:
              <span id="simulation_n_value" style="color: var(--link); font-weight: 800;">
                ${defaults.nMax}
              </span>
            </label>
            <input id="simulation_n" type="range" min="100" max="2000" step="50" value="${defaults.nMax}" />
            <div style="display:flex; justify-content:space-between; font-size: 12px; opacity: .85; margin-top: 4px;">
              <span>100</span>
              <span>2000</span>
            </div>

            <button id="simulate_btn" class="lotteries-cta" type="button">${labels.simulate}</button>

            <div class="lottery-card" style="margin-top: 12px;">
              <div class="lottery-card-title">${isEn ? "Random seed" : "Seed aleatório"}</div>

              <div style="display:flex; flex-direction:column; gap:10px;">
                <label style="display:flex; gap:8px; align-items:center; cursor:pointer;">
                  <input type="radio" name="seed_mode" value="auto" checked />
                  <span>${isEn ? "Generate random seed" : "Gerar seed aleatório"}</span>
                </label>

                <label style="display:flex; gap:8px; align-items:center; cursor:pointer;">
                  <input type="radio" name="seed_mode" value="manual" />
                  <span>${isEn ? "Provide seed" : "Informar o seed"}</span>
                </label>

                <div id="seed_manual_wrap" style="display:none;">
                  <label style="display:block; font-weight:650; margin: 0 0 6px 0;">
                    ${isEn ? "Seed (10000–99999)" : "Seed (10000–99999)"}
                  </label>
                  <input id="seed_manual" type="number" min="10000" max="99999" step="1" placeholder="12345" />
                  <div style="font-size:12px; opacity:.8; margin-top:6px;">
                    ${isEn ? "Use a 5-digit integer for reproducible results." : "Use um inteiro de 5 dígitos para reproduzir os resultados."}
                  </div>
                </div>
              </div>
            </div>

          </aside>

          <main class="lotteries-main">
            <nav class="lotteries-tabs" role="tablist" aria-label="Lotteries tabs">
              <button class="lotteries-tab" data-tab="about" role="tab" aria-selected="false">${labels.about}</button>
              <button class="lotteries-tab" data-tab="lottery1" role="tab" aria-selected="false">${labels.tabL1}</button>
              <button class="lotteries-tab" data-tab="lottery2" role="tab" aria-selected="false">${labels.tabL2}</button>
              <button class="lotteries-tab" data-tab="comparisons" role="tab" aria-selected="false">${labels.comparisons}</button>
              <button class="lotteries-tab" data-tab="instructions" role="tab" aria-selected="false">${labels.instructions}</button>
            </nav>

            <section id="tab_about" data-tab-panel="about"></section>
            <section id="tab_lottery1" data-tab-panel="lottery1" hidden></section>
            <section id="tab_lottery2" data-tab-panel="lottery2" hidden></section>
            <section id="tab_comparisons" data-tab-panel="comparisons" hidden></section>
            <section id="tab_instructions" data-tab-panel="instructions" hidden></section>
          </main>
        </div>
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
    tabButtons: Array.from(mount.querySelectorAll(".lotteries-tab")),
    tabPanels: Array.from(mount.querySelectorAll("[data-tab-panel]")),
    tabAbout: mount.querySelector("#tab_about"),
    tabLottery1: mount.querySelector("#tab_lottery1"),
    tabLottery2: mount.querySelector("#tab_lottery2"),
    tabComparisons: mount.querySelector("#tab_comparisons"),
    tabInstructions: mount.querySelector("#tab_instructions"),
    seedRadios: Array.from(mount.querySelectorAll('input[name="seed_mode"]')),
    seedManualWrap: mount.querySelector("#seed_manual_wrap"),
    seedManual: mount.querySelector("#seed_manual"),
  };

  // Basic initial content (Milestone A).
  els.tabAbout.innerHTML = `
    <h2 style="margin-top:0;">${labels.about}</h2>
    <p style="margin: 8px 0;">
      ${
        isEn
          ? "Click “Simulate” to validate inputs. This milestone prints parsed inputs as a quick test."
          : "Clique em “Simular” para validar as entradas. Este milestone imprime os inputs interpretados como teste rápido."
      }
    </p>
  `;

  els.tabInstructions.innerHTML = `
    <h2 style="margin-top:0;">${labels.instructions}</h2>
    <ul style="margin: 8px 0; padding-left: 18px;">
      <li>${isEn ? "Use semicolons to separate numbers: 20; 40; 0" : "Use ponto-e-vírgula para separar números: 20; 40; 0"}</li>
      <li>${isEn ? "Use '.' for decimals: 0.25; 0.5" : "Use '.' para decimais: 0.25; 0.5"}</li>
      <li>${isEn ? "Probabilities must sum to 1." : "As probabilidades devem somar 1."}</li>
    </ul>
  `;

  els.tabLottery1.innerHTML = `<h2 style="margin-top:0;">${labels.tabL1}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;
  els.tabLottery2.innerHTML = `<h2 style="margin-top:0;">${labels.tabL2}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;
  els.tabComparisons.innerHTML = `<h2 style="margin-top:0;">${labels.comparisons}</h2><p style="opacity:.8;">${isEn ? "Not implemented in Milestone A." : "Não implementado no Milestone A."}</p>`;

  // Keep slider label and fill in sync.
  function updateRangeFill() {
    const min = Number(els.nMax.min);
    const max = Number(els.nMax.max);
    const val = Number(els.nMax.value);
    const pct = ((val - min) / (max - min)) * 100;
    els.nMax.style.setProperty("--fill", `${pct}%`);
  }

  els.nMax.addEventListener("input", () => {
    els.nMaxValue.textContent = String(Number(els.nMax.value));
    updateRangeFill();
  });

  updateRangeFill();

  function getRawInputs() {
    return {
      values1: String(els.values1.value ?? ""),
      probs1: String(els.probs1.value ?? ""),
      values2: String(els.values2.value ?? ""),
      probs2: String(els.probs2.value ?? ""),
      nMax: Number(els.nMax.value),
      seedMode: els.seedRadios.find((r) => r.checked)?.value ?? "auto",
      seedManual: String(els.seedManual?.value ?? ""),
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
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    for (const panel of els.tabPanels) {
      panel.hidden = panel.dataset.tabPanel !== tabId;
    }
  }

  setActiveTab("about");

  function syncSeedUI() {
    const mode = els.seedRadios.find((r) => r.checked)?.value ?? "auto";
    els.seedManualWrap.style.display = mode === "manual" ? "block" : "none";
  }

  for (const r of els.seedRadios) r.addEventListener("change", syncSeedUI);
  syncSeedUI();


  return { els, getRawInputs, setError, clearError, setActiveTab };
}
