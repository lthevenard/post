// apps/lotteries/views/charts.js
// SVG charts (no external libs). Returns SVG markup as a string.

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

function niceTicks(maxVal, n = 4) {
  // Produces ticks from 0..maxVal with a "nice" step.
  // For probabilities, maxVal usually <= 1.
  if (!isFinite(maxVal) || maxVal <= 0) return [0, 0.25, 0.5, 0.75, 1];

  const raw = maxVal / n;
  const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
  const frac = raw / pow10;

  let step;
  if (frac <= 1) step = 1 * pow10;
  else if (frac <= 2) step = 2 * pow10;
  else if (frac <= 2.5) step = 2.5 * pow10;
  else if (frac <= 5) step = 5 * pow10;
  else step = 10 * pow10;

  const top = Math.ceil(maxVal / step) * step;

  const ticks = [];
  for (let t = 0; t <= top + 1e-12; t += step) ticks.push(+t.toFixed(12));
  return ticks;
}

function fmtPct(p) {
  // For p in [0,1], show 0%, 25%, etc.
  if (!isFinite(p)) return "";
  return `${Math.round(p * 100)}%`;
}

function niceStep(span, targetIntervals = 5) {
  if (!isFinite(span) || span <= 0) return 1;

  const raw = span / targetIntervals;
  const pow10 = Math.pow(10, Math.floor(Math.log10(raw)));
  const frac = raw / pow10;

  let step;
  if (frac <= 1) step = 1 * pow10;
  else if (frac <= 2) step = 2 * pow10;
  else if (frac <= 2.5) step = 2.5 * pow10;
  else if (frac <= 5) step = 5 * pow10;
  else step = 10 * pow10;

  return step;
}

function niceTicksRange(minVal, maxVal, tickCount = 6) {
  if (!isFinite(minVal) || !isFinite(maxVal)) return [-1, 0, 1];

  // normaliza
  let lo = Math.min(minVal, maxVal);
  let hi = Math.max(minVal, maxVal);

  if (lo === hi) {
    const pad = Math.abs(lo) > 0 ? Math.abs(lo) * 0.1 : 1;
    lo -= pad;
    hi += pad;
  }

  const span = hi - lo;
  const step = niceStep(span, Math.max(2, tickCount - 1));

  const niceLo = Math.floor(lo / step) * step;
  const niceHi = Math.ceil(hi / step) * step;

  const ticks = [];
  // +eps para incluir o último tick
  for (let t = niceLo; t <= niceHi + step * 1e-9; t += step) {
    // evita -0
    const v = Math.abs(t) < 1e-12 ? 0 : t;
    ticks.push(+v.toFixed(12));
  }

  return ticks;
}

function fmtNiceNumber(x, step) {
  if (!isFinite(x)) return "";
  const aStep = Math.abs(step);

  let decimals = 0;
  if (aStep < 1) decimals = 2;
  if (aStep < 0.1) decimals = 3;
  if (aStep < 0.01) decimals = 4;

  // evita "-0.00"
  const v = Math.abs(x) < 1e-12 ? 0 : x;
  return v.toFixed(decimals);
}


/**
 * Bar chart for a discrete probability distribution.
 * bars: [{ valueLabel: string, prob: number, title?: string }]
 */
