// ============================================================================
// Game Theory - Mixed Strategies
// ============================================================================

import { randomIntInclusive } from "../shared/utils.js";

const PLAYER_ONE_CLASS = "player-one";
const PLAYER_TWO_CLASS = "player-two";
const EPS = 1e-9;
const FRIENDLY_PROBABILITY_DENOMINATOR = 20;
const FRIENDLY_PROBABILITY_STEPS = Array.from({ length: 13 }, (_, index) => index + 4);

export const MIXED_GAME_SIZE_OPTIONS = [
  { id: "2x2", label: { en: "2x2 game", pt: "Jogo 2x2" } },
];

export const MIXED_GAME_PAYOFF_STYLE_OPTIONS = [
  {
    id: "parallel",
    label: { en: "With payoff parallelism", pt: "Com paralelismo de payoffs" },
  },
  {
    id: "independent",
    label: { en: "Without payoff parallelism", pt: "Sem paralelismo de payoffs" },
  },
];

function wrapPlayer(text, className) {
  return `<span class="${className}">${text}</span>`;
}

function buildMatrixHeader(texts) {
  const parts = String(texts.matrixHeader || "").split("|");
  if (parts.length === 2) {
    const left = parts[0].trim();
    const right = parts[1].trim();
    return `${wrapPlayer(left, PLAYER_ONE_CLASS)} | ${wrapPlayer(right, PLAYER_TWO_CLASS)}`;
  }
  return texts.matrixHeader || "";
}

function alphabetLabel(index) {
  let n = index;
  let label = "";
  while (n >= 0) {
    label = String.fromCharCode(65 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  }
  return label;
}

function buildStrategyLabels(count) {
  return Array.from({ length: count }, (_, i) => alphabetLabel(i));
}

function formatPayoffCell(rowPayoff, colPayoff, rowBest = false, colBest = false) {
  const rowClass = rowBest ? "payoff-row best-response" : "payoff-row";
  const colClass = colBest ? "payoff-col best-response" : "payoff-col";
  return `<span class="${rowClass}">${rowPayoff}</span>, <span class="${colClass}">${colPayoff}</span>`;
}

function buildTable(rowPayoffs, colPayoffs, rowStrategies, colStrategies, texts) {
  const rowLabels = rowStrategies.map((label) => wrapPlayer(label, PLAYER_ONE_CLASS));
  const colLabels = colStrategies.map((label) => wrapPlayer(label, PLAYER_TWO_CLASS));
  const headers = [buildMatrixHeader(texts), ...colLabels];
  const rows = rowStrategies.map((_, rowIndex) => {
    const payoffCells = colStrategies.map((__, colIndex) =>
      formatPayoffCell(rowPayoffs[rowIndex][colIndex], colPayoffs[rowIndex][colIndex])
    );
    return [rowLabels[rowIndex], ...payoffCells];
  });
  return { headers, rows };
}

function transposeMatrix(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function randomMatrix(size, rng, minVal = -10, maxVal = 16) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => randomIntInclusive(minVal, maxVal, rng))
  );
}

function pickFriendlyProbabilityStep(rng) {
  const index = randomIntInclusive(0, FRIENDLY_PROBABILITY_STEPS.length - 1, rng);
  return FRIENDLY_PROBABILITY_STEPS[index];
}

function buildFriendly2x2PayoffMatrix(probabilityStep, orientation, rng) {
  const firstGap = FRIENDLY_PROBABILITY_DENOMINATOR - probabilityStep;
  const secondGap = probabilityStep;
  const firstBase = randomIntInclusive(-4, 8, rng);
  const secondBase = randomIntInclusive(-4, 8, rng);

  if (orientation > 0) {
    return [
      [firstBase + firstGap, secondBase],
      [firstBase, secondBase + secondGap],
    ];
  }

  return [
    [firstBase, secondBase + secondGap],
    [firstBase + firstGap, secondBase],
  ];
}

function buildFriendly2x2PayoffPair(payoffStyleId, rng) {
  const qStep = pickFriendlyProbabilityStep(rng);
  const rowOrientation = rng() < 0.5 ? 1 : -1;
  const rowPayoffs = buildFriendly2x2PayoffMatrix(qStep, rowOrientation, rng);

  if (payoffStyleId === "parallel") {
    return { rowPayoffs, colPayoffs: transposeMatrix(rowPayoffs) };
  }

  const pStep = pickFriendlyProbabilityStep(rng);
  const colPayoffs = transposeMatrix(
    buildFriendly2x2PayoffMatrix(pStep, -rowOrientation, rng)
  );
  return { rowPayoffs, colPayoffs };
}

