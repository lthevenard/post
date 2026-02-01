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

function mean(arr){
  if (!arr.length) return 0;
  let s = 0;
  for (const x of arr) s += x;
  return s / arr.length;
}

function stddev(arr){
  // desvio-padrão populacional (suficiente para comparação visual)
  if (arr.length <= 1) return 0;
  const m = mean(arr);
  let v = 0;
  for (const x of arr) {
    const d = x - m;
    v += d * d;
  }
  v = v / arr.length;
  return Math.sqrt(v);
}

function dispersionScore(pts, expectedValue, cutoffN){
  const low = pts
    .filter(p => Number.isFinite(p.N) && p.N <= cutoffN)
    .map(p => p.mean - expectedValue)
    .filter(Number.isFinite);

  const all = pts
    .map(p => p.mean - expectedValue)
    .filter(Number.isFinite);

  const use = low.length ? low : all;
  return stddev(use);
}

function classifyDispersion(sd1, sd2){
  const hi = Math.max(sd1, sd2);
  const lo = Math.min(sd1, sd2);

  if (hi < 1e-12) return { caseId: 3, A: "1", B: "2" };

  const relDiff = (hi - lo) / hi;
  if (relDiff <= 0.01) return { caseId: 3, A: "1", B: "2" };

  if (relDiff <= 0.15) {
    const A = sd1 >= sd2 ? "1" : "2";
    const B = A === "1" ? "2" : "1";
    return { caseId: 2, A, B };
  }

  // caso "clara"
  const A = sd1 >= sd2 ? "1" : "2";
  const B = A === "1" ? "2" : "1";
  return { caseId: 1, A, B };
}


