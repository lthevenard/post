// ============================================================================
// Lottery Tabs Rendering
// ============================================================================

/**
 * Formats a probability as a percentage string.
 * @param {number} p
 * @returns {string}
 */
function fmtPct(p){ return `${Math.round(p * 100)}%`; }

/**
 * Formats a number with 2 decimals (trimmed).
 * @param {number} x
 * @returns {string}
 */
function fmt2(x){ return (Math.round(x * 100) / 100).toString(); }

/**
 * Builds the outcome list HTML for a lottery.
 * @param {object} desc
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {string}
 */
function outcomeListHTML(desc, { lang }){
  const isEn = lang === "en";

  return desc.resultNames.map((name, i) => {
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
  }).join("");
}

/**
 * Builds the solution box HTML for EV and standard deviation.
 * @param {object} desc
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {string}
 */
function solutionBoxHTML(desc, { lang }){
  const isEn = lang === "en";
  const evLine = isEn ? "Expected value" : "Valor esperado";
  const sdLine = isEn ? "Theoretical standard deviation" : "Desvio-padrão teórico";

  return `
    <div class="lottery-card">
      <div class="lottery-card-title">${isEn ? "Solution" : "Solução"}</div>
      <ul class="lottery-bullets">
        <li><b>${evLine}: ${fmt2(desc.expectedValue)}</b></li>
        <li style="opacity:.9;">${sdLine}: ${fmt2(desc.stdDev)}</li>
      </ul>
    </div>
  `;
}

/**
 * Attaches hover tooltips to distribution bars.
 * @param {HTMLElement} root
 * @returns {void}
 */
function wireDistributionTooltips(root) {
  const svg = root.querySelector("svg.lotteries-dist-svg");
  if (!svg) return;

  const bars = svg.querySelectorAll("rect.distbar[data-tooltip]");
  if (!bars.length) return;

  // Create one shared tooltip per document (reused across tabs).
  let tip = document.querySelector(".lotteries-tooltip");
  if (!tip) {
    tip = document.createElement("div");
    tip.className = "lotteries-tooltip";
    tip.style.display = "none";
    document.body.appendChild(tip);
  }

  const show = (e, text) => {
    if (!text) return;
    tip.textContent = text;
    tip.style.display = "block";
    move(e);
  };

  const move = (e) => {
    const offset = 12;
    tip.style.left = `${e.clientX + offset}px`;
    tip.style.top = `${e.clientY + offset}px`;
  };

  const hide = () => {
    tip.style.display = "none";
  };

  bars.forEach((bar) => {
    bar.addEventListener("mouseenter", (e) => show(e, bar.dataset.tooltip || ""));
    bar.addEventListener("mousemove", move);
    bar.addEventListener("mouseleave", hide);
  });

  // Safety: if mouse leaves the SVG quickly.
  svg.addEventListener("mouseleave", hide);
}

/**
 * Renders a lottery tab (theory + simulation).
 * @param {HTMLElement} container
 * @param {object} ctx
 * @param {"pt"|"en"} ctx.lang
 * @param {number} ctx.which
 * @param {object} ctx.desc
 * @param {string} ctx.distSvg
 * @param {string} ctx.evSvg
 * @param {Array<object>} ctx.simTable
 * @param {number} ctx.seedUsed
 * @returns {void}
 */
