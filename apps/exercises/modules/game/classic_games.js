// ============================================================================
// Game Theory - Classic Games
// ============================================================================

import { randomIntInclusive } from "../shared/utils.js";

export const CLASSIC_GAME_TYPES = [
  {
    id: "prisoners_dilemma",
    label: { en: "Prisoner’s dilemma", pt: "Dilema dos Prisioneiros" },
  },
  {
    id: "pure_coordination",
    label: { en: "Pure coordination", pt: "Jogo de Coordenação Pura" },
  },
  {
    id: "stag_hunt",
    label: { en: "Stag hunt", pt: "Jogo da Caça ao Veado" },
  },
  {
    id: "battle_of_the_sexes",
    label: { en: "Battle of the sexes", pt: "Jogo da Batalha dos Sexos" },
  },
  {
    id: "hawk_dove",
    label: { en: "Hawk–dove (chicken)", pt: "Jogo dos Gaviões e dos Pombos (Galinha)" },
  },
  {
    id: "none",
    label: { en: "None of the classic games", pt: "Nenhum dos jogos clássicos" },
  },
];

export const CLASSIC_GAME_SELECT_OPTIONS = [
  { id: "test", label: { en: "Test (random type)", pt: "Teste (tipo aleatório)" } },
  ...CLASSIC_GAME_TYPES,
];

export const PAYOFF_STYLE_OPTIONS = [
  {
    id: "shared_offset",
    label: { en: "With payoff parallelism", pt: "Com paralelismo de payoffs" },
  },
  {
    id: "independent",
    label: { en: "Without payoff parallelism", pt: "Sem paralelismo de payoffs" },
  },
];

const PLAYER_ONE_CLASS = "player-one";
const PLAYER_TWO_CLASS = "player-two";

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

function formatPayoffCell(rowPayoff, colPayoff) {
  return `<span class="payoff-row">${rowPayoff}</span>, <span class="payoff-col">${colPayoff}</span>`;
}

function clonePayoffs(payoffs) {
  return payoffs.map((row) => row.map((cell) => ({ row: cell.row, col: cell.col })));
}

function swapRows(payoffs) {
  return [payoffs[1], payoffs[0]];
}

function swapCols(payoffs) {
  return payoffs.map((row) => [row[1], row[0]]);
}

function swapPlayers(payoffs) {
  return [
    [
      { row: payoffs[0][0].col, col: payoffs[0][0].row },
      { row: payoffs[1][0].col, col: payoffs[1][0].row },
    ],
    [
      { row: payoffs[0][1].col, col: payoffs[0][1].row },
      { row: payoffs[1][1].col, col: payoffs[1][1].row },
    ],
  ];
}

function applyRandomPresentationTransforms(payoffs, rng) {
  let matrix = clonePayoffs(payoffs);
  if (rng() < 0.5) matrix = swapRows(matrix);
  if (rng() < 0.5) matrix = swapCols(matrix);
  if (rng() < 0.5) matrix = swapPlayers(matrix);
  return matrix;
}

function applyAffineTransforms(payoffs, rng, options = {}) {
  const scale1 = randomIntInclusive(1, 6, rng);
  const scale2 = randomIntInclusive(1, 6, rng);
  const sharedOffset = options.offsetMode === "shared";
  const offset = sharedOffset ? randomIntInclusive(-6, 12, rng) : 0;
  const offset1 = sharedOffset ? offset : randomIntInclusive(-6, 12, rng);
  const offset2 = sharedOffset ? offset : randomIntInclusive(-6, 12, rng);

  return payoffs.map((row) =>
    row.map((cell) => ({
      row: cell.row * scale1 + offset1,
      col: cell.col * scale2 + offset2,
    }))
  );
}

function buildBasePayoffs(typeId) {
  if (typeId === "prisoners_dilemma") {
    return [
      [
        { row: 3, col: 3 },
        { row: 0, col: 5 },
      ],
      [
        { row: 5, col: 0 },
        { row: 1, col: 1 },
      ],
    ];
  }

  if (typeId === "stag_hunt") {
    return [
      [
        { row: 4, col: 4 },
        { row: 0, col: 3 },
      ],
      [
        { row: 3, col: 0 },
        { row: 3, col: 3 },
      ],
    ];
  }

  if (typeId === "hawk_dove") {
    return [
      [
        { row: 0, col: 0 },
        { row: 4, col: 1 },
      ],
      [
        { row: 1, col: 4 },
        { row: 3, col: 3 },
      ],
    ];
  }

  if (typeId === "battle_of_the_sexes") {
    return [
      [
        { row: 2, col: 1 },
        { row: 0, col: -1 },
      ],
      [
        { row: -1, col: -2 },
        { row: 1, col: 2 },
      ],
    ];
  }

  if (typeId === "pure_coordination") {
    return [
      [
        { row: 1, col: 1 },
        { row: 0, col: 0 },
      ],
      [
        { row: 0, col: 0 },
        { row: 1, col: 1 },
      ],
    ];
  }

  // "None": matching pennies (no pure-strategy Nash equilibrium).
  return [
    [
      { row: 1, col: -1 },
      { row: -1, col: 1 },
    ],
    [
      { row: -1, col: 1 },
      { row: 1, col: -1 },
    ],
  ];
}

function buildPureCoordinationParallelPayoffs(rng) {
  const low = randomIntInclusive(-5, 5, rng);
  const high = low + randomIntInclusive(2, 12, rng);
  return [
    [
      { row: high, col: high },
      { row: low, col: low },
    ],
    [
      { row: low, col: low },
      { row: high, col: high },
    ],
  ];
}

function buildPrisonersDilemmaParallelPayoffs(rng) {
  const [wc, db, po, tb] = sampleIncreasingValues(4, rng, {
    startMin: -6,
    startMax: 6,
    minGap: 1,
    maxGap: 6,
  });

  return [
    [
      // C, C → PO, PO
      { row: po, col: po },
      // C, T → WC, TB
      { row: wc, col: tb },
    ],
    [
      // T, C → TB, WC
      { row: tb, col: wc },
      // T, T → DB, DB
      { row: db, col: db },
    ],
  ];
}

function buildBattleOfTheSexesParallelPayoffs(rng) {
  const v4 = randomIntInclusive(-6, 6, rng);
  const v3 = v4 + randomIntInclusive(1, 6, rng);
  const v2 = v3 + randomIntInclusive(1, 6, rng);
  const v1 = v2 + randomIntInclusive(1, 6, rng);

  return [
    [
      { row: v1, col: v2 },
      { row: v3, col: v3 },
    ],
    [
      { row: v4, col: v4 },
      { row: v2, col: v1 },
    ],
  ];
}

function buildStagHuntParallelPayoffs(rng) {
  const v3 = randomIntInclusive(-6, 6, rng);
  const v2 = v3 + randomIntInclusive(1, 6, rng);
  const v1 = v2 + randomIntInclusive(1, 6, rng);

  return [
    [
      { row: v1, col: v1 },
      { row: v3, col: v2 },
    ],
    [
      { row: v2, col: v3 },
      { row: v2, col: v2 },
    ],
  ];
}

function buildHawkDoveParallelPayoffs(rng) {
  const v3 = randomIntInclusive(-6, 6, rng);
  const v4 = v3 + randomIntInclusive(6, 18, rng);
  const v2 = v4 + randomIntInclusive(1, 6, rng);
  const v1 = v2 + randomIntInclusive(1, 6, rng);

  return [
    [
      { row: v3, col: v3 },
      { row: v1, col: v4 },
    ],
    [
      { row: v4, col: v1 },
      { row: v2, col: v2 },
    ],
  ];
}

function sampleIncreasingValues(count, rng, options = {}) {
  const startMin = Number.isFinite(options.startMin) ? options.startMin : -3;
  const startMax = Number.isFinite(options.startMax) ? options.startMax : 3;
  const minGap = Number.isFinite(options.minGap) ? options.minGap : 1;
  const maxGap = Number.isFinite(options.maxGap) ? options.maxGap : 6;

  let current = randomIntInclusive(startMin, startMax, rng);
  const values = [current];
  for (let i = 1; i < count; i += 1) {
    current += randomIntInclusive(minGap, maxGap, rng);
    values.push(current);
  }
  return values;
}

