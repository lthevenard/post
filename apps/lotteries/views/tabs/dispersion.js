// apps/lotteries/views/tabs/dispersion.js
// Aba "Dispersão": explica + 2 scatters (um por loteria) + 2 gráficos comparativos (lado a lado) + seed box.

import { renderMeanScatterSVG, renderProfitPerTicketSVG } from "../charts.js";

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setupDispersionScatterTooltips(root, { lang, simTable1, simTable2 }) {
  const isEn = lang === "en";

  // CSS (injetado 1x)
  const styleId = "disp-scatter-tooltip-style";
  if (!document.getElementById(styleId)) {
    const st = document.createElement("style");
    st.id = styleId;
    st.textContent = `
      .disp-tooltip {
        position: fixed;
        left: 0; top: 0;
        z-index: 9999;
        display: none;
        pointer-events: none;
        background: rgba(20, 20, 20, 0.92);
        color: #fff;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 10px;
        padding: 10px 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        max-width: 320px;
        font-size: 12.5px;
        line-height: 1.25;
        backdrop-filter: blur(6px);
      }
      .disp-tooltip .disp-tip-title {
        font-weight: 700;
        margin-bottom: 6px;
        opacity: 0.95;
      }
      .disp-tooltip ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .disp-tooltip li {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 2px 0;
        border-bottom: 1px dashed rgba(255,255,255,0.10);
      }
      .disp-tooltip li:last-child { border-bottom: none; }
      .disp-tooltip .k { opacity: 0.78; }
      .disp-tooltip .v { font-variant-numeric: tabular-nums; }
    `;
    document.head.appendChild(st);
  }

  // Tooltip element (único)
  let tip = document.querySelector(".disp-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "disp-tooltip";
    document.body.appendChild(tip);
  }

  const esc = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const fmt = (x, digits = 2) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString(isEn ? "en-US" : "pt-BR", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  };

  const fmtInt = (x) => {
    const n = Number(x);
    if (!Number.isFinite(n)) return "–";
    return n.toLocaleString(isEn ? "en-US" : "pt-BR", { maximumFractionDigits: 0 });
  };

  const getRow = (table, idx) => {
    const rows = table === "2" ? simTable2 : simTable1;
    return rows?.[Number(idx)] ?? null;
  };

  const buildTooltipHTML = (table, idx) => {
    const row = getRow(table, idx);
    if (!row) return "";

    const ticketsLabel = isEn ? "Tickets" : "Bilhetes";
    const returnsLabel = isEn ? "Returns" : "Resultado";
    const meanLabel = isEn ? "Mean Returns" : "Resultado Médio";
    const profitLabel = isEn ? "Profit" : "Lucro";

    // Outcome columns: tudo que não é coluna “meta”
    const known = new Set(["Tickets", "Returns", "Mean Returns", "Profit"]);
    const outcomeKeys = Object.keys(row)
      .filter((k) => !known.has(k))
      .sort((a, b) => a.localeCompare(b, isEn ? "en" : "pt"));

    const items = [];

    items.push([ticketsLabel, fmtInt(row.Tickets)]);

    for (const k of outcomeKeys) {
      items.push([k, fmtInt(row[k])]);
    }

    items.push([returnsLabel, fmt(row["Returns"], 2)]);
    items.push([meanLabel, fmt(row["Mean Returns"], 4)]);
    items.push([profitLabel, fmt(row["Profit"], 4)]);

    const title = isEn
      ? `Simulation row (Lottery ${table})`
      : `Linha da simulação (Loteria ${table})`;

    return `
      <div class="disp-tip-title">${esc(title)}</div>
      <ul>
        ${items
          .map(
            ([k, v]) =>
              `<li><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span></li>`
          )
          .join("")}
      </ul>
    `;
  };

  const placeTooltip = (clientX, clientY) => {
    const pad = 10;
    const off = 14;

    tip.style.display = "block";

    // mede após display
    const r = tip.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x = clientX + off;
    let y = clientY + off;

    if (x + r.width > vw - pad) x = clientX - r.width - off;
    if (y + r.height > vh - pad) y = clientY - r.height - off;

    x = Math.max(pad, Math.min(vw - r.width - pad, x));
    y = Math.max(pad, Math.min(vh - r.height - pad, y));

    tip.style.transform = `translate(${x}px, ${y}px)`;
  };

  const hide = () => {
    tip.style.display = "none";
  };

  // Bind nos pontos do scatter (somente os que têm data-idx)
  const dots = root.querySelectorAll('svg.disp-svg circle.disp-dot[data-idx][data-table]');
  dots.forEach((el) => {
    el.addEventListener("pointerenter", (ev) => {
      const table = el.getAttribute("data-table");
      const idx = el.getAttribute("data-idx");

      tip.innerHTML = buildTooltipHTML(table, idx);
      placeTooltip(ev.clientX, ev.clientY);
    });

    el.addEventListener("pointermove", (ev) => {
      placeTooltip(ev.clientX, ev.clientY);
    });

    el.addEventListener("pointerleave", hide);
  });

  // Se o usuário scrollar com tooltip aberta, melhor esconder
  window.addEventListener("scroll", hide, { passive: true });
}