export function renderLotteryTab(container, { lang, which, desc, distSvg, evSvg, simTable, seedUsed }){
  const isEn = lang === "en";

  const title =
    which === 1
      ? (isEn ? "Analysis of the first lottery" : "Análise da primeira loteria")
      : (isEn ? "Analysis of the second lottery" : "Análise da segunda loteria");

  // -----------------------------------------------------------------------
  // Labels
  // -----------------------------------------------------------------------
  const qTitle = isEn
    ? "What are the expected value and standard deviation of this lottery?"
    : "Qual é o valor esperado e o desvio padrão dessa loteria?";

  const showTxt = isEn ? "Show answer" : "Mostrar a resposta";
  const hideTxt = isEn ? "Hide answer" : "Esconder a resposta";

  const simTitle = isEn ? "Simulation results" : "Resultados da simulação";
  const simShow = isEn ? "Show table" : "Mostrar tabela";
  const simHide = isEn ? "Hide table" : "Esconder tabela";

  const expShow = isEn ? "Show explanation" : "Mostrar explicação";
  const expHide = isEn ? "Hide explanation" : "Ocultar explicação";

  const evExplainerTitle = isEn
    ? "How to compute the expected value"
    : "Como calcular o valor esperado";

  const sdExplainerTitle = isEn
    ? "How to compute the standard deviation"
    : "Como calcular o desvio padrão";

  const evExplainerBody = isEn
    ? `
      <p>
        The expected value (\\(\\mathbb{E}[X]\\)) is the <strong>long-run average</strong> return of the lottery.
      </p>
      <p>
        When the lottery is repeated many times, the average of the realized returns tends to \\(\\mathbb{E}[X]\\).
        It is therefore a summary measure: it does not represent a guaranteed outcome in a single play.
      </p>
      <p>
        To compute the expected value, we sum the possible outcomes across different states of the world,
        each weighted by its corresponding probability.
      </p>
      <p>
        Thus, if the outcomes are \\(x_1,\\dots,x_k\\), with probabilities \\(p_1,\\dots,p_k\\), we have:
      </p>
      <p>$$\\mathbb{E}[X] = \\sum_{i=1}^{k} x_i\\,p_i$$</p>
    `
    : `
      <p>
        O valor esperado (\\(\\mathbb{E}[X]\\)) é a <strong>média de longo prazo</strong> do retorno da loteria.
      </p>
      <p>
        Ao repetir a loteria muitas vezes, a média dos retornos obtidos tenderá a \\(\\mathbb{E}[X]\\).
        Trata-se, portanto, de uma medida-resumo: não é um resultado garantido em uma jogada.
      </p>
      <p>
        Para calcular o valor esperado, somamos os resultados dos diferentes estados do mundo multiplicados pelas suas respectivas probabilidades.
      </p>
      <p>
        Assim, se os resultados são \\(x_1,\\dots,x_k\\), com probabilidades \\(p_1,\\dots,p_k\\), então temos:
      </p>
      <p>$$\\mathbb{E}[X] = \\sum_{i=1}^{k} x_i\\,p_i$$</p>
    `;

  const sdExplainerBody = isEn
    ? `
      <p>
        The standard deviation measures how much the lottery outcomes <strong>spread</strong>
        around the expected value. As a result, two lotteries may have the same
        \\(\\mathbb{E}[X]\\) and yet exhibit very different levels of risk.
      </p>

      <p>
        To understand this measure, we begin with the <strong>variance</strong>.
        Let \\(\\mu = \\mathbb{E}[X]\\). The variance computes the average
        <em>squared</em> distance between each possible outcome and the expected value,
        weighted by the probability of each outcome.
      </p>

      <p>
        Formally, the variance (\\(\\mathrm{Var}(X)\\)) is defined as:
      </p>

      <p>
        $$\\mathrm{Var}(X) = \\sum_{i=1}^{k} (x_i - \\mu)^2\\,p_i$$
      </p>

      <p>
        Squaring the deviations ensures that positive and negative deviations do not cancel out,
        but it also has an important consequence: the variance is expressed in
        <em>squared units</em>, which makes direct interpretation more difficult.
      </p>

      <p>
        To address this issue, we define the <strong>standard deviation</strong>
        as the square root of the variance:
      </p>

      <p>
        $$\\sigma(X) = \\sqrt{\\mathrm{Var}(X)}$$
      </p>

      <p>
        The standard deviation is expressed in the <strong>same units as the lottery outcomes</strong>
        and can be interpreted as a typical measure of how far outcomes tend to lie
        from the expected value. The larger the standard deviation, the greater the
        dispersion—and, therefore, the higher the risk associated with the lottery.
      </p>
    `
    : `
      <p>
        O desvio padrão mede o quanto os resultados da loteria <strong>se espalham</strong>
        em torno do valor esperado. Assim, duas loterias podem ter o mesmo
        \\(\\mathbb{E}[X]\\) e, ainda assim, apresentar níveis de risco bastante diferentes.
      </p>

      <p>
        Para entender essa medida, começamos pela <strong>variância</strong>.
        Seja \\(\\mu = \\mathbb{E}[X]\\). A variância calcula a distância média
        <em>ao quadrado</em> entre cada resultado possível e o valor esperado,
        ponderada pelas probabilidades de cada resultado.
      </p>

      <p>
        Formalmente, a variância (\\(\\mathrm{Var}(X)\\)) é definida como:
      </p>

      <p>
        $$\\mathrm{Var}(X) = \\sum_{i=1}^{k} (x_i - \\mu)^2\\,p_i$$
      </p>

      <p>
        O uso do quadrado garante que desvios positivos e negativos não se anulem,
        mas tem uma consequência importante: a variância é medida em unidades
        <em>quadradas</em>, o que dificulta sua interpretação direta.
      </p>

      <p>
        Para contornar esse problema, definimos o <strong>desvio padrão</strong>
        como a raiz quadrada da variância:
      </p>

      <p>
        $$\\sigma(X) = \\sqrt{\\mathrm{Var}(X)}$$
      </p>

      <p>
        O desvio padrão está na <strong>mesma unidade dos resultados da loteria</strong>
        e pode ser interpretado como uma medida típica de quão distantes os resultados
        costumam ficar do valor esperado. Quanto maior o desvio padrão, maior a
        dispersão — e, portanto, maior o risco associado à loteria.
      </p>
    `;

  const explainerHTML = (id, strongTitle, bodyHtml) => `
    <div class="lottery-card lottery-explainer is-collapsed" id="${id}">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <strong>${strongTitle}</strong>
        <span class="lotteries-toggle-link" data-role="toggle">${expShow}</span>
      </div>
      <div class="lottery-explainer-body">
        ${bodyHtml}
      </div>
    </div>
  `;

  // --------------------- Simulation table contract ---------------------
  const resultNames = Array.isArray(desc?.resultNames) ? desc.resultNames : [];

  const fmtMoney = (x) => {
    if (!Number.isFinite(x)) return "–";
    const locale = isEn ? "en-US" : "pt-BR";
    return x.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const moneySpan = (x) => {
    const cls = x > 0 ? "is-pos" : x < 0 ? "is-neg" : "is-zero";
    return `<span class="money ${cls}">${fmtMoney(x)}</span>`;
  };

  const pagerNumbersHTML = (pageIndex, pageCount) => {
    const radius = 3;
    const cur = pageIndex + 1;
    const last = pageCount;

    const start = Math.max(1, cur - radius);
    const end = Math.min(last, cur + radius);

    const parts = [];

    const pageBtn = (p) => {
      const active = p === cur;
      return `
        <button
          class="simtable-page ${active ? "is-active" : ""}"
          data-action="page"
          data-page="${p}"
          ${active ? 'aria-current="page"' : ""}
        >${p}</button>
      `;
    };

    const dots = `<span class="simtable-dots">…</span>`;

    if (start > 1) {
      parts.push(pageBtn(1));
      if (start > 2) parts.push(dots);
    }

    for (let p = start; p <= end; p++) parts.push(pageBtn(p));

    if (end < last) {
      if (end < last - 1) parts.push(dots);
      parts.push(pageBtn(last));
    }

    return `<div class="simtable-pages" role="navigation" aria-label="${isEn ? "Pagination" : "Paginação"}">${parts.join("")}</div>`;
  };

  const buildSimTableHTML = (pageRows, pageIndex, pageCount) => {
    const ticketsLabel = isEn ? "Tickets" : "Bilhetes";
    const returnsLabel = isEn ? "Returns" : "Resultado";
    const meanLabel = isEn ? "Mean returns" : "Resultado médio";
    const profitLabel = isEn ? "Profit" : "Lucro";

    const outcomeHeaders = resultNames.length
      ? resultNames.map((name) => `<th class="num">${name}</th>`).join("")
      : `<th class="num">${isEn ? "Outcome" : "Resultado"}</th>`;

    const head = `
      <thead>
        <tr>
          <th class="num">${ticketsLabel}</th>
          ${outcomeHeaders}
          <th class="num">${returnsLabel}</th>
          <th class="num">${meanLabel}</th>
          <th class="num">${profitLabel}</th>
        </tr>
      </thead>
    `;

    const body = pageRows.map((row) => {
      const N = Number(row?.Tickets ?? 0);
      const total = Number(row?.Returns ?? 0);
      const mean = Number(row?.["Mean Returns"] ?? 0);
      const profit = Number(row?.Profit ?? 0);

      const outcomeCells = resultNames.length
        ? resultNames.map((name) => `<td class="num">${Number(row?.[name] ?? 0)}</td>`).join("")
        : `<td class="num">–</td>`;

      return `
        <tr>
          <td class="num">${N}</td>
          ${outcomeCells}
          <td class="num">${moneySpan(total)}</td>
          <td class="num">${moneySpan(mean)}</td>
          <td class="num">${moneySpan(profit)}</td>
        </tr>
      `;
    }).join("");

    return `
      <div class="simtable-wrap">
        <table class="simtable">
          ${head}
          <tbody>${body}</tbody>
        </table>

        <div class="simtable-pager">
          <div class="simtable-pager-left">
            <button class="simtable-btn" data-action="first" ${pageIndex === 0 ? "disabled" : ""}>
              ${isEn ? "Start" : "Início"}
            </button>
            <button class="simtable-btn" data-action="prev" ${pageIndex === 0 ? "disabled" : ""}>
              ${isEn ? "Previous" : "Anterior"}
            </button>
          </div>

          ${pagerNumbersHTML(pageIndex, pageCount)}

          <div class="simtable-pager-right">
            <button class="simtable-btn" data-action="next" ${pageIndex + 1 >= pageCount ? "disabled" : ""}>
              ${isEn ? "Next" : "Próxima"}
            </button>
            <button class="simtable-btn" data-action="last" ${pageIndex + 1 >= pageCount ? "disabled" : ""}>
              ${isEn ? "End" : "Fim"}
            </button>
          </div>
        </div>

        <div class="simtable-pageinfo">
          ${isEn ? "Page" : "Página"} <strong>${pageIndex + 1}</strong> / ${pageCount}
        </div>
      </div>
    `;
  };

  // --------------------- Render shell ---------------------
  container.innerHTML = `
    <h2 class="lottery-panel-title">${title}</h2>

    <div class="lottery-card">
      <div class="lottery-card-title">${isEn ? "Lottery returns" : "Retornos da loteria"}</div>
      <ul class="lottery-bullets">
        ${outcomeListHTML(desc, { lang })}
      </ul>
    </div>

    <div class="lottery-chart-block">${distSvg}</div>

    <section class="lottery-reveal is-collapsed" data-show="${showTxt}" data-hide="${hideTxt}">
      <div class="lottery-reveal-head">
        <h3 class="lottery-reveal-title">${qTitle}</h3>
        <span class="lotteries-toggle-link lottery-reveal-toggle" role="button" tabindex="0" aria-expanded="false">
          ${showTxt}
        </span>
      </div>

      <div class="lottery-reveal-content">
        ${solutionBoxHTML(desc, { lang })}
        <div class="lottery-chart-block">${evSvg}</div>

        ${explainerHTML(`ev-explainer-${which}`, evExplainerTitle, evExplainerBody)}
        ${explainerHTML(`sd-explainer-${which}`, sdExplainerTitle, sdExplainerBody)}
      </div>
    </section>

    <section class="lottery-reveal is-collapsed" data-show="${simShow}" data-hide="${simHide}" data-kind="sim">
      <div class="lottery-reveal-head">
        <h3 class="lottery-reveal-title">${simTitle}</h3>
        <span class="lotteries-toggle-link lottery-reveal-toggle" role="button" tabindex="0" aria-expanded="false">
          ${simShow}
        </span>
      </div>

      <div class="lottery-reveal-content">
        <div class="simtable-mount"></div>
      </div>
    </section>

    <div class="lottery-sep" aria-hidden="true"></div>

    <div class="lottery-card">
      <div class="lottery-card-title">
        ${isEn ? "Seed used" : "Seed utilizado"}
      </div>
      <div style="font-size:18px;"><b>${seedUsed ?? ""}</b></div>
      <div style="font-size:12px; opacity:.8; margin-top:6px;">
        ${
          isEn
            ? "Re-run the simulation with the same seed to reproduce all results."
            : "Execute novamente a simulação com o mesmo seed para reproduzir todos os resultados."
        }
      </div>
    </div>
  `;

  wireDistributionTooltips(container);

  // --------------------- Wire reveal toggles ---------------------
  const wireRevealSection = (section) => {
    const btn = section.querySelector(".lottery-reveal-toggle");
    if (!btn) return;

    const show = section.getAttribute("data-show") || showTxt;
    const hide = section.getAttribute("data-hide") || hideTxt;

    const setOpen = (open) => {
      section.classList.toggle("is-collapsed", !open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? hide : show;
    };

    const toggle = () => setOpen(section.classList.contains("is-collapsed"));

    btn.addEventListener("click", toggle);
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    setOpen(false);
  };

  container.querySelectorAll(".lottery-reveal").forEach(wireRevealSection);

  // --------------------- Wire explainers ---------------------
  container.querySelectorAll(".lottery-explainer").forEach((explainer) => {
    const toggleEl = explainer.querySelector('[data-role="toggle"]');
    if (!toggleEl) return;

    explainer.classList.add("is-collapsed");
    toggleEl.textContent = expShow;

    toggleEl.addEventListener("click", () => {
      explainer.classList.toggle("is-collapsed");
      toggleEl.textContent = explainer.classList.contains("is-collapsed") ? expShow : expHide;
    });
  });

  // --------------------- Simulation table pagination ---------------------
  const simSection = container.querySelector('.lottery-reveal[data-kind="sim"]');
  const simMount = simSection?.querySelector(".simtable-mount");

  if (simSection && simMount) {
    const rows = Array.isArray(simTable) ? simTable : [];
    const pageSize = 10;
    let pageIndex = 0;
    const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

    const renderSimPage = () => {
      const start = pageIndex * pageSize;
      const pageRows = rows.slice(start, start + pageSize);

      if (!pageRows.length) {
        simMount.innerHTML = `<div class="lottery-card" style="margin-top:10px;">
          ${isEn ? "No simulation rows to display." : "Não há linhas de simulação para exibir."}
        </div>`;
        return;
      }

      simMount.innerHTML = buildSimTableHTML(pageRows, pageIndex, pageCount);
    };

    simMount.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-action]");
      if (!btn) return;

      const action = btn.getAttribute("data-action");

      if (action === "first") pageIndex = 0;
      else if (action === "prev") pageIndex = Math.max(0, pageIndex - 1);
      else if (action === "next") pageIndex = Math.min(pageCount - 1, pageIndex + 1);
      else if (action === "last") pageIndex = pageCount - 1;
      else if (action === "page") {
        const p = Number(btn.getAttribute("data-page")); // 1-based
        if (Number.isFinite(p)) pageIndex = Math.min(pageCount - 1, Math.max(0, p - 1));
      } else return;

      renderSimPage();
    });

    renderSimPage();
  }

  // --------------------- KaTeX render ---------------------
  const renderMath = () => {
    if (!window.renderMathInElement) return;
    window.renderMathInElement(container, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "\\(", right: "\\)", display: false },
        { left: "\\[", right: "\\]", display: true },
      ],
      throwOnError: false,
    });
  };

  renderMath();
  if (!window.renderMathInElement && window.__lotteriesKatexReady) {
    window.__lotteriesKatexReady.then(() => renderMath()).catch(() => {});
  }
}