function buildNoneBasePayoffs(rng) {
  const variant = randomIntInclusive(0, 2, rng);

  if (variant === 0) {
    const [p1_10, p1_01, p1_11, p1_00] = sampleIncreasingValues(4, rng);
    const [p2_11, p2_00, p2_10, p2_01] = sampleIncreasingValues(4, rng);
    return [
      [
        { row: p1_00, col: p2_00 },
        { row: p1_01, col: p2_01 },
      ],
      [
        { row: p1_10, col: p2_10 },
        { row: p1_11, col: p2_11 },
      ],
    ];
  }

  if (variant === 1) {
    const [p1_11, p1_10, p1_01, p1_00] = sampleIncreasingValues(4, rng);
    const [p2_10, p2_01, p2_11, p2_00] = sampleIncreasingValues(4, rng);
    return [
      [
        { row: p1_00, col: p2_00 },
        { row: p1_01, col: p2_01 },
      ],
      [
        { row: p1_10, col: p2_10 },
        { row: p1_11, col: p2_11 },
      ],
    ];
  }

  const [p1_10, p1_01, p1_11, p1_00] = sampleIncreasingValues(4, rng);
  const [p2_01, p2_10, p2_11, p2_00] = sampleIncreasingValues(4, rng);
  return [
    [
      { row: p1_00, col: p2_00 },
      { row: p1_01, col: p2_01 },
    ],
    [
      { row: p1_10, col: p2_10 },
      { row: p1_11, col: p2_11 },
    ],
  ];
}

function computePureNashEquilibria(payoffs) {
  const rowBest = [
    [false, false],
    [false, false],
  ];
  const colBest = [
    [false, false],
    [false, false],
  ];

  for (let col = 0; col < 2; col += 1) {
    const maxU1 = Math.max(payoffs[0][col].row, payoffs[1][col].row);
    for (let row = 0; row < 2; row += 1) {
      rowBest[row][col] = payoffs[row][col].row === maxU1;
    }
  }

  for (let row = 0; row < 2; row += 1) {
    const maxU2 = Math.max(payoffs[row][0].col, payoffs[row][1].col);
    for (let col = 0; col < 2; col += 1) {
      colBest[row][col] = payoffs[row][col].col === maxU2;
    }
  }

  const equilibria = [];
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 2; col += 1) {
      if (rowBest[row][col] && colBest[row][col]) {
        equilibria.push({ row, col });
      }
    }
  }

  return equilibria;
}

function findStrictlyDominantRow(payoffs) {
  const row0Dominates =
    payoffs[0][0].row > payoffs[1][0].row && payoffs[0][1].row > payoffs[1][1].row;
  const row1Dominates =
    payoffs[1][0].row > payoffs[0][0].row && payoffs[1][1].row > payoffs[0][1].row;
  if (row0Dominates) return 0;
  if (row1Dominates) return 1;
  return null;
}

function findStrictlyDominantCol(payoffs) {
  const col0Dominates =
    payoffs[0][0].col > payoffs[0][1].col && payoffs[1][0].col > payoffs[1][1].col;
  const col1Dominates =
    payoffs[0][1].col > payoffs[0][0].col && payoffs[1][1].col > payoffs[1][0].col;
  if (col0Dominates) return 0;
  if (col1Dominates) return 1;
  return null;
}

function equilibriaStrictlyBetterThanNonEquilibria(payoffs, equilibria) {
  const isEq = (r, c) => equilibria.some((e) => e.row === r && e.col === c);
  const nonEqCoords = [];
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 2; col += 1) {
      if (!isEq(row, col)) nonEqCoords.push({ row, col });
    }
  }

  return equilibria.every((eq) =>
    nonEqCoords.every((x) => payoffs[eq.row][eq.col].row > payoffs[x.row][x.col].row)
  ) &&
    equilibria.every((eq) =>
      nonEqCoords.every((x) => payoffs[eq.row][eq.col].col > payoffs[x.row][x.col].col)
    );
}

function isPrisonersDilemma(payoffs) {
  const domRow = findStrictlyDominantRow(payoffs);
  const domCol = findStrictlyDominantCol(payoffs);
  if (domRow === null || domCol === null) return false;

  const equilibria = computePureNashEquilibria(payoffs);
  if (equilibria.length !== 1) return false;
  if (equilibria[0].row !== domRow || equilibria[0].col !== domCol) return false;

  const eqCell = payoffs[domRow][domCol];
  for (let r = 0; r < 2; r += 1) {
    for (let c = 0; c < 2; c += 1) {
      if (r === domRow && c === domCol) continue;
      const cell = payoffs[r][c];
      if (cell.row > eqCell.row && cell.col > eqCell.col) return true;
    }
  }

  return false;
}

function isPureCoordination(payoffs) {
  const equilibria = computePureNashEquilibria(payoffs);
  if (equilibria.length !== 2) return false;
  if (!equilibriaStrictlyBetterThanNonEquilibria(payoffs, equilibria)) return false;

  const [e1, e2] = equilibria;
  const c1 = payoffs[e1.row][e1.col];
  const c2 = payoffs[e2.row][e2.col];
  return c1.row === c2.row && c1.col === c2.col;
}

function isBattleOfTheSexes(payoffs) {
  const equilibria = computePureNashEquilibria(payoffs);
  if (equilibria.length !== 2) return false;
  if (!equilibriaStrictlyBetterThanNonEquilibria(payoffs, equilibria)) return false;

  const [e1, e2] = equilibria;
  const c1 = payoffs[e1.row][e1.col];
  const c2 = payoffs[e2.row][e2.col];

  const player1PrefersE1 = c1.row > c2.row;
  const player2PrefersE1 = c1.col > c2.col;
  return player1PrefersE1 !== player2PrefersE1;
}

function isStagHunt(payoffs) {
  const equilibria = computePureNashEquilibria(payoffs);
  if (equilibria.length !== 2) return false;

  const [e1, e2] = equilibria;
  const c1 = payoffs[e1.row][e1.col];
  const c2 = payoffs[e2.row][e2.col];

  const e1ParetoDominatesE2 = c1.row > c2.row && c1.col > c2.col;
  const e2ParetoDominatesE1 = c2.row > c1.row && c2.col > c1.col;
  if (!e1ParetoDominatesE2 && !e2ParetoDominatesE1) return false;

  const eHi = e1ParetoDominatesE2 ? e1 : e2;
  const eLo = e1ParetoDominatesE2 ? e2 : e1;

  const rowSecurity = [
    Math.min(payoffs[0][0].row, payoffs[0][1].row),
    Math.min(payoffs[1][0].row, payoffs[1][1].row),
  ];
  const colSecurity = [
    Math.min(payoffs[0][0].col, payoffs[1][0].col),
    Math.min(payoffs[0][1].col, payoffs[1][1].col),
  ];

  const maxRowSec = Math.max(...rowSecurity);
  const maxColSec = Math.max(...colSecurity);
  const maximinRows = rowSecurity
    .map((val, idx) => (val === maxRowSec ? idx : null))
    .filter((idx) => idx !== null);
  const maximinCols = colSecurity
    .map((val, idx) => (val === maxColSec ? idx : null))
    .filter((idx) => idx !== null);

  const safeByMaximin =
    maximinRows.includes(eLo.row) && maximinCols.includes(eLo.col);

  return safeByMaximin && !(eLo.row === eHi.row && eLo.col === eHi.col);
}

function isHawkDove(payoffs) {
  const rowChoices = [0, 1];
  const colChoices = [0, 1];

  for (const h1 of rowChoices) {
    const d1 = h1 === 0 ? 1 : 0;
    for (const h2 of colChoices) {
      const d2 = h2 === 0 ? 1 : 0;

      const HH = payoffs[h1][h2];
      const HD = payoffs[h1][d2];
      const DH = payoffs[d1][h2];
      const DD = payoffs[d1][d2];

      const p1Ok = HD.row > DD.row && DD.row > DH.row && DH.row > HH.row;
      const p2Ok = DH.col > DD.col && DD.col > HD.col && HD.col > HH.col;
      if (p1Ok && p2Ok) return true;
    }
  }

  return false;
}

export function classifyClassicGame(payoffs) {
  if (isPrisonersDilemma(payoffs)) return "prisoners_dilemma";
  if (isPureCoordination(payoffs)) return "pure_coordination";
  if (isStagHunt(payoffs)) return "stag_hunt";
  if (isBattleOfTheSexes(payoffs)) return "battle_of_the_sexes";
  if (isHawkDove(payoffs)) return "hawk_dove";
  return "none";
}