export function renderDispersionTab(root, { lang, d1, d2, simTable1, simTable2, seedUsed, N }) {
  const isEn = lang === "en";

  const t = {
    title: isEn ? "Dispersion" : "Dispersão",
    explTitle: isEn
      ? "Dispersion and convergence patterns in the graphs"
      : "O padrão de dispersão e convergência dos gráficos",
    explBtnClosed: isEn ? "Show explanation" : "Mostrar explicação",
    explBtnOpen: isEn ? "Hide explanation" : "Esconder explicação",

    explP1: isEn
      ? "In the graphs below, each point represents a single experiment. For a fixed number of tickets (N), we simulate the lottery N times and compute the average return obtained in that experiment."
      : "Nos gráficos a seguir, cada ponto representa um experimento. Para cada número fixo de bilhetes (N), simulamos a loteria N vezes e calculamos o retorno médio obtido em cada experimento.",
    explP2: isEn
      ? "The first set of graphs shows that, regardless of the specific values and probabilities of the lottery, this type of experiment always exhibits the same general pattern. When N is small, dispersion is high: the average returns can be far from the lottery’s expected value. As N increases, however, these averages become increasingly concentrated around the expected value, illustrating the process of convergence."
      : "Os primeiros gráficos mostram que, independentemente dos valores e probabilidades da loteria, observamos sempre um mesmo padrão geral nesse tipo de experimento. Quando N é pequeno, há alta dispersão: as médias podem ficar bastante distantes do valor esperado da loteria. À medida que N cresce, porém, essas médias passam a se concentrar cada vez mais próximas do valor esperado, evidenciando o processo de convergência.",
    explP3: isEn
      ? "The next graphs display a similar result, but with one important difference. We standardize the distances between each observed outcome and the expected value and fix the scale of the Y-axis. This allows us to show that, although the pattern of dispersion and convergence of average outcomes is universal, the magnitude of dispersion can vary substantially across different lotteries."
      : "Nos gráficos seguintes, apresentamos um resultado semelhante, mas com uma diferença importante. Padronizamos as distâncias entre cada resultado observado e o valor esperado e fixamos a escala do eixo Y. Ao fazer isso, conseguimos mostrar que, embora o padrão de dispersão e convergência das médias sempre se verifique, a intensidade da dispersão pode variar significativamente de uma loteria para outra.",

    scatterSection: isEn
      ? "Experiment size (N) vs experiment mean return"
      : "Tamanho do experimento (N) vs retorno médio do experimento",
    
    scatterExplP1: isEn
      ? "In the graphs below, notice that when the number of tickets (N) is small, the points are widely spread along the vertical axis. This means that, when we play the lottery only a few times, the average outcomes can end up far above or far below the expected value—high dispersion driven by randomness."
      : "Nos gráficos a seguir, observe que, quando o número de bilhetes (N) é pequeno, os pontos estão bastante espalhados ao longo do eixo vertical. Isso significa que, quando apostamos poucas vezes na loteria, os seus resultados médios podem ficar bem acima ou bem abaixo do valor esperado, indicando alta dispersão causada pelo acaso.",

    scatterExplP2: isEn
      ? "As N increases, observe how the points progressively concentrate around the dashed line, which represents the lottery’s expected value. This pattern—initial dispersion followed by convergence—appears systematically, regardless of the payoffs and probabilities involved (you can see a similar pattern for both lotteries)."
      : "À medida que N aumenta, note como os pontos passam a se concentrar progressivamente em torno da linha tracejada, que representa o valor esperado da loteria. Esse padrão de dispersão inicial seguido de convergência aparece de forma sistemática, independentemente dos valores e probabilidades envolvidos (você pode notar que há um padrão semelhante nas duas loterias que simulamos).",

    scatterExplP3: isEn
      ? "This helps explain why expected value is especially informative when a lottery is played many times: even though individual results may vary substantially, the average return tends to move closer to the expected value as the number of plays increases."
      : "Tal fenômeno nos ajuda a entender por que o valor esperado é uma medida especialmente informativa quando a loteria é jogada muitas vezes: embora resultados isolados possam variar bastante, o retorno médio tende a se aproximar do valor esperado conforme o número de apostas cresce.",

    scatterExplTip: isEn
      ? "Tip: hover over the points to see more information about each simulated experiment, such as N, how many times each outcome occurred, total returns, mean returns, and profit."
      : "Dica: passe o mouse sobre os pontos para ver mais informações sobre cada experimento simulado, como o número de bilhetes (N), o número de vezes que cada resultado aconteceu, o retorno total obtido, o retorno médio e nosso lucro.",

    compareSection: isEn
      ? "Compare dispersion: Profit/N (mean − EV) as N grows"
      : "Comparar dispersão: Lucro/N (média − VE) conforme N cresce",
    
    compareExplP1: isEn
      ? "In the graphs below, we standardize the distance between each observed mean and the expected value, and we keep the Y-axis scale fixed. This makes it possible to compare dispersion directly across the two lotteries."
      : "Nos gráficos a seguir, padronizamos as distâncias entre cada resultado observado e o valor esperado e fixamos a escala do eixo Y. Isso permite comparar diretamente a intensidade da dispersão entre as duas loterias.",

    compareExplCase1: isEn
      ? "You can see that Lottery {A} has a clearly higher dispersion than Lottery {B}, with average outcomes more spread out around the expected value—especially for small N."
      : "Você pode observar que a Loteria {A} apresenta um nível de dispersão claramente mais alto do que a Loteria {B}, com resultados médios mais espalhados em torno do valor esperado, especialmente para valores baixos de N.",

    compareExplCase2: isEn
      ? "You can see that Lottery {A} has a slightly higher dispersion than Lottery {B}, although the difference is small and the overall patterns are quite similar."
      : "Você pode observar que a Loteria {A} apresenta um nível de dispersão ligeiramente mais alto do que a Loteria {B}, embora a diferença entre as duas seja pequena e os padrões gerais sejam bastante semelhantes.",

    compareExplCase3: isEn
      ? "For the payoffs and probabilities you chose, the dispersion level is identical (or nearly identical) across the two lotteries. If you want to see clearer differences in dispersion (and risk), change the simulation inputs and try again."
      : "Para os valores de payoffs e probabilidades que você escolheu, o nível de dispersão entre as duas loterias é idêntico (ou praticamente idêntico). Caso queira observar mais claramente como loterias podem apresentar níveis de dispersão (e de risco) distintos, altere os valores da simulação e tente novamente.",

    compareExplP2: isEn
      ? "Differences in dispersion reflect different levels of risk. Lotteries with higher dispersion produce more volatile average returns when the number of tickets is small, increasing the chance of outcomes far from the expected value."
      : "A diferença na intensidade da dispersão dos valores reflete níveis distintos de risco associado à decisão de apostar na loteria. Loterias com maior dispersão geram retornos médios mais voláteis quando o número de apostas é pequeno, aumentando a chance de resultados muito distantes do valor esperado.",

    compareExplP3: isEn
      ? "This helps explain why expected value may be a poor descriptor of individual decision-making under risk when the agent faces the uncertainty only a few times: variability can matter as much as—or more than—the expected value. If the same risk were faced repeatedly, however, results would tend to converge, making expected value a more appropriate statistic."
      : "Esse ponto ajuda a entender por que o valor esperado pode não ser uma medida adequada para descrever decisões individuais sob risco, especialmente quando o agente se submete ao evento incerto poucas vezes. Nesses casos, a variabilidade dos resultados importa tanto quanto — ou até mais do que — o valor esperado. Se o mesmo risco fosse enfrentado repetidamente, no entanto, os resultados tenderiam a convergir, tornando o valor esperado uma descrição mais apropriada do desempenho da loteria.",


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

  // --- Texto dinâmico: comparar intensidade da dispersão ---
  // Foco nos N pequenos: usa até 20% do N máximo (mínimo 20), com teto em 200.
  const cutoffN = Math.min(N, Math.max(20, Math.floor(N * 0.20)), 200);

  const sd1 = dispersionScore(pts1, d1.expectedValue, cutoffN);
  const sd2 = dispersionScore(pts2, d2.expectedValue, cutoffN);
  const dispClass = classifyDispersion(sd1, sd2);

  const renderCaseSentence = () => {
    if (dispClass.caseId === 3) return t.compareExplCase3;

    const tpl = dispClass.caseId === 1 ? t.compareExplCase1 : t.compareExplCase2;

    // {A}/{B} referem-se aos rótulos “1” e “2”
    return tpl
      .replaceAll("{A}", dispClass.A)
      .replaceAll("{B}", dispClass.B);
  };

  const compareCaseSentence = renderCaseSentence();

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

      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.scatterExplP1)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.scatterExplP2)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.scatterExplP3)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;"><b>${esc(isEn ? "Tip:" : "Dica:")}</b> ${esc(isEn ? t.scatterExplTip.replace(/^Tip:\s*/,"") : t.scatterExplTip.replace(/^Dica:\s*/,""))}</p>


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

      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.compareExplP1)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(compareCaseSentence)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.compareExplP2)}</p>
      <p style="margin: 8px 0 0 0; opacity:.9;">${esc(t.compareExplP3)}</p>

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
