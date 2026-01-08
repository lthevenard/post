// apps/lotteries/index.js
// Lotteries app entry. Must export `mountApp(mount, { lang })` for the central router.

import { renderPage } from "./views/page.js";
import { parseAndValidateLottery, describeLottery } from "./model/lottery.js";
import { renderDistributionBarsSVG, renderExpectedValueSVG } from "./views/charts.js";
import { buildSimulationTable, getRowForTickets, generateRandomSeed5Digits, isValidSeed5Digits } from "./model/simulation.js";

function ensureAppStyles() {
  const id = "lotteries-app-styles";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "apps/lotteries/styles.css";
  document.head.appendChild(link);
}

function fmtPct(p) {
  return `${Math.round(p * 100)}%`;
}
function fmt2(x) {
  return (Math.round(x * 100) / 100).toString();
}

function renderLotteryDescriptionHTML(desc, { lang }) {
  const isEn = lang === "en";
  const items = desc.resultNames
    .map((name, i) => {
      const v = desc.values[i];
      const p = desc.probs[i];
      const color = v >= 0 ? "rgb(22,163,74)" : "rgb(220,38,38)";
      return `
        <li style="margin: 6px 0;">
          ${isEn ? "Outcome" : "Resultado"} <b>${name}</b>
          ${isEn ? "pays" : "paga"}
          <b style="color:${color};">${v}</b>
          ${isEn ? "with a" : "com"}
          <b>${fmtPct(p)}</b>
          ${isEn ? "chance" : "de chance"}.
        </li>
      `;
    })
    .join("");

  const evLine = isEn ? "Expected value" : "Valor esperado";
  const sdLine = isEn ? "Theoretical standard deviation" : "Desvio-padrão teórico";

  return `
    <h3 style="margin: 8px 0 10px 0;">${isEn ? "Lottery returns" : "Retornos da loteria"}</h3>
    <ul style="margin: 0 0 12px 0; padding-left: 18px;">
      ${items}
    </ul>

    <div style="margin-top: 10px; padding: 10px 12px; border: 1px solid rgba(15,23,42,.12); border-radius: 12px;">
      <div style="font-weight: 800; margin-bottom: 6px;">${isEn ? "Solution" : "Solução"}</div>
      <ul style="margin:0; padding-left: 18px;">
        <li><b>${evLine}: ${fmt2(desc.expectedValue)}</b></li>
        <li style="opacity:.85;">${sdLine}: ${fmt2(desc.stdDev)}</li>
      </ul>
    </div>
  `;
}