export function getClassicGameTypeLabel(typeId, lang = "pt") {
  const entry = CLASSIC_GAME_SELECT_OPTIONS.find((opt) => opt.id === typeId);
  if (!entry) return typeId;
  return entry.label?.[lang] ?? entry.label?.pt ?? entry.id;
}

export function createClassicGameTableFromPayoffs(payoffs, texts) {
  const rowStrategies = ["A", "B"];
  const colStrategies = ["C", "D"];
  const rowLabels = rowStrategies.map((label) => wrapPlayer(label, PLAYER_ONE_CLASS));
  const colLabels = colStrategies.map((label) => wrapPlayer(label, PLAYER_TWO_CLASS));

  const headers = [buildMatrixHeader(texts), ...colLabels];
  const rows = rowStrategies.map((rowLabel, rowIndex) => {
    const payoffCells = colStrategies.map((_, colIndex) => {
      const cell = payoffs[rowIndex][colIndex];
      return formatPayoffCell(cell.row, cell.col);
    });
    return [wrapPlayer(rowLabel, PLAYER_ONE_CLASS), ...payoffCells];
  });

  return { table: { headers, rows }, payoffs, rowStrategies, colStrategies, rowLabels, colLabels };
}

function pickRandomType(rng) {
  const options = CLASSIC_GAME_TYPES.map((t) => t.id);
  const idx = randomIntInclusive(0, options.length - 1, rng);
  return options[idx];
}

function generatePayoffsForType(typeId, rng, options = {}) {
  const payoffStyleId = options.payoffStyleId ?? "independent";
  if (typeId === "prisoners_dilemma" && payoffStyleId === "shared_offset") {
    const base = buildPrisonersDilemmaParallelPayoffs(rng);
    return applyRandomPresentationTransforms(base, rng);
  }
  if (typeId === "pure_coordination" && payoffStyleId === "shared_offset") {
    const base = buildPureCoordinationParallelPayoffs(rng);
    return applyRandomPresentationTransforms(base, rng);
  }
  if (typeId === "battle_of_the_sexes" && payoffStyleId === "shared_offset") {
    const base = buildBattleOfTheSexesParallelPayoffs(rng);
    return applyRandomPresentationTransforms(base, rng);
  }
  if (typeId === "stag_hunt" && payoffStyleId === "shared_offset") {
    const base = buildStagHuntParallelPayoffs(rng);
    return applyRandomPresentationTransforms(base, rng);
  }
  if (typeId === "hawk_dove" && payoffStyleId === "shared_offset") {
    const base = buildHawkDoveParallelPayoffs(rng);
    return applyRandomPresentationTransforms(base, rng);
  }
  const affineOptions = {
    offsetMode: payoffStyleId === "shared_offset" ? "shared" : "independent",
  };
  const base = typeId === "none" ? buildNoneBasePayoffs(rng) : buildBasePayoffs(typeId);

  for (let attempt = 0; attempt < 20; attempt += 1) {
    let payoffs = applyAffineTransforms(base, rng, affineOptions);
    payoffs = applyRandomPresentationTransforms(payoffs, rng);
    if (classifyClassicGame(payoffs) === typeId) return payoffs;
  }

  return base;
}

export function generatePrisonersDilemmaPayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("prisoners_dilemma", rng, options);
}

export function generateStagHuntPayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("stag_hunt", rng, options);
}

export function generatePureCoordinationPayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("pure_coordination", rng, options);
}

export function generateBattleOfTheSexesPayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("battle_of_the_sexes", rng, options);
}

export function generateHawkDovePayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("hawk_dove", rng, options);
}

export function generateNoneClassicPayoffs(rng = Math.random, options = {}) {
  return generatePayoffsForType("none", rng, options);
}

export function buildClassicGameInstance({
  requestedTypeId,
  payoffStyleId = "independent",
  poolTypeIds,
  rng = Math.random,
  texts,
  lang,
}) {
  const normalized = requestedTypeId || "test";
  const pool = Array.isArray(poolTypeIds) && poolTypeIds.length ? poolTypeIds : null;
  const chosenTypeId =
    normalized === "test"
      ? pool
        ? pool[randomIntInclusive(0, pool.length - 1, rng)]
        : pickRandomType(rng)
      : normalized;
  const payoffs = generatePayoffsForType(chosenTypeId, rng, { payoffStyleId });
  const tableData = createClassicGameTableFromPayoffs(payoffs, texts);

  return {
    requestedTypeId: normalized,
    payoffStyleId,
    chosenTypeId,
    chosenTypeLabel: getClassicGameTypeLabel(chosenTypeId, lang),
    ...tableData,
  };
}

export function describeClassicGameProblem(texts) {
  return `
    <h2 class="exercises-section-title">${texts.problemTitle}</h2>
    <p class="exercises-lead"><b>${texts.problemLead}</b></p>
    <p class="exercises-lead">${texts.payoffNote}</p>
  `;
}

function getRowLabel(instance, row) {
  return instance.rowStrategies?.[row] ?? String.fromCharCode(65 + row);
}

function getColLabel(instance, col) {
  return instance.colStrategies?.[col] ?? String.fromCharCode(67 + col);
}

function formatProfile(instance, row, col) {
  return `(${getRowLabel(instance, row)}, ${getColLabel(instance, col)})`;
}

function formatPayoffAt(instance, row, col) {
  const cell = instance.payoffs?.[row]?.[col];
  if (!cell) return "";
  return `(${formatPayoffCell(cell.row, cell.col)})`;
}

function formatU1At(instance, row, col) {
  const cell = instance.payoffs?.[row]?.[col];
  if (!cell) return "";
  return `<span class="payoff-row">${cell.row}</span>`;
}

function formatU2At(instance, row, col) {
  const cell = instance.payoffs?.[row]?.[col];
  if (!cell) return "";
  return `<span class="payoff-col">${cell.col}</span>`;
}

function buildEquilibriaText(instance, equilibria, isEn, texts) {
  if (!equilibria.length) return isEn ? texts.solutionNoEquilibriaEn : texts.solutionNoEquilibria;
  return equilibria.map((e) => formatProfile(instance, e.row, e.col)).join(", ");
}

function findParetoBetterOutcome(instance, eq) {
  const eqCell = instance.payoffs[eq.row][eq.col];
  for (let r = 0; r < 2; r += 1) {
    for (let c = 0; c < 2; c += 1) {
      if (r === eq.row && c === eq.col) continue;
      const cell = instance.payoffs[r][c];
      if (cell.row > eqCell.row && cell.col > eqCell.col) return { row: r, col: c };
    }
  }
  return null;
}

function findHawkDoveMapping(payoffs) {
  const rowChoices = [0, 1];
  const colChoices = [0, 1];

  for (const hRow of rowChoices) {
    const dRow = hRow === 0 ? 1 : 0;
    for (const hCol of colChoices) {
      const dCol = hCol === 0 ? 1 : 0;

      const HH = payoffs[hRow][hCol];
      const HD = payoffs[hRow][dCol];
      const DH = payoffs[dRow][hCol];
      const DD = payoffs[dRow][dCol];

      const p1Ok = HD.row > DD.row && DD.row > DH.row && DH.row > HH.row;
      const p2Ok = DH.col > DD.col && DD.col > HD.col && HD.col > HH.col;
      if (p1Ok && p2Ok) {
        return { hRow, dRow, hCol, dCol };
      }
    }
  }

  return null;
}

