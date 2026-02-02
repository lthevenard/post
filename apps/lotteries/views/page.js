// ============================================================================
// Page Shell & Layout
// ============================================================================

// ============================================================================
// KaTeX Loader (One-Time)
// ============================================================================

/**
 * Loads KaTeX + auto-render via CDN once and exposes:
 * window.__lotteriesKatexReady
 * @returns {Promise<void>}
 */
function ensureKatexLoaded() {
  // If already ready, return a resolved promise.
  if (window.renderMathInElement) return Promise.resolve();

  // If a load is already in progress, reuse it.
  if (window.__lotteriesKatexReady) return window.__lotteriesKatexReady;

  const KATEX_VERSION = "0.16.9";

  /**
   * Loads a script tag and resolves when it finishes.
   * @param {string} src
   * @returns {Promise<void>}
   */
  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });

  /**
   * Loads a CSS file if it isn't already present.
   * @param {string} href
   * @returns {void}
   */
  const loadCSS = (href) => {
    // Avoid duplicates.
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')].some(
      (l) => l.href === href
    );
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  // Start loading (store promise globally).
  window.__lotteriesKatexReady = (async () => {
    loadCSS(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`);

    await loadScript(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`);
    await loadScript(
      `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/contrib/auto-render.min.js`
    );

    // Auto-render sets window.renderMathInElement.
    if (!window.renderMathInElement) {
      throw new Error("KaTeX loaded but renderMathInElement is not available.");
    }
  })();

  return window.__lotteriesKatexReady;
}

// ============================================================================
// Page Renderer
// ============================================================================
/**
 * Renders the app shell and returns DOM handles + helpers.
 * @param {HTMLElement} mount
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {object}
 */