export function renderDistributionBarsSVG(bars, opts = {}) {
  const title = opts.title ?? "";
  const xLabel = opts.xLabel ?? "";
  const yLabel = opts.yLabel ?? "";

  const W = 860;
  const H = 440;

  const margin = { t: 48, r: 18, b: 66, l: 70 };
  const x0 = margin.l;
  const y0 = margin.t;
  const plotW = W - margin.l - margin.r;
  const plotH = H - margin.t - margin.b;

  const bgStroke = "rgba(15,23,42,.55)";
  const gridStroke = "rgba(15,23,42,.12)";
  const tickStroke = "rgba(15,23,42,.55)";
  const textFill = "rgba(15,23,42,.85)";
  const mutedFill = "rgba(15,23,42,.70)";

  const probs = bars.map((b) => (typeof b.prob === "number" ? b.prob : 0));
  const maxP = Math.max(0, ...probs);

  // headroom + axis-top scaling (matches ticks)
  const headroom = 0.90;
  const desiredMax = (maxP || 1) / headroom;

  const ticks = niceTicks(desiredMax, 4);
  const yMax = ticks[ticks.length - 1] || desiredMax || 1;

  const y = (p) => {
    const pp = clamp(p, 0, yMax);
    const scaled = (pp / yMax) * plotH;
    return y0 + plotH - scaled;
  };

  // Layout bars
  const n = Math.max(1, bars.length);
  const gap = Math.max(10, Math.min(26, plotW / (n * 6)));
  const barW = (plotW - gap * (n + 1)) / n;

  // Y ticks + horizontal guide lines (grid)
  const grid = ticks
    .map((t) => {
      const yy = y(t);
      return `
        <line x1="${x0}" y1="${yy}" x2="${x0 + plotW}" y2="${yy}"
              stroke="${gridStroke}" stroke-width="1" />

        <line x1="${x0 - 6}" y1="${yy}" x2="${x0}" y2="${yy}"
              stroke="${tickStroke}" stroke-width="1" />

        <text x="${x0 - 10}" y="${yy + 4}" text-anchor="end"
              font-size="12" fill="${mutedFill}">${esc(fmtPct(t))}</text>
      `;
    })
    .join("");

  // Plot border + explicit axes lines
  const box = `
    <rect x="${x0}" y="${y0}" width="${plotW}" height="${plotH}"
          fill="none" stroke="${bgStroke}" stroke-width="1" />
    <line x1="${x0}" y1="${y0 + plotH}" x2="${x0 + plotW}" y2="${y0 + plotH}"
          stroke="${bgStroke}" stroke-width="1" />
    <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y0 + plotH}"
          stroke="${bgStroke}" stroke-width="1" />
  `;

  // X ticks (one per bar, under baseline)
  const xTickY1 = y0 + plotH;
  const xTickY2 = y0 + plotH + 6;

  const rects = bars
    .map((b, i) => {
      const p = typeof b.prob === "number" ? b.prob : 0;
      const x = x0 + gap + i * (barW + gap);
      const yTop = y(p);
      const h = (y0 + plotH) - yTop;

      const cx = x + barW / 2;

      // Tooltip text: prefer b.tooltip; fallback to b.title; else empty
      const tip = b.tooltip ?? b.title ?? "";

      return `
        <rect
          class="distbar"
          data-tooltip="${esc(tip)}"
          x="${x}" y="${yTop}" width="${Math.max(2, barW)}" height="${Math.max(0, h)}"
          fill="var(--bg)" opacity="0.90"
        ></rect>

        <line x1="${cx}" y1="${xTickY1}" x2="${cx}" y2="${xTickY2}"
              stroke="${tickStroke}" stroke-width="1" />

        <text x="${cx}" y="${y0 + plotH + 24}" text-anchor="middle"
              font-size="12" fill="${textFill}">${esc(b.valueLabel)}</text>
      `;
    })
    .join("");

  const header = title
    ? `<text x="${x0}" y="${y0 - 18}" font-size="14" font-weight="800" fill="${textFill}">${esc(
        title
      )}</text>`
    : "";

  const yAxisLabel = yLabel
    ? `<text x="${16}" y="${y0 + plotH / 2}" font-size="12" fill="${mutedFill}"
             text-anchor="middle" transform="rotate(-90 16 ${y0 + plotH / 2})">${esc(
        yLabel
      )}</text>`
    : "";

  const xAxisLabel = xLabel
    ? `<text x="${x0 + plotW / 2}" y="${H - 18}" font-size="12" fill="${mutedFill}"
             text-anchor="middle">${esc(xLabel)}</text>`
    : "";

  return `
    <svg class="lotteries-svg lotteries-dist-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(
    title
  )}">
      ${header}
      ${yAxisLabel}
      ${xAxisLabel}

      ${grid}
      ${box}
      ${rects}
    </svg>
  `;
}