function buildJustificationItems(typeId, instance, equilibria, lang) {
  const isEn = lang === "en";
  const items = [];

  if (typeId === "prisoners_dilemma") {
    const domRow = findStrictlyDominantRow(instance.payoffs);
    const domCol = findStrictlyDominantCol(instance.payoffs);
    if (domRow !== null) {
      const r = domRow;
      const o = r === 0 ? 1 : 0;
      const c0 = 0;
      const c1 = 1;
      items.push(
        isEn
          ? `Player 1 has a strictly dominant strategy: <b>${getRowLabel(instance, r)}</b>, since ` +
            `u1${formatProfile(instance, r, c0)} ${formatPayoffAt(instance, r, c0)} ` +
            `> u1${formatProfile(instance, o, c0)} ${formatPayoffAt(instance, o, c0)} ` +
            `and u1${formatProfile(instance, r, c1)} ${formatPayoffAt(instance, r, c1)} ` +
            `> u1${formatProfile(instance, o, c1)} ${formatPayoffAt(instance, o, c1)}.`
          : `O Jogador 1 tem uma estratégia estritamente dominante: <b>${getRowLabel(
              instance,
              r
            )}</b>, pois ` +
            `u1${formatProfile(instance, r, c0)} ${formatPayoffAt(instance, r, c0)} ` +
            `> u1${formatProfile(instance, o, c0)} ${formatPayoffAt(instance, o, c0)} ` +
            `e u1${formatProfile(instance, r, c1)} ${formatPayoffAt(instance, r, c1)} ` +
            `> u1${formatProfile(instance, o, c1)} ${formatPayoffAt(instance, o, c1)}.`
      );
    }
    if (domCol !== null) {
      const c = domCol;
      const o = c === 0 ? 1 : 0;
      const r0 = 0;
      const r1 = 1;
      items.push(
        isEn
          ? `Player 2 has a strictly dominant strategy: <b>${getColLabel(instance, c)}</b>, since ` +
            `u2${formatProfile(instance, r0, c)} ${formatPayoffAt(instance, r0, c)} ` +
            `> u2${formatProfile(instance, r0, o)} ${formatPayoffAt(instance, r0, o)} ` +
            `and u2${formatProfile(instance, r1, c)} ${formatPayoffAt(instance, r1, c)} ` +
            `> u2${formatProfile(instance, r1, o)} ${formatPayoffAt(instance, r1, o)}.`
          : `O Jogador 2 tem uma estratégia estritamente dominante: <b>${getColLabel(
              instance,
              c
            )}</b>, pois ` +
            `u2${formatProfile(instance, r0, c)} ${formatPayoffAt(instance, r0, c)} ` +
            `> u2${formatProfile(instance, r0, o)} ${formatPayoffAt(instance, r0, o)} ` +
            `e u2${formatProfile(instance, r1, c)} ${formatPayoffAt(instance, r1, c)} ` +
            `> u2${formatProfile(instance, r1, o)} ${formatPayoffAt(instance, r1, o)}.`
      );
    }

    if (equilibria.length === 1) {
      const eq = equilibria[0];
      items.push(
        isEn
          ? `Therefore, the (unique) pure-strategy Nash equilibrium is <b>${formatProfile(
              instance,
              eq.row,
              eq.col
            )}</b>, with payoff ${formatPayoffAt(instance, eq.row, eq.col)}.`
          : `Portanto, o (único) equilíbrio de Nash em estratégias puras é <b>${formatProfile(
              instance,
              eq.row,
              eq.col
            )}</b>, com payoff ${formatPayoffAt(instance, eq.row, eq.col)}.`
      );

      const pareto = findParetoBetterOutcome(instance, eq);
      if (pareto) {
        items.push(
          isEn
            ? `There exists an outcome that Pareto-dominates the equilibrium, e.g. <b>${formatProfile(
                instance,
                pareto.row,
                pareto.col
              )}</b> with payoff ${formatPayoffAt(instance, pareto.row, pareto.col)}.`
            : `Existe um resultado que Pareto-domina o equilíbrio, por exemplo <b>${formatProfile(
                instance,
                pareto.row,
                pareto.col
              )}</b> com payoff ${formatPayoffAt(instance, pareto.row, pareto.col)}.`
        );
      }
    }
  }

  if (typeId === "pure_coordination") {
    if (equilibria.length === 2) {
      const [e1, e2] = equilibria;
      items.push(
        isEn
          ? `There are <b>two</b> pure-strategy Nash equilibria: <b>${formatProfile(
              instance,
              e1.row,
              e1.col
            )}</b> and <b>${formatProfile(instance, e2.row, e2.col)}</b>.`
          : `Existem <b>dois</b> equilíbrios de Nash em estratégias puras: <b>${formatProfile(
              instance,
              e1.row,
              e1.col
            )}</b> e <b>${formatProfile(instance, e2.row, e2.col)}</b>.`
      );
      items.push(
        isEn
          ? `Payoffs at the equilibria are identical: ${formatPayoffAt(instance, e1.row, e1.col)} ` +
            `and ${formatPayoffAt(instance, e2.row, e2.col)}.`
          : `Os payoffs nos equilíbrios são idênticos: ${formatPayoffAt(instance, e1.row, e1.col)} ` +
            `e ${formatPayoffAt(instance, e2.row, e2.col)}.`
      );

      const allCoords = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ];
      const isEq = (coord) => equilibria.some((e) => e.row === coord.row && e.col === coord.col);
      const nonEq = allCoords.filter((coord) => !isEq(coord));
      if (nonEq.length === 2) {
        const [x1, x2] = nonEq;
        items.push(
          isEn
            ? `Off-equilibrium outcomes are ${formatProfile(instance, x1.row, x1.col)} ${formatPayoffAt(
                instance,
                x1.row,
                x1.col
              )} and ${formatProfile(instance, x2.row, x2.col)} ${formatPayoffAt(
                instance,
                x2.row,
                x2.col
              )}, and both are strictly worse (for both players) than the equilibria.`
            : `Os resultados fora do equilíbrio são ${formatProfile(
                instance,
                x1.row,
                x1.col
              )} ${formatPayoffAt(instance, x1.row, x1.col)} e ${formatProfile(
                instance,
                x2.row,
                x2.col
              )} ${formatPayoffAt(
                instance,
                x2.row,
                x2.col
              )}, e ambos são estritamente piores (para ambos) do que os equilíbrios.`
        );
      }
    }
  }

  if (typeId === "battle_of_the_sexes") {
    if (equilibria.length === 2) {
      const [e1, e2] = equilibria;
      const c1 = instance.payoffs[e1.row][e1.col];
      const c2 = instance.payoffs[e2.row][e2.col];

      const p1Pref = c1.row > c2.row ? e1 : e2;
      const p2Pref = c1.col > c2.col ? e1 : e2;

      items.push(
        isEn
          ? `There are <b>two</b> pure-strategy Nash equilibria: <b>${formatProfile(
              instance,
              e1.row,
              e1.col
            )}</b> and <b>${formatProfile(instance, e2.row, e2.col)}</b>.`
          : `Existem <b>dois</b> equilíbrios de Nash em estratégias puras: <b>${formatProfile(
              instance,
              e1.row,
              e1.col
            )}</b> e <b>${formatProfile(instance, e2.row, e2.col)}</b>.`
      );

      items.push(
        isEn
          ? `Player 1 prefers <b>${formatProfile(instance, p1Pref.row, p1Pref.col)}</b>, while Player 2 prefers <b>${formatProfile(
              instance,
              p2Pref.row,
              p2Pref.col
            )}</b>.`
          : `O Jogador 1 prefere <b>${formatProfile(
              instance,
              p1Pref.row,
              p1Pref.col
            )}</b>, enquanto o Jogador 2 prefere <b>${formatProfile(
              instance,
              p2Pref.row,
              p2Pref.col
            )}</b>.`
      );

      const allCoords = [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 1, col: 0 },
        { row: 1, col: 1 },
      ];
      const isEq = (coord) => equilibria.some((e) => e.row === coord.row && e.col === coord.col);
      const nonEq = allCoords.filter((coord) => !isEq(coord));

      if (nonEq.length === 2) {
        const [x1, x2] = nonEq;
        items.push(
          isEn
            ? `Both equilibria are strictly better (for both players) than the off-equilibrium outcomes: ` +
              `${formatPayoffAt(instance, e1.row, e1.col)} and ${formatPayoffAt(
                instance,
                e2.row,
                e2.col
              )} vs ${formatPayoffAt(instance, x1.row, x1.col)} and ${formatPayoffAt(
                instance,
                x2.row,
                x2.col
              )}.`
            : `Ambos os equilíbrios são estritamente melhores (para ambos) do que os resultados fora do equilíbrio: ` +
              `${formatPayoffAt(instance, e1.row, e1.col)} e ${formatPayoffAt(
                instance,
                e2.row,
                e2.col
              )} vs ${formatPayoffAt(instance, x1.row, x1.col)} e ${formatPayoffAt(
                instance,
                x2.row,
                x2.col
              )}.`
        );
      }

      const ego = { row: p1Pref.row, col: p2Pref.col };
      const egoCell = nonEq.find((x) => x.row === ego.row && x.col === ego.col);
      const other = nonEq.find((x) => !(x.row === ego.row && x.col === ego.col));
      if (egoCell && other) {
        items.push(
          isEn
            ? `Off-equilibrium, the “selfish” mismatch <b>${formatProfile(
                instance,
                egoCell.row,
                egoCell.col
              )}</b> (${formatPayoffAt(instance, egoCell.row, egoCell.col)}) is Pareto-better than the other mismatch <b>${formatProfile(
                instance,
                other.row,
                other.col
              )}</b> (${formatPayoffAt(instance, other.row, other.col)}).`
            : `Fora do equilíbrio, as “estratégias egoístas fora do equilíbrio” <b>${formatProfile(
                instance,
                egoCell.row,
                egoCell.col
              )}</b> (${formatPayoffAt(
                instance,
                egoCell.row,
                egoCell.col
              )}) Pareto-dominam as “estratégias mal combinadas fora do equilíbrio” <b>${formatProfile(
                instance,
                other.row,
                other.col
              )}</b> (${formatPayoffAt(instance, other.row, other.col)}).`
        );
      }
    }
  }

  if (typeId === "stag_hunt") {
    if (equilibria.length === 2) {
      const [e1, e2] = equilibria;
      const c1 = instance.payoffs[e1.row][e1.col];
      const c2 = instance.payoffs[e2.row][e2.col];
      const e1Pareto = c1.row > c2.row && c1.col > c2.col;
      const eHi = e1Pareto ? e1 : e2;
      const eLo = e1Pareto ? e2 : e1;

      items.push(
        isEn
          ? `There are <b>two</b> pure-strategy Nash equilibria: <b>${formatProfile(
              instance,
              eHi.row,
              eHi.col
            )}</b> and <b>${formatProfile(instance, eLo.row, eLo.col)}</b>.`
          : `Existem <b>dois</b> equilíbrios de Nash em estratégias puras: <b>${formatProfile(
              instance,
              eHi.row,
              eHi.col
            )}</b> e <b>${formatProfile(instance, eLo.row, eLo.col)}</b>.`
      );
      items.push(
        isEn
          ? `One equilibrium is Pareto-superior: ${formatPayoffAt(instance, eHi.row, eHi.col)} ` +
            `> ${formatPayoffAt(instance, eLo.row, eLo.col)}.`
          : `Um equilíbrio é Pareto-superior: ${formatPayoffAt(instance, eHi.row, eHi.col)} ` +
            `> ${formatPayoffAt(instance, eLo.row, eLo.col)}.`
      );

      const rowSecurity = [
        Math.min(instance.payoffs[0][0].row, instance.payoffs[0][1].row),
        Math.min(instance.payoffs[1][0].row, instance.payoffs[1][1].row),
      ];
      const colSecurity = [
        Math.min(instance.payoffs[0][0].col, instance.payoffs[1][0].col),
        Math.min(instance.payoffs[0][1].col, instance.payoffs[1][1].col),
      ];
      const maxRowSec = Math.max(...rowSecurity);
      const maxColSec = Math.max(...colSecurity);
      const maximinRows = rowSecurity
        .map((val, idx) => (val === maxRowSec ? idx : null))
        .filter((idx) => idx !== null);
      const maximinCols = colSecurity
        .map((val, idx) => (val === maxColSec ? idx : null))
        .filter((idx) => idx !== null);
      const maximinRowLabels = maximinRows.map((idx) => getRowLabel(instance, idx)).join(", ");
      const maximinColLabels = maximinCols.map((idx) => getColLabel(instance, idx)).join(", ");

      items.push(
        isEn
          ? `Security (maximin) payoffs: Player 1 — ` +
            `${getRowLabel(instance, 0)} → ${rowSecurity[0]}, ` +
            `${getRowLabel(instance, 1)} → ${rowSecurity[1]}; ` +
            `Player 2 — ${getColLabel(instance, 0)} → ${colSecurity[0]}, ${getColLabel(
              instance,
              1
            )} → ${colSecurity[1]}.`
          : `Segurança (maximin): Jogador 1 — ` +
            `${getRowLabel(instance, 0)} → ${rowSecurity[0]}, ` +
            `${getRowLabel(instance, 1)} → ${rowSecurity[1]}; ` +
            `Jogador 2 — ${getColLabel(instance, 0)} → ${colSecurity[0]}, ${getColLabel(
              instance,
              1
            )} → ${colSecurity[1]}.`
      );

      items.push(
        isEn
          ? `The “safe” (maximin) strategies are <b>${maximinRowLabels}</b> for Player 1 and <b>${maximinColLabels}</b> for Player 2, which lead to the Pareto-inferior equilibrium <b>${formatProfile(
              instance,
              eLo.row,
              eLo.col
            )}</b>.`
        : `As estratégias “seguras” (maximin) são <b>${maximinRowLabels}</b> para o Jogador 1 e <b>${maximinColLabels}</b> para o Jogador 2, o que leva ao equilíbrio Pareto-inferior <b>${formatProfile(
            instance,
            eLo.row,
            eLo.col
          )}</b>.`
      );
    }
  }

  if (typeId === "hawk_dove") {
    const mapping = findHawkDoveMapping(instance.payoffs);
    if (mapping) {
      const { hRow, dRow, hCol, dCol } = mapping;
      const HH = formatProfile(instance, hRow, hCol);
      const HD = formatProfile(instance, hRow, dCol);
      const DH = formatProfile(instance, dRow, hCol);
      const DD = formatProfile(instance, dRow, dCol);

      items.push(
        isEn
          ? `Labeling: for Player 1, <b>H</b> = ${getRowLabel(instance, hRow)} and <b>D</b> = ${getRowLabel(
              instance,
              dRow
            )}; for Player 2, <b>H</b> = ${getColLabel(instance, hCol)} and <b>D</b> = ${getColLabel(
              instance,
              dCol
            )}.`
          : `Rotulagem: para o Jogador 1, <b>H</b> = ${getRowLabel(
              instance,
              hRow
            )} e <b>D</b> = ${getRowLabel(instance, dRow)}; para o Jogador 2, <b>H</b> = ${getColLabel(
              instance,
              hCol
            )} e <b>D</b> = ${getColLabel(instance, dCol)}.`
      );
      items.push(
        isEn
          ? `Nash equilibria are <b>${HD}</b> and <b>${DH}</b>.`
          : `Os equilíbrios de Nash são <b>${HD}</b> e <b>${DH}</b>.`
      );
      items.push(
        isEn
          ? `For Player 1: u1${HD} = ${formatU1At(instance, hRow, dCol)} ` +
            `> u1${DD} = ${formatU1At(instance, dRow, dCol)} ` +
            `> u1${DH} = ${formatU1At(instance, dRow, hCol)} ` +
            `> u1${HH} = ${formatU1At(instance, hRow, hCol)}.`
          : `Para o Jogador 1: u1${HD} = ${formatU1At(instance, hRow, dCol)} ` +
            `> u1${DD} = ${formatU1At(instance, dRow, dCol)} ` +
            `> u1${DH} = ${formatU1At(instance, dRow, hCol)} ` +
            `> u1${HH} = ${formatU1At(instance, hRow, hCol)}.`
      );
      items.push(
        isEn
          ? `For Player 2: u2${DH} = ${formatU2At(instance, dRow, hCol)} ` +
            `> u2${DD} = ${formatU2At(instance, dRow, dCol)} ` +
            `> u2${HD} = ${formatU2At(instance, hRow, dCol)} ` +
            `> u2${HH} = ${formatU2At(instance, hRow, hCol)}.`
          : `Para o Jogador 2: u2${DH} = ${formatU2At(instance, dRow, hCol)} ` +
            `> u2${DD} = ${formatU2At(instance, dRow, dCol)} ` +
            `> u2${HD} = ${formatU2At(instance, hRow, dCol)} ` +
            `> u2${HH} = ${formatU2At(instance, hRow, hCol)}.`
      );
    }
  }

  if (typeId === "none") {
    if (!equilibria.length) {
      items.push(
        isEn
          ? "There is <b>no</b> pure-strategy Nash equilibrium, so the game does not match any of the classic 2x2 models studied here."
          : "Não há <b>nenhum</b> equilíbrio de Nash em estratégias puras, portanto o jogo não se enquadra em nenhum dos modelos clássicos estudados aqui."
      );
    } else if (equilibria.length === 1) {
      const domRow = findStrictlyDominantRow(instance.payoffs);
      const domCol = findStrictlyDominantCol(instance.payoffs);
      const eq = equilibria[0];
      const pareto = findParetoBetterOutcome(instance, eq);
      const parts = [];
      if (domRow === null || domCol === null) {
        parts.push(
          isEn
            ? "it is <b>not</b> a Prisoner’s Dilemma because at least one player lacks a strictly dominant strategy"
            : "não é um Dilema dos Prisioneiros porque pelo menos um jogador não tem estratégia estritamente dominante"
        );
      } else if (!pareto) {
        parts.push(
          isEn
            ? "it is <b>not</b> a Prisoner’s Dilemma because there is no outcome that Pareto-dominates the equilibrium"
            : "não é um Dilema dos Prisioneiros porque não existe resultado que Pareto-domine o equilíbrio"
        );
      }
      parts.push(
        isEn
          ? "and it cannot be any of the other classic games because they require two pure equilibria"
          : "e não pode ser nenhum dos outros jogos clássicos porque eles exigem dois equilíbrios em estratégias puras"
      );
      items.push(parts.join(" "));
    } else if (equilibria.length === 2) {
      const coord = isPureCoordination(instance.payoffs);
      const bos = isBattleOfTheSexes(instance.payoffs);
      const sh = isStagHunt(instance.payoffs);
      const hd = isHawkDove(instance.payoffs);

      const failures = [];
      if (!coord) {
        failures.push(getClassicGameTypeLabel("pure_coordination", lang));
      }
      if (!bos) {
        failures.push(getClassicGameTypeLabel("battle_of_the_sexes", lang));
      }
      if (!sh) {
        failures.push(getClassicGameTypeLabel("stag_hunt", lang));
      }
      if (!hd) {
        failures.push(getClassicGameTypeLabel("hawk_dove", lang));
      }
      items.push(
        isEn
          ? `Even with two pure equilibria, the game fails the necessary conditions for: <b>${failures.join(
              ", "
            )}</b>.`
          : `Mesmo com dois equilíbrios em estratégias puras, o jogo falha condições necessárias de: <b>${failures.join(
              ", "
            )}</b>.`
      );
    }
  }

  return items;
}