function solveLinearSystem(matrix, rhs) {
  const n = matrix.length;
  if (!Array.isArray(rhs) || rhs.length !== n) return null;
  const augmented = matrix.map((row, rowIndex) => [...row, rhs[rowIndex]]);
  for (let col = 0; col < n; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][col]) > Math.abs(augmented[pivot][col])) {
        pivot = row;
      }
    }
    if (Math.abs(augmented[pivot][col]) < EPS) return null;
    if (pivot !== col) {
      const temp = augmented[col];
      augmented[col] = augmented[pivot];
      augmented[pivot] = temp;
    }
    const pivotValue = augmented[col][col];
    for (let j = col; j <= n; j += 1) {
      augmented[col][j] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === col) continue;
      const factor = augmented[row][col];
      for (let j = col; j <= n; j += 1) {
        augmented[row][j] -= factor * augmented[col][j];
      }
    }
  }
  const solution = augmented.map((row) => row[n]);
  if (solution.some((value) => !Number.isFinite(value))) return null;
  return solution;
}

function dot(a, b) {
  return a.reduce((acc, value, idx) => acc + value * b[idx], 0);
}

function multiplyVectorMatrix(vector, matrix) {
  const cols = matrix[0].length;
  return Array.from({ length: cols }, (_, colIndex) =>
    vector.reduce((acc, value, rowIndex) => acc + value * matrix[rowIndex][colIndex], 0)
  );
}

function isInteriorProbabilityVector(values, minProb = 0.08, maxProb = 0.92) {
  if (!Array.isArray(values) || !values.length) return false;
  if (values.some((value) => !Number.isFinite(value))) return false;
  const sum = values.reduce((acc, value) => acc + value, 0);
  if (Math.abs(sum - 1) > 1e-6) return false;
  return values.every((value) => value > minProb && value < maxProb);
}

function vectorsClose(a, b, tolerance = 1e-7) {
  if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
  return a.every((value, idx) => Math.abs(value - b[idx]) <= tolerance);
}

function normalizeValue(value, digits = 8) {
  const rounded = Number(value.toFixed(digits));
  return Math.abs(rounded) < EPS ? 0 : rounded;
}

function computePureNashEquilibria(rowPayoffs, colPayoffs, rowStrategies, colStrategies) {
  const rows = rowStrategies.length;
  const cols = colStrategies.length;
  const rowBest = Array.from({ length: rows }, () => Array(cols).fill(false));
  const colBest = Array.from({ length: rows }, () => Array(cols).fill(false));

  for (let col = 0; col < cols; col += 1) {
    let best = -Infinity;
    for (let row = 0; row < rows; row += 1) {
      best = Math.max(best, rowPayoffs[row][col]);
    }
    for (let row = 0; row < rows; row += 1) {
      rowBest[row][col] = Math.abs(rowPayoffs[row][col] - best) < EPS;
    }
  }

  for (let row = 0; row < rows; row += 1) {
    let best = -Infinity;
    for (let col = 0; col < cols; col += 1) {
      best = Math.max(best, colPayoffs[row][col]);
    }
    for (let col = 0; col < cols; col += 1) {
      colBest[row][col] = Math.abs(colPayoffs[row][col] - best) < EPS;
    }
  }

  const pure = [];
  const cellClasses = Array.from({ length: rows }, () => Array(cols + 1).fill(""));
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (rowBest[row][col] && colBest[row][col]) {
        pure.push({
          rowIndex: row,
          colIndex: col,
          rowLabel: rowStrategies[row],
          colLabel: colStrategies[col],
        });
        cellClasses[row][col + 1] = "nash-cell";
      }
    }
  }
  return { pure, cellClasses, rowBest, colBest };
}

function solveMixed2x2(rowPayoffs, colPayoffs) {
  const a = rowPayoffs[0][0];
  const b = rowPayoffs[0][1];
  const c = rowPayoffs[1][0];
  const d = rowPayoffs[1][1];

  const qNumerator = d - b;
  const qDenominator = a - b - c + d;
  if (Math.abs(qDenominator) < EPS) return null;
  const q = qNumerator / qDenominator;
  if (!Number.isFinite(q)) return null;

  const e = colPayoffs[0][0];
  const f = colPayoffs[0][1];
  const g = colPayoffs[1][0];
  const h = colPayoffs[1][1];

  const pNumerator = h - g;
  const pDenominator = e - f - g + h;
  if (Math.abs(pDenominator) < EPS) return null;
  const p = pNumerator / pDenominator;
  if (!Number.isFinite(p)) return null;

  const rowMix = [normalizeValue(p), normalizeValue(1 - p)];
  const colMix = [normalizeValue(q), normalizeValue(1 - q)];

  const rowValues = [
    normalizeValue(q * a + (1 - q) * b),
    normalizeValue(q * c + (1 - q) * d),
  ];
  const colValues = [
    normalizeValue(p * e + (1 - p) * g),
    normalizeValue(p * f + (1 - p) * h),
  ];

  return {
    rowMix,
    colMix,
    rowValues,
    colValues,
    details: {
      p: { numerator: pNumerator, denominator: pDenominator, value: rowMix[0] },
      q: { numerator: qNumerator, denominator: qDenominator, value: colMix[0] },
    },
  };
}