export function renderExpectedValueSVG(ev, sd, { title, xTickLabel } = {}) {
  const W = 980;
  const H = 260;

  const pad = { l: 72, r: 26, t: 72, b: 56 };
  const x0 = pad.l;
  const y0 = pad.t;
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  const mu = Number(ev);
  const sigma = Math.max(0, Number(sd));

  // Para desenhar algo mesmo quando σ=0
  const span = sigma > 0 ? 2 * sigma : Math.max(1, Math.abs(mu) * 0.25);
  const yMin = mu - span;
  const yMax = mu + span;

  // Headroom vertical (não encostar no topo/fundo)
  const headroom = 0.90;
  const topPad = (plotH * (1 - headroom)) / 2;

  const y = (v) => {
    const t = (v - yMin) / Math.max(1e-9, (yMax - yMin)); // 0..1
    return y0 + topPad + (1 - t) * (plotH * headroom);
  };

  const faint = "rgba(15,23,42,.10)";
  const axisTickStroke = "rgba(15,23,42,.45)";
  const axisLabelFill = "rgba(15,23,42,.78)";
  const boxStroke = "rgba(15,23,42,.55)";
  const textFill = "rgba(15,23,42,.90)";

  // Posição x fixa (linha vertical no "meio-esquerda", como antes)
  const cx = x0 + plotW * 0.28;

  const yMu = y(mu);
  const yLo = y(mu - sigma);
  const yHi = y(mu + sigma);

  // Caixa do plot
  const box = `
    <rect x="${x0}" y="${y0}" width="${plotW}" height="${plotH}"
          fill="none" stroke="${boxStroke}" stroke-width="1" />
  `;

  // Ticks: μ-σ, μ, μ+σ (e guias horizontais faint)
  const tickVals = sigma > 0 ? [mu - sigma, mu, mu + sigma] : [mu];

  const ticks = tickVals
    .map((v) => {
      const yy = y(v);
      return `
        <line x1="${x0}" y1="${yy}" x2="${x0 + plotW}" y2="${yy}"
              stroke="${faint}" stroke-width="1" />
        <line x1="${x0 - 6}" y1="${yy}" x2="${x0}" y2="${yy}"
              stroke="${axisTickStroke}" stroke-width="1" />
        <text x="${x0 - 12}" y="${yy + 4}" text-anchor="end"
              font-size="12" fill="${axisLabelFill}">${esc(v.toFixed(1))}</text>
      `;
    })
    .join("");

  // Linha vertical guia (faint) onde está o marcador
  const vGuide = `
    <line x1="${cx}" y1="${y0}" x2="${cx}" y2="${y0 + plotH}" stroke="${faint}" />
  `;

  // Marcador: whisker vertical (μ±σ) + whiskers horizontais + ponto em μ
  const col = "rgb(220,38,38)";

  const marker = sigma > 0
    ? `
      <line x1="${cx}" y1="${yLo}" x2="${cx}" y2="${yHi}" stroke="${col}" stroke-width="3" />
      <line x1="${cx - 18}" y1="${yLo}" x2="${cx + 18}" y2="${yLo}" stroke="${col}" stroke-width="3" />
      <line x1="${cx - 18}" y1="${yHi}" x2="${cx + 18}" y2="${yHi}" stroke="${col}" stroke-width="3" />
      <circle cx="${cx}" cy="${yMu}" r="7" fill="${col}" />
    `
    : `
      <circle cx="${cx}" cy="${yMu}" r="7" fill="${col}" />
    `;

  // Texto ao lado do ponto: μ e σ
  const infoText = `
    <text x="${cx + 28}" y="${yMu + 4}" font-size="13" font-weight="850" fill="${textFill}">
      μ=${esc(mu.toFixed(1))}${sigma > 0 ? `, σ=${esc(sigma.toFixed(1))}` : ""}
    </text>
  `;

  // Tick/label simples no eixo x (apenas para “ancorar” visualmente a loteria)
  const xTick = `
    <line x1="${cx}" y1="${y0 + plotH}" x2="${cx}" y2="${y0 + plotH + 8}" stroke="${axisTickStroke}" />
    <text x="${cx}" y="${y0 + plotH + 26}" text-anchor="middle"
          font-size="12" font-weight="700" fill="rgba(15,23,42,.80)">
      ${esc(xTickLabel || "")}
    </text>
  `;

  const titleBlock = title
    ? `<text x="${pad.l}" y="36" font-size="18" font-weight="850" fill="${textFill}">${esc(title)}</text>`
    : "";

  return `
    <svg class="lotteries-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title || "")}" preserveAspectRatio="xMidYMid meet">
      ${titleBlock}
      ${box}
      ${ticks}
      ${vGuide}
      ${marker}
      ${infoText}
      ${xTick}
    </svg>
  `;
}

