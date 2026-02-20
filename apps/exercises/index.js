// ============================================================================
// Decision Theory Exercises App Entry
// ============================================================================

import { createSeededRng, resolveSeedFromMode } from "./modules/shared/utils.js";
import { DUR_EXERCISES } from "./modules/dur/registry.js";
import {
  buildDurTexts,
  buildDurRandomTree,
  DUR_PROBABILITY_PRECISIONS,
} from "./modules/dur/solve_trees.js";
import {
  buildExpectedValueTexts,
  EXPECTED_VALUE_EXERCISES,
  buildRandomLottery,
} from "./modules/dur/expected_value.js";
import {
  EXERCISE_TYPES,
  buildDuiCopy,
  generateOprLevel,
  createDuiTable,
  maybeForceMaximinTies,
  maybeForceMinimaxTies,
  ensureOprUniqueMinMax,
  ensurePirUniqueBest,
  solveMaximin,
  solveMinimax,
  solveOpr,
  solvePir,
  describeProblem,
  buildSolutionHeader,
  buildSolutionExplainer,
} from "./modules/dui/dui_methods.js";
import { buildBuildTableTexts } from "./modules/dui/build_table.js";
import { buildOptimismTexts } from "./modules/dui/optimism.js";
import {
  buildGameTexts,
  createGameTable,
  analyzeGameForNash,
  buildGameSolutionTable,
  describeGameProblem,
  buildGameSolutionHeader,
} from "./modules/game/nash_equilibrium.js";
import {
  buildClassicGamesTexts,
  buildClassicGameInstance,
  describeClassicGameProblem,
  buildClassicGameSolutionHeader,
} from "./modules/game/classic_games.js";
import { buildAboutCopy } from "./modules/about/about.js";
import {
  renderDecisionTree,
  solveDecisionTree,
  renderLotterySolution,
  solveLottery,
  formatCurrencyLatex,
  formatCurrency,
  formatProbability,
} from "./modules/shared/decision_tree.js";
import {
  enhanceSelect,
  renderSeedUsed,
  renderTable,
  setActiveSubtab,
  updateRangeIndicator,
  wireSeedControls,
  wireSubtabs,
} from "./modules/shared/ui.js";
import { isHomeCardVisible } from "./modules/shared/exercise_visibility.js";

/**
 * Ensures the app stylesheet is loaded only once.
 * @returns {void}
 */
function ensureAppStyles() {
  const id = "exercises-app-styles";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "apps/exercises/styles.css";
  document.head.appendChild(link);
}

/**
 * Loads KaTeX + auto-render via CDN once.
 * @returns {Promise<void>}
 */
function ensureKatexLoaded() {
  if (window.renderMathInElement) return Promise.resolve();
  if (window.__exercisesKatexReady) return window.__exercisesKatexReady;

  const KATEX_VERSION = "0.16.9";

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });

  const loadCSS = (href) => {
    const existing = [...document.querySelectorAll('link[rel="stylesheet"]')].some(
      (l) => l.href === href
    );
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  };

  window.__exercisesKatexReady = (async () => {
    loadCSS(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.css`);
    await loadScript(`https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/katex.min.js`);
    await loadScript(
      `https://cdn.jsdelivr.net/npm/katex@${KATEX_VERSION}/dist/contrib/auto-render.min.js`
    );
    if (!window.renderMathInElement) {
      throw new Error("KaTeX loaded but renderMathInElement is not available.");
    }
  })();

  return window.__exercisesKatexReady;
}

function renderMathInContainer(container) {
  if (!container) return;
  const align = container.dataset?.mathAlign === "center" ? "center" : "left";
  const marginInline = align === "center" ? "auto" : "0";
  const blockWidth = align === "center" ? "auto" : "100%";
  const applyMathStyles = () => {
    container.querySelectorAll(".katex-display").forEach((el) => {
      el.style.setProperty("text-align", align, "important");
      el.style.setProperty("margin-left", marginInline, "important");
      el.style.setProperty("margin-right", marginInline, "important");
      el.style.setProperty("margin-bottom", "12px", "important");
      el.style.setProperty("margin-top", "6px", "important");
      el.style.setProperty("line-height", "1.8", "important");
    });
    container.querySelectorAll(".katex-display > .katex").forEach((el) => {
      el.style.setProperty("text-align", align, "important");
      el.style.setProperty("width", blockWidth, "important");
      el.style.setProperty("line-height", "1.8", "important");
    });
    container
      .querySelectorAll(".katex-display .katex, .katex-display .katex-html")
      .forEach((el) => {
        el.style.setProperty("line-height", "1.8", "important");
      });
  };
  const render = () => {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(container, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      fleqn: true,
      throwOnError: false,
    });
    applyMathStyles();
    requestAnimationFrame(() => applyMathStyles());
  };
  render();
  if (!window.renderMathInElement && window.__exercisesKatexReady) {
    window.__exercisesKatexReady.then(() => render()).catch(() => {});
  }
}

/**
 * @param {HTMLElement} mount
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {object}
 */
