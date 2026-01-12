// apps/lotteries/controller/render.js
// Pipeline "render": renderiza após simulação (sem re-simular).

import { renderDistributionBarsSVG, renderExpectedValueSVG } from "../views/charts.js";
import { renderLotteryTab } from "../views/tabs/lottery.js";
import { renderDispersionTab } from "../views/tabs/dispersion.js";
import { renderConvergenceTab } from "../views/tabs/convergence.js";
import { wireSimulationSlider } from "../wiring/slider.js";

function fmtPct(p) {
  return `${Math.round(p * 100)}%`;
}

function distBarTitle({ lang, name, value, prob }) {
  const isEn = lang === "en";
  return isEn
    ? `Outcome ${name} pays ${value} with a ${fmtPct(prob)} chance.`
    : `Resultado ${name} paga ${value} com ${fmtPct(prob)} de chance.`;
}

function buildBars(desc, lang) {
  // Monta barras alinhadas por índice entre resultNames/values/probs
  return desc.values.map((value, i) => ({
    valueLabel: String(value),
    prob: desc.probs[i],
    title: distBarTitle({
      lang,
      name: desc.resultNames[i],
      value,
      prob: desc.probs[i],
    }),
  }));
}

export function renderAfterSimulation(ui, state) {
  const lang = state.lang;
  const isEn = lang === "en";

  const { d1, d2, simTable1, simTable2, N } = state.lottery;
  const seedUsed = state.seedUsed;

  // --- Lottery 1 charts ---
  const dist1 = renderDistributionBarsSVG(buildBars(d1, lang), {
    title: isEn ? "Theoretical distribution" : "Distribuição teórica",
    xLabel: "Payoff",
    yLabel: isEn ? "Probability" : "Probabilidade",
  });

  const ev1 = renderExpectedValueSVG(d1.expectedValue, d1.stdDev, {
    title: isEn ? "Expected value and dispersion" : "Valor esperado e dispersão",
    xTickLabel: isEn ? "Payoff" : "Retorno",
  });

  // --- Lottery 2 charts ---
  const dist2 = renderDistributionBarsSVG(buildBars(d2, lang), {
    title: isEn ? "Theoretical distribution" : "Distribuição teórica",
    xLabel: "Payoff",
    yLabel: isEn ? "Probability" : "Probabilidade",
  });

  const ev2 = renderExpectedValueSVG(d2.expectedValue, d2.stdDev, {
    title: isEn ? "Expected value and dispersion" : "Valor esperado e dispersão",
    xTickLabel: isEn ? "Payoff" : "Retorno",
  });

  // --- Lottery tabs ---
  renderLotteryTab(ui.els.tabLottery1, {
    lang,
    which: 1,
    desc: d1,
    distSvg: dist1,
    evSvg: ev1,
    simTable: simTable1,     // ✅ (se ainda não estiver no seu código)
    seedUsed,                // ✅ novo
  });

  renderLotteryTab(ui.els.tabLottery2, {
    lang,
    which: 2,
    desc: d2,
    distSvg: dist2,
    evSvg: ev2,
    simTable: simTable2,     // ✅ (se ainda não estiver no seu código)
    seedUsed,                // ✅ novo
  });

  // --- Dispersion tab ---
  renderDispersionTab(ui.els.tabDispersion, {
    lang,
    d1,
    d2,
    simTable1: state.lottery.simTable1,
    simTable2: state.lottery.simTable2,
    N: state.lottery.N,
    seedUsed,
  });

  // --- Convergence tab (shell) ---
  renderConvergenceTab(ui.els.tabConvergence, { lang, N, seedUsed });

  // --- Slider wiring (updates observed freq + charts) ---
  wireSimulationSlider({
    root: ui.els.tabConvergence,
    N,
    simTable1,
    simTable2,
    d1,
    d2,
    lang,
  });
}