// ============================================================
// Dispersion charts (SVG)
// - renderMeanScatterSVG: pontos (N, mean) + linha EV
// - renderMeanAbsDeviationSVG: linha de média |mean - EV| por N
// ============================================================

function nicePad([minV, maxV], frac = 0.08) {
  const span = maxV - minV || 1;
  const pad = span * frac;
  return [minV - pad, maxV + pad];
}

function niceDomain([minV, maxV], targetSteps = 5) {
  // Arredonda limites para valores “redondos” com steps 1-2-5 * 10^k
  let lo = Math.min(minV, maxV);
  let hi = Math.max(minV, maxV);

  if (!isFinite(lo) || !isFinite(hi)) return [0, 1];

  if (lo === hi) {
    const pad = lo === 0 ? 1 : Math.abs(lo) * 0.1;
    lo -= pad;
    hi += pad;
  }

  const span = hi - lo;
  const rawStep = span / Math.max(1, targetSteps);

  // escolhe step “nice”: 1,2,5,10 × 10^k
  const exp = Math.floor(Math.log10(rawStep));
  const base = Math.pow(10, exp);
  const f = rawStep / base;

  let niceF;
  if (f <= 1) niceF = 1;
  else if (f <= 2) niceF = 2;
  else if (f <= 5) niceF = 5;
  else niceF = 10;

  const step = niceF * base;

  const niceMin = Math.floor(lo / step) * step;
  const niceMax = Math.ceil(hi / step) * step;

  return [niceMin, niceMax];
}

function fmtNum(x) {
  // mais estável visualmente nos tooltips
  const ax = Math.abs(x);
  if (ax >= 1000) return x.toFixed(0);
  if (ax >= 100) return x.toFixed(1);
  return x.toFixed(3);
}

function makeAxisTickFormatter(values) {
  const maxAbs = Math.max(...values.map(v => Math.abs(v)));

  // Choose ONE format for the whole axis, based on the highest magnitude
  const mode =
    (maxAbs >= 10000) ? "sci" :
    (maxAbs >= 1000)  ? "int" :
                        "dec";

  return function fmtAxisTick(x) {
    if (mode === "dec") {
      const s = x.toFixed(1);
      return s.endsWith(".0") ? s.slice(0, -2) : s;
    }
    if (mode === "int") {
      return x.toFixed(0);
    }
    // sci
    return x
      .toExponential(1)
      .replace("e+", "e")
      .replace("E+", "e")
      .replace("E", "e");
  };
}