export function buildClassicGamesExplainerBody({ scopeId, chosenTypeId, lang }) {
  const isEn = lang === "en";

  const intro = isEn
    ? `<p><b>How to solve:</b> (1) find pure-strategy Nash equilibria by marking best responses; (2) use the equilibrium pattern and payoff comparisons to classify the game.</p>`
    : `<p><b>Como resolver:</b> (1) encontre os equilíbrios de Nash em estratégias puras marcando as melhores respostas; (2) use o padrão de equilíbrios e comparações de payoffs para classificar o jogo.</p>`;

  const makeBlock = (title, bullets) => `
    <p><b>${title}</b></p>
    <ul class="exercises-compact-list">
      ${bullets.map((b) => `<li>${b}</li>`).join("")}
    </ul>
  `;

  const blocks = [];

  const addCoordinationGames = () => {
    blocks.push(
      makeBlock(getClassicGameTypeLabel("pure_coordination", lang), [
        isEn
          ? "Two pure-strategy Nash equilibria."
          : "Dois equilíbrios de Nash em estratégias puras.",
        isEn
          ? "Both equilibria are strictly better (for both players) than off-equilibrium outcomes."
          : "Ambos os equilíbrios são estritamente melhores (para ambos) do que resultados fora do equilíbrio.",
        isEn
          ? "Players are indifferent between the equilibria (same payoffs at both equilibria, for each player)."
          : "Os jogadores são indiferentes entre os equilíbrios (mesmos payoffs entre os dois equilíbrios para cada jogador).",
      ])
    );

    blocks.push(
      makeBlock(getClassicGameTypeLabel("battle_of_the_sexes", lang), [
        isEn
          ? "Two pure-strategy Nash equilibria."
          : "Dois equilíbrios de Nash em estratégias puras.",
        isEn
          ? "Both equilibria are strictly better (for both) than off-equilibrium outcomes."
          : "Ambos os equilíbrios são estritamente melhores (para ambos) do que resultados fora do equilíbrio.",
        isEn
          ? "Each player prefers a different equilibrium (distributional conflict)."
          : "Cada jogador prefere um equilíbrio diferente (conflito distributivo).",
        isEn
          ? "If both act selfishly by aiming at their preferred equilibrium, the off-equilibrium outcome is not catastrophic (unlike Hawk–Dove)."
          : "Se ambos agem de forma egoísta, buscando o equilíbrio que lhe é mais vantajoso, isso não gera um resultado catastrófico (diferença em relação ao jogo dos Gaviões e dos Pombos).",
      ])
    );

    blocks.push(
      makeBlock(getClassicGameTypeLabel("stag_hunt", lang), [
        isEn
          ? "Two pure-strategy Nash equilibria."
          : "Dois equilíbrios de Nash em estratégias puras.",
        isEn
          ? "One equilibrium (when both hunt stag) Pareto-dominates the other (better for both)."
          : "Um equilíbrio (quando ambos “caçam o veado”) Pareto-domina o outro, ou seja, é melhor para ambos.",
        isEn
          ? "The Pareto-inferior equilibrium is the “safe” (maximin) outcome."
          : "O equilíbrio Pareto-inferior (quando ambos “caçam a lebre”) é o resultado mais “seguro” (maximin) para ambos os jogadores.",
      ])
    );

    blocks.push(
      makeBlock(getClassicGameTypeLabel("hawk_dove", lang), [
        isEn
          ? "Two pure-strategy Nash equilibria: (H, D) and (D, H). Here H is the aggressive strategy (Hawk) and D is the conservative strategy (Dove)."
          : "Dois equilíbrios de Nash em estratégias puras, que podemos designar como (H, D) e (D, H): H é chamada de estratégia “agressiva” (Hawk) e D é chamada de estratégia conservadora (Dove).",
        isEn
          ? "For each player: (H, D) > (D, D) > (D, H) > (H, H)."
          : "Para cada jogador: (H, D) > (D, D) > (D, H) > (H, H).",
        isEn
          ? "Thus, each player’s best equilibrium is the one where they play H, but mutual aggression (H, H) yields the worst payoffs for both (catastrophic outcome)."
          : "Assim, o equilíbrio mais vantajoso para cada jogador é aquele em que ele é agressivo, mas a agressividade mútua (H, H) leva aos piores payoffs para ambos (resultado catastrófico).",
      ])
    );
  };

  if (scopeId === "produce") {
    const typeId = chosenTypeId;
    const label = getClassicGameTypeLabel(typeId, lang);

    const produceIntro = (t) => {
      if (t === "prisoners_dilemma") {
        return isEn
          ? `<p><b>Intuition:</b> each player has an incentive to defect regardless of what the other does, so the game converges to a single, stable outcome—even though mutual cooperation would benefit both.</p>`
          : `<p><b>Intuição:</b> cada jogador tem incentivo a “desertar” (não cooperar) independentemente do que o outro faça, o que leva a um único resultado estável — embora a cooperação mútua fosse melhor para ambos.</p>`;
      }
      if (t === "pure_coordination") {
        return isEn
          ? `<p><b>Intuition:</b> players want to match actions. There is no conflict over payoffs once coordination succeeds; the only issue is selecting the same equilibrium.</p>`
          : `<p><b>Intuição:</b> os jogadores querem “combinar” as ações. Não há conflito distributivo; o problema é apenas coordenar em um mesmo equilíbrio.</p>`;
      }
      if (t === "battle_of_the_sexes") {
        return isEn
          ? `<p><b>Intuition:</b> players want to coordinate, but disagree about which coordinated outcome is best (distributional conflict).</p>`
          : `<p><b>Intuição:</b> os jogadores querem coordenar, mas discordam sobre qual resultado coordenado é melhor (conflito distributivo).</p>`;
      }
      if (t === "stag_hunt") {
        return isEn
          ? `<p><b>Intuition:</b> there is a trade-off between an efficient equilibrium that requires trust and a safer equilibrium that guarantees a better worst-case payoff.</p>`
          : `<p><b>Intuição:</b> há um trade-off entre um equilíbrio eficiente (que exige confiança) e um equilíbrio mais seguro (que maximiza o pior caso).</p>`;
      }
      return isEn
        ? `<p><b>Intuition:</b> each player prefers to be aggressive if the other yields, but mutual aggression is disastrous. The strategic tension is avoiding the catastrophic outcome.</p>`
        : `<p><b>Intuição:</b> cada jogador prefere ser agressivo se o outro cede, mas a agressividade mútua é desastrosa. A tensão central é evitar o pior resultado.</p>`;
    };

    const detailed = (t) => {
      if (t === "prisoners_dilemma") {
        return makeBlock(isEn ? "Defining features" : "Características definidoras", [
          isEn
            ? "A cooperation problem with a unique equilibrium driven by strictly dominant strategies."
            : "Um problema de cooperação com um equilíbrio único determinado por estratégias estritamente dominantes.",
          isEn
            ? "Key feature: mutual defection is a Nash equilibrium even though mutual cooperation would be better for both."
            : "Característica central: a (mútua) não cooperação é equilíbrio de Nash, embora a cooperação mútua seja melhor para ambos.",
        ]);
      }
      if (t === "pure_coordination") {
        return makeBlock(isEn ? "Defining features" : "Características definidoras", [
          isEn
            ? "A coordination problem with two pure-strategy Nash equilibria."
            : "Um problema de coordenação com dois equilíbrios de Nash em estratégias puras.",
          isEn
            ? "No distributional conflict: equilibria yield the same payoffs."
            : "Sem conflito distributivo: os equilíbrios geram os mesmos payoffs.",
          isEn
            ? "Any equilibrium is strictly better (for both players) than any mismatch."
            : "Qualquer equilíbrio é estritamente melhor (para ambos) do que qualquer desencontro.",
        ]);
      }
      if (t === "battle_of_the_sexes") {
        return makeBlock(isEn ? "Defining features" : "Características definidoras", [
          isEn
            ? "Two pure-strategy Nash equilibria, both strictly better than mismatches."
            : "Dois equilíbrios de Nash em estratégias puras, ambos estritamente melhores do que os desencontros.",
          isEn
            ? "Distributional conflict: each player prefers a different equilibrium."
            : "Conflito distributivo: cada jogador prefere um equilíbrio diferente.",
          isEn
            ? "Coordination is valuable, but equilibrium selection is contentious."
            : "Coordenar é valioso, mas a seleção do equilíbrio é disputada.",
        ]);
      }
      if (t === "stag_hunt") {
        return makeBlock(isEn ? "Defining features" : "Características definidoras", [
          isEn
            ? "Two pure-strategy Nash equilibria: one efficient and one safe."
            : "Dois equilíbrios de Nash em estratégias puras: um eficiente e um seguro.",
          isEn
            ? "The efficient equilibrium Pareto-dominates the safe equilibrium."
            : "O equilíbrio eficiente Pareto-domina o equilíbrio seguro.",
          isEn
            ? "The safe equilibrium is selected by maximin (security) reasoning."
            : "O equilíbrio seguro é selecionado por raciocínio maximin (segurança).",
        ]);
      }
      return makeBlock(isEn ? "Defining features" : "Características definidoras", [
        isEn
          ? "Two pure-strategy Nash equilibria: (H, D) and (D, H)."
          : "Dois equilíbrios de Nash em estratégias puras: (H, D) e (D, H).",
        isEn
          ? "Each player prefers being aggressive when the other yields."
          : "Cada jogador prefere ser agressivo quando o outro cede.",
        isEn
          ? "Mutual aggression (H, H) is the worst (catastrophic) outcome."
          : "A agressividade mútua (H, H) é o pior resultado (catastrófico).",
      ]);
    };

    blocks.push(
      isEn
        ? `<p>This instance was generated as a <b>${label}</b>. Use the payoff patterns below to identify its defining features.</p>`
        : `<p>Esta instância foi gerada como um <b>${label}</b>. Use os padrões de payoff abaixo para identificar suas características definidoras.</p>`
    );
    blocks.push(produceIntro(typeId));
    blocks.push(detailed(typeId));
    return `${intro}${blocks.join("")}`;
  }

  addCoordinationGames();

  if (scopeId === "full") {
    blocks.unshift(
      makeBlock(getClassicGameTypeLabel("prisoners_dilemma", lang), [
        isEn
          ? "Each player has a strictly dominant strategy; the equilibrium is the dominant-strategy profile."
          : "Cada jogador tem uma estratégia estritamente dominante; o equilíbrio é o perfil formado pelas estratégias dominantes.",
        isEn
          ? "There exists an outcome that Pareto-dominates the equilibrium."
          : "Existe um resultado que Pareto-domina o equilíbrio.",
      ])
    );
    blocks.push(
      isEn
        ? `<p>If none of the definitions apply, the correct answer is <b>None of the classic games</b>.</p>`
        : `<p>Se nenhuma definição se aplicar, a resposta correta é <b>Nenhum dos jogos clássicos</b>.</p>`
    );
  }

  return `${intro}${blocks.join("")}`;
}