export function renderPage(mount, { lang }) {
  // Load KaTeX once (non-blocking). Tabs will render math when ready.
  ensureKatexLoaded().catch(() => {
    // Fail silently: the app works without math rendering if CDN is blocked.
  });
  const isEn = lang === "en";

  const labels = {
    title: isEn ? "Lottery Simulator" : "Simulador de Loterias",
    back: isEn ? "Back to Apps" : "Voltar para Apps",
    lottery1: isEn ? "Lottery 1" : "Loteria 1",
    lottery2: isEn ? "Lottery 2" : "Loteria 2",
    payoffs: isEn ? "Payoffs" : "Payoffs",
    probs: isEn ? "Probabilities" : "Probabilidades",
    simulations: isEn ? "Simulations" : "Simulações",
    nMax: isEn ? "Maximum number of simulations" : "Número máximo de simulações",
    simulate: isEn ? "Simulate" : "Simular",
    home: isEn ? "Home" : "Início",
    tabL1: isEn ? "Lottery 1" : "Loteria 1",
    tabL2: isEn ? "Lottery 2" : "Loteria 2",
    convergence: isEn ? "Convergence" : "Convergência",
    dispersion: isEn ? "Dispersion" : "Dispersão",
    about: isEn ? "About" : "Sobre",
    title_about: isEn ? "About this project" : "Sobre este projeto",
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
              <div class="lottery-card-title">${isEn ? "Seed" : "Seed"}</div>

              <div style="display:flex; flex-direction:column; gap:10px;">
                <label style="display:flex; gap:8px; align-items:center; cursor:pointer;">
                  <input id="seed_mode_auto" type="radio" name="seed_mode" value="auto" checked />
                  <span>${isEn ? "Generate random seed" : "Gerar seed aleatório"}</span>
                </label>

                <label style="display:flex; gap:8px; align-items:center; cursor:pointer;">
                  <input id="seed_mode_manual" type="radio" name="seed_mode" value="manual" />
                  <span>${isEn ? "Provide seed" : "Informar o seed"}</span>
                </label>

                <div id="seed_manual_wrap" style="display:none;">
                  <label style="display:block; font-weight:650; margin: 0 0 6px 0;">
                    ${isEn ? "Seed (10000–99999)" : "Seed (10000–99999)"}
                  </label>
                  <input id="seed_manual_input" type="number" min="10000" max="99999" step="1" placeholder="12345" />
                  <div style="font-size:12px; opacity:.8; margin-top:6px;">
                    ${isEn ? "Use a 5-digit integer for reproducible results." : "Use um inteiro de 5 dígitos para reproduzir os resultados."}
                  </div>
                </div>
              </div>
            </div>

          </aside>

          <main class="lotteries-main">
            <nav class="lotteries-tabs" role="tablist" aria-label="Lotteries tabs">
              <button class="lotteries-tab" data-tab="home" role="tab" aria-selected="false">${labels.home}</button>
              <button class="lotteries-tab" data-tab="lottery1" role="tab" aria-selected="false">${labels.tabL1}</button>
              <button class="lotteries-tab" data-tab="lottery2" role="tab" aria-selected="false">${labels.tabL2}</button>
              <button class="lotteries-tab" data-tab="dispersion" role="tab" aria-selected="false">${labels.dispersion}</button>
              <button class="lotteries-tab" data-tab="convergence" role="tab" aria-selected="false">${labels.convergence}</button>
              <button class="lotteries-tab" data-tab="about" role="tab" aria-selected="false">${labels.about}</button>
            </nav>

            <section id="tab_home" data-tab-panel="home"></section>
            <section id="tab_lottery1" data-tab-panel="lottery1" hidden></section>
            <section id="tab_lottery2" data-tab-panel="lottery2" hidden></section>
            <section id="tab_dispersion" data-tab-panel="dispersion" hidden></section>
            <section id="tab_convergence" data-tab-panel="convergence" hidden></section>
            <section id="tab_about" data-tab-panel="about" hidden></section>

          </main>
        </div>
      </div>
    </section>
  `;

  const els = {
    errorBox: mount.querySelector("#lotteries-error"),
    errorList: mount.querySelector("#lotteries-error-list"),
    sidebar: mount.querySelector(".lotteries-sidebar"),
    values1: mount.querySelector("#values_1"),
    probs1: mount.querySelector("#probs_1"),
    values2: mount.querySelector("#values_2"),
    probs2: mount.querySelector("#probs_2"),
    nMax: mount.querySelector("#simulation_n"),
    nMaxValue: mount.querySelector("#simulation_n_value"),
    simulateBtn: mount.querySelector("#simulate_btn"),
    tabButtons: Array.from(mount.querySelectorAll(".lotteries-tab")),
    tabPanels: Array.from(mount.querySelectorAll("[data-tab-panel]")),
    tabHome: mount.querySelector("#tab_home"),
    tabLottery1: mount.querySelector("#tab_lottery1"),
    tabLottery2: mount.querySelector("#tab_lottery2"),
    tabDispersion: mount.querySelector("#tab_dispersion"),
    tabConvergence: mount.querySelector("#tab_convergence"),
    tabAbout: mount.querySelector("#tab_about"),
    seedModeAuto: mount.querySelector("#seed_mode_auto"),
    seedModeManual: mount.querySelector("#seed_mode_manual"),
    seedManualWrap: mount.querySelector("#seed_manual_wrap"),
    seedManualInput: mount.querySelector("#seed_manual_input"),
  };

  // Basic initial content.
  els.tabHome.innerHTML = `
    <h2 style="margin-top:0;">${labels.home}</h2>

    <p style="margin: 8px 0;">
      ${
        isEn
          ? `
            <strong>Welcome!</strong><br><br>
            This application simulates simple lotteries to help you intuitively explore some core concepts of decision theory under risk. Using lists of payoffs and probabilities, the app computes theoretical results and shows how they relate to behavior observed in repeated simulations.
            <br><br>
            In particular, the app's objective is to help students clarify the idea of <strong>expected value</strong> as a measure of a lottery’s average return, as well as the <strong>dispersion of outcomes</strong>, which captures how far possible gains or losses deviate from that average. Two lotteries may share the same expected value while involving very different levels of risk—something that becomes clear when comparing their distributions.
            <br><br>
            The app also illustrates the concept of <strong>convergence of frequencies</strong>: as the number of simulations increases, the observed proportions of each outcome tend to approach their theoretical probabilities. The Convergence tab allows you to visualize this process step by step, showing how randomness gradually gives rise to stable patterns.
            <br><br>
            The purpose of this simulator is to offer a visual and interactive tool for understanding how decisions under risk can be analyzed systematically, connecting theoretical formulas to observed behavior in simulations.
          `
          : `
            <strong>Bem-vindo!</strong><br><br>
            Este aplicativo permite simular loterias simples para explorar, de forma intuitiva, alguns conceitos centrais da teoria da decisão sob risco. A partir de listas de ganhos (ou perdas) e probabilidades, o app calcula resultados teóricos e mostra como eles se relacionam com o comportamento observado em simulações repetidas.
            <br><br>
            Em particular, o objetivo do app é ajudar o aluno a compreender o <strong>valor esperado</strong> como uma medida de retorno médio de uma loteria, bem como a <strong>dispersão dos resultados</strong>, que indica o quanto os possíveis ganhos ou perdas se afastam desse valor médio. Embora duas loterias possam ter o mesmo valor esperado, elas podem envolver níveis de risco bastante diferentes — e essa diferença fica clara ao comparar suas distribuições.
            <br><br>
            Além disso, o aplicativo ilustra a ideia de <strong>convergência das frequências</strong>: à medida que o número de simulações aumenta, as proporções observadas de cada resultado tendem a se aproximar das probabilidades teóricas. A aba de Convergência permite visualizar esse processo passo a passo, mostrando como resultados aleatórios se organizam gradualmente em padrões estáveis.
            <br><br>
            O propósito deste simulador é oferecer uma ferramenta visual e interativa para entender como decisões sob risco podem ser analisadas de forma sistemática, conectando fórmulas teóricas a comportamentos observados em simulações.
          `
      }
    </p>

    <div class="lottery-card" style="margin: 12px 0;">
      <div class="lottery-card-title">${isEn ? "How to use" : "Como usar"}</div>
      <ol style="margin: 8px 0; padding-left: 18px;">
        <li>${isEn ? "Edit payoffs and probabilities for Lottery 1 and Lottery 2 in the sidebar." : "Edite os payoffs e probabilidades da Loteria 1 e da Loteria 2 na barra lateral."}</li>
        <li>${isEn ? "Adjust the maximum number of simulations (Nmax)." : "Ajuste o número máximo de simulações (Nmax)."}</li>
        <li>${isEn ? "Click “Simulate” to run the model and populate the tabs." : "Clique em “Simular” para rodar o modelo e preencher as abas."}</li>
        <li>${isEn ? "Use the Convergence tab to explore results for different N and play the animation." : "Use a aba de Convergência para explorar resultados para diferentes N e rodar a animação."}</li>
      </ol>
    </div>

    <div class="lottery-card" style="margin: 12px 0;">
      <div class="lottery-card-title">${isEn ? "Input format" : "Formato dos inputs"}</div>
      <ul style="margin: 8px 0; padding-left: 18px;">
        <li>${isEn ? "Separate numbers with semicolons: 20; 40; 0" : "Separe números com ponto-e-vírgula: 20; 40; 0"}</li>
        <li>${isEn ? "Use '.' for decimals: 0.25; 0.5" : "Use '.' para decimais: 0.25; 0.5"}</li>
        <li>${isEn ? "Probabilities must sum to 1." : "As probabilidades devem somar 1."}</li>
      </ul>
    </div>
  `;

  // ------------------------------------------------------------------------
  // Mobile-only DOM adaptation:
  // Move the left "inputs" sidebar inside the Home tab panel.
  //
  // Why: in portrait mobile, those controls are typically set once, so they
  // should live in the Home/Start flow instead of staying always visible.
  //
  // Important: we use (pointer: coarse) to avoid affecting narrow desktop
  // windows. Desktop layout remains unchanged.
  // ------------------------------------------------------------------------

  // Robust "mobile" detection:
  // - width <= 980px (chosen breakpoint)
  // - AND a touch/phone-like interaction environment
  const mqWidth = window.matchMedia("(max-width: 980px)");
  const mqNoHover = window.matchMedia("(hover: none)");
  const hasTouch = () =>
    (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) ||
    ("ontouchstart" in window);

  /**
   * Returns true when we should use the mobile-specific layout.
   * @returns {boolean}
   */
  function isMobileLikeRestrictive() {
    return mqWidth.matches && (mqNoHover.matches || hasTouch());
  }
  /**
   * Returns true when the viewport is within the mobile breakpoint.
   * @returns {boolean}
   */
  function isMobileLike() {
    return mqWidth.matches;
  }

  const sidebarState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  /**
   * Moves or restores the sidebar based on viewport size.
   * @returns {void}
   */
  function applyMobileSidebarPlacement() {

    const isMobile = isMobileLike();

    if (isMobile && !sidebarState.moved) {
      // Save original placement so we can restore later.
      sidebarState.originalParent = els.sidebar?.parentNode || null;
      sidebarState.originalNextSibling = els.sidebar?.nextSibling || null;

      // Move sidebar into Home tab (top).
      if (els.sidebar && els.tabHome) {
        els.tabHome.append(els.sidebar);
        els.sidebar.classList.add("is-mobile-in-home");
        sidebarState.moved = true;
      }
    }

    if (!isMobile && sidebarState.moved) {
      // Restore to original place (grid sidebar on desktop).
      if (els.sidebar && sidebarState.originalParent) {
        sidebarState.originalParent.insertBefore(
          els.sidebar,
          sidebarState.originalNextSibling
        );
      }
      if (els.sidebar) els.sidebar.classList.remove("is-mobile-in-home");
      sidebarState.moved = false;
    }
  }

  // Apply once on load and on viewport changes.
  applyMobileSidebarPlacement();

  /**
   * Binds a media query change listener with Safari fallback.
   * @param {MediaQueryList} mq
   * @returns {void}
   */
  const bindMQ = (mq) => {
    if (mq.addEventListener) mq.addEventListener("change", applyMobileSidebarPlacement);
    else mq.addListener(applyMobileSidebarPlacement); // Safari fallback
  };

  bindMQ(mqWidth);
  window.addEventListener("resize", applyMobileSidebarPlacement, { passive: true });

  els.tabAbout.innerHTML = `
    <h2 style="margin-top:0;">${labels.title_about}</h2>
    <p style="margin: 8px 0;">
      ${
        isEn
          ? `
            This application was developed as an educational tool to help Law students better understand the concept of <strong>expected value</strong> in the context of decisions under risk. It is part of a Decision Theory course at FGV Rio Law, in which students engage with the problem of evaluating multiple <em>states of the world</em> when the consequences of a decision depend on uncertain events.
            <br><br>
            In the course, the metaphor of a <strong>lottery</strong> is used as a simplified representation of this evaluation problem. Each lottery is defined by a finite set of possible outcomes and known probabilities. The first analytical method students learn is how to compute the expected value of such lotteries. In practical terms, the central question becomes: <em>how much would you be willing to pay for a lottery ticket that can generate different outcomes with given probabilities?</em>
            <br><br>
            The idea behind this app is to allow students to explore this reasoning interactively by simulating different lotteries and comparing <strong>observed simulation results</strong> with <strong>theoretical values</strong>. By repeating the experiment many times, the app illustrates why—and in what sense—the mean outcome of a probabilistic experiment tends to approach its expected value.
            <br><br>
            A second core objective of the app is to highlight the <strong>limitations of expected value</strong> as an evaluation criterion. In particular, expected value ignores important information about the <strong>dispersion of outcomes</strong>, that is, the degree of variability or risk associated with a lottery. For this reason, the app allows users to compare two lotteries with the same expected value but very different outcome distributions. 
            <br><br>
            The structure of the app reflects these analytical dimensions. The <strong>Lottery 1</strong> and <strong>Lottery 2</strong> tabs present tables and summaries that make these differences explicit. The <strong>Dispersion</strong> tab explores how experimental mean returns are distributed around the expected value using scatter plots, while the <strong>Convergence</strong> tab shows how observed outcome frequencies evolve as the number of simulations increases.
            <br><br>
            This project is under continuous development and will be expanded gradually as new ideas and features are incorporated. The app is intended to function as an <strong>experimental environment</strong>, where students can test intuitions, visualize abstract concepts, and deepen their understanding of decision-making under risk.
          `
          : `
            Este aplicativo foi desenvolvido como uma ferramenta educacional para ajudar estudantes de Direito a compreender melhor o conceito de <strong>valor esperado</strong> no contexto de decisões sob risco. Ele integra o curso de Teoria da Decisão da FGV Direito Rio, no qual os alunos lidam com o problema de avaliar múltiplos <em>estados do mundo</em> quando as consequências de uma decisão dependem de eventos incertos.
            <br><br>
            No curso, utiliza-se a metáfora de uma <strong>loteria</strong> como uma forma simplificada de representar esse problema de avaliação. Cada loteria é descrita por um conjunto finito de resultados possíveis e por probabilidades conhecidas associadas a cada resultado. A primeira ferramenta analítica apresentada aos alunos é o cálculo do valor esperado dessas loterias. Em termos práticos, a pergunta central passa a ser: <em>quanto valeria pagar por um bilhete de uma loteria que pode gerar resultados diferentes com determinadas probabilidades?</em>
            <br><br>
            A ideia por trás do aplicativo é permitir que os alunos explorem esse raciocínio de forma interativa, simulando diferentes loterias e comparando <strong>resultados observados</strong> das simulações com os <strong>valores teóricos</strong> calculados analiticamente. Ao repetir o experimento um grande número de vezes, o app mostra por que — e em que sentido — o resultado médio de um experimento probabilístico tende a se aproximar do seu valor esperado.
            <br><br>
            Um segundo objetivo central do aplicativo é evidenciar as <strong>limitações do valor esperado</strong> como critério de avaliação. Em particular, o valor esperado ignora informações importantes sobre a <strong>dispersão dos resultados</strong>, isto é, sobre o grau de variabilidade ou risco associado a uma loteria. Por esse motivo, o app permite comparar duas loterias distintas que possuem o mesmo valor esperado, mas distribuições de resultados bastante diferentes.
            <br><br>
            A estrutura do aplicativo reflete essas diferentes dimensões da análise. As abas <strong>Loteria 1</strong> e <strong>Loteria 2</strong> apresentam tabelas e resumos que tornam essas diferenças explícitas. A aba de <strong>Dispersão</strong> explora como os retornos médios dos experimentos se distribuem em torno do valor esperado por meio de gráficos de dispersão, enquanto a aba de <strong>Convergência</strong> mostra como as frequências observadas dos resultados evoluem à medida que o número de simulações aumenta.
            <br><br>
            Este projeto está em desenvolvimento contínuo e será expandido gradualmente, à medida que novas ideias e funcionalidades forem incorporadas. A expectativa é que o aplicativo funcione como um <strong>ambiente de experimentação</strong>, no qual os alunos possam testar intuições, visualizar conceitos abstratos e aprofundar sua compreensão sobre decisões sob risco.
          `
      }
    </p>

  `;


  els.tabLottery1.innerHTML = `<h2 style="margin-top:0;">${labels.tabL1}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;
  els.tabLottery2.innerHTML = `<h2 style="margin-top:0;">${labels.tabL2}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;
  els.tabDispersion.innerHTML = `<h2 style="margin-top:0;">${labels.dispersion}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;
  els.tabConvergence.innerHTML = `<h2 style="margin-top:0;">${labels.convergence}</h2><p style="opacity:.8;">${isEn ? "Waiting for simulation…" : "Aguardando simulação…"}</p>`;

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

  /**
   * Shows validation errors in the sidebar.
   * @param {Array<string>} lines
   * @returns {void}
   */
  function setError(lines) {
    els.errorList.innerHTML = "";
    for (const line of lines) {
      const li = document.createElement("li");
      li.textContent = line;
      els.errorList.appendChild(li);
    }
    els.errorBox.style.display = "block";
  }

  /**
   * Clears validation errors.
   * @returns {void}
   */
  function clearError() {
    els.errorBox.style.display = "none";
    els.errorList.innerHTML = "";
  }

  /**
   * Activates a tab and updates the visible panel.
   * @param {string} tabId
   * @returns {void}
   */
  function setActiveTab(tabId) {
    applyMobileSidebarPlacement();
    for (const btn of els.tabButtons) {
      const isActive = btn.dataset.tab === tabId;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-selected", isActive ? "true" : "false");
    }
    for (const panel of els.tabPanels) {
      panel.hidden = panel.dataset.tabPanel !== tabId;
    }
    if (isMobileLike()) {
      const top = mount.getBoundingClientRect().top + window.scrollY - 8;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  setActiveTab("home");
  applyMobileSidebarPlacement();

  return { els, setError, clearError, setActiveTab };
}