function renderPage(mount, { lang }) {
  ensureKatexLoaded().catch(() => {});
  const isEn = lang === "en";

  const EMOJIS = {
    dui: "🧭",
    game: "🕹️",
    dur: "🎲",
    about: "💡",
  };

  const labels = {
    title: isEn ? "Decision Theory Exercises" : "Exercícios de Teoria da Decisão",
    subtitle: isEn
      ? "Practice Decision Theory and Game Theory problems with guided solution methods."
      : "Pratique problemas de Teoria da Decisão e Teoria dos Jogos com métodos de solução guiados.",
    backToHome: isEn ? "Select a different exercise" : "Selecionar outro exercício",
    backToHomeAbout: isEn ? "Select an exercise" : "Selecionar um exercício",
    homeTitle: isEn ? "Choose an exercise" : "Escolha um exercício",
    homeSubtitle: isEn
      ? "Select a practice mode to begin. New exercise types can be added here."
      : "Selecione uma modalidade para começar. Novos tipos de exercício podem ser adicionados aqui.",
    homeIgnorance: isEn ? "Decisions under ignorance" : "Decisões sob ignorância",
    homeIgnoranceBadge: isEn ? "Solution methods" : "Métodos de solução",
    homeIgnoranceIcon: EMOJIS.dui,
    homeBuildTable: isEn ? "Build the Table" : "Construa a Tabela",
    homeOptimism: isEn ? "Optimism Level" : "Nível de Otimismo",
    homeRisk: isEn ? "Decisions under risk" : "Decisões sob risco",
    homeRiskTreesBadge: isEn ? "Decision tree" : "Árvore de Decisão",
    homeRiskExpectedBadge: isEn ? "Expected value" : "Valor esperado",
    homeRiskIcon: EMOJIS.dur,
    homeGameTheory: isEn ? "Game Theory" : "Teoria dos Jogos",
    homeGameTheoryBadge: isEn ? "Nash equilibrium" : "Equilíbrio de Nash",
    homeGameTheoryIcon: EMOJIS.game,
    homeClassicGames: isEn ? "Classic Games" : "Jogos Clássicos",
    homeAbout: isEn ? "About" : "Sobre",
    homeAboutBadge: isEn ? "Learn more about this project" : "Saiba mais sobre este projeto",
    homeAboutIcon: EMOJIS.about,
    comingSoon: isEn ? "Coming soon" : "Em breve",
    problemTitle: isEn ? "Problem" : "Problema",
    exerciseTab: isEn ? "💪 Exercise" : "💪 Exercício",
    solutionTab: isEn ? "🤓 Solution" : "🤓 Solução",
    seedTitle: isEn ? "Seed" : "Seed",
    seedAuto: isEn ? "Generate random seed" : "Gerar seed aleatório",
    seedManual: isEn ? "Provide seed" : "Informar o seed",
    seedManualLabel: isEn ? "Seed (10000–99999)" : "Seed (10000–99999)",
    seedManualHelp: isEn
      ? "Use a 5-digit integer for reproducible results."
      : "Use um inteiro de 5 dígitos para reproduzir os resultados.",
    seedUsedTitle: isEn ? "Seed used" : "Seed utilizado",
    seedUsedHelp: isEn
      ? "Use the same seed to reproduce this exercise."
      : "Use o mesmo seed para reproduzir este exercício.",
  };

  const homeCards = [
    {
      home: "dui",
      title: labels.homeIgnoranceBadge,
      badge: labels.homeIgnorance,
      icon: labels.homeIgnoranceIcon,
    },
    {
      home: "dui_build_table",
      title: labels.homeBuildTable,
      badge: labels.homeIgnorance,
      icon: labels.homeIgnoranceIcon,
    },
    {
      home: "dui_optimism",
      title: labels.homeOptimism,
      badge: labels.homeIgnorance,
      icon: labels.homeIgnoranceIcon,
    },
    {
      home: "game",
      title: labels.homeGameTheoryBadge,
      badge: labels.homeGameTheory,
      icon: labels.homeGameTheoryIcon,
    },
    {
      home: "game_classic",
      title: labels.homeClassicGames,
      badge: labels.homeGameTheory,
      icon: labels.homeGameTheoryIcon,
    },
    {
      home: "dur",
      title: labels.homeRiskTreesBadge,
      badge: labels.homeRisk,
      icon: labels.homeRiskIcon,
    },
    {
      home: "ev",
      title: labels.homeRiskExpectedBadge,
      badge: labels.homeRisk,
      icon: labels.homeRiskIcon,
    },
  ]
    .filter((card) => isHomeCardVisible(card.home))
    .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));

  const { duiLabels, solutionTexts, explainerTexts, tableLabels, exerciseLabels } =
    buildDuiCopy(lang);
  const duiBuildTexts = buildBuildTableTexts(lang);
  const duiOptimismTexts = buildOptimismTexts(lang);
  const gameTexts = buildGameTexts(lang);
  const gameClassicTexts = buildClassicGamesTexts(lang);
  const durTexts = buildDurTexts(lang);
  const evTexts = buildExpectedValueTexts(lang);
  const aboutCopy = buildAboutCopy(lang);

  mount.innerHTML = `
    <section class="exercises-fullbleed">
      <div class="exercises-surface">
        <header class="exercises-header">
          <div>
            <h1 class="exercises-title">${labels.title}</h1>
            <p class="exercises-subtitle">${labels.subtitle}</p>
          </div>
          <button
            class="exercises-link-btn"
            type="button"
            data-home-link="true"
            data-home-label="${labels.backToHome}"
            data-about-label="${labels.backToHomeAbout}"
          >
            ${labels.backToHome}
          </button>
        </header>

        <div class="exercises-tab-panel" data-panel="home">
          <div class="exercises-home home-night">
            <div class="exercises-home-visuals">
              <div class="home-layer home-layer-blobs"></div>
            </div>
            <div class="exercises-home-intro">
              <h2>${labels.homeTitle}</h2>
              <p class="exercises-subtitle">${labels.homeSubtitle}</p>
            </div>
            <div class="exercises-home-grid">
              ${homeCards
                .map(
                  (card) => `
                <button
                  class="exercises-home-card"
                  data-home="${card.home}"
                  type="button"
                >
                  <div class="exercises-home-icon">${card.icon}</div>
                  <div class="exercises-home-title">${card.title}</div>
                  <div class="exercises-home-badge">${card.badge}</div>
                </button>
              `
                )
                .join("")}
              ${isHomeCardVisible("about")
                ? `
                <button class="exercises-home-card" data-home="about" type="button">
                  <div class="exercises-home-icon">${labels.homeAboutIcon}</div>
                  <div class="exercises-home-title">${labels.homeAbout}</div>
                  <div class="exercises-home-badge">${labels.homeAboutBadge}</div>
                </button>
              `
                : ""}
            </div>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="dui">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${duiLabels.sidebarTitle}</h3>
              <hr />
              <div class="exercises-field">
                <label class="exercises-label">${duiLabels.solutionMethod}</label>
                <select id="exercise_type" class="exercises-select">
                  ${EXERCISE_TYPES.map(
                    (type) => `<option value="${type.value}">${type.label[lang]}</option>`
                  ).join("")}
                </select>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${duiLabels.decisionAlternatives}</label>
                <div class="exercises-range">
                  <div id="decision_value" class="exercises-range-value">5</div>
                  <input id="num_decisions" type="range" min="2" max="8" step="1" value="5" />
                </div>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${duiLabels.statesWorld}</label>
                <div class="exercises-range">
                  <div id="states_value" class="exercises-range-value">5</div>
                  <input id="num_states" type="range" min="2" max="8" step="1" value="5" />
                </div>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${duiLabels.precision}</label>
                <select id="value_precision" class="exercises-select">
                  ${[1, 2, 4, 5, 10]
                    .map((val) => `<option value="${val}" ${val === 5 ? "selected" : ""}>${val}</option>`)
                    .join("")}
                </select>
              </div>

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input id="dui_seed_mode_auto" type="radio" name="dui_seed_mode" value="auto" checked />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input id="dui_seed_mode_manual" type="radio" name="dui_seed_mode" value="manual" />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div id="dui_seed_manual_wrap" class="exercises-seed-manual hidden">
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="dui_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button id="generate_btn" class="exercises-cta exercises-cta-green" type="button">
                  ${duiLabels.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${duiLabels.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="dui_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${duiLabels.exerciseIntro}</p>
                <div id="problem_description"></div>
                <div id="problem_table"></div>
                <div id="dui_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${duiLabels.solutionIntro}</p>
                <div id="solution_header"></div>
                <div id="solution_explainer"></div>
                <div id="solution_table"></div>
                <div id="solution_table_secondary" class="exercises-table-secondary"></div>
                <div id="dui_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="dui_build_table">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${duiBuildTexts.sidebarTitle}</h3>
              <hr />

              <div class="exercises-field">
                <div class="exercises-option-card">
                  <label class="exercises-option">
                    <input
                      id="dui_build_table_option_3"
                      type="radio"
                      name="dui_build_table_option"
                      value="3x3"
                      checked
                    />
                    <div class="exercises-option-text">
                      <strong>${duiBuildTexts.option3Title}</strong>
                      <div class="exercises-option-description">
                        ${duiBuildTexts.option3Description}
                      </div>
                    </div>
                  </label>
                  <label class="exercises-option">
                    <input
                      id="dui_build_table_option_4"
                      type="radio"
                      name="dui_build_table_option"
                      value="4x4"
                    />
                    <div class="exercises-option-text">
                      <strong>${duiBuildTexts.option4Title}</strong>
                      <div class="exercises-option-description">
                        ${duiBuildTexts.option4Description}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div class="exercises-field">
                <button
                  id="dui_build_table_generate_btn"
                  class="exercises-cta exercises-cta-green"
                  type="button"
                >
                  ${duiBuildTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${duiBuildTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${lang === "en" ? "🤓 Check Answer" : "🤓 Verificar Resposta"}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="dui_build_table_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${duiBuildTexts.exerciseIntro}</p>
                <div id="dui_build_table_exercise_block" class="hidden">
                  <h3 class="exercises-section-title">${labels.problemTitle}</h3>
                  <p id="dui_build_table_statement" class="exercises-intro"></p>
                  <div class="exercises-solution-gap"></div>
                  <div id="dui_build_table_optimism" class="exercises-field hidden">
                    <label class="exercises-label">${duiBuildTexts.optimismLabel}</label>
                    <input
                      id="dui_build_table_optimism_input"
                      class="exercises-input"
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      inputmode="decimal"
                      placeholder="0.5"
                    />
                  </div>
                  <div id="dui_build_table_exercise_table"></div>
                  <div class="exercises-solution-gap"></div>
                  <button
                    id="dui_build_table_check_btn"
                    class="exercises-cta is-disabled"
                    type="button"
                  >
                    ${duiBuildTexts.checkButtonLabel}
                  </button>
                  <div id="dui_build_table_check_message" class="exercises-check-message hidden">
                    ${duiBuildTexts.checkMessage}
                  </div>
                </div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${duiBuildTexts.solutionIntro}</p>
                <div id="dui_build_table_solution_body" class="hidden">
                  <div id="dui_build_table_check_status" class="exercises-check-status"></div>
                  <div id="dui_build_table_solution_card" class="exercises-solution-card"></div>
                  <div id="dui_build_table_solution_explainers"></div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="dui_optimism">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${duiOptimismTexts.sidebarTitle}</h3>
              <hr />

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input
                        id="dui_optimism_seed_mode_auto"
                        type="radio"
                        name="dui_optimism_seed_mode"
                        value="auto"
                        checked
                      />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input
                        id="dui_optimism_seed_mode_manual"
                        type="radio"
                        name="dui_optimism_seed_mode"
                        value="manual"
                      />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div
                      id="dui_optimism_seed_manual_wrap"
                      class="exercises-seed-manual hidden"
                    >
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="dui_optimism_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button
                  id="dui_optimism_generate_btn"
                  class="exercises-cta exercises-cta-green"
                  type="button"
                >
                  ${duiOptimismTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${duiOptimismTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="dui_optimism_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${duiOptimismTexts.exerciseIntro}</p>
                <div id="dui_optimism_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${duiOptimismTexts.solutionIntro}</p>
                <div id="dui_optimism_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="game">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${gameTexts.sidebarTitle}</h3>
              <hr />
              <div class="exercises-field">
                <label class="exercises-label">${gameTexts.rowStrategies}</label>
                <div class="exercises-range">
                  <div id="game_rows_value" class="exercises-range-value">3</div>
                  <input id="game_num_rows" type="range" min="2" max="6" step="1" value="3" />
                </div>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${gameTexts.colStrategies}</label>
                <div class="exercises-range">
                  <div id="game_cols_value" class="exercises-range-value">3</div>
                  <input id="game_num_cols" type="range" min="2" max="6" step="1" value="3" />
                </div>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${gameTexts.precision}</label>
                <select id="game_value_precision" class="exercises-select">
                  ${[1, 2, 4, 5, 10]
                    .map((val) => `<option value="${val}" ${val === 5 ? "selected" : ""}>${val}</option>`)
                    .join("")}
                </select>
              </div>

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input id="game_seed_mode_auto" type="radio" name="game_seed_mode" value="auto" checked />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input id="game_seed_mode_manual" type="radio" name="game_seed_mode" value="manual" />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div id="game_seed_manual_wrap" class="exercises-seed-manual hidden">
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="game_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button id="game_generate_btn" class="exercises-cta exercises-cta-green" type="button">
                  ${gameTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${gameTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="game_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${gameTexts.exerciseIntro}</p>
                <div id="game_problem_description"></div>
                <div id="game_problem_table"></div>
                <div id="game_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${gameTexts.solutionIntro}</p>
                <div id="game_solution_header"></div>
                <div id="game_solution_table"></div>
                <div id="game_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="game_classic">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${gameClassicTexts.sidebarTitle}</h3>
              <hr />

              <div class="exercises-field">
                <label class="exercises-label">${gameClassicTexts.gameTypeLabel}</label>
                <select id="game_classic_type" class="exercises-select">
                  ${gameClassicTexts.gameTypeOptions
                    .map(
                      (opt) =>
                        `<option value="${opt.value}" ${
                          opt.value === "test" ? "selected" : ""
                        }>${opt.label}</option>`
                    )
                    .join("")}
                </select>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${gameClassicTexts.payoffStyleLabel}</label>
                <select id="game_classic_payoff_style" class="exercises-select">
                  ${gameClassicTexts.payoffStyleOptions
                    .map(
                      (opt) =>
                        `<option value="${opt.value}" ${
                          opt.value === "independent" ? "selected" : ""
                        }>${opt.label}</option>`
                    )
                    .join("")}
                </select>
              </div>

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input
                        id="game_classic_seed_mode_auto"
                        type="radio"
                        name="game_classic_seed_mode"
                        value="auto"
                        checked
                      />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input
                        id="game_classic_seed_mode_manual"
                        type="radio"
                        name="game_classic_seed_mode"
                        value="manual"
                      />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div
                      id="game_classic_seed_manual_wrap"
                      class="exercises-seed-manual hidden"
                    >
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="game_classic_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button
                  id="game_classic_generate_btn"
                  class="exercises-cta exercises-cta-green"
                  type="button"
                >
                  ${gameClassicTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${gameClassicTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="game_classic_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${gameClassicTexts.exerciseIntro}</p>
                <div id="game_classic_problem_description"></div>
                <div id="game_classic_problem_table"></div>
                <div id="game_classic_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${gameClassicTexts.solutionIntro}</p>
                <div id="game_classic_solution_header"></div>
                <div id="game_classic_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="dur">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${durTexts.sidebarTitle}</h3>
              <hr />
              <div class="exercises-field">
                <label class="exercises-label">${durTexts.exerciseType}</label>
                <select id="dur_exercise_type" class="exercises-select">
                  ${DUR_EXERCISES.map(
                    (exercise) =>
                      `<option value="${exercise.id}">${exercise.label[lang] ?? exercise.id}</option>`
                  ).join("")}
                </select>
              </div>

              <div class="exercises-field">
                <label class="exercises-label">${durTexts.probabilityPrecision}</label>
                <select id="dur_probability_precision" class="exercises-select">
                  ${DUR_PROBABILITY_PRECISIONS.map(
                    (option) =>
                      `<option value="${option.id}" ${
                        option.id === 5 ? "selected" : ""
                      }>${option.label}</option>`
                  ).join("")}
                </select>
              </div>

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input id="dur_seed_mode_auto" type="radio" name="dur_seed_mode" value="auto" checked />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input id="dur_seed_mode_manual" type="radio" name="dur_seed_mode" value="manual" />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div id="dur_seed_manual_wrap" class="exercises-seed-manual hidden">
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="dur_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button id="dur_generate_btn" class="exercises-cta exercises-cta-green" type="button">
                  ${durTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${durTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="dur_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${durTexts.exerciseIntro}</p>
                <div id="dur_exercise_block" class="hidden">
                  <h3 class="exercises-section-title">${labels.problemTitle}</h3>
                  <p id="dur_exercise_intro" class="exercises-intro">${durTexts.exerciseStatement}</p>
                </div>
                <div id="dur_exercise_tree_card" class="exercises-solution-card hidden">
                  <div id="dur_tree" class="exercises-tree-center"></div>
                </div>
                <div id="dur_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${durTexts.solutionIntro}</p>
                <div id="dur_solution_explainer" class="hidden"></div>
                <div id="dur_solution_tree_card" class="exercises-solution-card hidden">
                  <h3 class="exercises-solution-title">${durTexts.solvedTreeTitle}</h3>
                  <hr class="exercises-solution-divider" />
                  <div id="dur_solution_tree" class="exercises-tree-center"></div>
                  <div id="dur_solution_legend" class="decision-tree-legend"></div>
                </div>
                <div id="dur_solution_text" class="decision-tree-solution exercises-solution-card hidden"></div>
                <div id="dur_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="ev">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 class="exercises-sidebar-title">${evTexts.sidebarTitle}</h3>
              <hr />
              <div class="exercises-field">
                <label class="exercises-label">${evTexts.exerciseType}</label>
                <select id="ev_exercise_type" class="exercises-select">
                  ${EXPECTED_VALUE_EXERCISES.map(
                    (exercise) =>
                      `<option value="${exercise.id}" ${exercise.disabled ? "disabled" : ""}>${
                        exercise.label[lang] ?? exercise.id
                      }</option>`
                  ).join("")}
                </select>
              </div>

              <div id="ev_payoffs_field" class="exercises-field">
                <label class="exercises-label">${evTexts.payoffCount}</label>
                <div class="exercises-range">
                  <div id="ev_payoffs_value" class="exercises-range-value">3</div>
                  <input id="ev_num_payoffs" type="range" min="2" max="8" step="1" value="3" />
                </div>
              </div>

              <div id="ev_proposed_fields" class="exercises-field-group hidden">
                <div class="exercises-field">
                  <label class="exercises-label">${evTexts.proposedPayoffsLabel}</label>
                  <input
                    id="ev_proposed_payoffs"
                    class="exercises-input"
                    type="text"
                    placeholder="${evTexts.proposedPayoffsPlaceholder}"
                  />
                  <div class="exercises-field-help">${evTexts.proposedPayoffsHelp}</div>
                </div>
                <div class="exercises-field">
                  <label class="exercises-label">${evTexts.proposedProbabilitiesLabel}</label>
                  <input
                    id="ev_proposed_probabilities"
                    class="exercises-input"
                    type="text"
                    placeholder="${evTexts.proposedProbabilitiesPlaceholder}"
                  />
                  <div class="exercises-field-help">${evTexts.proposedProbabilitiesHelp}</div>
                </div>
              </div>

              <div class="exercises-field">
                <div class="exercises-seed-card">
                  <div class="exercises-seed-title">${labels.seedTitle}</div>
                  <div class="exercises-seed-options">
                    <label class="exercises-seed-option">
                      <input id="ev_seed_mode_auto" type="radio" name="ev_seed_mode" value="auto" checked />
                      <span>${labels.seedAuto}</span>
                    </label>
                    <label class="exercises-seed-option">
                      <input id="ev_seed_mode_manual" type="radio" name="ev_seed_mode" value="manual" />
                      <span>${labels.seedManual}</span>
                    </label>
                    <div id="ev_seed_manual_wrap" class="exercises-seed-manual hidden">
                      <label class="exercises-label">${labels.seedManualLabel}</label>
                      <input
                        id="ev_seed_manual_input"
                        class="exercises-input"
                        type="number"
                        min="10000"
                        max="99999"
                        step="1"
                        inputmode="numeric"
                        placeholder="12345"
                      />
                      <div class="exercises-seed-help">${labels.seedManualHelp}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="exercises-field">
                <button id="ev_generate_btn" class="exercises-cta exercises-cta-green" type="button">
                  ${evTexts.generate}
                </button>
              </div>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn" data-subtab="generate" type="button">
                  ${evTexts.generateTab}
                </button>
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="generate">
                <div id="ev_generate_panel"></div>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${evTexts.exerciseIntro}</p>
                <div id="ev_exercise_block" class="hidden">
                  <h3 class="exercises-section-title">${labels.problemTitle}</h3>
                  <p id="ev_exercise_intro" class="exercises-intro">${evTexts.exerciseStatement}</p>
                </div>
                <div id="ev_exercise_tree_card" class="exercises-solution-card hidden">
                  <div id="ev_lottery_tree" class="exercises-tree-center"></div>
                </div>
                <div id="ev_exercise_seed" class="exercises-seed-used"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${evTexts.solutionPlaceholder}</p>
                <div id="ev_solution_explainer_top" class="hidden"></div>
                <div id="ev_solution_text" class="decision-tree-solution exercises-solution-card hidden">
                  <div id="ev_solution_content"></div>
                </div>
                <div id="ev_solution_tree_card" class="exercises-solution-card hidden">
                  <div id="ev_solution_tree" class="exercises-tree-center"></div>
                </div>
                <div id="ev_solution_explainer_bottom" class="hidden"></div>
                <div id="ev_solution_seed" class="exercises-seed-used"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="about">
          <div class="exercises-about">
            <h2 style="margin-top: 0;">${aboutCopy.title}</h2>
            <hr />
            ${aboutCopy.text}
          </div>
        </div>
      </div>
    </section>
  `;

  const duiPanel = mount.querySelector('[data-panel="dui"]');
  const duiBuildPanel = mount.querySelector('[data-panel="dui_build_table"]');
  const duiOptimismPanel = mount.querySelector('[data-panel="dui_optimism"]');
  const gamePanel = mount.querySelector('[data-panel="game"]');
  const gameClassicPanel = mount.querySelector('[data-panel="game_classic"]');
  const durPanel = mount.querySelector('[data-panel="dur"]');
  const evPanel = mount.querySelector('[data-panel="ev"]');

  return {
    els: {
      tabPanels: Array.from(mount.querySelectorAll(".exercises-tab-panel")),
      homeButtons: Array.from(mount.querySelectorAll(".exercises-home-card[data-home]")),
      homeLink: mount.querySelector("[data-home-link]"),
      dui: {
        panel: duiPanel,
        sidebar: duiPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#dui_generate_panel"),
        subtabButtons: Array.from(duiPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(duiPanel.querySelectorAll(".exercises-subtab-panel")),
        exerciseType: mount.querySelector("#exercise_type"),
        numDecisions: mount.querySelector("#num_decisions"),
        numStates: mount.querySelector("#num_states"),
        decisionValue: mount.querySelector("#decision_value"),
        statesValue: mount.querySelector("#states_value"),
        valuePrecision: mount.querySelector("#value_precision"),
        seedModeAuto: mount.querySelector("#dui_seed_mode_auto"),
        seedModeManual: mount.querySelector("#dui_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#dui_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#dui_seed_manual_input"),
        generateBtn: mount.querySelector("#generate_btn"),
        problemDescription: mount.querySelector("#problem_description"),
        problemTable: mount.querySelector("#problem_table"),
        solutionHeader: mount.querySelector("#solution_header"),
        solutionExplainer: mount.querySelector("#solution_explainer"),
        solutionTable: mount.querySelector("#solution_table"),
        solutionTableSecondary: mount.querySelector("#solution_table_secondary"),
        seedUsedExercise: mount.querySelector("#dui_exercise_seed"),
        seedUsedSolution: mount.querySelector("#dui_solution_seed"),
        placeholders: Array.from(duiPanel.querySelectorAll(".exercises-placeholder")),
      },
      duiBuildTable: {
        panel: duiBuildPanel,
        sidebar: duiBuildPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#dui_build_table_generate_panel"),
        subtabButtons: Array.from(duiBuildPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(duiBuildPanel.querySelectorAll(".exercises-subtab-panel")),
        exercisePlaceholder: duiBuildPanel.querySelector(
          '[data-subpanel="exercise"] .exercises-placeholder'
        ),
        solutionPlaceholder: duiBuildPanel.querySelector(
          '[data-subpanel="solution"] .exercises-placeholder'
        ),
        option3: mount.querySelector("#dui_build_table_option_3"),
        option4: mount.querySelector("#dui_build_table_option_4"),
        generateBtn: mount.querySelector("#dui_build_table_generate_btn"),
        exerciseBlock: mount.querySelector("#dui_build_table_exercise_block"),
        statement: mount.querySelector("#dui_build_table_statement"),
        optimismField: mount.querySelector("#dui_build_table_optimism"),
        optimismInput: mount.querySelector("#dui_build_table_optimism_input"),
        exerciseTable: mount.querySelector("#dui_build_table_exercise_table"),
        checkBtn: mount.querySelector("#dui_build_table_check_btn"),
        checkMessage: mount.querySelector("#dui_build_table_check_message"),
        solutionBody: mount.querySelector("#dui_build_table_solution_body"),
        checkStatus: mount.querySelector("#dui_build_table_check_status"),
        solutionCard: mount.querySelector("#dui_build_table_solution_card"),
        solutionExplainers: mount.querySelector("#dui_build_table_solution_explainers"),
        placeholders: Array.from(duiBuildPanel.querySelectorAll(".exercises-placeholder")),
      },
      duiOptimism: {
        panel: duiOptimismPanel,
        sidebar: duiOptimismPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#dui_optimism_generate_panel"),
        subtabButtons: Array.from(duiOptimismPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(duiOptimismPanel.querySelectorAll(".exercises-subtab-panel")),
        seedModeAuto: mount.querySelector("#dui_optimism_seed_mode_auto"),
        seedModeManual: mount.querySelector("#dui_optimism_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#dui_optimism_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#dui_optimism_seed_manual_input"),
        generateBtn: mount.querySelector("#dui_optimism_generate_btn"),
        seedUsedExercise: mount.querySelector("#dui_optimism_exercise_seed"),
        seedUsedSolution: mount.querySelector("#dui_optimism_solution_seed"),
        placeholders: Array.from(duiOptimismPanel.querySelectorAll(".exercises-placeholder")),
      },
      game: {
        panel: gamePanel,
        sidebar: gamePanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#game_generate_panel"),
        subtabButtons: Array.from(gamePanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(gamePanel.querySelectorAll(".exercises-subtab-panel")),
        numRows: mount.querySelector("#game_num_rows"),
        numCols: mount.querySelector("#game_num_cols"),
        rowValue: mount.querySelector("#game_rows_value"),
        colValue: mount.querySelector("#game_cols_value"),
        valuePrecision: mount.querySelector("#game_value_precision"),
        seedModeAuto: mount.querySelector("#game_seed_mode_auto"),
        seedModeManual: mount.querySelector("#game_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#game_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#game_seed_manual_input"),
        generateBtn: mount.querySelector("#game_generate_btn"),
        problemDescription: mount.querySelector("#game_problem_description"),
        problemTable: mount.querySelector("#game_problem_table"),
        solutionHeader: mount.querySelector("#game_solution_header"),
        solutionTable: mount.querySelector("#game_solution_table"),
        seedUsedExercise: mount.querySelector("#game_exercise_seed"),
        seedUsedSolution: mount.querySelector("#game_solution_seed"),
        placeholders: Array.from(gamePanel.querySelectorAll(".exercises-placeholder")),
      },
      gameClassic: {
        panel: gameClassicPanel,
        sidebar: gameClassicPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#game_classic_generate_panel"),
        subtabButtons: Array.from(gameClassicPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(gameClassicPanel.querySelectorAll(".exercises-subtab-panel")),
        gameType: mount.querySelector("#game_classic_type"),
        payoffStyle: mount.querySelector("#game_classic_payoff_style"),
        seedModeAuto: mount.querySelector("#game_classic_seed_mode_auto"),
        seedModeManual: mount.querySelector("#game_classic_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#game_classic_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#game_classic_seed_manual_input"),
        generateBtn: mount.querySelector("#game_classic_generate_btn"),
        problemDescription: mount.querySelector("#game_classic_problem_description"),
        problemTable: mount.querySelector("#game_classic_problem_table"),
        solutionHeader: mount.querySelector("#game_classic_solution_header"),
        seedUsedExercise: mount.querySelector("#game_classic_exercise_seed"),
        seedUsedSolution: mount.querySelector("#game_classic_solution_seed"),
        placeholders: Array.from(gameClassicPanel.querySelectorAll(".exercises-placeholder")),
      },
      dur: {
        panel: durPanel,
        sidebar: durPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#dur_generate_panel"),
        subtabButtons: Array.from(durPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(durPanel.querySelectorAll(".exercises-subtab-panel")),
        exerciseType: mount.querySelector("#dur_exercise_type"),
        probabilityPrecision: mount.querySelector("#dur_probability_precision"),
        exerciseBlock: mount.querySelector("#dur_exercise_block"),
        exerciseIntro: mount.querySelector("#dur_exercise_intro"),
        exerciseTreeCard: mount.querySelector("#dur_exercise_tree_card"),
        solutionTreeCard: mount.querySelector("#dur_solution_tree_card"),
        seedModeAuto: mount.querySelector("#dur_seed_mode_auto"),
        seedModeManual: mount.querySelector("#dur_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#dur_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#dur_seed_manual_input"),
        generateBtn: mount.querySelector("#dur_generate_btn"),
        tree: mount.querySelector("#dur_tree"),
        solutionTree: mount.querySelector("#dur_solution_tree"),
        solutionLegend: mount.querySelector("#dur_solution_legend"),
        solutionText: mount.querySelector("#dur_solution_text"),
        solutionExplainer: mount.querySelector("#dur_solution_explainer"),
        seedUsedExercise: mount.querySelector("#dur_exercise_seed"),
        seedUsedSolution: mount.querySelector("#dur_solution_seed"),
        placeholders: Array.from(durPanel.querySelectorAll(".exercises-placeholder")),
      },
      ev: {
        panel: evPanel,
        sidebar: evPanel.querySelector(".exercises-sidebar"),
        generatePanel: mount.querySelector("#ev_generate_panel"),
        subtabButtons: Array.from(evPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(evPanel.querySelectorAll(".exercises-subtab-panel")),
        exerciseType: mount.querySelector("#ev_exercise_type"),
        exerciseIntro: mount.querySelector("#ev_exercise_intro"),
        exerciseBlock: mount.querySelector("#ev_exercise_block"),
        exerciseTreeCard: mount.querySelector("#ev_exercise_tree_card"),
        numPayoffs: mount.querySelector("#ev_num_payoffs"),
        payoffValue: mount.querySelector("#ev_payoffs_value"),
        payoffField: mount.querySelector("#ev_payoffs_field"),
        proposedFields: mount.querySelector("#ev_proposed_fields"),
        proposedPayoffs: mount.querySelector("#ev_proposed_payoffs"),
        proposedProbabilities: mount.querySelector("#ev_proposed_probabilities"),
        seedModeAuto: mount.querySelector("#ev_seed_mode_auto"),
        seedModeManual: mount.querySelector("#ev_seed_mode_manual"),
        seedManualWrap: mount.querySelector("#ev_seed_manual_wrap"),
        seedManualInput: mount.querySelector("#ev_seed_manual_input"),
        generateBtn: mount.querySelector("#ev_generate_btn"),
        tree: mount.querySelector("#ev_lottery_tree"),
        solutionTree: mount.querySelector("#ev_solution_tree"),
        solutionText: mount.querySelector("#ev_solution_text"),
        solutionContent: mount.querySelector("#ev_solution_content"),
        solutionTreeCard: mount.querySelector("#ev_solution_tree_card"),
        solutionExplainerTop: mount.querySelector("#ev_solution_explainer_top"),
        solutionExplainerBottom: mount.querySelector("#ev_solution_explainer_bottom"),
        seedUsedExercise: mount.querySelector("#ev_exercise_seed"),
        seedUsedSolution: mount.querySelector("#ev_solution_seed"),
        placeholders: Array.from(evPanel.querySelectorAll(".exercises-placeholder")),
      },
    },
    texts: solutionTexts,
    explainerTexts,
    tableLabels,
    gameTexts,
    gameClassicTexts,
    durTexts,
    evTexts,
    duiBuildTexts,
    duiOptimismTexts,
    exerciseLabels,
    labels,
    surface: mount.querySelector(".exercises-surface"),
  };
}

/**
 * App entry point for the central router.
 * @param {HTMLElement} mount
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {Promise<void>}
 */
export async function mountApp(mount, { lang }) {
  ensureAppStyles();

  const ui = renderPage(mount, { lang });
  let levelOfOptimism = 0;

  const setMainPanel = (panel) => {
    const canOpenPanel = (nextPanel) => nextPanel === "home" || isHomeCardVisible(nextPanel);
    const targetPanel = canOpenPanel(panel) ? panel : "home";

    ui.els.tabPanels.forEach((p) => {
      p.classList.toggle("hidden", p.dataset.panel !== targetPanel);
    });
    if (ui.surface) {
      ui.surface.classList.toggle("is-home", targetPanel === "home");
    }
    if (targetPanel === "dui") {
      updateDuiRangeLabels();
      updateDuiLayout();
    }
    if (targetPanel === "dui_build_table") {
      updateDuiBuildTableLayout();
    }
    if (targetPanel === "dui_optimism") {
      updateDuiOptimismLayout();
    }
    if (targetPanel === "game") {
      updateGameRangeLabels();
      updateGameLayout();
    }
    if (targetPanel === "game_classic") {
      updateGameClassicLayout();
    }
    if (targetPanel === "dur") {
      updateDurLayout();
    }
    if (targetPanel === "ev") {
      updateEvLayout();
      updateEvRangeLabels();
      requestAnimationFrame(updateEvRangeLabels);
    }
    if (ui.els.homeLink) {
      const { homeLabel, aboutLabel } = ui.els.homeLink.dataset;
      const nextLabel = targetPanel === "about" ? aboutLabel : homeLabel;
      if (nextLabel) {
        ui.els.homeLink.textContent = nextLabel;
      }
    }
  };

  const updateDuiRangeLabels = () => {
    updateRangeIndicator(ui.els.dui.numDecisions, ui.els.dui.decisionValue);
    updateRangeIndicator(ui.els.dui.numStates, ui.els.dui.statesValue);
  };

  const updateGameRangeLabels = () => {
    updateRangeIndicator(ui.els.game.numRows, ui.els.game.rowValue);
    updateRangeIndicator(ui.els.game.numCols, ui.els.game.colValue);
  };

  const updateEvRangeLabels = () => {
    updateRangeIndicator(ui.els.ev.numPayoffs, ui.els.ev.payoffValue);
  };

  const updateEvInputMode = () => {
    const isPropose = ui.els.ev.exerciseType?.value === "propose_lottery";
    if (ui.els.ev.payoffField) {
      ui.els.ev.payoffField.classList.toggle("hidden", isPropose);
    }
    if (ui.els.ev.proposedFields) {
      ui.els.ev.proposedFields.classList.toggle("hidden", !isPropose);
    }
  };

  const updateOptimismLevel = (rng) => {
    if (ui.els.dui.exerciseType.value === "Optimism-Pessimism Rule") {
      levelOfOptimism = typeof rng === "function" ? generateOprLevel(rng) : 0;
    } else {
      levelOfOptimism = 0;
    }
  };

  const getSeedMode = (els) => (els.seedModeManual?.checked ? "manual" : "auto");

  const duiLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const duiBuildLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const duiOptimismLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const gameLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const gameClassicLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const durLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const evLayoutState = {
    moved: false,
    originalParent: null,
    originalNextSibling: null,
  };

  const mobileMq = window.matchMedia("(max-width: 980px)");

  const updateDuiLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.dui.sidebar;
    const generatePanel = ui.els.dui.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !duiLayoutState.moved) {
      duiLayoutState.originalParent = sidebar.parentNode;
      duiLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      duiLayoutState.moved = true;
      setActiveSubtab(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels, "generate");
    } else if (!isMobile && duiLayoutState.moved) {
      const parent = duiLayoutState.originalParent;
      if (parent) {
        if (duiLayoutState.originalNextSibling && parent.contains(duiLayoutState.originalNextSibling)) {
          parent.insertBefore(sidebar, duiLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      duiLayoutState.moved = false;
      setActiveSubtab(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels, "exercise");
    }
  };

  const updateDuiBuildTableLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.duiBuildTable.sidebar;
    const generatePanel = ui.els.duiBuildTable.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !duiBuildLayoutState.moved) {
      duiBuildLayoutState.originalParent = sidebar.parentNode;
      duiBuildLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      duiBuildLayoutState.moved = true;
      setActiveSubtab(
        ui.els.duiBuildTable.subtabButtons,
        ui.els.duiBuildTable.subtabPanels,
        "generate"
      );
    } else if (!isMobile && duiBuildLayoutState.moved) {
      const parent = duiBuildLayoutState.originalParent;
      if (parent) {
        if (
          duiBuildLayoutState.originalNextSibling &&
          parent.contains(duiBuildLayoutState.originalNextSibling)
        ) {
          parent.insertBefore(sidebar, duiBuildLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      duiBuildLayoutState.moved = false;
      setActiveSubtab(
        ui.els.duiBuildTable.subtabButtons,
        ui.els.duiBuildTable.subtabPanels,
        "exercise"
      );
    }
  };

  const updateDuiOptimismLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.duiOptimism.sidebar;
    const generatePanel = ui.els.duiOptimism.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !duiOptimismLayoutState.moved) {
      duiOptimismLayoutState.originalParent = sidebar.parentNode;
      duiOptimismLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      duiOptimismLayoutState.moved = true;
      setActiveSubtab(
        ui.els.duiOptimism.subtabButtons,
        ui.els.duiOptimism.subtabPanels,
        "generate"
      );
    } else if (!isMobile && duiOptimismLayoutState.moved) {
      const parent = duiOptimismLayoutState.originalParent;
      if (parent) {
        if (
          duiOptimismLayoutState.originalNextSibling &&
          parent.contains(duiOptimismLayoutState.originalNextSibling)
        ) {
          parent.insertBefore(sidebar, duiOptimismLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      duiOptimismLayoutState.moved = false;
      setActiveSubtab(
        ui.els.duiOptimism.subtabButtons,
        ui.els.duiOptimism.subtabPanels,
        "exercise"
      );
    }
  };

  const updateGameLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.game.sidebar;
    const generatePanel = ui.els.game.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !gameLayoutState.moved) {
      gameLayoutState.originalParent = sidebar.parentNode;
      gameLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      gameLayoutState.moved = true;
      setActiveSubtab(ui.els.game.subtabButtons, ui.els.game.subtabPanels, "generate");
    } else if (!isMobile && gameLayoutState.moved) {
      const parent = gameLayoutState.originalParent;
      if (parent) {
        if (gameLayoutState.originalNextSibling && parent.contains(gameLayoutState.originalNextSibling)) {
          parent.insertBefore(sidebar, gameLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      gameLayoutState.moved = false;
      setActiveSubtab(ui.els.game.subtabButtons, ui.els.game.subtabPanels, "exercise");
    }
  };

  const updateGameClassicLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.gameClassic.sidebar;
    const generatePanel = ui.els.gameClassic.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !gameClassicLayoutState.moved) {
      gameClassicLayoutState.originalParent = sidebar.parentNode;
      gameClassicLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      gameClassicLayoutState.moved = true;
      setActiveSubtab(
        ui.els.gameClassic.subtabButtons,
        ui.els.gameClassic.subtabPanels,
        "generate"
      );
    } else if (!isMobile && gameClassicLayoutState.moved) {
      const parent = gameClassicLayoutState.originalParent;
      if (parent) {
        if (
          gameClassicLayoutState.originalNextSibling &&
          parent.contains(gameClassicLayoutState.originalNextSibling)
        ) {
          parent.insertBefore(sidebar, gameClassicLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      gameClassicLayoutState.moved = false;
      setActiveSubtab(
        ui.els.gameClassic.subtabButtons,
        ui.els.gameClassic.subtabPanels,
        "exercise"
      );
    }
  };

  const updateDurLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.dur.sidebar;
    const generatePanel = ui.els.dur.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !durLayoutState.moved) {
      durLayoutState.originalParent = sidebar.parentNode;
      durLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      durLayoutState.moved = true;
      setActiveSubtab(ui.els.dur.subtabButtons, ui.els.dur.subtabPanels, "generate");
    } else if (!isMobile && durLayoutState.moved) {
      const parent = durLayoutState.originalParent;
      if (parent) {
        if (durLayoutState.originalNextSibling && parent.contains(durLayoutState.originalNextSibling)) {
          parent.insertBefore(sidebar, durLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      durLayoutState.moved = false;
      setActiveSubtab(ui.els.dur.subtabButtons, ui.els.dur.subtabPanels, "exercise");
    }
  };

  const updateEvLayout = () => {
    const isMobile = mobileMq.matches;
    const sidebar = ui.els.ev.sidebar;
    const generatePanel = ui.els.ev.generatePanel;
    if (!sidebar || !generatePanel) return;

    if (isMobile && !evLayoutState.moved) {
      evLayoutState.originalParent = sidebar.parentNode;
      evLayoutState.originalNextSibling = sidebar.nextSibling;
      generatePanel.appendChild(sidebar);
      evLayoutState.moved = true;
      setActiveSubtab(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels, "generate");
    } else if (!isMobile && evLayoutState.moved) {
      const parent = evLayoutState.originalParent;
      if (parent) {
        if (evLayoutState.originalNextSibling && parent.contains(evLayoutState.originalNextSibling)) {
          parent.insertBefore(sidebar, evLayoutState.originalNextSibling);
        } else {
          parent.appendChild(sidebar);
        }
      }
      evLayoutState.moved = false;
      setActiveSubtab(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels, "exercise");
    }
  };

  const getDefaultSubtab = () => (mobileMq.matches ? "generate" : "exercise");

  const resetDuiPanels = () => {
    ui.els.dui.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.dui.exerciseType) {
      ui.els.dui.exerciseType.value = EXERCISE_TYPES[0]?.value ?? ui.els.dui.exerciseType.value;
      ui.els.dui.exerciseType.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.dui.numDecisions) ui.els.dui.numDecisions.value = "5";
    if (ui.els.dui.numStates) ui.els.dui.numStates.value = "5";
    if (ui.els.dui.valuePrecision) {
      ui.els.dui.valuePrecision.value = "5";
      ui.els.dui.valuePrecision.dispatchEvent(new Event("change", { bubbles: true }));
    }
    updateDuiRangeLabels();
    if (ui.els.dui.seedModeAuto) {
      ui.els.dui.seedModeAuto.checked = true;
      ui.els.dui.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.dui.seedModeManual) ui.els.dui.seedModeManual.checked = false;
    if (ui.els.dui.seedManualInput) ui.els.dui.seedManualInput.value = "";
    if (ui.els.dui.problemDescription) ui.els.dui.problemDescription.innerHTML = "";
    if (ui.els.dui.problemTable) ui.els.dui.problemTable.innerHTML = "";
    if (ui.els.dui.solutionHeader) ui.els.dui.solutionHeader.innerHTML = "";
    if (ui.els.dui.solutionExplainer) ui.els.dui.solutionExplainer.innerHTML = "";
    if (ui.els.dui.solutionTable) ui.els.dui.solutionTable.innerHTML = "";
    if (ui.els.dui.solutionTableSecondary) ui.els.dui.solutionTableSecondary.innerHTML = "";
    if (ui.els.dui.seedUsedExercise) ui.els.dui.seedUsedExercise.innerHTML = "";
    if (ui.els.dui.seedUsedSolution) ui.els.dui.seedUsedSolution.innerHTML = "";
    setActiveSubtab(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels, getDefaultSubtab());
  };

  const resetDuiBuildTablePanels = () => {
    ui.els.duiBuildTable.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.duiBuildTable.exercisePlaceholder) {
      ui.els.duiBuildTable.exercisePlaceholder.style.display = "";
    }
    if (ui.els.duiBuildTable.solutionPlaceholder) {
      ui.els.duiBuildTable.solutionPlaceholder.style.display = "";
    }
    if (ui.els.duiBuildTable.option3) ui.els.duiBuildTable.option3.checked = true;
    if (ui.els.duiBuildTable.option4) ui.els.duiBuildTable.option4.checked = false;
    if (ui.els.duiBuildTable.exerciseBlock) {
      ui.els.duiBuildTable.exerciseBlock.classList.add("hidden");
    }
    if (ui.els.duiBuildTable.statement) ui.els.duiBuildTable.statement.textContent = "";
    if (ui.els.duiBuildTable.optimismInput) ui.els.duiBuildTable.optimismInput.value = "";
    if (ui.els.duiBuildTable.optimismField) {
      ui.els.duiBuildTable.optimismField.classList.add("hidden");
    }
    if (ui.els.duiBuildTable.exerciseTable) ui.els.duiBuildTable.exerciseTable.innerHTML = "";
    if (ui.els.duiBuildTable.checkBtn) {
      ui.els.duiBuildTable.checkBtn.classList.add("is-disabled");
      ui.els.duiBuildTable.checkBtn.classList.remove("exercises-cta-green");
    }
    if (ui.els.duiBuildTable.checkMessage) {
      ui.els.duiBuildTable.checkMessage.classList.add("hidden");
    }
    if (ui.els.duiBuildTable.solutionBody) {
      ui.els.duiBuildTable.solutionBody.classList.add("hidden");
    }
    if (ui.els.duiBuildTable.checkStatus) {
      ui.els.duiBuildTable.checkStatus.textContent = "";
      ui.els.duiBuildTable.checkStatus.classList.remove("is-correct", "is-wrong");
    }
    if (ui.els.duiBuildTable.solutionCard) {
      ui.els.duiBuildTable.solutionCard.innerHTML = "";
    }
    if (ui.els.duiBuildTable.solutionExplainers) {
      ui.els.duiBuildTable.solutionExplainers.innerHTML = "";
    }
    setActiveSubtab(
      ui.els.duiBuildTable.subtabButtons,
      ui.els.duiBuildTable.subtabPanels,
      getDefaultSubtab()
    );
  };

  const resetDuiOptimismPanels = () => {
    ui.els.duiOptimism.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.duiOptimism.seedModeAuto) {
      ui.els.duiOptimism.seedModeAuto.checked = true;
      ui.els.duiOptimism.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.duiOptimism.seedModeManual) ui.els.duiOptimism.seedModeManual.checked = false;
    if (ui.els.duiOptimism.seedManualInput) ui.els.duiOptimism.seedManualInput.value = "";
    if (ui.els.duiOptimism.seedUsedExercise) ui.els.duiOptimism.seedUsedExercise.innerHTML = "";
    if (ui.els.duiOptimism.seedUsedSolution) ui.els.duiOptimism.seedUsedSolution.innerHTML = "";
    setActiveSubtab(
      ui.els.duiOptimism.subtabButtons,
      ui.els.duiOptimism.subtabPanels,
      getDefaultSubtab()
    );
  };

  const resetGamePanels = () => {
    ui.els.game.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.game.numRows) ui.els.game.numRows.value = "3";
    if (ui.els.game.numCols) ui.els.game.numCols.value = "3";
    if (ui.els.game.valuePrecision) {
      ui.els.game.valuePrecision.value = "5";
      ui.els.game.valuePrecision.dispatchEvent(new Event("change", { bubbles: true }));
    }
    updateGameRangeLabels();
    if (ui.els.game.seedModeAuto) {
      ui.els.game.seedModeAuto.checked = true;
      ui.els.game.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.game.seedModeManual) ui.els.game.seedModeManual.checked = false;
    if (ui.els.game.seedManualInput) ui.els.game.seedManualInput.value = "";
    if (ui.els.game.problemDescription) ui.els.game.problemDescription.innerHTML = "";
    if (ui.els.game.problemTable) ui.els.game.problemTable.innerHTML = "";
    if (ui.els.game.solutionHeader) ui.els.game.solutionHeader.innerHTML = "";
    if (ui.els.game.solutionTable) ui.els.game.solutionTable.innerHTML = "";
    if (ui.els.game.seedUsedExercise) ui.els.game.seedUsedExercise.innerHTML = "";
    if (ui.els.game.seedUsedSolution) ui.els.game.seedUsedSolution.innerHTML = "";
    setActiveSubtab(ui.els.game.subtabButtons, ui.els.game.subtabPanels, getDefaultSubtab());
  };

  const resetGameClassicPanels = () => {
    ui.els.gameClassic.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.gameClassic.gameType) {
      ui.els.gameClassic.gameType.value = "test";
      ui.els.gameClassic.gameType.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.gameClassic.seedModeAuto) {
      ui.els.gameClassic.seedModeAuto.checked = true;
      ui.els.gameClassic.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.gameClassic.seedModeManual) ui.els.gameClassic.seedModeManual.checked = false;
    if (ui.els.gameClassic.seedManualInput) ui.els.gameClassic.seedManualInput.value = "";
    if (ui.els.gameClassic.problemDescription) ui.els.gameClassic.problemDescription.innerHTML = "";
    if (ui.els.gameClassic.problemTable) ui.els.gameClassic.problemTable.innerHTML = "";
    if (ui.els.gameClassic.solutionHeader) ui.els.gameClassic.solutionHeader.innerHTML = "";
    if (ui.els.gameClassic.seedUsedExercise) ui.els.gameClassic.seedUsedExercise.innerHTML = "";
    if (ui.els.gameClassic.seedUsedSolution) ui.els.gameClassic.seedUsedSolution.innerHTML = "";
    setActiveSubtab(
      ui.els.gameClassic.subtabButtons,
      ui.els.gameClassic.subtabPanels,
      getDefaultSubtab()
    );
  };

  const resetDurPanels = () => {
    ui.els.dur.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.dur.exerciseBlock) ui.els.dur.exerciseBlock.classList.add("hidden");
    if (ui.els.dur.exerciseTreeCard) ui.els.dur.exerciseTreeCard.classList.add("hidden");
    if (ui.els.dur.exerciseType) {
      ui.els.dur.exerciseType.value = DUR_EXERCISES[0]?.id ?? ui.els.dur.exerciseType.value;
      ui.els.dur.exerciseType.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.dur.probabilityPrecision) {
      ui.els.dur.probabilityPrecision.value = "5";
      ui.els.dur.probabilityPrecision.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.dur.seedModeAuto) {
      ui.els.dur.seedModeAuto.checked = true;
      ui.els.dur.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.dur.seedModeManual) ui.els.dur.seedModeManual.checked = false;
    if (ui.els.dur.seedManualInput) ui.els.dur.seedManualInput.value = "";
    if (ui.els.dur.tree) ui.els.dur.tree.innerHTML = "";
    if (ui.els.dur.solutionTree) {
      ui.els.dur.solutionTree.innerHTML = "";
    }
    if (ui.els.dur.solutionLegend) {
      ui.els.dur.solutionLegend.innerHTML = "";
    }
    if (ui.els.dur.solutionText) {
      ui.els.dur.solutionText.innerHTML = "";
      ui.els.dur.solutionText.classList.add("hidden");
    }
    if (ui.els.dur.solutionExplainer) {
      ui.els.dur.solutionExplainer.innerHTML = "";
      ui.els.dur.solutionExplainer.classList.add("hidden");
    }
    if (ui.els.dur.solutionTreeCard) {
      ui.els.dur.solutionTreeCard.classList.add("hidden");
    }
    if (ui.els.dur.seedUsedExercise) ui.els.dur.seedUsedExercise.innerHTML = "";
    if (ui.els.dur.seedUsedSolution) ui.els.dur.seedUsedSolution.innerHTML = "";
    setActiveSubtab(ui.els.dur.subtabButtons, ui.els.dur.subtabPanels, getDefaultSubtab());
  };

  const resetEvGeneratedPanels = () => {
    ui.els.ev.placeholders.forEach((el) => (el.style.display = ""));
    if (ui.els.ev.exerciseBlock) ui.els.ev.exerciseBlock.classList.add("hidden");
    if (ui.els.ev.exerciseTreeCard) {
      ui.els.ev.exerciseTreeCard.classList.add("hidden");
      ui.els.ev.exerciseTreeCard.classList.remove("ev-find-payoff");
      ui.els.ev.exerciseTreeCard.classList.remove("ev-find-probabilities");
    }
    if (ui.els.ev.solutionExplainerTop) {
      ui.els.ev.solutionExplainerTop.innerHTML = "";
      ui.els.ev.solutionExplainerTop.classList.add("hidden");
    }
    if (ui.els.ev.solutionExplainerBottom) {
      ui.els.ev.solutionExplainerBottom.innerHTML = "";
      ui.els.ev.solutionExplainerBottom.classList.add("hidden");
    }
    if (ui.els.ev.solutionContent) ui.els.ev.solutionContent.innerHTML = "";
    if (ui.els.ev.tree) ui.els.ev.tree.innerHTML = "";
    if (ui.els.ev.solutionTree) {
      ui.els.ev.solutionTree.innerHTML = "";
    }
    if (ui.els.ev.solutionTreeCard) {
      ui.els.ev.solutionTreeCard.classList.add("hidden");
      ui.els.ev.solutionTreeCard.classList.remove("ev-find-payoff");
      ui.els.ev.solutionTreeCard.classList.remove("ev-find-probabilities");
    }
    if (ui.els.ev.solutionText) {
      ui.els.ev.solutionText.classList.add("hidden");
    }
    if (ui.els.ev.seedUsedExercise) ui.els.ev.seedUsedExercise.innerHTML = "";
    if (ui.els.ev.seedUsedSolution) ui.els.ev.seedUsedSolution.innerHTML = "";
  };

  const resetEvPanels = () => {
    if (ui.els.ev.exerciseType) {
      ui.els.ev.exerciseType.value =
        EXPECTED_VALUE_EXERCISES[0]?.id ?? ui.els.ev.exerciseType.value;
      ui.els.ev.exerciseType.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.ev.numPayoffs) ui.els.ev.numPayoffs.value = "3";
    if (ui.els.ev.proposedPayoffs) ui.els.ev.proposedPayoffs.value = "";
    if (ui.els.ev.proposedProbabilities) ui.els.ev.proposedProbabilities.value = "";
    updateEvRangeLabels();
    updateEvInputMode();
    if (ui.els.ev.seedModeAuto) {
      ui.els.ev.seedModeAuto.checked = true;
      ui.els.ev.seedModeAuto.dispatchEvent(new Event("change", { bubbles: true }));
    }
    if (ui.els.ev.seedModeManual) ui.els.ev.seedModeManual.checked = false;
    if (ui.els.ev.seedManualInput) ui.els.ev.seedManualInput.value = "";
    resetEvGeneratedPanels();
    setActiveSubtab(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels, getDefaultSubtab());
  };

  const resetAllExercises = () => {
    resetDuiPanels();
    resetDuiBuildTablePanels();
    resetDuiOptimismPanels();
    resetGamePanels();
    resetGameClassicPanels();
    resetDurPanels();
    resetEvPanels();
  };

  const buildExplainerBox = (title, bodyHtml, texts) => `
    <details class="exercises-explainer">
      <summary class="exercises-explainer-summary">
        <span class="exercises-explainer-title">${title}</span>
        <span class="exercises-explainer-toggle">
          <span class="when-closed">
            <span class="toggle-long">${texts.toggleShow}</span>
            <span class="toggle-short">${texts.toggleShowShort}</span>
          </span>
          <span class="when-open">
            <span class="toggle-long">${texts.toggleHide}</span>
            <span class="toggle-short">${texts.toggleHideShort}</span>
          </span>
        </span>
      </summary>
      <div class="exercises-explainer-body">
        ${bodyHtml}
      </div>
    </details>
  `;

  const formatProbabilityDecimal = (value, digits = 2) => {
    const num = Number(value);
    if (!Number.isFinite(num)) return "0";
    const pct = num <= 1 ? num : num / 100;
    return Number(pct.toFixed(digits)).toString();
  };

  const formatNumberPlain = (value, digits = 2) => {
    if (!Number.isFinite(value)) return "0";
    const fixed = value.toFixed(digits);
    return fixed.replace(/\.?0+$/, "");
  };

  const parseLooseNumber = (value) => {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return Number.NaN;
    const cleaned = value
      .replace(/\s/g, "")
      .replace(/[^0-9.,-]/g, "")
      .replace(",", ".");
    const parsed = Number.parseFloat(cleaned);
    return Number.isFinite(parsed) ? parsed : Number.NaN;
  };

  const parseSemicolonList = (value) =>
    String(value ?? "")
      .split(";")
      .map((item) => item.trim())
      .filter(Boolean);

  const renderEditableDuiTable = (container, size) => {
    if (!container) return;
    const headers = ["&nbsp;", ...Array.from({ length: size }, (_, i) => `E${i + 1}`)];
    const rows = Array.from({ length: size }, (_, rowIndex) => {
      const rowLabel = `D${rowIndex + 1}`;
      const cells = Array.from({ length: size }, () => {
        return `
          <td>
            <input
              class="exercises-table-input"
              type="number"
              inputmode="decimal"
              step="any"
              placeholder="0"
            />
          </td>
        `;
      }).join("");
      return `<tr><th>${rowLabel}</th>${cells}</tr>`;
    }).join("");

    container.innerHTML = `
      <div class="exercises-table-wrap">
        <table class="exercises-table exercises-table-editable">
          <thead>
            <tr>${headers.map((label) => `<th>${label}</th>`).join("")}</tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    `;
  };

  const normalizeProbabilityValue = (value) => {
    const num = parseLooseNumber(value);
    if (!Number.isFinite(num)) return Number.NaN;
    return num > 1 ? num / 100 : num;
  };

  const joinSignedLatex = (values = []) => {
    const parts = values.filter(Boolean).map((value) => String(value).trim());
    if (!parts.length) return "";
    return parts
      .map((term, index) => {
        const isNegative = term.startsWith("-");
        const normalized = isNegative ? term.replace(/^-+\s*/, "") : term;
        if (index === 0) {
          return isNegative ? `- ${normalized}` : normalized;
        }
        return isNegative ? `- ${normalized}` : `+ ${normalized}`;
      })
      .join(" ");
  };

  const resolveLocalizedLabel = (label, lang) => {
    if (!label) return "";
    if (typeof label === "string" || typeof label === "number") return String(label);
    if (typeof label === "object") {
      if (lang && label[lang]) return String(label[lang]);
      if (label.pt) return String(label.pt);
      if (label.en) return String(label.en);
    }
    return "";
  };

  const resolveMethodLabel = (method, lang) => {
    const entry = EXERCISE_TYPES.find((item) => item.value === method);
    return resolveLocalizedLabel(entry?.label ?? method, lang) || method;
  };

  const formatChoiceList = (labels, lang) => {
    const list = labels.filter(Boolean);
    if (list.length <= 1) return list[0] ?? "";
    if (list.length === 2) {
      return lang === "en" ? `${list[0]} or ${list[1]}` : `${list[0]} ou ${list[1]}`;
    }
    const last = list[list.length - 1];
    const head = list.slice(0, -1).join(", ");
    return lang === "en" ? `${head} or ${last}` : `${head} ou ${last}`;
  };

  const formatListWithAnd = (labels, lang) => {
    const list = labels.filter(Boolean);
    if (list.length <= 1) return list[0] ?? "";
    const connector = lang === "en" ? "and" : "e";
    if (list.length === 2) {
      return `${list[0]} ${connector} ${list[1]}`;
    }
    const last = list[list.length - 1];
    const head = list.slice(0, -1).join(", ");
    return `${head} ${connector} ${last}`;
  };

  const buildStdDevSolution = (lottery, options = {}) => {
    const edges = Array.isArray(lottery?.children) ? lottery.children : [];
    const expectedValue = Number.isFinite(options.expectedValue)
      ? options.expectedValue
      : solveLottery(lottery, options).expectedValue;
    const valueDigits = Number.isFinite(options.valueDigits) ? options.valueDigits : 0;
    const veAbsLatex = formatCurrencyLatex(Math.abs(expectedValue), {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });
    const veIsNegative = expectedValue < 0;

    const terms = edges.map((edge) => {
      const payoff = Number(edge?.payoff ?? 0);
      const probRaw = edge?.probability ?? edge?.prob ?? 0;
      const probability = Number.isFinite(probRaw) ? (probRaw > 1 ? probRaw / 100 : probRaw) : 0;
      const diff = payoff - expectedValue;
      const varianceTerm = probability * diff * diff;
      return {
        probability,
        payoff,
        varianceTerm,
        probText: formatProbabilityDecimal(probability),
      };
    });

    const variance = terms.reduce((sum, term) => sum + term.varianceTerm, 0);
    const varianceText = formatNumberPlain(variance, 2);
    const sigmaValue = Math.sqrt(Math.max(0, variance));
    const sigmaLatex = formatCurrencyLatex(sigmaValue, {
      locale: options.locale,
      currency: options.currency,
      digits: 2,
    });

    const varianceTerms = terms.map((term) => {
      const payoffLatex = formatCurrencyLatex(term.payoff, {
        locale: options.locale,
        currency: options.currency,
        digits: valueDigits,
      });
      const veOperator = veIsNegative ? "+" : "-";
      return `${term.probText} \\cdot \\left(${payoffLatex} ${veOperator} ${veAbsLatex}\\right)^2`;
    });

    const varianceAligned = varianceTerms.map((term, idx) => {
      if (idx === 0) return `\\mathrm{Var} &= ${term}`;
      return `&+ ${term}`;
    });

    const varianceLine = `\\[ \\begin{aligned} ${varianceAligned.join(" \\\\ ")} \\end{aligned} \\]`;
    const varianceValueLine = `\\[ \\mathrm{Var} = ${varianceText} \\]`;
    const sigmaLine = `\\[ \\sigma = \\sqrt{\\mathrm{Var}} = \\sqrt{${varianceText}} = ${sigmaLatex} \\]`;

    const lines = [varianceLine, varianceValueLine, sigmaLine];
    return { variance, sigmaValue, lines };
  };

  const buildFindPayoffSolution = (lottery, options = {}) => {
    const edges = Array.isArray(lottery?.children) ? lottery.children : [];
    const missingIndex = Number.isFinite(options.missingIndex) ? options.missingIndex : 0;
    const expectedValue = Number.isFinite(options.expectedValue)
      ? options.expectedValue
      : solveLottery(lottery, options).expectedValue;
    const valueDigits = Number.isFinite(options.valueDigits) ? options.valueDigits : 0;
    const valueSymbol = options.valueSymbol ?? "V_e";
    const missingPayoffLabel = options.missingPayoffLabel ?? "";
    const terms = edges.map((edge) => {
      const payoff = Number(edge?.payoff ?? 0);
      const probRaw = edge?.probability ?? edge?.prob ?? 0;
      const probability = Number.isFinite(probRaw) ? (probRaw > 1 ? probRaw / 100 : probRaw) : 0;
      const termValue = Math.round(probability * payoff);
      return {
        probability,
        payoff,
        termValue,
        probText: formatProbabilityDecimal(probability),
        probLabel: formatProbability(probability, { digits: 0 }),
        payoffLatex: formatCurrencyLatex(payoff, {
          locale: options.locale,
          currency: options.currency,
          digits: valueDigits,
        }),
        termValueLatex: formatCurrencyLatex(termValue, {
          locale: options.locale,
          currency: options.currency,
          digits: valueDigits,
        }),
      };
    });

    const sumKnown = terms.reduce(
      (sum, term, idx) => (idx === missingIndex ? sum : sum + term.termValue),
      0
    );
    const missingTerm = terms[missingIndex];
    const missingProb = missingTerm?.probability ?? 0;
    const missingTermValue = expectedValue - sumKnown;
    const missingPayoff =
      missingProb > 0 ? Math.round(missingTermValue / missingProb) : 0;

    const expectedValueLatex = formatCurrencyLatex(expectedValue, {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });
    const missingTermValueLatex = formatCurrencyLatex(missingTermValue, {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });
    const missingPayoffLatex = formatCurrencyLatex(missingPayoff, {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });

    const line1Terms = terms.map((term, idx) => {
      if (idx === missingIndex) {
        return `${term.probText} \\cdot x`;
      }
      return `${term.probText} \\cdot \\left(${term.payoffLatex}\\right)`;
    });
    const line2Terms = terms.map((term, idx) =>
      idx === missingIndex ? `${term.probText} \\cdot x` : term.termValueLatex
    );
    const equations = [
      { type: "spacer" },
      `${valueSymbol} = ${expectedValueLatex}`,
      `${valueSymbol} = ${line1Terms.join(" + ")}`,
      { type: "spacer" },
      `${expectedValueLatex} = ${joinSignedLatex(line2Terms)}`,
      `${missingTerm?.probText ?? 0} \\cdot x = ${missingTermValueLatex}`,
      { type: "spacer" },
      `x = ${missingPayoffLatex}${
        missingPayoffLabel ? `\\; (\\textbf{${missingPayoffLabel}})` : ""
      }`,
    ];

    const joiner = options.labelJoiner ?? " | ";
    const displayLottery = {
      ...lottery,
      children: edges.map((edge, idx) => {
        if (idx !== missingIndex) return edge;
        const probLabel = missingTerm?.probLabel ?? "";
        return {
          ...edge,
          lines: [
            {
              className: "secondary",
              parts: [
                { text: "x = ?", className: "accent" },
                { text: probLabel ? `${joiner}${probLabel}` : "", className: "secondary" },
              ].filter((part) => part.text),
            },
          ],
        };
      }),
    };

    const solutionLottery = {
      ...lottery,
      children: edges.map((edge, idx) => {
        if (idx !== missingIndex) return edge;
        const probLabel = missingTerm?.probLabel ?? "";
        const payoffLabel = formatCurrency(missingPayoff, {
          locale: options.locale,
          currency: options.currency,
          digits: valueDigits,
        });
        return {
          ...edge,
          lines: [
            {
              className: "secondary",
              parts: [
                { text: `x = ${payoffLabel}`, className: "accent" },
                { text: probLabel ? `${joiner}${probLabel}` : "", className: "secondary" },
              ].filter((part) => part.text),
            },
          ],
        };
      }),
    };

    return {
      missingPayoff,
      missingIndex,
      equations,
      displayLottery,
      solutionLottery,
    };
  };

  const buildFindProbabilitiesSolution = (lottery, options = {}) => {
    const edges = Array.isArray(lottery?.children) ? lottery.children : [];
    const unknownIndices = Array.isArray(options.unknownIndices) ? options.unknownIndices : [0, 1];
    const [idxA, idxB] = unknownIndices;
    const expectedValue = Number.isFinite(options.expectedValue)
      ? options.expectedValue
      : solveLottery(lottery, options).expectedValue;
    const valueDigits = Number.isFinite(options.valueDigits) ? options.valueDigits : 0;
    const valueSymbol = options.valueSymbol ?? "V_e";
    const joiner = options.labelJoiner ?? " | ";
    const probLabels = options.probLabels ?? ["p1", "p2"];
    const sectionLabels = options.sectionLabels ?? {};

    const terms = edges.map((edge) => {
      const payoff = Number(edge?.payoff ?? 0);
      const probRaw = edge?.probability ?? edge?.prob ?? 0;
      const probability = Number.isFinite(probRaw) ? (probRaw > 1 ? probRaw / 100 : probRaw) : 0;
      const termValue = Math.round(probability * payoff);
      return {
        probability,
        payoff,
        termValue,
        probText: formatProbabilityDecimal(probability),
        probLabel: formatProbability(probability, { digits: 0 }),
        payoffLatex: formatCurrencyLatex(payoff, {
          locale: options.locale,
          currency: options.currency,
          digits: valueDigits,
        }),
        payoffLabel: formatCurrency(payoff, {
          locale: options.locale,
          currency: options.currency,
          digits: valueDigits,
        }),
      };
    });

    const unknownSet = new Set([idxA, idxB]);
    const knownTerms = terms.filter((_, idx) => !unknownSet.has(idx));
    const knownProbSum = terms.reduce(
      (sum, term, idx) => (unknownSet.has(idx) ? sum : sum + term.probability),
      0
    );
    const knownValueSum = terms.reduce(
      (sum, term, idx) => (unknownSet.has(idx) ? sum : sum + term.termValue),
      0
    );

    const totalProb = Math.max(0, 1 - knownProbSum);
    const rhs = expectedValue - knownValueSum;

    const termA = terms[idxA];
    const termB = terms[idxB];
    const payoffA = termA?.payoff ?? 0;
    const payoffB = termB?.payoff ?? 0;
    const denom = payoffA - payoffB;
    const rawP1 = denom !== 0 ? (rhs - totalProb * payoffB) / denom : 0;
    const p1 = Number(rawP1.toFixed(4));
    const p2 = Number((totalProb - p1).toFixed(4));

    const p1Text = formatProbabilityDecimal(p1);
    const p2Text = formatProbabilityDecimal(p2);
    const p1Label = formatProbability(p1, { digits: 0 });
    const p2Label = formatProbability(p2, { digits: 0 });
    const expectedValueLatex = formatCurrencyLatex(expectedValue, {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });
    const knownValueLatex = formatCurrencyLatex(knownValueSum, {
      locale: options.locale,
      currency: options.currency,
      digits: valueDigits,
    });
    const payoffALatex = termA?.payoffLatex ?? "0";
    const payoffBLatex = termB?.payoffLatex ?? "0";
    const knownTermsLatex = knownTerms.length
      ? knownTerms.map((term) => `${term.probText} \\cdot ${term.payoffLatex}`).join(" + ")
      : knownValueLatex;
    const payoffALabel = formatNumberPlain(payoffA, 0);
    const payoffBLabel = formatNumberPlain(payoffB, 0);
    const knownValueLabel = formatNumberPlain(knownValueSum, 0);
    const knownTermsPlain = knownTerms.length
      ? knownTerms.map((term) => `${term.probText} \\cdot ${formatNumberPlain(term.payoff, 0)}`).join(" + ")
      : knownValueLabel;
    const knownProbLabel = formatNumberPlain(knownProbSum, 2);
    const totalProbLabel = formatNumberPlain(totalProb, 2);
    const expectedValueLabel = formatNumberPlain(expectedValue, 0);
    const knownValueNum = Number(knownValueLabel);
    const totalProbPayoffB = totalProb * payoffB;
    const totalProbPayoffBLabel = formatNumberPlain(totalProbPayoffB, 2);
    const rhsValue = Number(
      formatNumberPlain(expectedValue - (knownValueSum + totalProbPayoffB), 2)
    );
    const coeffLabel = formatNumberPlain(denom, 2);

    const evEquation = `${valueSymbol} = ${expectedValueLatex}`;
    const evExpanded = `${valueSymbol} = ${probLabels[0]} \\cdot ${payoffALatex} + ${probLabels[1]} \\cdot ${payoffBLatex}${knownTermsLatex ? ` + ${knownTermsLatex}` : ""}`;
    const sumLine = `${probLabels[0]} + ${probLabels[1]} + ${knownProbLabel} = 1`;
    const p2Line = `${probLabels[1]} = ${totalProbLabel} - ${probLabels[0]}`;
    const p1SubLine = `${expectedValueLabel} = ${payoffALabel} \\cdot ${probLabels[0]} + (${totalProbLabel} - ${probLabels[0]})\\cdot ${payoffBLabel}${knownTermsPlain ? ` + ${knownTermsPlain}` : ""}`;
    const p1ExpandedLine = `${expectedValueLabel} = ${payoffALabel} \\cdot ${probLabels[0]} + (${totalProbPayoffBLabel}) - (${payoffBLabel})${probLabels[0]} + (${knownValueLabel})`;
    const p1SolveLine = `${coeffLabel}${probLabels[0]} = ${expectedValueLabel} - (${formatNumberPlain(
      knownValueNum + totalProbPayoffB,
      2
    )})`;
    const p1SolveLine2 = `${coeffLabel}${probLabels[0]} = ${formatNumberPlain(rhsValue, 2)}`;
    const p1FractionLine = `${probLabels[0]} = \\frac{${formatNumberPlain(rhsValue, 2)}}{${coeffLabel}}`;
    const p1ResultLine = `${probLabels[0]} = ${p1Text}`;
    const p2SubLine = `${probLabels[1]} = ${totalProbLabel} - ${p1Text}`;
    const p2ResultLine = `${probLabels[1]} = ${p2Text}`;

    const equations = [
      { type: "text", value: sectionLabels.sum ?? "Probabilidades somam 1:" },
      sumLine,
      p2Line,
      { type: "text", value: sectionLabels.ev ?? "Fórmula do valor esperado:" },
      evEquation,
      evExpanded,
      { type: "text", value: sectionLabels.p1 ?? "Cálculo de p1 (por substituição):" },
      p1SubLine,
      p1ExpandedLine,
      p1SolveLine,
      p1SolveLine2,
      p1FractionLine,
      p1ResultLine,
      { type: "text", value: sectionLabels.p2 ?? "Cálculo de p2 (conhecendo o valor de p1):" },
      p2SubLine,
      p2ResultLine,
    ];

    const buildLineParts = (payoffLabel, probText, accent) => [
      { text: payoffLabel, className: "secondary" },
      { text: joiner, className: "secondary" },
      { text: probText, className: accent ? "accent" : "secondary" },
    ];

    const displayLottery = {
      ...lottery,
      children: edges.map((edge, idx) => {
        const term = terms[idx];
        if (!unknownSet.has(idx)) return edge;
        const label = idx === idxA ? probLabels[0] : probLabels[1];
        return {
          ...edge,
          lines: [
            {
              className: "secondary",
              parts: buildLineParts(term.payoffLabel, `${label} = ?`, true),
            },
          ],
        };
      }),
    };

    const solutionLottery = {
      ...lottery,
      children: edges.map((edge, idx) => {
        const term = terms[idx];
        if (!unknownSet.has(idx)) return edge;
        const label = idx === idxA ? probLabels[0] : probLabels[1];
        const resolved = idx === idxA ? `${label} = ${p1Label}` : `${label} = ${p2Label}`;
        return {
          ...edge,
          lines: [
            {
              className: "secondary",
              parts: buildLineParts(term.payoffLabel, resolved, true),
            },
          ],
        };
      }),
    };

    return { equations, displayLottery, solutionLottery };
  };

  updateDuiRangeLabels();
  updateGameRangeLabels();
  updateEvRangeLabels();
  updateOptimismLevel();
  updateDuiLayout();
  updateDuiBuildTableLayout();
  updateDuiOptimismLayout();
  updateGameLayout();
  updateGameClassicLayout();
  updateDurLayout();
  updateEvLayout();

  wireSeedControls(ui.els.dui.seedModeAuto, ui.els.dui.seedModeManual, ui.els.dui.seedManualWrap);
  wireSeedControls(
    ui.els.duiOptimism.seedModeAuto,
    ui.els.duiOptimism.seedModeManual,
    ui.els.duiOptimism.seedManualWrap
  );
  wireSeedControls(ui.els.game.seedModeAuto, ui.els.game.seedModeManual, ui.els.game.seedManualWrap);
  wireSeedControls(
    ui.els.gameClassic.seedModeAuto,
    ui.els.gameClassic.seedModeManual,
    ui.els.gameClassic.seedManualWrap
  );
  wireSeedControls(ui.els.dur.seedModeAuto, ui.els.dur.seedModeManual, ui.els.dur.seedManualWrap);
  wireSeedControls(ui.els.ev.seedModeAuto, ui.els.ev.seedModeManual, ui.els.ev.seedManualWrap);

  [
    ui.els.dui.exerciseType,
    ui.els.dui.valuePrecision,
    ui.els.game.valuePrecision,
    ui.els.gameClassic.gameType,
    ui.els.gameClassic.payoffStyle,
    ui.els.dur.exerciseType,
    ui.els.ev.exerciseType,
  ]
    .forEach(enhanceSelect);

  setMainPanel("home");

  window.addEventListener("resize", () => {
    updateDuiRangeLabels();
    updateGameRangeLabels();
    updateEvRangeLabels();
    updateDuiLayout();
    updateGameLayout();
    updateDurLayout();
    updateEvLayout();
  });

  if (mobileMq.addEventListener) {
    mobileMq.addEventListener("change", updateDuiLayout);
    mobileMq.addEventListener("change", updateDuiBuildTableLayout);
    mobileMq.addEventListener("change", updateDuiOptimismLayout);
    mobileMq.addEventListener("change", updateGameLayout);
    mobileMq.addEventListener("change", updateGameClassicLayout);
    mobileMq.addEventListener("change", updateDurLayout);
    mobileMq.addEventListener("change", updateEvLayout);
  } else if (mobileMq.addListener) {
    mobileMq.addListener(updateDuiLayout);
    mobileMq.addListener(updateDuiBuildTableLayout);
    mobileMq.addListener(updateDuiOptimismLayout);
    mobileMq.addListener(updateGameLayout);
    mobileMq.addListener(updateGameClassicLayout);
    mobileMq.addListener(updateDurLayout);
    mobileMq.addListener(updateEvLayout);
  }

  ui.els.homeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setMainPanel(btn.dataset.home);
    });
  });

  if (ui.els.homeLink) {
    ui.els.homeLink.addEventListener("click", () => {
      resetAllExercises();
      setMainPanel("home");
    });
  }

  wireSubtabs(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels);
  wireSubtabs(ui.els.duiBuildTable.subtabButtons, ui.els.duiBuildTable.subtabPanels);
  wireSubtabs(ui.els.duiOptimism.subtabButtons, ui.els.duiOptimism.subtabPanels);
  wireSubtabs(ui.els.game.subtabButtons, ui.els.game.subtabPanels);
  wireSubtabs(ui.els.gameClassic.subtabButtons, ui.els.gameClassic.subtabPanels);
  wireSubtabs(ui.els.dur.subtabButtons, ui.els.dur.subtabPanels);
  wireSubtabs(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels);

  ui.els.dui.numDecisions.addEventListener("input", updateDuiRangeLabels);
  ui.els.dui.numStates.addEventListener("input", updateDuiRangeLabels);
  ui.els.dui.exerciseType.addEventListener("change", () => updateOptimismLevel());

  ui.els.ev.numPayoffs.addEventListener("input", updateEvRangeLabels);
  let lastEvExerciseType = ui.els.ev.exerciseType?.value ?? "";
  ui.els.ev.exerciseType.addEventListener("change", () => {
    updateEvInputMode();
    const nextExerciseType = ui.els.ev.exerciseType?.value ?? "";
    if (!nextExerciseType || nextExerciseType === lastEvExerciseType) return;
    lastEvExerciseType = nextExerciseType;

    resetEvGeneratedPanels();
    setActiveSubtab(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels, getDefaultSubtab());

    const isDesktop = !mobileMq.matches;
    const evVisible = ui.els.ev.panel && !ui.els.ev.panel.classList.contains("hidden");
    if (isDesktop && evVisible) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
  updateEvInputMode();

  const wireEmptyExerciseGenerate = (els) => {
    if (!els?.generateBtn) return;
    els.generateBtn.addEventListener("click", () => {
      setActiveSubtab(els.subtabButtons, els.subtabPanels, "exercise");
      window.scrollTo({ top: 0, behavior: "smooth" });
      const seedMode = getSeedMode(els);
      const seed = resolveSeedFromMode(seedMode, els.seedManualInput);
      if (els.placeholders) els.placeholders.forEach((el) => (el.style.display = "none"));
      renderSeedUsed(els.seedUsedExercise, seed, ui.labels);
      renderSeedUsed(els.seedUsedSolution, seed, ui.labels);
    });
  };

  ui.els.dui.generateBtn.addEventListener("click", () => {
    setActiveSubtab(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels, "exercise");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const exerciseType = ui.els.dui.exerciseType.value;
    const exerciseLabel = ui.exerciseLabels[exerciseType] ?? exerciseType;
    const numDecisions = Number(ui.els.dui.numDecisions.value);
    const numStates = Number(ui.els.dui.numStates.value);
    const valuePrecision = Number(ui.els.dui.valuePrecision.value);
    const seedMode = getSeedMode(ui.els.dui);
    const seed = resolveSeedFromMode(seedMode, ui.els.dui.seedManualInput);
    const rng = createSeededRng(seed);

    let problemTable = createDuiTable(
      numDecisions,
      numStates,
      valuePrecision,
      ui.tableLabels,
      rng
    );
    if (exerciseType === "Maximin") {
      problemTable = maybeForceMaximinTies(problemTable, valuePrecision, rng);
    } else if (exerciseType === "Minimax") {
      problemTable = maybeForceMinimaxTies(problemTable, valuePrecision, rng);
    } else if (exerciseType === "Optimism-Pessimism Rule") {
      problemTable = ensureOprUniqueMinMax(problemTable, valuePrecision, rng);
    } else if (exerciseType === "Principle of Insufficient Reason") {
      problemTable = ensurePirUniqueBest(problemTable, valuePrecision, rng);
    }

    updateOptimismLevel(rng);
    let solutionData;
    if (exerciseType === "Maximin") {
      solutionData = solveMaximin(problemTable, ui.tableLabels);
    } else if (exerciseType === "Minimax") {
      solutionData = solveMinimax(problemTable, ui.tableLabels);
    } else if (exerciseType === "Optimism-Pessimism Rule") {
      solutionData = solveOpr(problemTable, levelOfOptimism, ui.tableLabels);
    } else {
      solutionData = solvePir(problemTable, ui.tableLabels);
    }

    ui.els.dui.placeholders.forEach((el) => (el.style.display = "none"));

    ui.els.dui.problemDescription.innerHTML = describeProblem(
      exerciseType,
      exerciseLabel,
      levelOfOptimism,
      ui.texts
    );
    renderTable(ui.els.dui.problemTable, problemTable);

    ui.els.dui.solutionHeader.innerHTML = buildSolutionHeader(
      exerciseType,
      exerciseLabel,
      solutionData.solution,
      levelOfOptimism,
      ui.texts
    );
    if (ui.els.dui.solutionExplainer) {
      ui.els.dui.solutionExplainer.innerHTML = buildSolutionExplainer(
        exerciseType,
        ui.explainerTexts,
        solutionData.solution,
        levelOfOptimism,
        solutionData.baseTable
      );
      renderMathInContainer(ui.els.dui.solutionExplainer);
    }

    renderTable(ui.els.dui.solutionTable, solutionData.baseTable);
    if (ui.els.dui.solutionTableSecondary) {
      renderTable(ui.els.dui.solutionTableSecondary, solutionData.solutionTable, {
        highlightIndex: 1,
      });
    }

    renderSeedUsed(ui.els.dui.seedUsedExercise, seed, ui.labels);
    renderSeedUsed(ui.els.dui.seedUsedSolution, seed, ui.labels);
  });

  ui.els.duiBuildTable.generateBtn.addEventListener("click", () => {
    setActiveSubtab(
      ui.els.duiBuildTable.subtabButtons,
      ui.els.duiBuildTable.subtabPanels,
      "exercise"
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (ui.els.duiBuildTable.exercisePlaceholder) {
      ui.els.duiBuildTable.exercisePlaceholder.style.display = "none";
    }
    if (ui.els.duiBuildTable.solutionPlaceholder) {
      ui.els.duiBuildTable.solutionPlaceholder.style.display = "";
    }
    if (ui.els.duiBuildTable.solutionBody) {
      ui.els.duiBuildTable.solutionBody.classList.add("hidden");
    }
    if (ui.els.duiBuildTable.checkStatus) {
      ui.els.duiBuildTable.checkStatus.textContent = "";
      ui.els.duiBuildTable.checkStatus.classList.remove("is-correct", "is-wrong");
    }
    if (ui.els.duiBuildTable.solutionCard) {
      ui.els.duiBuildTable.solutionCard.innerHTML = "";
    }
    if (ui.els.duiBuildTable.solutionExplainers) {
      ui.els.duiBuildTable.solutionExplainers.innerHTML = "";
    }
    if (ui.els.duiBuildTable.exerciseBlock) {
      ui.els.duiBuildTable.exerciseBlock.classList.remove("hidden");
    }
    const useFourByFour = ui.els.duiBuildTable.option4?.checked;
    const size = useFourByFour ? 4 : 3;
    if (ui.els.duiBuildTable.statement) {
      ui.els.duiBuildTable.statement.textContent = useFourByFour
        ? ui.duiBuildTexts.statement4
        : ui.duiBuildTexts.statement3;
    }
    if (ui.els.duiBuildTable.optimismField) {
      ui.els.duiBuildTable.optimismField.classList.toggle("hidden", !useFourByFour);
    }
    if (!useFourByFour && ui.els.duiBuildTable.optimismInput) {
      ui.els.duiBuildTable.optimismInput.value = "";
    }
    renderEditableDuiTable(ui.els.duiBuildTable.exerciseTable, size);

    const tableInputs = Array.from(
      ui.els.duiBuildTable.exerciseTable?.querySelectorAll("input") ?? []
    );
    const checkBtn = ui.els.duiBuildTable.checkBtn;
    const checkMessage = ui.els.duiBuildTable.checkMessage;
    const optimismInput = ui.els.duiBuildTable.optimismInput;
    const checkStatus = ui.els.duiBuildTable.checkStatus;
    const solutionCard = ui.els.duiBuildTable.solutionCard;
    const solutionExplainers = ui.els.duiBuildTable.solutionExplainers;
    let canCheck = false;

    const getProblemTable = () => {
      const headers = ["", ...Array.from({ length: size }, (_, i) => `E${i + 1}`)];
      const rows = Array.from({ length: size }, (_, rowIndex) => {
        const start = rowIndex * size;
        const rowValues = tableInputs
          .slice(start, start + size)
          .map((input) => parseLooseNumber(input.value));
        return [`D${rowIndex + 1}`, ...rowValues];
      });
      return { headers, rows };
    };

    const updateCheckState = () => {
      const allFilled = tableInputs.every((input) => input.value.trim() !== "");
      const allNumeric = tableInputs.every((input) =>
        Number.isFinite(parseLooseNumber(input.value))
      );
      let optimismValid = true;
      if (useFourByFour) {
        const raw = optimismInput?.value?.trim() ?? "";
        const num = Number(raw);
        optimismValid = raw !== "" && Number.isFinite(num) && num >= 0 && num <= 1;
      }
      canCheck = allFilled && allNumeric && optimismValid;
      if (checkBtn) {
        checkBtn.classList.toggle("exercises-cta-green", canCheck);
        checkBtn.classList.toggle("is-disabled", !canCheck);
      }
      if (canCheck && checkMessage) {
        checkMessage.classList.add("hidden");
      }
    };

    tableInputs.forEach((input) => input.addEventListener("input", updateCheckState));
    if (optimismInput) optimismInput.addEventListener("input", updateCheckState);

    if (checkBtn) {
      checkBtn.onclick = () => {
        if (!canCheck) {
          if (checkMessage) checkMessage.classList.remove("hidden");
          return;
        }
        if (checkMessage) checkMessage.classList.add("hidden");

        const problemTable = getProblemTable();
        const optimismLevel = useFourByFour
          ? Number(optimismInput?.value ?? 0)
          : 0;
        const methods = useFourByFour
          ? ["Maximin", "Minimax", "Optimism-Pessimism Rule", "Principle of Insufficient Reason"]
          : ["Maximin", "Minimax", "Principle of Insufficient Reason"];

        const methodResults = methods.map((method) => {
          let solutionData;
          if (method === "Maximin") {
            solutionData = solveMaximin(problemTable, ui.tableLabels);
          } else if (method === "Minimax") {
            solutionData = solveMinimax(problemTable, ui.tableLabels);
          } else if (method === "Optimism-Pessimism Rule") {
            solutionData = solveOpr(problemTable, optimismLevel, ui.tableLabels);
          } else {
            solutionData = solvePir(problemTable, ui.tableLabels);
          }
          const decisions = solutionData.solution?.bestDecision ?? [];
          return {
            method,
            label: resolveMethodLabel(method, lang),
            decisions,
            decisionText: formatChoiceList(decisions, lang),
            solution: solutionData.solution,
            baseTable: solutionData.baseTable,
          };
        });

        const tiedMethods = methodResults
          .filter((result) => result.decisions.length > 1)
          .map((result) => result.label);
        const decisionGroups = new Map();
        methodResults.forEach((result) => {
          if (result.decisions.length !== 1) return;
          const decision = result.decisions[0];
          if (!decisionGroups.has(decision)) decisionGroups.set(decision, []);
          decisionGroups.get(decision).push(result.label);
        });
        const duplicateGroups = Array.from(decisionGroups.entries()).filter(
          ([, labels]) => labels.length > 1
        );
        const isCorrect =
          methodResults.every((result) => result.decisions.length === 1) &&
          duplicateGroups.length === 0;

        if (checkStatus) {
          checkStatus.textContent = isCorrect
            ? ui.duiBuildTexts.checkStatusCorrect
            : ui.duiBuildTexts.checkStatusWrong;
          checkStatus.classList.toggle("is-correct", isCorrect);
          checkStatus.classList.toggle("is-wrong", !isCorrect);
        }

        let summaryText = "";
        if (isCorrect) {
          summaryText = ui.duiBuildTexts.resultCorrect;
        } else {
          const parts = [];
          if (tiedMethods.length) {
            const list = formatListWithAnd(tiedMethods, lang);
            parts.push(ui.duiBuildTexts.resultTie.replace("{methods}", list));
          }
          duplicateGroups.forEach(([decision, labels]) => {
            const list = formatListWithAnd(labels, lang);
            parts.push(
              ui.duiBuildTexts.resultDuplicate
                .replace("{methods}", list)
                .replace("{decision}", decision)
            );
          });
          summaryText = `${ui.duiBuildTexts.resultIncorrectIntro} ${parts.join(" ")}`.trim();
        }

        if (solutionCard) {
          const items = methodResults
            .map(
              (result) => `
              <li class="exercises-solution-item">
                <span class="exercises-solution-key">${result.label}:</span>
                ${result.decisionText || "-"}
              </li>
            `
            )
            .join("");
          solutionCard.innerHTML = `
            <h4 class="exercises-solution-title">${ui.duiBuildTexts.solutionTitle}</h4>
            <hr class="exercises-solution-divider" />
            <p>${ui.duiBuildTexts.solutionLead}</p>
            <ul class="exercises-solution-list">${items}</ul>
            <p class="exercises-solution-summary">${summaryText}</p>
          `;
        }

        if (solutionExplainers) {
          solutionExplainers.innerHTML = methodResults
            .map((result) =>
              buildSolutionExplainer(
                result.method,
                ui.explainerTexts,
                result.solution,
                optimismLevel,
                result.baseTable
              )
            )
            .join("");
          renderMathInContainer(solutionExplainers);
        }

        setActiveSubtab(
          ui.els.duiBuildTable.subtabButtons,
          ui.els.duiBuildTable.subtabPanels,
          "solution"
        );
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (ui.els.duiBuildTable.solutionPlaceholder) {
          ui.els.duiBuildTable.solutionPlaceholder.style.display = "none";
        }
        if (ui.els.duiBuildTable.solutionBody) {
          ui.els.duiBuildTable.solutionBody.classList.remove("hidden");
        }
      };
    }

    updateCheckState();
  });

  wireEmptyExerciseGenerate(ui.els.duiOptimism);

  ui.els.game.numRows.addEventListener("input", updateGameRangeLabels);
  ui.els.game.numCols.addEventListener("input", updateGameRangeLabels);

  ui.els.game.generateBtn.addEventListener("click", () => {
    setActiveSubtab(ui.els.game.subtabButtons, ui.els.game.subtabPanels, "exercise");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const numRows = Number(ui.els.game.numRows.value);
    const numCols = Number(ui.els.game.numCols.value);
    const valuePrecision = Number(ui.els.game.valuePrecision.value);
    const seedMode = getSeedMode(ui.els.game);
    const seed = resolveSeedFromMode(seedMode, ui.els.game.seedManualInput);
    const rng = createSeededRng(seed);

    const game = createGameTable(numRows, numCols, valuePrecision, ui.gameTexts, rng);
    const analysis = analyzeGameForNash(game);
    const solutionTable = buildGameSolutionTable(game, analysis, ui.gameTexts);

    ui.els.game.placeholders.forEach((el) => (el.style.display = "none"));

    ui.els.game.problemDescription.innerHTML = describeGameProblem(ui.gameTexts);
    renderTable(ui.els.game.problemTable, game.table, { tableClass: "game-table" });

    ui.els.game.solutionHeader.innerHTML = buildGameSolutionHeader(
      game,
      analysis,
      ui.gameTexts
    );
    renderTable(ui.els.game.solutionTable, solutionTable.table, {
      cellClasses: solutionTable.cellClasses,
      tableClass: "game-table",
    });

    renderSeedUsed(ui.els.game.seedUsedExercise, seed, ui.labels);
    renderSeedUsed(ui.els.game.seedUsedSolution, seed, ui.labels);
  });

  ui.els.gameClassic.generateBtn.addEventListener("click", () => {
    setActiveSubtab(ui.els.gameClassic.subtabButtons, ui.els.gameClassic.subtabPanels, "exercise");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const seedMode = getSeedMode(ui.els.gameClassic);
    const seed = resolveSeedFromMode(seedMode, ui.els.gameClassic.seedManualInput);
    const rng = createSeededRng(seed);

    const requestedTypeId = ui.els.gameClassic.gameType?.value ?? "test";
    const payoffStyleId = ui.els.gameClassic.payoffStyle?.value ?? "independent";

    const instance = buildClassicGameInstance({
      requestedTypeId,
      payoffStyleId,
      rng,
      texts: ui.gameClassicTexts,
      lang,
    });

    ui.els.gameClassic.placeholders.forEach((el) => (el.style.display = "none"));

    if (ui.els.gameClassic.problemDescription) {
      ui.els.gameClassic.problemDescription.innerHTML = describeClassicGameProblem(
        ui.gameClassicTexts
      );
    }
    if (ui.els.gameClassic.problemTable) {
      renderTable(ui.els.gameClassic.problemTable, instance.table, { tableClass: "game-table" });
    }
    if (ui.els.gameClassic.solutionHeader) {
      ui.els.gameClassic.solutionHeader.innerHTML = buildClassicGameSolutionHeader({
        requestedTypeId: instance.requestedTypeId,
        chosenTypeId: instance.chosenTypeId,
        texts: ui.gameClassicTexts,
        lang,
      });
    }

    renderSeedUsed(ui.els.gameClassic.seedUsedExercise, seed, ui.labels);
    renderSeedUsed(ui.els.gameClassic.seedUsedSolution, seed, ui.labels);
  });

  ui.els.dur.generateBtn.addEventListener("click", () => {
    setActiveSubtab(ui.els.dur.subtabButtons, ui.els.dur.subtabPanels, "exercise");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const seedMode = getSeedMode(ui.els.dur);
    const seed = resolveSeedFromMode(seedMode, ui.els.dur.seedManualInput);
    const rng = createSeededRng(seed);

    ui.els.dur.placeholders.forEach((el) => (el.style.display = "none"));
    if (ui.els.dur.exerciseBlock) ui.els.dur.exerciseBlock.classList.remove("hidden");
    if (ui.els.dur.exerciseTreeCard) ui.els.dur.exerciseTreeCard.classList.remove("hidden");

    const treeSize = ui.els.dur.exerciseType.value;
    const probabilityStep = ui.els.dur.probabilityPrecision
      ? Number(ui.els.dur.probabilityPrecision.value)
      : 5;
    const tree = buildDurRandomTree({
      rng,
      lang,
      size: treeSize,
      probabilityStep,
    });
    const treeLocale = lang === "en" ? "en-US" : "pt-BR";
    const treeCurrency = lang === "en" ? "$" : "R$";
    renderDecisionTree(ui.els.dur.tree, tree, {
      ariaLabel: ui.durTexts.treeAriaLabel,
      locale: treeLocale,
      currency: treeCurrency,
      lang,
    });

    const solution = solveDecisionTree(tree, {
      lang,
      locale: treeLocale,
      currency: treeCurrency,
    });

    renderDecisionTree(ui.els.dur.solutionTree, solution.tree, {
      ariaLabel: ui.durTexts.treeAriaLabel,
      locale: treeLocale,
      currency: treeCurrency,
      lang,
      nodeLabels: solution.nodeLabels,
      nodeLabelParts: solution.nodeLabelParts,
      edgeStates: solution.edgeStates,
    });

    if (ui.els.dur.solutionLegend) {
      ui.els.dur.solutionLegend.innerHTML = `
        <div class="decision-tree-legend-title">${ui.durTexts.legendTitle}</div>
        <div class="decision-tree-legend-items">
          ${solution.legendItems
            .map((item) => `<div>\\(${item.label} = ${item.value}\\)</div>`)
            .join("")}
        </div>
      `;
      renderMathInContainer(ui.els.dur.solutionLegend);
    }

    const renderDurEquation = (eq) => {
      if (eq && typeof eq === "object" && eq.type === "block") {
        return `<div class="decision-tree-equation">${eq.value}</div>`;
      }
      return `<div class="decision-tree-equation">\\(${eq}\\)</div>`;
    };

    if (ui.els.dur.solutionText) {
      ui.els.dur.solutionText.classList.remove("hidden");
      const chanceEquations = solution.equations.filter(
        (eq) => eq && typeof eq === "object" && eq.category === "chance"
      );
      const decisionEquations = solution.equations.filter(
        (eq) => eq && typeof eq === "object" && eq.category === "decision" && !eq.isRoot
      );
      const rootDecisionEquation = solution.equations.find(
        (eq) => eq && typeof eq === "object" && eq.category === "decision" && eq.isRoot
      );
      const root = solution.tree;
      const rootEdges = Array.isArray(root?.children) ? root.children : [];
      const rootChoices = rootEdges
        .filter((edge) => {
          const childId = edge?.node?.id ?? "";
          const edgeKey = `${root.id}::${childId}`;
          const state =
            solution.edgeStates instanceof Map
              ? solution.edgeStates.get(edgeKey)
              : solution.edgeStates?.[edgeKey];
          return !state?.excluded;
        })
        .map((edge) => resolveLocalizedLabel(edge.label, lang))
        .filter(Boolean);
      const choiceList = formatChoiceList(rootChoices, lang);
      const payoffText = formatCurrency(solution.rootValue ?? 0, {
        locale: treeLocale,
        currency: treeCurrency,
        digits: 0,
      });
      let resultTemplate = ui.durTexts.solutionResultSingle;
      if (rootChoices.length > 1) {
        resultTemplate =
          rootChoices.length === 2
            ? ui.durTexts.solutionResultMulti
            : ui.durTexts.solutionResultMultiMany;
      }
      const resultText = resultTemplate
        .replace("{choice}", choiceList)
        .replace("{choices}", choiceList)
        .replace("{value}", payoffText);
      const resultEquation = rootDecisionEquation
        ? renderDurEquation(rootDecisionEquation)
        : renderDurEquation({
            type: "block",
            value: `\\[ r = ${formatCurrencyLatex(solution.rootValue ?? 0, {
              locale: treeLocale,
              currency: treeCurrency,
              digits: 0,
            })} \\]`,
          });
      ui.els.dur.solutionText.innerHTML = `
        <h3 class="exercises-solution-title">${ui.durTexts.solutionTitle}</h3>
        <hr class="exercises-solution-divider" />
        <p class="exercises-solution-intro">${ui.durTexts.solutionIntroText}</p>
        ${
          chanceEquations.length
            ? `
              <div class="exercises-solution-gap"></div>
              <p class="exercises-solution-subtitle"><strong>${ui.durTexts.solutionSectionChance}</strong></p>
              ${chanceEquations.map(renderDurEquation).join("")}
            `
            : ""
        }
        ${
          decisionEquations.length
            ? `
              <div class="exercises-solution-gap"></div>
              <p class="exercises-solution-subtitle"><strong>${ui.durTexts.solutionSectionDecision}</strong></p>
              ${decisionEquations.map(renderDurEquation).join("")}
            `
            : ""
        }
        <div class="exercises-solution-gap"></div>
        <p class="exercises-solution-subtitle"><strong>${ui.durTexts.solutionSectionResult}</strong></p>
        ${resultEquation}
        <div class="exercises-solution-gap"></div>
        <p><strong>${resultText}</strong></p>
      `;
      renderMathInContainer(ui.els.dur.solutionText);
    }

    if (ui.els.dur.solutionExplainer) {
      ui.els.dur.solutionExplainer.classList.remove("hidden");
      ui.els.dur.solutionExplainer.dataset.mathAlign = "center";
      ui.els.dur.solutionExplainer.innerHTML = buildExplainerBox(
        ui.durTexts.explainerTitle,
        ui.durTexts.explainerBody,
        ui.durTexts
      );
      renderMathInContainer(ui.els.dur.solutionExplainer);
    }

    if (ui.els.dur.solutionTreeCard) {
      ui.els.dur.solutionTreeCard.classList.remove("hidden");
    }

    renderSeedUsed(ui.els.dur.seedUsedExercise, seed, ui.labels);
    renderSeedUsed(ui.els.dur.seedUsedSolution, seed, ui.labels);
  });

  ui.els.ev.generateBtn.addEventListener("click", () => {
    setActiveSubtab(ui.els.ev.subtabButtons, ui.els.ev.subtabPanels, "exercise");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const exerciseType = ui.els.ev.exerciseType.value;
    const isFindPayoff = exerciseType === "find_payoff";
    const isFindProbabilities = exerciseType === "find_probabilities";
    const isPropose = exerciseType === "propose_lottery";
    const seedMode = getSeedMode(ui.els.ev);
    const seed = resolveSeedFromMode(seedMode, ui.els.ev.seedManualInput);
    const rng = createSeededRng(seed);

    ui.els.ev.placeholders.forEach((el) => (el.style.display = "none"));
    if (ui.els.ev.exerciseBlock) ui.els.ev.exerciseBlock.classList.remove("hidden");
    if (ui.els.ev.exerciseTreeCard) {
      ui.els.ev.exerciseTreeCard.classList.remove("hidden");
      ui.els.ev.exerciseTreeCard.classList.toggle("ev-find-payoff", isFindPayoff);
      ui.els.ev.exerciseTreeCard.classList.toggle("ev-find-probabilities", isFindProbabilities);
    }

    const treeLocale = lang === "en" ? "en-US" : "pt-BR";
    const treeCurrency = lang === "en" ? "$" : "R$";
    let lottery;

    if (isPropose) {
      let payoffTokens = parseSemicolonList(ui.els.ev.proposedPayoffs?.value);
      let probabilityTokens = parseSemicolonList(ui.els.ev.proposedProbabilities?.value);

      if (!payoffTokens.length && !probabilityTokens.length) {
        payoffTokens = parseSemicolonList(ui.evTexts.proposedPayoffsPlaceholder);
        probabilityTokens = parseSemicolonList(ui.evTexts.proposedProbabilitiesPlaceholder);
      }

      if (!payoffTokens.length || !probabilityTokens.length) {
        window.alert(ui.evTexts.proposedErrorEmpty);
        return;
      }

      if (payoffTokens.length < 2 || payoffTokens.length > 8) {
        window.alert(ui.evTexts.proposedErrorCount);
        return;
      }

      if (payoffTokens.length !== probabilityTokens.length) {
        window.alert(ui.evTexts.proposedErrorMismatch);
        return;
      }

      const payoffs = payoffTokens.map(parseLooseNumber);
      if (payoffs.some((value) => !Number.isFinite(value))) {
        window.alert(ui.evTexts.proposedErrorInvalidPayoffs);
        return;
      }

      const probabilities = probabilityTokens.map(normalizeProbabilityValue);
      if (
        probabilities.some(
          (value) => !Number.isFinite(value) || value < 0 || value > 1
        )
      ) {
        window.alert(ui.evTexts.proposedErrorInvalidProbabilities);
        return;
      }

      const probSum = probabilities.reduce((sum, value) => sum + value, 0);
      if (Math.abs(probSum - 1) > 0.001) {
        window.alert(ui.evTexts.proposedErrorProbSum);
        return;
      }

      lottery = {
        type: "chance",
        children: payoffs.map((payoff, idx) => ({
          payoff,
          probability: probabilities[idx],
          node: { type: "terminal" },
        })),
      };
    } else {
      const numPayoffs = Number(ui.els.ev.numPayoffs.value);
      lottery = buildRandomLottery({
        rng,
        numStates: numPayoffs,
        probabilityStep: 5,
      });
    }

    const solution = solveLottery(lottery, {
      lang,
      locale: treeLocale,
      currency: treeCurrency,
    });

    const valuePrefix = lang === "en" ? "EV" : "Ve";
    const exerciseStatement = isFindPayoff
      ? ui.evTexts.exerciseStatementFindPayoff
      : isFindProbabilities
        ? ui.evTexts.exerciseStatementFindProbabilities
        : ui.evTexts.exerciseStatement;
    if (ui.els.ev.exerciseIntro) {
      ui.els.ev.exerciseIntro.innerHTML = exerciseStatement;
    }
    const unknownValueLabel = `${valuePrefix} = ?`;

    let exerciseLottery = lottery;
    let exerciseValueLabel = unknownValueLabel;
    let solutionEquations = solution.equations;
    let solutionTitle = ui.evTexts.solutionTitle;
    let solutionIntro = ui.evTexts.solutionIntro;
    let solutionLottery = lottery;

    if (isFindPayoff) {
      const missingIndex = Math.floor(rng() * (lottery.children?.length ?? 1));
      const payoffSolution = buildFindPayoffSolution(lottery, {
        missingIndex,
        expectedValue: solution.expectedValue,
        locale: treeLocale,
        currency: treeCurrency,
        valueDigits: 0,
        valueSymbol: valuePrefix,
        missingPayoffLabel: ui.evTexts.missingPayoffLabel,
      });
      exerciseLottery = payoffSolution.displayLottery;
      exerciseValueLabel = solution.valueLabel;
      solutionEquations = payoffSolution.equations;
      solutionTitle = ui.evTexts.solutionTitleFindPayoff;
      solutionIntro = ui.evTexts.solutionIntroFindPayoff;
      solutionLottery = payoffSolution.solutionLottery;
    }

    if (isFindProbabilities) {
      const indices = [];
      const total = lottery.children?.length ?? 0;
      if (total >= 2) {
        indices.push(Math.floor(rng() * total));
        let next = Math.floor(rng() * (total - 1));
        if (next >= indices[0]) next += 1;
        indices.push(next);
      }
      const probSolution = buildFindProbabilitiesSolution(lottery, {
        unknownIndices: indices,
        expectedValue: solution.expectedValue,
        locale: treeLocale,
        currency: treeCurrency,
        valueDigits: 0,
        valueSymbol: valuePrefix,
        probLabels: ["p1", "p2"],
        sectionLabels: {
          sum: ui.evTexts.probSolutionSectionSum,
          ev: ui.evTexts.probSolutionSectionEv,
          p1: ui.evTexts.probSolutionSectionP1,
          p2: ui.evTexts.probSolutionSectionP2,
        },
      });
      exerciseLottery = probSolution.displayLottery;
      exerciseValueLabel = solution.valueLabel;
      solutionEquations = probSolution.equations;
      solutionTitle = ui.evTexts.solutionTitleFindProbabilities;
      solutionIntro = ui.evTexts.solutionIntroFindProbabilities;
      solutionLottery = probSolution.solutionLottery;
    }

    if (isFindPayoff || isFindProbabilities) {
      exerciseValueLabel = solution.valueLabel;
    } else {
      solutionEquations = [{ type: "spacer" }, ...solutionEquations];
    }

    renderLotterySolution(ui.els.ev.tree, exerciseLottery, {
      ariaLabel: ui.evTexts.treeAriaLabel,
      locale: treeLocale,
      currency: treeCurrency,
      lang,
      solution,
      valueLabel: exerciseValueLabel,
    });

    const stdDevSolution = buildStdDevSolution(lottery, {
      expectedValue: solution.expectedValue,
      locale: treeLocale,
      currency: treeCurrency,
      valueDigits: 0,
    });

    renderLotterySolution(ui.els.ev.solutionTree, solutionLottery, {
      lang,
      locale: treeLocale,
      currency: treeCurrency,
      solution,
      valueLabel: solution.valueLabel,
    });

    if (ui.els.ev.solutionText && ui.els.ev.solutionContent) {
      ui.els.ev.solutionText.classList.remove("hidden");
      ui.els.ev.solutionContent.innerHTML = `
        <h3 class="exercises-solution-title">${solutionTitle}</h3>
        <hr class="exercises-solution-divider" />
        <p class="exercises-solution-intro">${solutionIntro}</p>
        ${solutionEquations
          .map((eq) => {
            if (eq && typeof eq === "object" && eq.type === "text") {
              return `
                <div class="exercises-solution-gap"></div>
                <p class="exercises-solution-subtitle"><strong>${eq.value}</strong></p>
              `;
            }
            if (eq && typeof eq === "object" && eq.type === "spacer") {
              return `<div class="exercises-solution-gap"></div>`;
            }
            return `<div class="decision-tree-equation">\\(${eq}\\)</div>`;
          })
          .join("")}
      `;
      renderMathInContainer(ui.els.ev.solutionContent);
    }

    if (ui.els.ev.solutionExplainerTop) {
      ui.els.ev.solutionExplainerTop.classList.remove("hidden");
      ui.els.ev.solutionExplainerTop.dataset.mathAlign = "center";
      ui.els.ev.solutionExplainerTop.innerHTML = buildExplainerBox(
        ui.evTexts.expectedValueExplainerTitle,
        ui.evTexts.expectedValueExplainerBody,
        ui.evTexts
      );
      renderMathInContainer(ui.els.ev.solutionExplainerTop);
    }

    if (ui.els.ev.solutionExplainerBottom) {
      ui.els.ev.solutionExplainerBottom.classList.remove("hidden");
      ui.els.ev.solutionExplainerBottom.dataset.mathAlign = "center";
      const sdSolutionLines = stdDevSolution.lines
        .map((line) => `<div class="exercises-katex-line">${line}</div>`)
        .join("");
      const sdSolutionBlock = `
        <div class="exercises-explainer-math">
          <div class="exercises-explainer-gap"></div>
          <div class="exercises-explainer-math-title"><strong>${ui.evTexts.solutionSectionTitle}</strong></div>
          ${sdSolutionLines}
        </div>
      `;
      ui.els.ev.solutionExplainerBottom.innerHTML = buildExplainerBox(
        ui.evTexts.stdDevExplainerTitle,
        `${ui.evTexts.stdDevExplainerBody}${sdSolutionBlock}`,
        ui.evTexts
      );
      renderMathInContainer(ui.els.ev.solutionExplainerBottom);
    }

    if (ui.els.ev.solutionTreeCard) {
      ui.els.ev.solutionTreeCard.classList.remove("hidden");
      ui.els.ev.solutionTreeCard.classList.toggle("ev-find-payoff", isFindPayoff);
      ui.els.ev.solutionTreeCard.classList.toggle("ev-find-probabilities", isFindProbabilities);
    }

    renderSeedUsed(ui.els.ev.seedUsedExercise, seed, ui.labels);
    renderSeedUsed(ui.els.ev.seedUsedSolution, seed, ui.labels);
  });
}
