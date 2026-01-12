// apps/lotteries/wiring/slider.js
// Isola TODA a lógica do slider + animação + render do bloco "simulation_outcomes".
// Não re-simula: só lê simTable + descrições e atualiza UI.

import { getRowForTickets } from "../model/simulation.js";

export function wireSimulationSlider({
  root,         // ui.els.tabConvergence
  N,
  simTable1,
  simTable2,
  d1,
  d2,
  lang,
}) {
  const isEn = lang === "en";

  const ticketsRange = root.querySelector("#tickets_n");
  const ticketsValue = root.querySelector("#tickets_n_value");
  const playBtn = root.querySelector("#tickets_play");
  const stopBtn = root.querySelector("#tickets_stop");
  const outcomesMount = root.querySelector("#simulation_outcomes");
  const stepSelect = root.querySelector("#tickets_step");
  const speedSelect = root.querySelector("#tickets_speed");

  if (!ticketsRange || !ticketsValue || !playBtn || !stopBtn || !outcomesMount || !stepSelect || !speedSelect) {
    // Falhou encontrar elementos: não quebra o app, só não ativa o wiring.
    return { dispose() {} };
  }

  // --- helpers ---
  function getAnimStep() {
    const v = Number(stepSelect.value || 1);
    return Number.isFinite(v) && v > 0 ? v : 1;
  }

  function getAnimDelay() {
    const v = Number(speedSelect.value || 350);
    return Number.isFinite(v) && v > 0 ? v : 350;
  }

  function fmtPct1(p) {
    const x = p * 100;
    const y = Math.round(x * 10) / 10;
    return Number.isInteger(y) ? `${y}%` : `${y.toFixed(1)}%`;
  }

  function payoffHTML(v) {
    const cls = v >= 0 ? "simfreq-payoff-pos" : "simfreq-payoff-neg";
    const sign = v > 0 ? "+" : "";
    return `<span class="${cls}">${sign}${v}</span>`;
  }

  function buildRows(desc, row, tickets) {
    return desc.resultNames
      .map((name, i) => {
        const v = desc.values[i];
        const p = desc.probs[i];

        const freq = row?.[name] ? row[name] / tickets : 0;
        const freqPct = Math.round(freq * 1000) / 10;

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

  function buildBars(desc, row, tickets) {
    return desc.resultNames
      .map((name, i) => {
        const obs = row?.[name] ? (row[name] / tickets) * 100 : 0;
        const theory = (desc.probs[i] || 0) * 100;

        const obsPct = Math.round(obs * 10) / 10;
        const thPct = Math.round(theory * 10) / 10;

        const title = `${name} — observed: ${obsPct}% | theoretical: ${thPct}%`;

        return `
          <div class="simchart-bar" style="--obs:${obsPct}; --theory:${thPct};" title="${title}">
            <div class="simchart-fill"></div>
            <div class="simchart-x"><strong>${name}</strong></div>
          </div>
        `;
      })
      .join("");
  }

  function renderOutcomeTable(tickets) {
    const row1 = getRowForTickets(simTable1, tickets);
    const row2 = getRowForTickets(simTable2, tickets);

    const rows1 = buildRows(d1, row1, tickets);
    const rows2 = buildRows(d2, row2, tickets);

    const bars1 = buildBars(d1, row1, tickets);
    const bars2 = buildBars(d2, row2, tickets);

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
            <div class="simfreq-caption">${isEn ? `Lottery 1 (N = ${tickets})` : `Loteria 1 (N = ${tickets})`}</div>
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
            <div class="simfreq-caption">${isEn ? `Lottery 2 (N = ${tickets})` : `Loteria 2 (N = ${tickets})`}</div>
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

    ticketsValue.textContent = String(v);

    const pct = ((v - min) / (max - min)) * 100;
    ticketsRange.style.setProperty("--slider-pct", `${pct}%`);

    renderOutcomeTable(v);
  }

  // --- init ---
  ticketsRange.min = "1";
  ticketsRange.max = String(N);
  ticketsRange.step = "1";
  ticketsRange.value = "1";

  ticketsRange.addEventListener("input", syncSimulationUI);
  syncSimulationUI();

  // --- animation ---
  let animationTimer = null;

  function onPlay() {
    if (animationTimer) return;

    const step0 = getAnimStep();
    const min0 = Number(ticketsRange.min);
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
      if (v === min && step > 1) v = step;
      else v = v + step;

      if (v > max) v = min;

      ticketsRange.value = String(v);
      syncSimulationUI();
    }, delay);
  }

  function onStop() {
    if (animationTimer) window.clearInterval(animationTimer);
    animationTimer = null;
  }

  playBtn.addEventListener("click", onPlay);
  stopBtn.addEventListener("click", onStop);

  return {
    dispose() {
      onStop();
      // (Opcional) remover listeners se você quiser ser 100% limpo em remounts:
      // ticketsRange.removeEventListener("input", syncSimulationUI);
      // playBtn.removeEventListener("click", onPlay);
      // stopBtn.removeEventListener("click", onStop);
    },
  };
}