export function buildClassicGameSolutionHeader({ scopeId: _scopeId, instance, texts, lang }) {
  const isEn = lang === "en";
  const equilibria = computePureNashEquilibria(instance.payoffs);
  const classificationId = classifyClassicGame(instance.payoffs);
  const classificationLabel = getClassicGameTypeLabel(classificationId, lang);

  const justificationItems = buildJustificationItems(
    classificationId,
    instance,
    equilibria,
    lang
  );
  const justificationHtml = justificationItems.length
    ? `<ul class="exercises-compact-list">${justificationItems
        .map((x) => `<li>${x}</li>`)
        .join("")}</ul>`
    : "";

  const nashText = buildEquilibriaText(instance, equilibria, isEn, texts);
  const solutionNashLabel = isEn ? texts.solutionNashLabelEn : texts.solutionNashLabel;
  const classificationKey = isEn ? texts.solutionClassificationLabelEn : texts.solutionClassificationLabel;
  const justificationKey =
    classificationId === "none"
      ? isEn
        ? "Characteristics indicating the game fits none of the classic models"
        : "Características que indicam que o jogo não se enquadra em nenhum dos jogos clássicos"
      : isEn
        ? `Characteristics that identify the game as ${classificationLabel}`
        : `Características que identificam o jogo como um ${classificationLabel}`;

  return `
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${texts.solutionTitle}</h3>
      <hr class="exercises-solution-divider" />
      <p><b>${solutionNashLabel}:</b> ${nashText}</p>
      <p><b>${classificationKey}:</b> ${classificationLabel}</p>
      ${justificationHtml ? `<p><b>${justificationKey}:</b></p>${justificationHtml}` : ""}
    </div>
    <h3 class="exercises-solution-subtitle">${texts.matrixTitleSolved}</h3>
  `;
}

