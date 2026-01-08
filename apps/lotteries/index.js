// apps/lotteries/index.js
// Lotteries app entry. Must export `mountApp(mount, { lang })` for the central router.

import { renderPage } from "./views/page.js";
import { parseAndValidateLottery, describeLottery } from "./model/lottery.js";
import { renderDistributionBarsSVG, renderExpectedValueSVG } from "./views/charts.js";

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

    const isEn = lang === "en";

    const d1 = describeLottery(l1.values, l1.probs);
    const d2 = describeLottery(l2.values, l2.probs);

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
      <h2 class="lottery-panel-title">${isEn ? "Results of the first lottery" : "Resultados da primeira loteria"}</h2>

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
      <h2 class="lottery-panel-title">${isEn ? "Results of the second lottery" : "Resultados da segunda loteria"}</h2>

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

    ui.setActiveTab("lottery1");
  });
}
