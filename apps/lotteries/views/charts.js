// apps/lotteries/views/charts.js
// Cleaner, larger SVG charts (responsive width, plot box, axis labels).

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function niceTicks(max, count = 5) {
  // ticks from 0..max (inclusive), count+1 points
  const out = [];
  if (!(max > 0)) return [0, 0.25, 0.5, 0.75, 1];
  for (let i = 0; i <= count; i += 1) out.push((max * i) / count);
  return out;
}

function fmtPct(p) {
  return `${Math.round(p * 100)}%`;
}

export function renderDistributionBarsSVG(bars, { title, xLabel, yLabel }) {
  // Wider + taller
  const W = 980;
  const H = 360;

  // More top padding to avoid any overlap between title and chart
  const pad = { l: 72, r: 26, t: 72, b: 64 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const maxP = Math.max(1e-9, ...bars.map((b) => b.prob));
  const ticks = niceTicks(maxP, 5);

  const x0 = pad.l;
  const y0 = pad.t;
  const plotW = innerW;
  const plotH = innerH;

  const y = (p) => y0 + plotH - (p / maxP) * plotH;

  // Bars (simple rectangles, no rounded corners, no shadows)
  const gap = 10;
  const barW = bars.length ? (plotW - gap * (bars.length - 1)) / bars.length : plotW;

  const rects = bars
    .map((b, i) => {
      const x = x0 + i * (barW + gap);
      const yTop = y(b.prob);
      const h = y0 + plotH - yTop;

      return `
        <rect x="${x}" y="${yTop}" width="${Math.max(2, barW)}" height="${Math.max(0, h)}"
              fill="var(--bg)" opacity="0.90" />
        <text x="${x + barW / 2}" y="${y0 + plotH + 22}" text-anchor="middle"
              font-size="12" fill="rgba(15,23,42,.85)">${esc(b.valueLabel)}</text>
      `;
    })
    .join("");

  // Tick grid + labels (more separations on y)
  const grid = ticks
    .map((t) => {
      const yy = y(t);
      return `
        <line x1="${x0}" y1="${yy}" x2="${x0 + plotW}" y2="${yy}"
              stroke="rgba(15,23,42,.12)" />
        <text x="${x0 - 12}" y="${yy + 4}" text-anchor="end"
              font-size="12" fill="rgba(15,23,42,.75)">${fmtPct(t)}</text>
      `;
    })
    .join("");

  // Plot box (thin)
  const box = `
    <rect x="${x0}" y="${y0}" width="${plotW}" height="${plotH}"
          fill="none" stroke="rgba(15,23,42,.55)" stroke-width="1" />
  `;

  // Axis labels
  const labels = `
    <text x="${x0 + plotW / 2}" y="${H - 18}" text-anchor="middle"
          font-size="13" font-weight="700" fill="rgba(15,23,42,.85)">${esc(xLabel || "Payoff")}</text>

    <text x="18" y="${y0 + plotH / 2}" text-anchor="middle"
          font-size="13" font-weight="700" fill="rgba(15,23,42,.85)"
          transform="rotate(-90 18 ${y0 + plotH / 2})">${esc(yLabel || "Probability")}</text>
  `;

  // Title (bigger)
  const titleBlock = `
    <text x="${pad.l}" y="36" font-size="18" font-weight="850" fill="rgba(15,23,42,.95)">
      ${esc(title)}
    </text>
  `;

  return `
    <svg class="lotteries-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet">
      ${titleBlock}
      ${grid}
      ${box}
      ${rects}
      ${labels}
    </svg>
  `;
}

export function renderExpectedValueSVG(ev, sd, { title, xTickLabel }) {
  const W = 980;
  const H = 300;

  const pad = { l: 72, r: 26, t: 72, b: 64 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const x0 = pad.l;
  const y0 = pad.t;
  const plotW = innerW;
  const plotH = innerH;

  // Plot range: μ ± 2σ (fallback span if σ=0)
  const span = Math.max(1e-9, 2 * sd);
  const yMin = ev - span;
  const yMax = ev + span;

  const y = (v) => {
    const t = (v - yMin) / (yMax - yMin);
    return y0 + plotH - t * plotH;
  };

  // Single "lane" x position (the tick + vertical guide)
  const cx = x0 + plotW * 0.25;

  const yEv = y(ev);
  const yLo = y(ev - sd);
  const yHi = y(ev + sd);

  const faint = "rgba(15,23,42,.10)";
  const axisTickStroke = "rgba(15,23,42,.45)";
  const axisLabelFill = "rgba(15,23,42,.78)";
  const boxStroke = "rgba(15,23,42,.55)";

  // Plot box
  const box = `
    <rect x="${x0}" y="${y0}" width="${plotW}" height="${plotH}"
          fill="none" stroke="${boxStroke}" stroke-width="1" />
  `;

  // Y-axis ticks at [min, μ-σ, μ, μ+σ, max], labels always with 1 decimal
  const tickVals = [yMin, ev - sd, ev, ev + sd, yMax];

  // Build tick objects, remove near-duplicates (e.g., sd extremely small)
  const ticks = [];
  for (const v of tickVals) {
    const yy = y(v);
    if (ticks.length && Math.abs(v - ticks[ticks.length - 1].v) <= 1e-9) continue;
    ticks.push({ v, yy, label: Number(v).toFixed(1) });
  }

  // Horizontal guides + y-axis tick marks + labels
  const gridAndLabels = ticks
    .map(
      (t) => `
        <!-- horizontal guide -->
        <line x1="${x0}" y1="${t.yy}" x2="${x0 + plotW}" y2="${t.yy}" stroke="${faint}" />

        <!-- y-axis tick -->
        <line x1="${x0 - 6}" y1="${t.yy}" x2="${x0}" y2="${t.yy}" stroke="${axisTickStroke}" />

        <!-- y-axis label -->
        <text x="${x0 - 12}" y="${t.yy + 4}" text-anchor="end"
              font-size="12" fill="${axisLabelFill}">${esc(t.label)}</text>
      `
    )
    .join("");

  // Vertical guide at x tick (same faint style as other guides)
  const vGuide = `
    <line x1="${cx}" y1="${y0}" x2="${cx}" y2="${y0 + plotH}" stroke="${faint}" />
  `;

  // Whiskers + dot (same color)
  const col = "rgb(220,38,38)";
  const mark = `
    <line x1="${cx}" y1="${yLo}" x2="${cx}" y2="${yHi}" stroke="${col}" stroke-width="3" />
    <line x1="${cx - 18}" y1="${yLo}" x2="${cx + 18}" y2="${yLo}" stroke="${col}" stroke-width="3" />
    <line x1="${cx - 18}" y1="${yHi}" x2="${cx + 18}" y2="${yHi}" stroke="${col}" stroke-width="3" />
    <circle cx="${cx}" cy="${yEv}" r="7" fill="${col}" />
  `;

  // Bold label μ/σ (1 decimal everywhere)
  const legend = `
    <text x="${cx + 28}" y="${yEv + 4}" font-size="13" font-weight="850" fill="rgba(15,23,42,.88)">
      μ=${esc(Number(ev).toFixed(1))}, σ=${esc(Number(sd).toFixed(1))}
    </text>
  `;

  // X-axis tick + label + (already have vertical guide)
  const xTick = `
    <line x1="${cx}" y1="${y0 + plotH}" x2="${cx}" y2="${y0 + plotH + 8}" stroke="${axisTickStroke}" />
    <text x="${cx}" y="${y0 + plotH + 26}" text-anchor="middle"
          font-size="12" font-weight="700" fill="rgba(15,23,42,.80)">
      ${esc(xTickLabel || "")}
    </text>
  `;

  // Title (bigger)
  const titleBlock = `
    <text x="${pad.l}" y="36" font-size="18" font-weight="850" fill="rgba(15,23,42,.95)">
      ${esc(title)}
    </text>
  `;

  return `
    <svg class="lotteries-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(title)}" preserveAspectRatio="xMidYMid meet">
      ${titleBlock}
      ${box}
      ${gridAndLabels}
      ${vGuide}
      ${mark}
      ${legend}
      ${xTick}
    </svg>
  `;
}