function solveMixed3x3(rowPayoffs, colPayoffs) {
  const qMatrix = [
    [
      rowPayoffs[0][0] - rowPayoffs[1][0],
      rowPayoffs[0][1] - rowPayoffs[1][1],
      rowPayoffs[0][2] - rowPayoffs[1][2],
    ],
    [
      rowPayoffs[0][0] - rowPayoffs[2][0],
      rowPayoffs[0][1] - rowPayoffs[2][1],
      rowPayoffs[0][2] - rowPayoffs[2][2],
    ],
    [1, 1, 1],
  ];
  const q = solveLinearSystem(qMatrix, [0, 0, 1]);
  if (!q) return null;

  const pMatrix = [
    [
      colPayoffs[0][0] - colPayoffs[0][1],
      colPayoffs[1][0] - colPayoffs[1][1],
      colPayoffs[2][0] - colPayoffs[2][1],
    ],
    [
      colPayoffs[0][0] - colPayoffs[0][2],
      colPayoffs[1][0] - colPayoffs[1][2],
      colPayoffs[2][0] - colPayoffs[2][2],
    ],
    [1, 1, 1],
  ];
  const p = solveLinearSystem(pMatrix, [0, 0, 1]);
  if (!p) return null;

  const rowMix = p.map((value) => normalizeValue(value));
  const colMix = q.map((value) => normalizeValue(value));
  const rowValues = rowPayoffs.map((row) => normalizeValue(dot(row, colMix)));
  const colValues = multiplyVectorMatrix(rowMix, colPayoffs).map((value) =>
    normalizeValue(value)
  );

  return {
    rowMix,
    colMix,
    rowValues,
    colValues,
    details: {
      pSystem: { matrix: pMatrix, rhs: [0, 0, 1] },
      qSystem: { matrix: qMatrix, rhs: [0, 0, 1] },
    },
  };
}

function buildFallback2x2(parallel) {
  const rowPayoffs = [
    [2, 11],
    [14, 3],
  ];
  if (parallel) {
    return { rowPayoffs, colPayoffs: transposeMatrix(rowPayoffs) };
  }
  return {
    rowPayoffs,
    colPayoffs: [
      [9, 4],
      [1, 16],
    ],
  };
}

function buildFallback3x3(parallel) {
  const rowPayoffs = [
    [9, 1, 4],
    [3, 8, 2],
    [5, 0, 7],
  ];
  if (parallel) {
    return { rowPayoffs, colPayoffs: transposeMatrix(rowPayoffs) };
  }
  return {
    rowPayoffs,
    colPayoffs: [
      [6, 2, 9],
      [8, 5, 1],
      [3, 7, 4],
    ],
  };
}

function generatePayoffPair(size, payoffStyleId, rng) {
  if (size === 2) return buildFriendly2x2PayoffPair(payoffStyleId, rng);

  const parallel = payoffStyleId === "parallel";
  const rowPayoffs = randomMatrix(size, rng);
  const colPayoffs = parallel ? transposeMatrix(rowPayoffs) : randomMatrix(size, rng);
  return { rowPayoffs, colPayoffs };
}

function solveMixedBySize(size, rowPayoffs, colPayoffs) {
  if (size === 2) return solveMixed2x2(rowPayoffs, colPayoffs);
  return solveMixed3x3(rowPayoffs, colPayoffs);
}

function buildInstanceFromPayoffs({ size, sizeId, payoffStyleId, rowPayoffs, colPayoffs, texts }) {
  const rowStrategies = buildStrategyLabels(size);
  const colStrategies = buildStrategyLabels(size);
  const solution = solveMixedBySize(size, rowPayoffs, colPayoffs);
  if (!solution) return null;
  if (!isInteriorProbabilityVector(solution.rowMix)) return null;
  if (!isInteriorProbabilityVector(solution.colMix)) return null;
  if (payoffStyleId === "parallel" && !vectorsClose(solution.rowMix, solution.colMix, 1e-6)) {
    return null;
  }

  const table = buildTable(rowPayoffs, colPayoffs, rowStrategies, colStrategies, texts);
  const { pure, cellClasses, rowBest, colBest } = computePureNashEquilibria(
    rowPayoffs,
    colPayoffs,
    rowStrategies,
    colStrategies
  );

  return {
    size,
    sizeId,
    payoffStyleId,
    rowStrategies,
    colStrategies,
    rowPayoffs,
    colPayoffs,
    table,
    pureEquilibria: pure,
    bestResponses: { rowBest, colBest },
    solution,
    solutionCellClasses: cellClasses,
  };
}