export function buildClassicGameSolutionStrategyLabels(instance, lang = "pt") {
  const isEn = lang === "en";
  const typeId = classifyClassicGame(instance.payoffs);
  const rowSemantic = [null, null];
  const colSemantic = [null, null];

  if (typeId === "prisoners_dilemma") {
    const domRow = findStrictlyDominantRow(instance.payoffs);
    const domCol = findStrictlyDominantCol(instance.payoffs);
    const cooperate = isEn ? "Cooperate" : "Cooperar";
    const defect = isEn ? "Defect" : "Trair";
    if (domRow !== null) {
      rowSemantic[domRow] = defect;
      rowSemantic[domRow === 0 ? 1 : 0] = cooperate;
    }
    if (domCol !== null) {
      colSemantic[domCol] = defect;
      colSemantic[domCol === 0 ? 1 : 0] = cooperate;
    }
  }

  if (typeId === "pure_coordination") {
    const equilibria = computePureNashEquilibria(instance.payoffs);
    const option1 = isEn ? "Convention 1" : "Convenção 1";
    const option2 = isEn ? "Convention 2" : "Convenção 2";

    const eqRow0 = equilibria.find((e) => e.row === 0);
    const eqRow1 = equilibria.find((e) => e.row === 1);

    if (eqRow0) {
      rowSemantic[0] = option1;
      colSemantic[eqRow0.col] = option1;
    }
    if (eqRow1) {
      rowSemantic[1] = option2;
      colSemantic[eqRow1.col] = option2;
    }

    if (!eqRow0 || !eqRow1) {
      if (equilibria[0]) {
        rowSemantic[equilibria[0].row] = option1;
        colSemantic[equilibria[0].col] = option1;
      }
      if (equilibria[1]) {
        rowSemantic[equilibria[1].row] = option2;
        colSemantic[equilibria[1].col] = option2;
      }
    }
  }

  if (typeId === "battle_of_the_sexes") {
    const equilibria = computePureNashEquilibria(instance.payoffs);
    if (equilibria.length === 2) {
      const [e1, e2] = equilibria;
      const c1 = instance.payoffs[e1.row][e1.col];
      const c2 = instance.payoffs[e2.row][e2.col];

      const eP1 = c1.row > c2.row ? e1 : e2;
      const eP2 = c1.col > c2.col ? e1 : e2;

      const optionP1 = isEn ? "P1’s preferred option" : "Opção preferida do J1";
      const optionP2 = isEn ? "P2’s preferred option" : "Opção preferida do J2";

      rowSemantic[eP1.row] = optionP1;
      colSemantic[eP1.col] = optionP1;
      rowSemantic[eP2.row] = optionP2;
      colSemantic[eP2.col] = optionP2;
    }
  }

  if (typeId === "stag_hunt") {
    const equilibria = computePureNashEquilibria(instance.payoffs);
    if (equilibria.length === 2) {
      const [e1, e2] = equilibria;
      const c1 = instance.payoffs[e1.row][e1.col];
      const c2 = instance.payoffs[e2.row][e2.col];
      const e1Pareto = c1.row > c2.row && c1.col > c2.col;
      const eHi = e1Pareto ? e1 : e2;
      const eLo = e1Pareto ? e2 : e1;

      const high = isEn ? "Hunt stag" : "Caçar o veado";
      const low = isEn ? "Hunt hare" : "Caçar a lebre";

      rowSemantic[eHi.row] = high;
      colSemantic[eHi.col] = high;
      rowSemantic[eLo.row] = low;
      colSemantic[eLo.col] = low;
    }
  }

  if (typeId === "hawk_dove") {
    const mapping = findHawkDoveMapping(instance.payoffs);
    if (mapping) {
      const hawk = isEn ? "Hawk (H) / Aggressive strategy" : "Gavião (H) / E. Agressiva";
      const dove = isEn ? "Dove (D) / Conservative strategy" : "Pombo (D) / E. Conservadora";

      rowSemantic[mapping.hRow] = hawk;
      rowSemantic[mapping.dRow] = dove;
      colSemantic[mapping.hCol] = hawk;
      colSemantic[mapping.dCol] = dove;
    }
  }

  const rowLabels = (instance.rowStrategies ?? ["A", "B"]).map((label, idx) => {
    const semantic = rowSemantic[idx];
    const text = semantic ? `${label}: ${semantic}` : label;
    return wrapPlayer(text, PLAYER_ONE_CLASS);
  });

  const colLabels = (instance.colStrategies ?? ["C", "D"]).map((label, idx) => {
    const semantic = colSemantic[idx];
    const text = semantic ? `${label}: ${semantic}` : label;
    return wrapPlayer(text, PLAYER_TWO_CLASS);
  });

  return { rowLabels, colLabels, typeId };
}