export async function mountApp(mount, { lang }) {
  ensureAppStyles();

  const ui = renderPage(mount, { lang });

  for (const btn of ui.els.tabButtons) {
    btn.addEventListener("click", () => ui.setActiveTab(btn.dataset.tab));
  }

  ui.els.simulateBtn.addEventListener("click", () => {
    const raw = ui.getRawInputs();

    const l1 = parseAndValidateLottery(raw.values1, raw.probs1);
    const l2 = parseAndValidateLottery(raw.values2, raw.probs2);

    const errors = [];
    if (!l1.ok) errors.push(...l1.errors.map((e) => `Lottery 1 — ${e}`));
    if (!l2.ok) errors.push(...l2.errors.map((e) => `Lottery 2 — ${e}`));

    if (errors.length) {
      ui.setError(errors);
      ui.setActiveTab("about");
      return;
    }

    ui.clearError();

    // Resolve seed (auto or manual)
    let seedUsed;
    if (raw.seedMode === "manual") {
      const parsed = Number.parseInt(raw.seedManual, 10);
      if (!isValidSeed5Digits(parsed)) {
        ui.setError([isEn ? "Seed must be an integer between 10000 and 99999." : "O seed deve ser um inteiro entre 10000 e 99999."]);
        ui.setActiveTab("about");
        return;
      }
      seedUsed = parsed;
    } else {
      seedUsed = generateRandomSeed5Digits();
    }


    const isEn = lang === "en";

    const d1 = describeLottery(l1.values, l1.probs);
    const d2 = describeLottery(l2.values, l2.probs);

    const N = raw.nMax;

    const simTable1 = buildSimulationTable(N, d1.cumProbs, d1.resultNames, d1.values, d1.expectedValue, seedUsed);
    const simTable2 = buildSimulationTable(N, d2.cumProbs, d2.resultNames, d2.values, d2.expectedValue, seedUsed);


    function outcomeText(desc) {
      return desc.resultNames
        .map((name, i) => {
          const v = desc.values[i];
          const p = desc.probs[i];
          const color = v >= 0 ? "rgb(22,163,74)" : "rgb(220,38,38)";
          return `
            <li>
              ${isEn ? "Outcome" : "Resultado"} <b>${name}</b>
              ${isEn ? "pays" : "paga"}
              <b style="color:${color};">${v}</b>
              ${isEn ? "with a" : "com"}
              <b>${Math.round(p * 100)}%</b>
              ${isEn ? "chance" : "de chance"}.
            </li>
          `;
        })
        .join("");
    }

    function solutionBox(desc) {
      const evLine = isEn ? "Expected value" : "Valor esperado";
      const sdLine = isEn ? "Theoretical standard deviation" : "Desvio-padrão teórico";
      const ev = Math.round(desc.expectedValue * 100) / 100;
      const sd = Math.round(desc.stdDev * 100) / 100;

      return `
        <div class="lottery-card">
          <div class="lottery-card-title">${isEn ? "Solution" : "Solução"}</div>
          <ul class="lottery-bullets">
            <li><b>${evLine}: ${ev}</b></li>
            <li style="opacity:.9;">${sdLine}: ${sd}</li>
          </ul>
        </div>
      `;
    }

    const dist1 = renderDistributionBarsSVG(
      d1.distribution.map((b) => ({ valueLabel: String(b.value), prob: b.prob })),
      {
        title: isEn ? "Theoretical distribution" : "Distribuição teórica",
        xLabel: isEn ? "Payoff" : "Payoff",
        yLabel: isEn ? "Probability" : "Probabilidade",
      }
    );

    const dist2 = renderDistributionBarsSVG(
      d2.distribution.map((b) => ({ valueLabel: String(b.value), prob: b.prob })),
      {
        title: isEn ? "Theoretical distribution" : "Distribuição teórica",
        xLabel: isEn ? "Payoff" : "Payoff",
        yLabel: isEn ? "Probability" : "Probabilidade",
      }
    );

    const ev1 = renderExpectedValueSVG(d1.expectedValue, d1.stdDev, {
      title: isEn ? "Expected value and deviation" : "Valor esperado e desvio",
      xTickLabel: isEn ? "Lottery" : "Loteria",
    });

    const ev2 = renderExpectedValueSVG(d2.expectedValue, d2.stdDev, {
      title: isEn ? "Expected value and deviation" : "Valor esperado e desvio",
      xTickLabel: isEn ? "Lottery" : "Loteria",
    });

    ui.els.tabLottery1.innerHTML = `
      <h2 class="lottery-panel-title">${isEn ? "Analysis of the first lottery" : "Análise da primeira loteria"}</h2>

      <div class="lottery-card">
        <div class="lottery-card-title">${isEn ? "Lottery returns" : "Retornos da loteria"}</div>
        <ul class="lottery-bullets">
          ${outcomeText(d1)}
        </ul>
      </div>

      <div class="lottery-chart-block">${dist1}</div>

      ${solutionBox(d1)}

      <div class="lottery-chart-block">${ev1}</div>
    `;

    ui.els.tabLottery2.innerHTML = `
      <h2 class="lottery-panel-title">${isEn ? "Analysis of the second lottery" : "Análise da segunda loteria"}</h2>

      <div class="lottery-card">
        <div class="lottery-card-title">${isEn ? "Lottery returns" : "Retornos da loteria"}</div>
        <ul class="lottery-bullets">
          ${outcomeText(d2)}
        </ul>
      </div>

      <div class="lottery-chart-block">${dist2}</div>

      ${solutionBox(d2)}

      <div class="lottery-chart-block">${ev2}</div>
    `;

    // Render Comparisons / Simulation tab
    ui.els.tabComparisons.innerHTML = `
      <h2 class="lottery-panel-title">
        ${isEn ? "Simulation" : "Simulação"}
      </h2>

      <div class="lottery-card">
        <div class="lottery-card-title">
          ${isEn ? "Number of tickets (N)" : "Número de bilhetes (N)"}
        </div>

        <div class="lottery-slider-wrap">
          <div class="lottery-slider-col">
            <input
              id="tickets_n"
              class="lottery-slider"
              type="range"
              min="1"
              max="${N}"
              step="1"
              value="1"
            />

            <div class="lottery-slider-scale">
              <span>1</span>
              <span>${N}</span>
            </div>
          </div>

          <div id="tickets_n_value" class="lottery-slider-value">1</div>
        </div>


        <div style="margin-top:10px; display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
          <button id="tickets_play" class="lotteries-link-btn" type="button">
            ${isEn ? "Play" : "Animar"}
          </button>

          <button id="tickets_stop" class="lotteries-link-btn" type="button">
            ${isEn ? "Stop" : "Parar"}
          </button>

          <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; opacity:.85;">
            <span>${isEn ? "Step" : "Intervalo"}</span>
            <select id="tickets_step" style="padding:6px 8px; border-radius:10px;">
              <option value="1">1</option>
              <option value="5">5</option>
              <option value="10" selected>10</option>
              <option value="50">50</option>
            </select>
          </label>

          <label style="display:inline-flex; align-items:center; gap:8px; font-size:12px; opacity:.85;">
            <span>${isEn ? "Speed" : "Velocidade"}</span>
            <select id="tickets_speed" style="padding:6px 8px; border-radius:10px;">
              <option value="150">0.15s</option>
              <option value="350">0.35s</option>
              <option value="500">0.5s</option>
              <option value="750" selected>0.75s</option>
              <option value="1000">1s</option>
              <option value="2000">2s</option>
            </select>
          </label>
        </div>

        <hr style='height:1px; border:none; background:rgba(151, 157, 172, 0.12); margin:16px 0; margin-top: 30px; margin-bottom: 20px;'/>
        <div id="simulation_outcomes"></div>
      </div>

      

      <div class="lottery-card">
        <div class="lottery-card-title">
          ${isEn ? "Seed used" : "Seed utilizado"}
        </div>
        <div style="font-size:18px;"><b>${seedUsed}</b></div>
        <div style="font-size:12px; opacity:.8; margin-top:6px;">
          ${
            isEn
              ? "Re-run the simulation with the same seed to reproduce all results."
              : "Execute novamente a simulação com o mesmo seed para reproduzir todos os resultados."
          }
        </div>
      </div>
    `;

    // Wire simulation controls
    const ticketsRange = ui.els.tabComparisons.querySelector("#tickets_n");
    const ticketsValue = ui.els.tabComparisons.querySelector("#tickets_n_value");
    const playBtn = ui.els.tabComparisons.querySelector("#tickets_play");
    const stopBtn = ui.els.tabComparisons.querySelector("#tickets_stop");
    const outcomesMount = ui.els.tabComparisons.querySelector("#simulation_outcomes");
    const stepSelect = ui.els.tabComparisons.querySelector("#tickets_step");
    const speedSelect = ui.els.tabComparisons.querySelector("#tickets_speed");

    function getAnimStep(){
      const v = Number(stepSelect?.value || 1);
      return Number.isFinite(v) && v > 0 ? v : 1;
    }

    function getAnimDelay(){
      const v = Number(speedSelect?.value || 350);
      return Number.isFinite(v) && v > 0 ? v : 350;
    }

    function renderOutcomeTable(tickets) {
      const row1 = getRowForTickets(simTable1, tickets);
      const row2 = getRowForTickets(simTable2, tickets);

      function fmtPct1(p) {
        // p em proporção (0.25 -> 25%)
        const x = p * 100;
        const y = Math.round(x * 10) / 10;
        return Number.isInteger(y) ? `${y}%` : `${y.toFixed(1)}%`;
      }

      function payoffHTML(v) {
        const cls = v >= 0 ? "simfreq-payoff-pos" : "simfreq-payoff-neg";
        const sign = v > 0 ? "+" : "";
        return `<span class="${cls}">${sign}${v}</span>`;
      }

      function buildRows(desc, row) {
        // desc.resultNames/values/probs podem ter tamanho e nomes diferentes entre loterias
        return desc.resultNames
          .map((name, i) => {
            const v = desc.values[i];
            const p = desc.probs[i];

            const freq = row?.[name] ? row[name] / tickets : 0;
            const freqPct = Math.round(freq * 1000) / 10; // 1 casa decimal

            const resultLabel = isEn ? "Outcome" : "Resultado";
            const paysLabel = isEn ? "pays" : "paga";
            const chanceLabel = isEn ? "chance" : "de chance";

            return `
              <tr>
                <td class="simfreq-outcome">
                  ${resultLabel} <strong>${name}</strong> ${paysLabel}
                  <strong>${payoffHTML(v)}</strong>
                  ${isEn ? "with a" : "com"}
                  <strong>${fmtPct1(p)}</strong>
                  ${chanceLabel}.
                </td>
                <td class="simfreq-num">${freqPct}%</td>
              </tr>
            `;
          })
          .join("");
      }

      function buildBars(desc, row){
        return desc.resultNames.map((name, i) => {
          const obs = row?.[name] ? (row[name] / tickets) * 100 : 0;     // observado em %
          const theory = (desc.probs[i] || 0) * 100;                      // teórico em %

          const obsPct = Math.round(obs * 10) / 10;       // 1 casa
          const thPct = Math.round(theory * 10) / 10;

          const title = `${name} — observed: ${obsPct}% | theoretical: ${thPct}%`;

          return `
            <div class="simchart-bar" style="--obs:${obsPct}; --theory:${thPct};" title="${title}">
              <div class="simchart-fill"></div>
              <div class="simchart-x"><strong>${name}</strong></div>
            </div>
          `;
        }).join("");
      }

      const rows1 = buildRows(d1, row1);
      const rows2 = buildRows(d2, row2);

      const bars1 = buildBars(d1, row1);
      const bars2 = buildBars(d2, row2);

      outcomesMount.innerHTML = `
        <div class="lottery-card">
          <div class="lottery-card-title">
            ${
              isEn
                ? `Observed outcome frequencies (N = ${tickets})`
                : `Frequências observadas dos resultados (N = ${tickets})`
            }
          </div>

          <div class="simcharts-grid">
            <div>
              <div class="simfreq-caption">${isEn ? "Lottery 1" : "Loteria 1"}</div>
              <div class="simchart" aria-label="${isEn ? "Lottery 1 bar chart" : "Gráfico de barras — Loteria 1"}">
                ${bars1}
              </div>
              <div class="simchart-legend">
                <span class="simchart-dot"></span>
                <span>${isEn ? "Dashed line = theoretical probability" : "Linha tracejada = probabilidade teórica"}</span>
              </div>
            </div>

            <div>
              <div class="simfreq-caption">${isEn ? "Lottery 2" : "Loteria 2"}</div>
              <div class="simchart" aria-label="${isEn ? "Lottery 2 bar chart" : "Gráfico de barras — Loteria 2"}">
                ${bars2}
              </div>
              <div class="simchart-legend">
                <span class="simchart-dot"></span>
                <span>${isEn ? "Dashed line = theoretical probability" : "Linha tracejada = probabilidade teórica"}</span>
              </div>
            </div>
          </div>

          <div class="simfreq-grid">
            <div>
              <div class="simfreq-caption">
                ${
                isEn
                  ? `Lottery 1 (N = ${tickets})`
                  : `Loteria 1 (N = ${tickets})`
                }
              </div>
              <table class="simfreq-table">
                <thead>
                  <tr>
                    <th style="text-align:left;">${isEn ? "Results" : "Resultados"}</th>
                    <th style="text-align:right;">${isEn ? "Observed freq." : "Freq. observada"}</th>
                  </tr>
                </thead>
                <tbody>${rows1}</tbody>
              </table>
            </div>

            <div>
              <div class="simfreq-caption">
                ${
                isEn
                  ? `Lottery 2 (N = ${tickets})`
                  : `Loteria 2 (N = ${tickets})`
                }
              </div>
              <table class="simfreq-table">
                <thead>
                  <tr>
                    <th style="text-align:left;">${isEn ? "Results" : "Resultados"}</th>
                    <th style="text-align:right;">${isEn ? "Observed freq." : "Freq. observada"}</th>
                  </tr>
                </thead>
                <tbody>${rows2}</tbody>
              </table>
            </div>
          </div>
        </div>
      `;
    }


    function syncSimulationUI() {
      const min = Number(ticketsRange.min);
      const max = Number(ticketsRange.max);
      const v = Number(ticketsRange.value);

      // Update numeric display
      ticketsValue.textContent = String(v);

      // Update slider fill percentage (CSS variable)
      const pct = ((v - min) / (max - min)) * 100;
      ticketsRange.style.setProperty("--slider-pct", `${pct}%`);

      renderOutcomeTable(v);
    }

    ticketsRange.value = "1";
    ticketsRange.addEventListener("input", syncSimulationUI);
    syncSimulationUI();

    // Animate slider (equivalent to Shiny animate = TRUE)
    let animationTimer = null;

    playBtn.addEventListener("click", () => {
      if (animationTimer) return;
      const step0 = getAnimStep();
      const min0 = Number(ticketsRange.min); // deve ser 1
      const v0 = Number(ticketsRange.value);

      if (step0 > 1 && v0 !== min0 && (v0 % step0) !== 0) {
        ticketsRange.value = String(min0);
        syncSimulationUI();
      }

      const delay = getAnimDelay();
      animationTimer = window.setInterval(() => {
        const step = getAnimStep();
        const min = Number(ticketsRange.min);
        const max = Number(ticketsRange.max);

        let v = Number(ticketsRange.value);
        if (v === min && step > 1) {
          v = step;
        } else {
          v = v + step;
        }
        if (v > max) v = min;

        ticketsRange.value = String(v);
        syncSimulationUI();
      }, delay);
    });

    stopBtn.addEventListener("click", () => {
      if (animationTimer) window.clearInterval(animationTimer);
      animationTimer = null;
    });

    ui.setActiveTab("lottery1");
  });
}