export function buildMixedGameInstance({ sizeId, payoffStyleId, rng, texts }) {
  const size = sizeId === "3x3" ? 3 : 2;
  for (let attempt = 0; attempt < 25000; attempt += 1) {
    const { rowPayoffs, colPayoffs } = generatePayoffPair(size, payoffStyleId, rng);
    const instance = buildInstanceFromPayoffs({
      size,
      sizeId,
      payoffStyleId,
      rowPayoffs,
      colPayoffs,
      texts,
    });
    if (instance) return instance;
  }

  const fallback =
    size === 2 ? buildFallback2x2(payoffStyleId === "parallel") : buildFallback3x3(payoffStyleId === "parallel");
  return buildInstanceFromPayoffs({
    size,
    sizeId,
    payoffStyleId,
    rowPayoffs: fallback.rowPayoffs,
    colPayoffs: fallback.colPayoffs,
    texts,
  });
}

function formatNumber(value, digits = 4) {
  if (!Number.isFinite(value)) return String(value);
  const rounded = Number(value.toFixed(digits));
  if (Math.abs(rounded) < EPS) return "0";
  return rounded.toFixed(digits).replace(/\.?0+$/, "");
}

function formatProbabilityText(value) {
  return `${formatNumber(value * 100, 2)}%`;
}

function formatProbabilityLatex(value) {
  return `${formatNumber(value * 100, 2)}\\%`;
}

function formatProbabilityVectorLatex(values) {
  return `(${values.map((value) => formatProbabilityLatex(value)).join(",\\;")})`;
}

function formatPureEquilibria(instance, texts) {
  const pure = instance.pureEquilibria ?? [];
  if (!pure.length) return texts.pureEquilibriaNone;
  return pure.map((eq) => `(${eq.rowLabel}, ${eq.colLabel})`).join(", ");
}

function coeffTermLatex(coef, variable, isFirst = false) {
  const value = normalizeValue(coef, 6);
  const absValue = Math.abs(value);
  const absLabel = formatNumber(absValue, 3);
  const body = absLabel === "1" ? variable : `${absLabel}${variable}`;
  if (isFirst) return value < 0 ? `-${body}` : body;
  return value < 0 ? ` - ${body}` : ` + ${body}`;
}

function gcd(a, b) {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const next = x % y;
    x = y;
    y = next;
  }
  return x || 1;
}

function formatFractionLatex(numerator, denominator) {
  if (Math.abs(denominator) < EPS) return "";
  let top = Math.round(numerator);
  let bottom = Math.round(denominator);
  if (bottom < 0) {
    top *= -1;
    bottom *= -1;
  }
  const divisor = gcd(top, bottom);
  top /= divisor;
  bottom /= divisor;
  if (bottom === 1) return `${top}`;
  return `\\frac{${top}}{${bottom}}`;
}

function linearEquationLatex(coeffs, variables, rhsValue = 0) {
  let expression = "";
  let firstWritten = false;
  for (let index = 0; index < coeffs.length; index += 1) {
    const coef = normalizeValue(coeffs[index], 6);
    if (Math.abs(coef) < EPS) continue;
    expression += coeffTermLatex(coef, variables[index], !firstWritten);
    firstWritten = true;
  }
  if (!expression) expression = "0";
  return `${expression} = ${formatNumber(rhsValue, 3)}`;
}

function weightedPayoffTermLatex(coef, factor, isFirst = false) {
  const value = normalizeValue(coef, 6);
  const absLabel = formatNumber(Math.abs(value), 3);
  const body = `${absLabel}${factor}`;
  if (isFirst) return value < 0 ? `-${body}` : body;
  return value < 0 ? ` - ${body}` : ` + ${body}`;
}

function expectedPayoffLatex(firstPayoff, secondPayoff, variable) {
  const terms = [
    { coef: firstPayoff, factor: variable },
    { coef: secondPayoff, factor: `(1-${variable})` },
  ];
  let expression = "";
  let firstWritten = false;
  for (const term of terms) {
    if (Math.abs(term.coef) < EPS) continue;
    expression += weightedPayoffTermLatex(term.coef, term.factor, !firstWritten);
    firstWritten = true;
  }
  return expression || "0";
}

function linearExpectedExpressionLatex(firstPayoff, secondPayoff, variable) {
  const constant = normalizeValue(secondPayoff, 6);
  const slope = normalizeValue(firstPayoff - secondPayoff, 6);
  let expression = "";
  let firstWritten = false;

  if (Math.abs(constant) >= EPS) {
    expression += formatNumber(constant, 3);
    firstWritten = true;
  }
  if (Math.abs(slope) >= EPS) {
    expression += coeffTermLatex(slope, variable, !firstWritten);
    firstWritten = true;
  }
  return expression || "0";
}