export function buildClassicGamesTexts(lang) {
  const isEn = lang === "en";

  return {
    title: isEn ? "Game theory: classic games" : "Teoria dos jogos: jogos clássicos",
    sidebarTitle: isEn ? "Classic game parameters" : "Parâmetros do jogo",
    scopeTitle: isEn ? "Exercise scope" : "Escopo do exercício",
    scopeOptions: isEn
      ? [
          {
            value: "coop",
            title: "Only coordination games",
            description:
              "Classify the game among 4 classic coordination games: Pure Coordination, Battle of the Sexes, Stag Hunt, and Hawk–Dove.",
          },
          {
            value: "full",
            title: "5 classic games (cooperation & coordination)",
            description:
              "Classify the game among 6 options: 5 classic cooperation/coordination games plus the possibility that the game fits none of them.",
          },
          {
            value: "produce",
            title: "Generate a desired model",
            description:
              "Select this option to generate a game of a desired classic type (5 classic simultaneous games).",
          },
        ]
      : [
          {
            value: "coop",
            title: "Apenas jogos de coordenação",
            description:
              "Classifique o jogo, entre 4 opções de jogos clássicos de coordenação: o Jogo de Coordenação Pura, o Jogo da Batalha dos Sexos, o Jogo da Caça ao Veado e o Jogo dos Gaviões e dos Pombos (Galinha).",
          },
          {
            value: "full",
            title: "5 jogos clássicos (cooperação e coordenação)",
            description:
              "Classifique o jogo, entre 6 opções, que incluem 5 modalidades de jogos clássicos  de cooperação e de coordenação, assim como a possibilidade de que o jogo proposto não se enquadre em nenhum desses tipos de jogo.",
          },
          {
            value: "produce",
            title: "Produza o modelo de jogo desejado",
            description:
              "Selecione esta opção para gerar um jogo do tipo desejado, entre 5 opções de jogos simultâneos clássicos (de cooperação e de coordenação).",
          },
        ],
    produceTypeLabel: isEn ? "Desired game type" : "Tipo de jogo desejado",
    produceTypeOptions: CLASSIC_GAME_TYPES.filter((t) => t.id !== "none").map((opt) => ({
      value: opt.id,
      label: opt.label?.[lang] ?? opt.id,
    })),
    payoffStyleTitle: isEn ? "Payoff parallelism" : "Paralelismo de payoffs",
    payoffStyleOptions: PAYOFF_STYLE_OPTIONS.map((opt) => ({
      value: opt.id,
      label: opt.label?.[lang] ?? opt.id,
    })),
    generateTab: isEn ? "🚀 Generate game" : "🚀 Gerar jogo",
    generate: isEn ? "Generate game" : "Gerar jogo",
    exerciseIntro: isEn
      ? "Generate the game to start the exercise."
      : "Gere o jogo para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the game to see its solution here."
      : "Gere o jogo para visualizar sua solução aqui.",
    problemTitle: isEn ? "Problem" : "Problema",
    problemLeadCoordination: isEn
      ? "Solve the simultaneous game represented by the payoff matrix below by identifying its Nash equilibria in pure strategies and then classify it as one of the following classic coordination games: Pure Coordination, Battle of the Sexes, Stag Hunt, or Hawk–Dove (Chicken)."
      : "Resolva o jogo simultâneo representado pela matriz a seguir, identificando os seus equilíbrios de Nash em estratégias puras e, em seguida, classifique-o entre uma das seguintes opções de jogos clássicos de coordenação: Jogo de Coordenação Pura, Jogo da Batalha dos Sexos, Jogo da Caça ao Veado, ou Jogo dos Gaviões e dos Pombos (Galinha).",
    problemLeadFull: isEn
      ? "Solve the simultaneous game represented by the payoff matrix below by identifying its Nash equilibria in pure strategies (if any) and then check whether the game fits one of the following 5 classic games: Prisoner’s Dilemma, Pure Coordination, Battle of the Sexes, Stag Hunt, or Hawk–Dove (Chicken)."
      : "Resolva o jogo simultâneo representado pela matriz a seguir, identificando os seus equilíbrios de Nash em estratégias puras (se houver) e, em seguida, verifique se o jogo se enquadra em uma das 5 opções de jogos clássicos a seguir: Dilema dos Prisioneiros, Jogo de Coordenação Pura, Jogo da Batalha dos Sexos, Jogo da Caça ao Veado, ou Jogo dos Gaviões e dos Pombos (Galinha).",
    problemLeadProduce: isEn
      ? "Analyze the simultaneous game represented by the payoff matrix below and try to identify the features that characterize this game as a [X]."
      : "Analise o jogo simultâneo representado pela matriz a seguir e busque identificar as características que identificam este jogo como um [X].",
    payoffNote: isEn
      ? "Payoffs are shown as (Player 1, Player 2)."
      : "Os payoffs estão no formato (Jogador 1, Jogador 2).",
    matrixHeader: isEn ? "P1 | P2" : "J1 | J2",
    explainerTitle: isEn ? "How to identify classic games" : "Como identificar jogos clássicos",
    solutionTitle: isEn ? "Solution" : "Solução",
    solutionNashLabel: "Equilíbrios de Nash (estratégias puras)",
    solutionNashLabelEn: "Nash equilibria (pure strategies)",
    solutionNoEquilibria: "Nenhum equilíbrio de Nash em estratégias puras foi encontrado",
    solutionNoEquilibriaEn: "No pure-strategy Nash equilibrium found",
    solutionClassificationLabel: "Classificação",
    solutionClassificationLabelEn: "Classification",
    solutionJustificationLabel: "Características relevantes",
    solutionJustificationLabelEn: "Relevant characteristics",
    matrixTitleSolved: isEn
      ? "Payoff matrix with the pure-strategy solution"
      : "Tabela do jogo com a solução por estratégias puras",
  };
}