function escAttr(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function renderMeanScatterSVG(points, {
  lang, title, expectedValue, xLabel, yLabel,
  xMin: xMinOpt, xMax: xMaxOpt,
  jitter = true,
  jitterAmp = 2.0,
}) {
  const isEn = lang === "en";

  if (!Array.isArray(points) || points.length === 0) {
    return `
      <div class="chart-empty">
        ${isEn ? "No data to display." : "Sem dados para exibir."}
      </div>
    `;
  }

  // Dimensões (viewBox): responsivo com width:100% via CSS
  const W = 920;
  const H = 340;
  const m = { l: 72, r: 18, t: 18, b: 44 };

  const xs = points.map((p) => p.N);
  const ys = points.map((p) => p.mean);

  const xMin = Number.isFinite(xMinOpt) ? xMinOpt : Math.min(...xs);
  const xMax = Number.isFinite(xMaxOpt) ? xMaxOpt : Math.max(...xs);

  let yMin = Math.min(...ys, expectedValue);
  let yMax = Math.max(...ys, expectedValue);

  [yMin, yMax] = nicePad([yMin, yMax], 0.05);

  [yMin, yMax] = niceDomain([yMin, yMax], 5);


  const xScale = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * (W - m.l - m.r);
  const yScale = (y) => m.t + (1 - (y - yMin) / (yMax - yMin || 1)) * (H - m.t - m.b);

  const evY = yScale(expectedValue);

  // ticks simples
  const mid = Math.round(xMax / 2);
  const xTicks = [xMin, mid, xMax].filter((v, i, a) => a.indexOf(v) === i);

  const yTicks = [yMin, expectedValue, yMax]
    .filter((v, i, a) => a.findIndex((u) => Math.abs(u - v) < 1e-9) === i);
  
  const fmtYTick = makeAxisTickFormatter(yTicks);

  function hash01(i, N, mean) {
    // determinístico, retorna [0, 1)
    let x = (i + 1) >>> 0;
    x = (x ^ Math.imul(N >>> 0, 374761393)) >>> 0;
    x = (x ^ Math.imul((Math.floor(mean * 1000)) >>> 0, 668265263)) >>> 0;

    // mix final
    x = Math.imul(x ^ (x >>> 15), 2246822507) >>> 0;
    x = Math.imul(x ^ (x >>> 13), 3266489909) >>> 0;
    x = (x ^ (x >>> 16)) >>> 0;

    return (x >>> 0) / 4294967296;
  }

  const dots = points
  .map((p, i) => {
    const baseX = xScale(p.N);

    const j = jitter
      ? (hash01(i, p.N, p.mean) - 0.5) * jitterAmp
      : 0;

    const cx = baseX + j;
    const cy = yScale(p.mean);

    return `
      <circle
        class="disp-dot"
        cx="${cx.toFixed(2)}"
        cy="${cy.toFixed(2)}"
        r="2.4"
        data-table="${escAttr(p.table)}"
        data-idx="${escAttr(p.idx)}"
      />
    `;
  })
  .join("");


  return `
    <svg class="disp-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escAttr(title)}">
      <!-- axes -->
      <line class="disp-axis" x1="${m.l}" y1="${H - m.b}" x2="${W - m.r}" y2="${H - m.b}"></line>
      <line class="disp-axis" x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H - m.b}"></line>

      <!-- EV line -->
      <line class="disp-ev-line" x1="${m.l}" y1="${evY.toFixed(2)}" x2="${W - m.r}" y2="${evY.toFixed(2)}"></line>

      <!-- ticks + labels -->
      ${xTicks
        .map((v) => {
          const x = xScale(v);
          return `
            <line class="disp-axis" x1="${x.toFixed(2)}" y1="${H - m.b}" x2="${x.toFixed(
              2
            )}" y2="${H - m.b + 5}"></line>
            <text x="${x.toFixed(2)}" y="${H - m.b + 18}" font-size="11" text-anchor="middle" opacity="0.78">${v}</text>
          `;
        })
        .join("")}

      ${yTicks
        .map((v, i) => {
          const y = yScale(v);
          const label = fmtYTick(v);
          return `
            <line class="disp-axis" x1="${m.l - 5}" y1="${y.toFixed(2)}" x2="${m.l}" y2="${y.toFixed(
              2
            )}"></line>
            <text x="${m.l - 8}" y="${(y + 4).toFixed(
              2
            )}" font-size="11" text-anchor="end" opacity="0.78">${escAttr(label)}</text>
          `;
        })
        .join("")}

      <!-- axis labels -->
      <text x="${(W / 2).toFixed(0)}" y="${H - 10}" font-size="12" text-anchor="middle" opacity="0.85">${escAttr(
        xLabel
      )}</text>
      <text x="14" y="${(H / 2).toFixed(
        0
      )}" font-size="12" text-anchor="middle" opacity="0.85" transform="rotate(-90 14 ${(H / 2).toFixed(
        0
      )})">${escAttr(yLabel)}</text>

      <!-- dots -->
      <g>
        ${dots}
      </g>
    </svg>
  `;
}

function meanAbsDeviationByN(points, expectedValue) {
  // Agrupa por N e calcula mean |mean - EV|
  const byN = new Map();
  for (const p of points) {
    const dev = Math.abs(p.mean - expectedValue);
    const cur = byN.get(p.N) || { sum: 0, n: 0 };
    cur.sum += dev;
    cur.n += 1;
    byN.set(p.N, cur);
  }
  const series = Array.from(byN.entries())
    .map(([N, { sum, n }]) => ({ N, dev: sum / (n || 1) }))
    .sort((a, b) => a.N - b.N);

  return series;
}

