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
    label: { en: "Pure coordination", pt: "Coordenação Pura" },
  },
  {
    id: "stag_hunt",
    label: { en: "Stag hunt", pt: "Caça ao Veado" },
  },
  {
    id: "battle_of_the_sexes",
    label: { en: "Battle of the sexes", pt: "Batalha dos Sexos" },
  },
  {
    id: "hawk_dove",
    label: { en: "Hawk–dove (chicken)", pt: "Gaviões e Pombos (Galinha)" },
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
    id: "independent",
    label: { en: "No parallelism", pt: "Sem paralelismo" },
  },
  {
    id: "shared_offset",
    label: { en: "Parallel (shared offset)", pt: "Com paralelismo (offset comum)" },
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

  return { table: { headers, rows }, payoffs, rowStrategies, colStrategies };
}

function pickRandomType(rng) {
  const options = CLASSIC_GAME_TYPES.map((t) => t.id);
  const idx = randomIntInclusive(0, options.length - 1, rng);
  return options[idx];
}

function generatePayoffsForType(typeId, rng, options = {}) {
  const payoffStyleId = options.payoffStyleId ?? "independent";
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
  rng = Math.random,
  texts,
  lang,
}) {
  const normalized = requestedTypeId || "test";
  const chosenTypeId = normalized === "test" ? pickRandomType(rng) : normalized;
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

export function buildClassicGameSolutionHeader({ requestedTypeId, chosenTypeId, texts, lang }) {
  const chosenLabel = getClassicGameTypeLabel(chosenTypeId, lang);
  const modeNote = requestedTypeId === "test" ? texts.solutionTestModeNote : "";
  return `
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${texts.solutionTitle}</h3>
      <hr class="exercises-solution-divider" />
      <p><b>${texts.solutionSelectedTypeLabel}:</b> ${chosenLabel}</p>
      ${modeNote ? `<p class="exercises-legend">${modeNote}</p>` : ""}
    </div>
  `;
}

export function buildClassicGamesTexts(lang) {
  const isEn = lang === "en";

  return {
    title: isEn ? "Game theory: classic games" : "Teoria dos jogos: jogos clássicos",
    sidebarTitle: isEn ? "Classic game parameters" : "Parâmetros do jogo",
    gameTypeLabel: isEn ? "Game type" : "Tipo de jogo",
    gameTypeOptions: CLASSIC_GAME_SELECT_OPTIONS.map((opt) => ({
      value: opt.id,
      label: opt.label?.[lang] ?? opt.id,
    })),
    payoffStyleLabel: isEn ? "Payoff parallelism" : "Paralelismo de payoffs",
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
    problemTitle: isEn ? "Game" : "Jogo",
    problemLead: isEn
      ? "Identify which classic game this payoff matrix represents."
      : "Identifique qual jogo clássico essa matriz de payoffs representa.",
    payoffNote: isEn
      ? "Payoffs are shown as (Player 1, Player 2)."
      : "Os payoffs estão no formato (Jogador 1, Jogador 2).",
    matrixHeader: isEn ? "P1 | P2" : "J1 | J2",
    solutionTitle: isEn ? "Solution" : "Solução",
    solutionSelectedTypeLabel: isEn ? "Selected type" : "Tipo selecionado",
    solutionTestModeNote: isEn
      ? "Random draw used (test mode)."
      : "Sorteio aleatório usado (modo teste).",
  };
}