export function renderDispersionTab(root, { lang, d1, d2, simTable1, simTable2, seedUsed, N }) {
  const isEn = lang === "en";

  const t = {
    title: isEn ? "Dispersion" : "Dispersão",
    explTitle: isEn
      ? "What is dispersion, and what should you look for in these graphs?"
      : "O que é dispersão, e o que observar nesses gráficos?",
    explBtnClosed: isEn ? "Show explanation" : "Mostrar explicação",
    explBtnOpen: isEn ? "Hide explanation" : "Esconder explicação",

    explP1: isEn
      ? "Each dot is one experiment. For a fixed number of tickets N, we simulate the lottery N times and compute the experiment’s average return."
      : "Cada ponto é um experimento. Para um número fixo de bilhetes N, simulamos a loteria N vezes e calculamos o retorno médio do experimento.",
    explP2: isEn
      ? "When N is small, averages can land far from the expected value (high dispersion). As N grows, averages concentrate around the expected value (convergence)."
      : "Quando N é pequeno, as médias podem ficar bem longe do valor esperado (alta dispersão). À medida que N cresce, as médias se concentram perto do valor esperado (convergência).",
    explP3: isEn
      ? "Tip: hover dots to see (N, mean). The dashed line marks the expected value."
      : "Dica: passe o mouse sobre os pontos para ver (N, média). A linha tracejada marca o valor esperado.",

    scatterSection: isEn
      ? "Scatter: experiment size (N) vs experiment mean return"
      : "Dispersão: tamanho do experimento (N) vs retorno médio do experimento",

    compareSection: isEn
      ? "Compare dispersion: Profit/N (mean − EV) as N grows"
      : "Comparar dispersão: Lucro/N (média − VE) conforme N cresce",

    l1: isEn ? "Lottery 1" : "Loteria 1",
    l2: isEn ? "Lottery 2" : "Loteria 2",

    seedTitle: isEn ? "Seed used in this simulation" : "Seed usada nesta simulação",

    explToggleShow: isEn ? "Show explanation" : "Mostrar explicação",
    explToggleHide: isEn ? "Hide explanation" : "Ocultar explicação",

  };

  // Guard-rail: se ainda não tiver dados (por algum motivo), mantém a tab "viva".
  if (!Array.isArray(simTable1) || !Array.isArray(simTable2) || !simTable1.length || !simTable2.length) {
    root.innerHTML = `
      <h2 class="lottery-panel-title">${esc(t.title)}</h2>
      <p style="opacity:.85;">${esc(isEn ? "Waiting for simulation…" : "Aguardando simulação…")}</p>
    `;
    return;
  }

  const pointsFromSimTable = (rows, table) =>
    rows
      .map((r, idx) => ({
        table,                 // 1 ou 2
        idx,                   // índice da linha na simTable
        N: Number(r?.Tickets ?? 0),
        mean: Number(r?.["Mean Returns"] ?? 0),
      }))
      .filter((p) => Number.isFinite(p.N) && Number.isFinite(p.mean) && p.N >= 1);


  const pts1 = pointsFromSimTable(simTable1, 1);
  const pts2 = pointsFromSimTable(simTable2, 2);


  // --- Charts (SVG strings) ---
  const scatter1 = renderMeanScatterSVG(pts1, {
    lang,
    title: t.l1,
    expectedValue: d1.expectedValue,
    xLabel: isEn ? "Tickets (N)" : "Bilhetes (N)",
    yLabel: isEn ? "Mean returns" : "Resultado médio",
    xMin: 1,
    xMax: N,
    jitter: false,
  });

  const scatter2 = renderMeanScatterSVG(pts2, {
    lang,
    title: t.l2,
    expectedValue: d2.expectedValue,
    xLabel: isEn ? "Tickets (N)" : "Bilhetes (N)",
    yLabel: isEn ? "Mean returns" : "Resultado médio",
    xMin: 1,
    xMax: N,
    jitter: false,
  });

  // --- Comparar dispersão (mesma escala de Y nos dois gráficos) ---
  // Profit/N = mean - EV
  const yVals1 = pts1.map((p) => p.mean - d1.expectedValue).filter(Number.isFinite);
  const yVals2 = pts2.map((p) => p.mean - d2.expectedValue).filter(Number.isFinite);
  const allY = [...yVals1, ...yVals2];

  // fallback defensivo (caso ainda não tenha dados)
  const baseMin = allY.length ? Math.min(...allY) : -1;
  const baseMax = allY.length ? Math.max(...allY) :  1;

  const compare1 = renderProfitPerTicketSVG(pts1, {
    lang,
    title: t.l1,
    expectedValue: d1.expectedValue,
    xLabel: isEn ? "Tickets (N)" : "Bilhetes (N)",
    yLabel: isEn ? "Profit / N (mean − EV)" : "Lucro / N (média − VE)",
    yMin: baseMin,
    yMax: baseMax,
  });

  const compare2 = renderProfitPerTicketSVG(pts2, {
    lang,
    title: t.l2,
    expectedValue: d2.expectedValue,
    xLabel: isEn ? "Tickets (N)" : "Bilhetes (N)",
    yLabel: isEn ? "Profit / N (mean − EV)" : "Lucro / N (média − VE)",
    yMin: baseMin,
    yMax: baseMax,
  });

  // --- Layout ---
  // Observação: uso "lottery-card" pra manter consistência visual com o resto do app.
  // A explicação é colapsável via <details>.
  root.innerHTML = `
    <h2 class="lottery-panel-title">${esc(t.title)}</h2>

    <div class="lottery-card lottery-explainer" id="dispersion-explainer">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <strong>${esc(t.explTitle)}</strong>

        <span
          id="toggle-dispersion-explainer"
          class="lotteries-toggle-link"
          role="button"
          tabindex="0"
        >
          ${esc(t.explToggleHide)}
        </span>
      </div>

      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.explP1)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.explP2)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.explP3)}</p>
    </div>

    <div class="lottery-card">
      <h3 class="lottery-card-title">${esc(t.scatterSection)}</h3>

      <div class="disp-chart" style="margin-top: 10px;">
        <div class="disp-title">${esc(t.l1)}</div>
        ${scatter1}
      </div>

      <div class="disp-chart" style="margin-top: 14px;">
        <div class="disp-title">${esc(t.l2)}</div>
        ${scatter2}
      </div>
    </div>

    <div class="lottery-card">
      <h3 class="lottery-card-title">${esc(t.compareSection)}</h3>

      <div class="disp-grid">
        <div class="disp-chart">
          <div class="disp-title">${esc(t.l1)}</div>
          ${compare1}
        </div>

        <div class="disp-chart">
          <div class="disp-title">${esc(t.l2)}</div>
          ${compare2}
        </div>
      </div>
    </div>

    <div class="lottery-card">
      <div class="lottery-card-title">
        ${esc(t.seedTitle)}
      </div>

      <div style="font-size:18px;"><b>${esc(seedUsed)}</b></div>

      <div style="font-size:12px; opacity:.8; margin-top:6px;">
        ${
          isEn
            ? "Re-run the simulation with the same seed to reproduce all results."
            : "Execute novamente a simulação com o mesmo seed para reproduzir todos os resultados."
        }
      </div>
    </div>
  `;

  // Toggle: hide/show explainer text (same behavior as Convergence tab)
  const explainer = root.querySelector("#dispersion-explainer");
  const toggleEl = root.querySelector("#toggle-dispersion-explainer");

  if (explainer && toggleEl) {
    const key = "lotteries.dispersionExplainerCollapsed";
    let saved = null;
    try {
      saved = localStorage.getItem(key);
    } catch (_) {
      // storage pode estar bloqueado; segue sem persistência
      saved = null;
    }

    if (saved === "1") {
      explainer.classList.add("is-collapsed");
      toggleEl.textContent = t.explToggleShow;
    }

    toggleEl.addEventListener("click", () => {
      explainer.classList.toggle("is-collapsed");

      const isCollapsed = explainer.classList.contains("is-collapsed");
      try {
        localStorage.setItem(key, isCollapsed ? "1" : "0");
      } catch (_) {
        // ignore: sem persistência
      }

      toggleEl.textContent = isCollapsed ? t.explToggleShow : t.explToggleHide;
    });
  }

  setupDispersionScatterTooltips(root, { lang, simTable1, simTable2 });
}