export function renderMeanAbsDeviationSVG(points, { lang, title, expectedValue, xLabel, yLabel }) {
  const isEn = lang === "en";

  const series = meanAbsDeviationByN(points, expectedValue);

  const W = 520;
  const H = 300;
  const m = { l: 56, r: 18, t: 18, b: 44 };

  const xs = series.map((p) => p.N);
  const ys = series.map((p) => p.dev);

  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);

  let yMin = Math.min(...ys);
  let yMax = Math.max(...ys);
  [yMin, yMax] = nicePad([yMin, yMax], 0.12);
  yMin = Math.max(0, yMin); // desvio não é negativo

  const xScale = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * (W - m.l - m.r);
  const yScale = (y) => m.t + (1 - (y - yMin) / (yMax - yMin || 1)) * (H - m.t - m.b);

  // Path da linha
  const d = series
    .map((p, i) => {
      const x = xScale(p.N);
      const y = yScale(p.dev);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  // ticks simples
  const xTicks = [xMin, Math.round((xMin + xMax) / 2), xMax].filter(
    (v, i, a) => a.indexOf(v) === i
  );
  const yTicks = [yMin, (yMin + yMax) / 2, yMax];

  const pointsSvg = series
    .map((p) => {
      const cx = xScale(p.N);
      const cy = yScale(p.dev);
      const tip = isEn
        ? `N=${p.N}, avg |mean−EV|=${fmtNum(p.dev)}`
        : `N=${p.N}, média |média−VE|=${fmtNum(p.dev)}`;
      return `
        <circle class="disp-dot" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.6">
          <title>${escAttr(tip)}</title>
        </circle>
      `;
    })
    .join("");

  return `
    <svg class="disp-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escAttr(title)}">
      <!-- axes -->
      <line class="disp-axis" x1="${m.l}" y1="${H - m.b}" x2="${W - m.r}" y2="${H - m.b}"></line>
      <line class="disp-axis" x1="${m.l}" y1="${m.t}" x2="${m.l}" y2="${H - m.b}"></line>

      <!-- ticks + labels -->
      ${xTicks
        .map((v) => {
          const x = xScale(v);
          return `
            <line class="disp-axis" x1="${x.toFixed(2)}" y1="${H - m.b}" x2="${x.toFixed(
              2
            )}" y2="${H - m.b + 5}"></line>
            <text x="${x.toFixed(2)}" y="${H - m.b + 18}" font-size="11" text-anchor="middle" opacity="0.78">${v}</text>
          `;
        })
        .join("")}

      ${yTicks
        .map((v) => {
          const y = yScale(v);
          const label = fmtNum(v);
          return `
            <line class="disp-axis" x1="${m.l - 5}" y1="${y.toFixed(2)}" x2="${m.l}" y2="${y.toFixed(
              2
            )}"></line>
            <text x="${m.l - 8}" y="${(y + 4).toFixed(
              2
            )}" font-size="11" text-anchor="end" opacity="0.78">${escAttr(label)}</text>
          `;
        })
        .join("")}

      <!-- axis labels -->
      <text x="${(W / 2).toFixed(0)}" y="${H - 10}" font-size="12" text-anchor="middle" opacity="0.85">${escAttr(
        xLabel
      )}</text>
      <text x="14" y="${(H / 2).toFixed(
        0
      )}" font-size="12" text-anchor="middle" opacity="0.85" transform="rotate(-90 14 ${(H / 2).toFixed(
        0
      )})">${escAttr(yLabel)}</text>

      <!-- line + points -->
      <path d="${d}" fill="none" stroke="var(--link)" stroke-width="2.2" opacity="0.9"></path>
      <g>${pointsSvg}</g>
    </svg>
  `;
}

// Profit/N = (Mean Returns − EV). Plota o valor "centrado" no zero vs N.
// Aceita yMin/yMax externos para manter escala igual em dois gráficos.