function buildIndifferenceAlgebraLatex({
  firstPayoff,
  secondPayoff,
  thirdPayoff,
  fourthPayoff,
  variable,
  numerator,
  denominator,
  probability,
}) {
  return `
    <div class="exercises-katex-line">\\[ ${expectedPayoffLatex(
      firstPayoff,
      secondPayoff,
      variable
    )} = ${expectedPayoffLatex(thirdPayoff, fourthPayoff, variable)} \\]</div>
    <div class="exercises-katex-line">\\[ ${linearExpectedExpressionLatex(
      firstPayoff,
      secondPayoff,
      variable
    )} = ${linearExpectedExpressionLatex(thirdPayoff, fourthPayoff, variable)} \\]</div>
    <div class="exercises-katex-line">\\[ ${variable} = ${formatFractionLatex(
      numerator,
      denominator
    )} = ${formatProbabilityLatex(probability)} \\]</div>
  `;
}

function build2x2MixedSection(instance, texts) {
  const rows = instance.rowStrategies;
  const cols = instance.colStrategies;
  const a = instance.rowPayoffs[0][0];
  const b = instance.rowPayoffs[0][1];
  const c = instance.rowPayoffs[1][0];
  const d = instance.rowPayoffs[1][1];
  const e = instance.colPayoffs[0][0];
  const f = instance.colPayoffs[0][1];
  const g = instance.colPayoffs[1][0];
  const h = instance.colPayoffs[1][1];
  const p = instance.solution.rowMix[0];
  const q = instance.solution.colMix[0];
  const qDetails = instance.solution.details?.q;
  const pDetails = instance.solution.details?.p;

  const qBlock = `
    <p><strong>${texts.solveQTitle}</strong></p>
    <div class="exercises-explainer-math">
      <div class="exercises-katex-line">\\[ U_1(${rows[0]}) = ${expectedPayoffLatex(a, b, "q")} \\]</div>
      <div class="exercises-katex-line">\\[ U_1(${rows[1]}) = ${expectedPayoffLatex(c, d, "q")} \\]</div>
      <div class="exercises-katex-line">\\[ U_1(${rows[0]}) = U_1(${rows[1]}) \\]</div>
      ${buildIndifferenceAlgebraLatex({
        firstPayoff: a,
        secondPayoff: b,
        thirdPayoff: c,
        fourthPayoff: d,
        variable: "q",
        numerator: qDetails?.numerator ?? d - b,
        denominator: qDetails?.denominator ?? a - b - c + d,
        probability: q,
      })}
    </div>
  `;

  const pBlock = `
    <p><strong>${texts.solvePTitle}</strong></p>
    <div class="exercises-explainer-math">
      <div class="exercises-katex-line">\\[ U_2(${cols[0]}) = ${expectedPayoffLatex(e, g, "p")} \\]</div>
      <div class="exercises-katex-line">\\[ U_2(${cols[1]}) = ${expectedPayoffLatex(f, h, "p")} \\]</div>
      <div class="exercises-katex-line">\\[ U_2(${cols[0]}) = U_2(${cols[1]}) \\]</div>
      ${buildIndifferenceAlgebraLatex({
        firstPayoff: e,
        secondPayoff: g,
        thirdPayoff: f,
        fourthPayoff: h,
        variable: "p",
        numerator: pDetails?.numerator ?? h - g,
        denominator: pDetails?.denominator ?? e - f - g + h,
        probability: p,
      })}
    </div>
  `;

  if (instance.payoffStyleId === "parallel") {
    return `
      ${qBlock}
      <p>${texts.parallelInference2x2.replace("{q}", formatProbabilityText(q))}</p>
      <div class="exercises-explainer-math">
        <div class="exercises-katex-line">\\[ p = q = ${formatProbabilityLatex(q)} \\]</div>
      </div>
    `;
  }

  return `${qBlock}${pBlock}`;
}

function build3x3MixedSection(instance, texts) {
  const qSystem = instance.solution.details?.qSystem;
  const pSystem = instance.solution.details?.pSystem;
  const q = instance.solution.colMix;
  const p = instance.solution.rowMix;

  const qLines = qSystem
    ? qSystem.matrix.map((coeffs, index) =>
        `<div class="exercises-katex-line">\\[ ${linearEquationLatex(
          coeffs,
          ["q_1", "q_2", "q_3"],
          qSystem.rhs[index]
        )} \\]</div>`
      )
    : "";

  const pLines = pSystem
    ? pSystem.matrix.map((coeffs, index) =>
        `<div class="exercises-katex-line">\\[ ${linearEquationLatex(
          coeffs,
          ["p_1", "p_2", "p_3"],
          pSystem.rhs[index]
        )} \\]</div>`
      )
    : "";

  const qBlock = `
    <p><strong>${texts.solveQTitle}</strong></p>
    <div class="exercises-explainer-math">
      ${qLines}
      <div class="exercises-katex-line">\\[ (q_1,q_2,q_3) = ${formatProbabilityVectorLatex(q)} \\]</div>
    </div>
  `;

  if (instance.payoffStyleId === "parallel") {
    return `
      ${qBlock}
      <p>${texts.parallelInference3x3}</p>
      <div class="exercises-explainer-math">
        <div class="exercises-katex-line">\\[ (p_1,p_2,p_3) = (q_1,q_2,q_3) = ${formatProbabilityVectorLatex(
          q
        )} \\]</div>
      </div>
    `;
  }

  return `
    ${qBlock}
    <p><strong>${texts.solvePTitle}</strong></p>
    <div class="exercises-explainer-math">
      ${pLines}
      <div class="exercises-katex-line">\\[ (p_1,p_2,p_3) = ${formatProbabilityVectorLatex(p)} \\]</div>
    </div>
  `;
}

export function describeMixedGameProblem(instance, texts) {
  return `
    <h2 class="exercises-section-title">${texts.problemTitle}</h2>
    <p class="exercises-lead"><b>${texts.problemLead}</b></p>
  `;
}

export function buildMixedGameExplainerBody(instance, texts) {
  const steps = (instance.size === 2 ? texts.explainerSteps2x2 : texts.explainerSteps3x3)
    .map((step) => `<li>${step}</li>`)
    .join("");

  return `
    <p>${texts.explainerIntro}</p>
    <p><b>${texts.stepsLabel}:</b></p>
    <ol>${steps}</ol>
    <p>${texts.explainerStyleHint}</p>
  `;
}

function buildMixedEquilibriumLatex(instance) {
  return `\\sigma_1 = ${formatProbabilityVectorLatex(
    instance.solution.rowMix
  )},\\;\\sigma_2 = ${formatProbabilityVectorLatex(instance.solution.colMix)}`;
}

export function buildMixedGameSummaryCard(instance, texts) {
  const pureText = formatPureEquilibria(instance, texts);

  return `
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${texts.solutionSummaryTitle}</h3>
      <hr class="exercises-solution-divider" />
      <p><b>${texts.pureEquilibriaLabel}:</b> ${pureText}</p>
      <div class="exercises-solution-gap"></div>
      <p><b>${texts.mixedEquilibriumLabel}:</b> \\( ${buildMixedEquilibriumLatex(instance)} \\)</p>
    </div>
  `;
}

export function buildMixedGameCalculationCard(instance, texts) {
  const mixedSection =
    instance.size === 2
      ? build2x2MixedSection(instance, texts)
      : build3x3MixedSection(instance, texts);

  return `
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${texts.calculationBoxTitle}</h3>
      <hr class="exercises-solution-divider" />
      ${mixedSection}
      <div class="exercises-explainer-math">
        <div class="exercises-katex-line">\\[ ${buildMixedEquilibriumLatex(instance)} \\]</div>
      </div>
    </div>
  `;
}

export function buildMixedGameSolutionTable(instance) {
  const headers = instance.table.headers;
  const rows = instance.rowStrategies.map((rowLabel, rowIndex) => {
    const payoffCells = instance.colStrategies.map((_, colIndex) =>
      formatPayoffCell(
        instance.rowPayoffs[rowIndex][colIndex],
        instance.colPayoffs[rowIndex][colIndex],
        instance.bestResponses?.rowBest?.[rowIndex]?.[colIndex],
        instance.bestResponses?.colBest?.[rowIndex]?.[colIndex]
      )
    );
    return [wrapPlayer(rowLabel, PLAYER_ONE_CLASS), ...payoffCells];
  });

  return {
    table: { headers, rows },
    cellClasses: instance.solutionCellClasses,
  };
}