export function renderProfitPerTicketSVG(points, {
  lang, title, expectedValue, xLabel, yLabel,
  yMin: yMinOpt, yMax: yMaxOpt,
}) {
  const isEn = lang === "en";

  if (!Array.isArray(points) || points.length === 0) {
    return `
      <div class="chart-empty">
        ${isEn ? "No data to display." : "Sem dados para exibir."}
      </div>
    `;
  }

  // Série: (N, Profit/N) = (N, mean − EV)
  const series = points
    .map((p) => ({
      N: Number(p?.N ?? NaN),
      y: Number(p?.mean ?? NaN) - Number(expectedValue ?? 0),
    }))
    .filter((p) => Number.isFinite(p.N) && Number.isFinite(p.y) && p.N >= 1)
    .sort((a, b) => a.N - b.N);

  if (series.length === 0) {
    return `
      <div class="chart-empty">
        ${isEn ? "No data to display." : "Sem dados para exibir."}
      </div>
    `;
  }

  // --- Layout ---
  const W = 520;
  const H = 300;
  const m = { l: 64, r: 18, t: 18, b: 54 }; // b um pouco maior por causa dos labels do eixo X

  // --- Domínios ---
  const xs = series.map((p) => p.N);
  const ys = series.map((p) => p.y);

  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);

  // Base Y (vindo de fora para manter mesma escala entre gráficos)
  const yMinBase = (yMinOpt ?? Math.min(...ys));
  const yMaxBase = (yMaxOpt ?? Math.max(...ys));

  // Padding leve ANTES de gerar ticks para manter ticks "bons"
  let lo = Math.min(yMinBase, yMaxBase);
  let hi = Math.max(yMinBase, yMaxBase);

  let span = hi - lo;
  if (!Number.isFinite(span) || span === 0) span = Math.abs(hi) || 1;

  const pad = span * 0.08;
  lo -= pad;
  hi += pad;

  // Ticks "nice" no range completo
  const yTicksAll = niceTicksRange(lo, hi, 6);

  // Limites finais "nice" usados na escala
  let yMin = yTicksAll[0];
  let yMax = yTicksAll[yTicksAll.length - 1];
  if (yMin === yMax) {
    const p = Math.abs(yMin) > 0 ? Math.abs(yMin) * 0.1 : 1;
    yMin -= p;
    yMax += p;
  }

  // Ticks do X: mesma lógica dos outros charts (N)
  const xTicks0 = niceTicks(xMax, 6);     // inclui 0
  const xTicksAll = xTicks0.filter((t) => t >= 1); // N começa em 1

  // --- Escalas ---
  const xScale = (x) => m.l + ((x - xMin) / (xMax - xMin || 1)) * (W - m.l - m.r);
  const yScale = (y) => m.t + (1 - (y - yMin) / (yMax - yMin || 1)) * (H - m.t - m.b);

  // Clamp dentro da caixa (evita “colar” na borda e sumir)
  const clampToPlotY = (y) => {
    const top = m.t + 0.5;
    const bot = (H - m.b) - 0.5;
    return Math.max(top, Math.min(bot, y));
  };
  const clampToPlotX = (x) => {
    const left = m.l + 0.5;
    const right = (W - m.r) - 0.5;
    return Math.max(left, Math.min(right, x));
  };

  // --- Linha e pontos ---
  const d = series
    .map((p, i) => {
      const x = clampToPlotX(xScale(p.N));
      const y = clampToPlotY(yScale(p.y));
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  const pointsSvg = series
    .map((p) => {
      const cx = clampToPlotX(xScale(p.N));
      const cy = clampToPlotY(yScale(p.y));
      const tip = isEn
        ? `N=${p.N}, Profit/N=${p.y.toFixed(4)}`
        : `N=${p.N}, Lucro/N=${p.y.toFixed(4)}`;
      return `
        <circle class="disp-dot" cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="2.6">
          <title>${escAttr(tip)}</title>
        </circle>
      `;
    })
    .join("");

  // --- Gridlines internas (exclui paredes) ---
  const yGridTicks = yTicksAll.filter((t) => t > yMin && t < yMax);
  const xGridTicks = xTicksAll.filter((t) => t > xMin && t < xMax);

  const yGridLinesSvg = yGridTicks.map((t, i) => {
    const y = clampToPlotY(yScale(t));
    const strong = (i % 2 === 0);
    const op = strong ? 0.28 : 0.18;
    return `
      <path
        d="M ${m.l} ${y.toFixed(2)} L ${(W - m.r).toFixed(2)} ${y.toFixed(2)}"
        fill="none"
        stroke="var(--border)"
        stroke-width="1"
        opacity="${op}"
        vector-effect="non-scaling-stroke"
      ></path>
    `;
  }).join("");

  const xGridLinesSvg = xGridTicks.map((t, i) => {
    const x = clampToPlotX(xScale(t));
    const strong = (i % 2 === 0);
    const op = strong ? 0.22 : 0.14;
    return `
      <path
        d="M ${x.toFixed(2)} ${m.t} L ${x.toFixed(2)} ${(H - m.b).toFixed(2)}"
        fill="none"
        stroke="var(--border)"
        stroke-width="1"
        opacity="${op}"
        vector-effect="non-scaling-stroke"
      ></path>
    `;
  }).join("");

  // Linha do zero (mais forte), se estiver dentro do range
  const yZeroLineSvg =
    (0 > yMin && 0 < yMax)
      ? (() => {
          const y0 = clampToPlotY(yScale(0));
          return `
            <path
              d="M ${m.l} ${y0.toFixed(2)} L ${(W - m.r).toFixed(2)} ${y0.toFixed(2)}"
              fill="none"
              stroke="var(--border)"
              stroke-width="1.6"
              opacity="0.55"
              vector-effect="non-scaling-stroke"
            ></path>
          `;
        })()
      : "";

  // --- Ticks/labels nos eixos (inclui limites) ---
  const yStep = yTicksAll.length >= 2 ? (yTicksAll[1] - yTicksAll[0]) : 1;

  const yAxisTicksSvg = yTicksAll.map((t) => {
    const y = clampToPlotY(yScale(t));
    const label = (typeof fmtNiceNumber === "function")
      ? fmtNiceNumber(t, yStep)
      : String(t);

    return `
      <g>
        <text
          x="${(m.l - 8).toFixed(0)}"
          y="${(y + 4).toFixed(2)}"
          font-size="11"
          text-anchor="end"
          opacity="0.85"
        >${escAttr(label)}</text>

        <path
          d="M ${(m.l - 4).toFixed(2)} ${y.toFixed(2)} L ${m.l} ${y.toFixed(2)}"
          stroke="var(--border)"
          stroke-width="1"
          opacity="0.6"
          vector-effect="non-scaling-stroke"
        ></path>
      </g>
    `;
  }).join("");

  const xAxisTicksSvg = xTicksAll.map((t) => {
    const x = clampToPlotX(xScale(t));
    return `
      <g>
        <text
          x="${x.toFixed(2)}"
          y="${(H - m.b + 18).toFixed(2)}"
          font-size="11"
          text-anchor="middle"
          opacity="0.85"
        >${escAttr(String(t))}</text>

        <path
          d="M ${x.toFixed(2)} ${(H - m.b).toFixed(2)} L ${x.toFixed(2)} ${(H - m.b + 4).toFixed(2)}"
          stroke="var(--border)"
          stroke-width="1"
          opacity="0.6"
          vector-effect="non-scaling-stroke"
        ></path>
      </g>
    `;
  }).join("");

  // --- SVG final ---
  return `
    <svg class="disp-chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escAttr(title)}">
      <rect x="0" y="0" width="${W}" height="${H}" fill="transparent"></rect>

      <!-- title -->
      <text x="${m.l}" y="14" font-size="13" font-weight="600">${escAttr(title)}</text>

      <!-- plot box (delimitação completa) -->
      <rect
        x="${m.l}"
        y="${m.t}"
        width="${(W - m.l - m.r)}"
        height="${(H - m.t - m.b)}"
        fill="none"
        stroke="var(--border)"
        stroke-width="1"
        vector-effect="non-scaling-stroke"
      ></rect>

      <!-- gridlines -->
      ${yGridLinesSvg}
      ${xGridLinesSvg}
      ${yZeroLineSvg}

      <!-- axis ticks/labels -->
      ${yAxisTicksSvg}
      ${xAxisTicksSvg}

      <!-- axis labels -->
      <text x="${(W / 2).toFixed(0)}" y="${H - 10}" font-size="12" text-anchor="middle" opacity="0.85">${escAttr(xLabel)}</text>
      <text x="14" y="${(H / 2).toFixed(0)}" font-size="12" text-anchor="middle" opacity="0.85"
        transform="rotate(-90 14 ${(H / 2).toFixed(0)})">${escAttr(yLabel)}</text>

      <!-- series -->
      <path d="${d}" fill="none" stroke="var(--link)" stroke-width="2.2" opacity="0.9" vector-effect="non-scaling-stroke"></path>
      <g>${pointsSvg}</g>
    </svg>
  `;
}