export function buildGameMixedTexts(lang) {
  const isEn = lang === "en";
  const sizeOptions = MIXED_GAME_SIZE_OPTIONS.map((option) => ({
    value: option.id,
    title: option.label?.[lang] ?? option.id,
    description: isEn
      ? "Two strategies for each player. Solve with one indifference equation for each player."
      : "Duas estratégias para cada jogador. Resolva com uma equação de indiferença para cada jogador.",
  }));

  const payoffStyleOptions = MIXED_GAME_PAYOFF_STYLE_OPTIONS.map((option) => ({
    value: option.id,
    title: option.label?.[lang] ?? option.id,
    description:
      option.id === "parallel"
        ? isEn
          ? "Both players share the same payoff structure (symmetric), so one mixed distribution determines the other."
          : "Os jogadores têm a mesma estrutura de payoffs (simétrica), então uma distribuição mista determina a outra."
        : isEn
          ? "Each player has its own payoff structure. Compute both mixed distributions separately."
          : "Cada jogador possui sua própria estrutura de payoffs. Calcule separadamente as duas distribuições mistas.",
  }));

  return {
    title: isEn ? "Game theory: mixed strategies" : "Teoria dos jogos: estratégias mistas",
    sidebarTitle: isEn ? "Mixed-strategy parameters" : "Parâmetros do exercício",
    matrixSizeTitle: isEn ? "Exercise format" : "Formato do exercício",
    payoffStyleTitle: isEn ? "Payoff parallelism" : "Paralelismo de payoffs",
    matrixSizeOptions: sizeOptions,
    payoffStyleOptions,
    generateTab: isEn ? "🚀 Generate game" : "🚀 Gerar jogo",
    generate: isEn ? "Generate game" : "Gerar jogo",
    exerciseIntro: isEn
      ? "Generate the game to start the exercise."
      : "Gere o jogo para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the game to see its solution here."
      : "Gere o jogo para visualizar sua solução aqui.",
    problemTitle: isEn ? "Problem" : "Problema",
    problemLead: isEn
      ? "Find the pure-strategy Nash equilibria of the following simultaneous game (if any) and the mixed-strategy equilibrium."
      : "Encontre os equilíbrios de Nash em estratégias puras do jogo simultâneo a seguir (se existirem) e o equilíbrio em estratégias mistas.",
    problemConfig: isEn
      ? "Configuration: {size}; {payoffStyle}."
      : "Configuração: {size}; {payoffStyle}.",
    parallelStatement: isEn
      ? "Because payoffs are parallel, one mixed distribution determines the other."
      : "Como os payoffs são paralelos, uma distribuição mista determina a outra.",
    independentStatement: isEn
      ? "Because payoffs are not parallel, compute each player’s mixed distribution separately."
      : "Como os payoffs não são paralelos, calcule separadamente a distribuição mista de cada jogador.",
    payoffNote: isEn
      ? "Payoffs are shown as (Player 1, Player 2)."
      : "Os payoffs estão no formato (Jogador 1, Jogador 2).",
    matrixHeader: isEn ? "P1 | P2" : "J1 | J2",
    explainerTitle: isEn
      ? "How to solve mixed-strategy equilibria"
      : "Como resolver equilíbrios em estratégias mistas",
    explainerIntro: isEn
      ? "A mixed-strategy equilibrium is found by choosing probabilities that make the opponent indifferent among their pure strategies. Thus, to find the equilibrium, we must equalize the expected values of the opponent's pure actions, using the fact that probabilities must necessarily sum to 1."
      : "Um equilíbrio em estratégias mistas é obtido escolhendo probabilidades que tornam o oponente indiferente entre as suas estratégias puras. Assim, para encontrar o equilíbrio, precisamos igualar os valores esperados das jogadas puras do oponente, usando o fato de que as probabilidades devem necessariamente somar 1.",
    explainerLogic: isEn
      ? "Equal expected payoffs of the opponent’s pure strategies and use that probabilities sum to 1."
      : "Iguale os valores esperados das jogadas puras do oponente e use o fato de que as probabilidades somam 1.",
    logicLabel: isEn ? "Logic" : "Lógica",
    stepsLabel: isEn ? "Steps" : "Passos",
    explainerSteps2x2: isEn
      ? [
          "Let Player 1 combine their strategies (rows) with probabilities p and 1-p, respectively, and Player 2 combine their strategies (columns) with probabilities q and 1-q, respectively.",
          "Find the value of q that makes Player 1 indifferent between their strategies (rows): that is, the value of q that equalizes the expected value of Player 1's choices.",
          "Find p by making Player 2 indifferent between their strategies (columns): that is, the value of p that equalizes the expected value of Player 2's choices.",
          "Report the mixed equilibrium and check pure equilibria separately, when they exist.",
        ]
      : [
          "Defina que o Jogador 1 combina as suas estratégias (linhas) com probabilidades p e 1-p, respectivamente, e que o Jogador 2 combina as suas estratégias (colunas) com probabilidades q e 1-q, respectivamente.",
          "Encontre o valor de q que torna o Jogador 1 indiferente entre suas estratégias (linhas): ou seja, o valor de q que iguala o valor esperado das escolhas do Jogador 1.",
          "Encontre p tornando o Jogador 2 indiferente entre suas estratégias (colunas): ou seja, o valor de p que iguala o valor esperado das escolhas do Jogador 2.",
          "Informe o equilíbrio misto e verifique separadamente os equilíbrios puros, quando existirem.",
        ],
    explainerSteps3x3: isEn
      ? [
          "Let Player 1 use (p1,p2,p3) and Player 2 use (q1,q2,q3).",
          "Find q by imposing U1(row1)=U1(row2), U1(row1)=U1(row3), and q1+q2+q3=1.",
          "Find p by imposing U2(col1)=U2(col2), U2(col1)=U2(col3), and p1+p2+p3=1.",
          "List pure equilibria (if any) and the mixed equilibrium.",
        ]
      : [
          "Defina que o Jogador 1 usa (p1,p2,p3) e o Jogador 2 usa (q1,q2,q3).",
          "Encontre q impondo U1(linha1)=U1(linha2), U1(linha1)=U1(linha3) e q1+q2+q3=1.",
          "Encontre p impondo U2(coluna1)=U2(coluna2), U2(coluna1)=U2(coluna3) e p1+p2+p3=1.",
          "Liste os equilíbrios puros (se houver) e o equilíbrio misto.",
        ],
    explainerParallelHint: isEn
      ? "In the parallel-payoff mode, once one distribution is found, the other follows by payoff parallelism."
      : "No modo com paralelismo de payoffs, após encontrar uma distribuição, a outra decorre do paralelismo.",
    explainerIndependentHint: isEn
      ? "In the non-parallel mode, both distributions must be solved independently."
      : "No modo sem paralelismo de payoffs, as duas distribuições devem ser resolvidas de forma independente.",
    explainerStyleHint: isEn
      ? "In games with payoff parallelism, when we solve the problem for one player, we are already solving it for the other player as well. In the mode without payoff parallelism, by contrast, the two distributions must be solved independently."
      : "Em jogos com paralelismo de payoffs, ao resolvermos o problema para um jogador, já estaremos resolvendo para o outro jogador também. No modo sem paralelismo de payoffs, em contrapartida, as duas distribuições devem ser resolvidas de forma independente.",
    solutionSummaryTitle: isEn ? "Solution" : "Solução",
    calculationBoxTitle: isEn
      ? "Mixed-strategy equilibrium calculation"
      : "Cálculo do equilíbrio em estratégias mistas",
    pureEquilibriaLabel: isEn
      ? "Pure-strategy Nash equilibria"
      : "Equilíbrios de Nash em estratégias puras",
    pureEquilibriaNone: isEn
      ? "No pure-strategy Nash equilibrium found."
      : "Nenhum equilíbrio de Nash em estratégias puras foi encontrado.",
    mixedEquilibriumLabel: isEn
      ? "Mixed-strategy equilibrium"
      : "Equilíbrio em estratégias mistas",
    exerciseTasksTitle: isEn ? "What to solve" : "O que resolver",
    exerciseTasks: isEn
      ? [
          "Check whether the payoff matrix has pure-strategy Nash equilibria.",
          "Let p be the probability that Player 1 chooses the first row and q the probability that Player 2 chooses the first column.",
          "Find q by making Player 1 indifferent between the two rows.",
          "Find p by making Player 2 indifferent between the two columns.",
        ]
      : [
          "Verifique se a matriz de payoffs possui equilíbrios de Nash em estratégias puras.",
          "Defina p como a probabilidade de o Jogador 1 escolher a primeira linha e q como a probabilidade de o Jogador 2 escolher a primeira coluna.",
          "Encontre q tornando o Jogador 1 indiferente entre as duas linhas.",
          "Encontre p tornando o Jogador 2 indiferente entre as duas colunas.",
        ],
    solveQTitle: isEn
      ? "Find Player 2 probabilities (q) by making Player 1 indifferent"
      : "Encontre as probabilidades do Jogador 2 (q) tornando o Jogador 1 indiferente",
    solvePTitle: isEn
      ? "Find Player 1 probabilities (p) by making Player 2 indifferent"
      : "Encontre as probabilidades do Jogador 1 (p) tornando o Jogador 2 indiferente",
    parallelInference2x2: isEn
      ? "By payoff parallelism, Player 1 and Player 2 use the same support distribution, so p = q = {q}."
      : "Pelo paralelismo de payoffs, os dois jogadores usam a mesma distribuição de suporte, então p = q = {q}.",
    parallelInference3x3: isEn
      ? "By payoff parallelism, Player 1 and Player 2 share the same mixed distribution."
      : "Pelo paralelismo de payoffs, o Jogador 1 e o Jogador 2 compartilham a mesma distribuição mista.",
    solutionLegend: isEn
      ? "Bold and underlined values indicate each player's best responses. Highlighted cells indicate pure-strategy Nash equilibria (if any)."
      : "Valores sublinhados e em negrito indicam as melhores respostas de cada jogador. As células destacadas indicam equilíbrios de Nash em estratégias puras (se houver).",
    solutionMatrixTitle: isEn
      ? "Payoff matrix with pure equilibria highlighted"
      : "Matriz de payoffs com equilíbrios puros destacados",
  };
}
