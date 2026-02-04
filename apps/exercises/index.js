// ============================================================================
// Decision Theory Exercises App Entry
// ============================================================================

const EXERCISE_TYPES = [
  {
    value: "Maximin",
    label: { en: "Maximin", pt: "Maximin" },
  },
  {
    value: "Minimax",
    label: { en: "Minimax", pt: "Minimax" },
  },
  {
    value: "Optimism-Pessimism Rule",
    label: { en: "Optimism-Pessimism Rule", pt: "Regra Otimismo-Pessimismo" },
  },
  {
    value: "Principle of Insufficient Reason",
    label: { en: "Principle of Insufficient Reason", pt: "Princípio da Razão Insuficiente" },
  },
];

const GAME_EXERCISE_TYPES = [
  {
    value: "Nash Equilibrium",
    label: {
      en: "Nash equilibrium (pure strategies)",
      pt: "Equilíbrio de Nash (estratégias puras)",
    },
  },
];

const COLORS = {
  darkerBlue: "#051d45",
  deepBlue: "#183d7a",
  lightBlue: "#3f8ccb",
  paleGreen: "#52C663",
};

/**
 * Ensures the app stylesheet is loaded only once.
 * @returns {void}
 */
function ensureAppStyles() {
  const id = "exercises-app-styles";
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = "apps/exercises/styles.css";
  document.head.appendChild(link);
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random level of optimism (0.20 to 0.70 in steps of 0.05).
 * @returns {number}
 */
function generateOprLevel() {
  const step = randomIntInclusive(4, 14);
  return (step * 5) / 100;
}

/**
 * @param {number} numDecisions
 * @param {number} numStates
 * @param {number} valuePrecision
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
function createDuiTable(numDecisions, numStates, valuePrecision, labels) {
  const decisions = Array.from({ length: numDecisions }, (_, i) => `D${i + 1}`);
  const states = Array.from({ length: numStates }, (_, i) => `S${i + 1}`);
  const maxVal = Math.floor(200 / valuePrecision);

  const rows = decisions.map((decision) => {
    const values = states.map(() => randomIntInclusive(0, maxVal) * valuePrecision);
    return [decision, ...values];
  });

  return {
    headers: [labels.decisions, ...states],
    rows,
  };
}

/**
 * @param {number[]} values
 * @param {boolean} reverse
 * @returns {string}
 */
function orderedValuesString(values, reverse) {
  const sorted = [...values].sort((a, b) => a - b);
  if (reverse) sorted.reverse();
  return sorted.join(reverse ? " ≥ " : " ≤ ");
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} table
 * @param {boolean} reverse
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
function addOrderedValuesColumn(table, reverse, orderedLabel) {
  const newHeaders = [...table.headers, orderedLabel];
  const newRows = table.rows.map((row) => {
    const values = row.slice(1).map(Number);
    return [...row, orderedValuesString(values, reverse)];
  });
  return { headers: newHeaders, rows: newRows };
}

/**
 * @param {number[]} row
 * @param {(arr: number[]) => number} selectFn
 * @returns {number}
 */
function selectRowValue(row, selectFn) {
  return selectFn(row);
}

/**
 * Lexical solver for Maximin and Minimax.
 * @param {number[][]} table
 * @param {string[]} decisions
 * @param {number} replaceValue
 * @param {(arr: number[]) => number} selectFn
 * @param {(arr: number[]) => number} chooseFn
 * @returns {{steps: number, results: number, bestDecision: string[]}}
 */
function solveLexicalProblem(table, decisions, replaceValue, selectFn, chooseFn) {
  let workingTable = table.map((row) => [...row]);
  let workingDecisions = [...decisions];
  const maxControl = table[0]?.length - 1 ?? 0;

  const solution = {
    steps: 0,
    results: 0,
    bestDecision: [],
  };

  while (true) {
    const selectedValues = workingTable.map((row) => selectRowValue(row, selectFn));
    const result = chooseFn(selectedValues);
    solution.results = result;
    solution.steps += 1;

    const selection = selectedValues.map((value) => value === result);
    workingTable = workingTable.filter((_, i) => selection[i]);
    workingTable = workingTable.map((row) =>
      row.map((value) => (value === result ? replaceValue : value))
    );
    workingDecisions = workingDecisions.filter((_, i) => selection[i]);
    solution.bestDecision = workingDecisions;

    const remaining = selection.filter(Boolean).length;
    if (remaining === 1) break;
    if (solution.steps === maxControl) break;
  }

  return solution;
}

/**
 * @param {number[][]} table
 * @param {string[]} decisions
 * @param {(row: number[], level?: number) => number} valueFn
 * @param {number} [level]
 * @returns {{steps: number, results: number[], bestDecision: string[]}}
 */
function solveNonLexicalProblem(table, decisions, valueFn, level) {
  const decisionValues = table.map((row) => valueFn(row, level));
  const maxValue = Math.max(...decisionValues);
  const bestDecision = decisions.filter((_, i) => decisionValues[i] === maxValue);

  return {
    steps: 1,
    results: decisionValues,
    bestDecision,
  };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
function solveMaximin(problemTable, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));
  const solution = solveLexicalProblem(statesTable, decisions, 201, Math.min, Math.max);
  const table = addOrderedValuesColumn(problemTable, false, labels.orderedValues);
  return { table, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
function solveMinimax(problemTable, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));
  const numStates = problemTable.headers.length - 1;

  const maxByState = Array.from({ length: numStates }, (_, colIndex) =>
    Math.max(...statesTable.map((row) => row[colIndex]))
  );

  const regretRows = statesTable.map((row) =>
    row.map((value, index) => maxByState[index] - value)
  );

  const regretHeaders = Array.from({ length: numStates }, (_, i) => `RS${i + 1}`);
  const regretTable = {
    headers: [labels.decisions, ...regretHeaders],
    rows: regretRows.map((row, i) => [decisions[i], ...row]),
  };

  const solution = solveLexicalProblem(regretRows, decisions, 0, Math.max, Math.min);
  const table = addOrderedValuesColumn(regretTable, true, labels.orderedValues);
  return { table, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} level
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
function solveOpr(problemTable, level, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));

  const calcValue = (values, a) => {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    return a * maxValue + (1 - a) * minValue;
  };

  const solution = solveNonLexicalProblem(statesTable, decisions, calcValue, level);
  const table = {
    headers: [...problemTable.headers, labels.decisionEvaluation],
    rows: problemTable.rows.map((row, i) => [
      ...row,
      Number(solution.results[i].toFixed(2)),
    ]),
  };

  return { table, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
function solvePir(problemTable, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));

  const calcValue = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const solution = solveNonLexicalProblem(statesTable, decisions, calcValue);
  const table = {
    headers: [...problemTable.headers, labels.decisionEvaluation],
    rows: problemTable.rows.map((row, i) => [
      ...row,
      Number(solution.results[i].toFixed(2)),
    ]),
  };

  return { table, solution };
}

/**
 * @param {string} exerciseType
 * @param {number} levelOfOptimism
 * @returns {string}
 */
function describeProblem(exerciseType, exerciseLabel, levelOfOptimism, texts) {
  const method = ["Maximin", "Minimax"].includes(exerciseType)
    ? `${texts.lexical} ${exerciseLabel}`
    : exerciseLabel;

  const optimismText =
    exerciseType === "Optimism-Pessimism Rule"
      ? `<p style="line-height: 150%; color: ${COLORS.darkerBlue};"><b>${texts.optimismHint} ${levelOfOptimism}.</b></p>`
      : "";

  return `
    <h2 style="margin: 0 0 10px 0; color: ${COLORS.darkerBlue};">${texts.problemTitle}</h2>
    <p style="line-height: 150%; color: ${COLORS.darkerBlue};"><b>
      ${texts.problemLead} ${method} ${texts.methodSuffix}
    </b></p>
    ${optimismText}
  `;
}

/**
 * @param {string} exerciseType
 * @param {object} solution
 * @param {number} levelOfOptimism
 * @returns {string}
 */
function buildSolutionHeader(exerciseType, exerciseLabel, solution, levelOfOptimism, texts) {
  if (exerciseType === "Maximin") {
    return describeMaximinSolution(solution, exerciseLabel, texts);
  }
  if (exerciseType === "Minimax") {
    return describeMinimaxSolution(solution, exerciseLabel, texts);
  }
  if (exerciseType === "Optimism-Pessimism Rule") {
    return describeOprSolution(solution, exerciseLabel, levelOfOptimism, texts);
  }
  return describePirSolution(solution, exerciseLabel, texts);
}

/**
 * @param {object} solution
 * @param {string} exerciseType
 * @returns {string}
 */
function describeMaximinSolution(solution, exerciseLabel, texts) {
  const single = solution.bestDecision.length === 1;
  const solutionType = single
    ? `${texts.solutionStatus}</b>: ${texts.maximinSingle}.`
    : `${texts.solutionStatus}</b>: ${texts.maximinTie}.`;
  const bestDecision = single
    ? `${texts.bestDecision}</b>:<b> ${solution.bestDecision[0]}</b>`
    : `${texts.tiedSolutions}</b>: ${solution.bestDecision.join(", ")}`;
  const maximinValue = single
    ? `${texts.maximinValue}</b>: ${solution.results}`
    : `${texts.maximinLast}</b>: ${solution.results}`;

  return buildSolutionCard([
    solutionType,
    bestDecision,
    `${texts.stepsTaken}</b>: ${solution.steps}`,
    maximinValue,
  ], `${texts.solutionFor} '${exerciseLabel}' ${texts.problemSuffix}`, texts.maximinTableTitle);
}

/**
 * @param {object} solution
 * @param {string} exerciseType
 * @returns {string}
 */
function describeMinimaxSolution(solution, exerciseLabel, texts) {
  const single = solution.bestDecision.length === 1;
  const solutionType = single
    ? `${texts.solutionStatus}</b>: ${texts.minimaxSingle}.`
    : `${texts.solutionStatus}</b>: ${texts.minimaxTie}.`;
  const bestDecision = single
    ? `${texts.bestDecision}</b>:<b> ${solution.bestDecision[0]}</b>`
    : `${texts.tiedSolutions}</b>: ${solution.bestDecision.join(", ")}`;
  const minimaxValue = single
    ? `${texts.minimaxValue}</b>: ${solution.results}`
    : `${texts.minimaxLast}</b>: ${solution.results}`;

  return buildSolutionCard([
    solutionType,
    bestDecision,
    `${texts.stepsTaken}</b>: ${solution.steps}`,
    minimaxValue,
  ], `${texts.solutionFor} '${exerciseLabel}' ${texts.problemSuffix}`, texts.minimaxTableTitle);
}

/**
 * @param {object} solution
 * @param {string} exerciseType
 * @param {number} level
 * @returns {string}
 */
function describeOprSolution(solution, exerciseLabel, level, texts) {
  const single = solution.bestDecision.length === 1;
  const solutionType = single
    ? `${texts.solutionStatus}</b>: ${texts.oprSingle}.`
    : `${texts.solutionStatus}</b>: ${texts.oprTie}.`;
  const bestDecision = single
    ? `${texts.bestDecision}</b>:<b> ${solution.bestDecision[0]}</b>`
    : `${texts.tiedSolutions}</b>: ${solution.bestDecision.join(", ")}`;
  const bestValue = `${texts.bestValue}</b>: ${Math.max(...solution.results).toFixed(2)}`;

  return buildSolutionCard([
    solutionType,
    `${texts.optimismLevel}</b>: ${level}`,
    bestDecision,
    bestValue,
  ], `${texts.solutionForA} '${exerciseLabel}' ${texts.problemSuffix}`, texts.evaluationTableTitle);
}

/**
 * @param {object} solution
 * @param {string} exerciseType
 * @returns {string}
 */
function describePirSolution(solution, exerciseLabel, texts) {
  const single = solution.bestDecision.length === 1;
  const solutionType = single
    ? `${texts.solutionStatus}</b>: ${texts.pirSingle}.`
    : `${texts.solutionStatus}</b>: ${texts.pirTie}.`;
  const bestDecision = single
    ? `${texts.bestDecision}</b>:<b> ${solution.bestDecision[0]}</b>`
    : `${texts.tiedSolutions}</b>: ${solution.bestDecision.join(", ")}`;
  const bestValue = `${texts.bestValue}</b>: ${Math.max(...solution.results).toFixed(2)}`;

  return buildSolutionCard([
    solutionType,
    bestDecision,
    bestValue,
  ], `${texts.solutionForA} '${exerciseLabel}' ${texts.problemSuffix}`, texts.evaluationTableTitle);
}

/**
 * @param {string[]} items
 * @param {string} title
 * @param {string} subtitle
 * @returns {string}
 */
function buildSolutionCard(items, title, subtitle) {
  const listItems = items
    .map(
      (item) =>
        `<li style="line-height: 150%; margin-bottom: 15px;"><b style="color: ${COLORS.deepBlue};">${item}</b></li>`
    )
    .join("");

  return `
    <div class="exercises-solution-card">
      <h3 style="text-align: center; margin-top: 0;">${title}</h3>
      <hr />
      <ul>${listItems}</ul>
    </div>
    <h3 style="margin-top: 24px;">${subtitle}</h3>
  `;
}

/**
 * @param {number} rowPayoff
 * @param {number} colPayoff
 * @param {boolean} rowBest
 * @param {boolean} colBest
 * @returns {string}
 */
function formatPayoffCell(rowPayoff, colPayoff, rowBest = false, colBest = false) {
  const rowClass = rowBest ? "payoff-row best-response" : "payoff-row";
  const colClass = colBest ? "payoff-col best-response" : "payoff-col";
  return `<span class="${rowClass}">${rowPayoff}</span>, <span class="${colClass}">${colPayoff}</span>`;
}

/**
 * @param {number} numRows
 * @param {number} numCols
 * @param {number} valuePrecision
 * @param {object} texts
 * @returns {{table: {headers: string[], rows: string[][]}, payoffs: {row: number, col: number}[][], rowStrategies: string[], colStrategies: string[]}}
 */
function createGameTable(numRows, numCols, valuePrecision, texts) {
  const rowStrategies = Array.from(
    { length: numRows },
    (_, i) => `${texts.rowPrefix}${i + 1}`
  );
  const colStrategies = Array.from(
    { length: numCols },
    (_, i) => `${texts.colPrefix}${i + 1}`
  );
  const maxVal = Math.floor(200 / valuePrecision);

  const payoffs = rowStrategies.map(() =>
    colStrategies.map(() => ({
      row: randomIntInclusive(0, maxVal) * valuePrecision,
      col: randomIntInclusive(0, maxVal) * valuePrecision,
    }))
  );

  const headers = [texts.matrixHeader, ...colStrategies];
  const rows = rowStrategies.map((rowLabel, rowIndex) => {
    const payoffCells = colStrategies.map((_, colIndex) => {
      const cell = payoffs[rowIndex][colIndex];
      return formatPayoffCell(cell.row, cell.col);
    });
    return [rowLabel, ...payoffCells];
  });

  return {
    table: { headers, rows },
    payoffs,
    rowStrategies,
    colStrategies,
  };
}

/**
 * @param {{payoffs: {row: number, col: number}[][], rowStrategies: string[], colStrategies: string[]}} game
 * @returns {{rowBest: boolean[][], colBest: boolean[][], nash: boolean[][], nashCells: string[][], bestResponsesRow: string[][], bestResponsesCol: string[][]}}
 */
function analyzeGameForNash(game) {
  const numRows = game.rowStrategies.length;
  const numCols = game.colStrategies.length;

  const rowBest = Array.from({ length: numRows }, () => Array(numCols).fill(false));
  const colBest = Array.from({ length: numRows }, () => Array(numCols).fill(false));

  for (let col = 0; col < numCols; col += 1) {
    const maxRowPayoff = Math.max(...game.payoffs.map((row) => row[col].row));
    for (let row = 0; row < numRows; row += 1) {
      if (game.payoffs[row][col].row === maxRowPayoff) {
        rowBest[row][col] = true;
      }
    }
  }

  for (let row = 0; row < numRows; row += 1) {
    const maxColPayoff = Math.max(...game.payoffs[row].map((cell) => cell.col));
    for (let col = 0; col < numCols; col += 1) {
      if (game.payoffs[row][col].col === maxColPayoff) {
        colBest[row][col] = true;
      }
    }
  }

  const nash = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) => rowBest[rowIndex][colIndex] && colBest[rowIndex][colIndex])
  );

  const nashCells = [];
  for (let row = 0; row < numRows; row += 1) {
    for (let col = 0; col < numCols; col += 1) {
      if (nash[row][col]) {
        nashCells.push([game.rowStrategies[row], game.colStrategies[col]]);
      }
    }
  }

  const bestResponsesRow = game.colStrategies.map((_, colIndex) =>
    game.rowStrategies.filter((_, rowIndex) => rowBest[rowIndex][colIndex])
  );

  const bestResponsesCol = game.rowStrategies.map((_, rowIndex) =>
    game.colStrategies.filter((_, colIndex) => colBest[rowIndex][colIndex])
  );

  return {
    rowBest,
    colBest,
    nash,
    nashCells,
    bestResponsesRow,
    bestResponsesCol,
  };
}

/**
 * @param {{payoffs: {row: number, col: number}[][], rowStrategies: string[], colStrategies: string[]}} game
 * @param {{rowBest: boolean[][], colBest: boolean[][], nash: boolean[][]}} analysis
 * @param {object} texts
 * @returns {{table: {headers: string[], rows: string[][]}, cellClasses: string[][]}}
 */
function buildGameSolutionTable(game, analysis, texts) {
  const headers = [texts.matrixHeader, ...game.colStrategies];
  const rows = game.rowStrategies.map((rowLabel, rowIndex) => {
    const payoffCells = game.colStrategies.map((_, colIndex) => {
      const cell = game.payoffs[rowIndex][colIndex];
      return formatPayoffCell(
        cell.row,
        cell.col,
        analysis.rowBest[rowIndex][colIndex],
        analysis.colBest[rowIndex][colIndex]
      );
    });
    return [rowLabel, ...payoffCells];
  });

  const cellClasses = game.rowStrategies.map(
    () => new Array(game.colStrategies.length + 1).fill("")
  );

  for (let row = 0; row < game.rowStrategies.length; row += 1) {
    for (let col = 0; col < game.colStrategies.length; col += 1) {
      if (analysis.nash[row][col]) {
        cellClasses[row][col + 1] = "nash-cell";
      }
    }
  }

  return { table: { headers, rows }, cellClasses };
}

/**
 * @param {object} texts
 * @returns {string}
 */
function describeGameProblem(texts) {
  return `
    <h2 style="margin: 0 0 10px 0; color: ${COLORS.darkerBlue};">${texts.problemTitle}</h2>
    <p style="line-height: 150%; color: ${COLORS.darkerBlue};"><b>${texts.problemLead}</b></p>
    <p style="line-height: 150%; color: ${COLORS.darkerBlue};">${texts.payoffNote}</p>
  `;
}

/**
 * @param {{rowStrategies: string[], colStrategies: string[]}} game
 * @param {{bestResponsesRow: string[][], bestResponsesCol: string[][], nashCells: string[][]}} analysis
 * @param {object} texts
 * @returns {string}
 */
function buildGameSolutionHeader(game, analysis, texts) {
  const rowResponseItems = analysis.bestResponsesRow
    .map((responses, colIndex) => {
      const label = game.colStrategies[colIndex];
      const content = responses.length ? responses.join(", ") : texts.noneLabel;
      return `<li><b>${label}:</b> ${content}</li>`;
    })
    .join("");

  const colResponseItems = analysis.bestResponsesCol
    .map((responses, rowIndex) => {
      const label = game.rowStrategies[rowIndex];
      const content = responses.length ? responses.join(", ") : texts.noneLabel;
      return `<li><b>${label}:</b> ${content}</li>`;
    })
    .join("");

  const nashText = analysis.nashCells.length
    ? analysis.nashCells.map(([row, col]) => `(${row}, ${col})`).join(", ")
    : texts.noEquilibria;

  return `
    <div class="exercises-solution-card">
      <h3 style="text-align: center; margin-top: 0;">${texts.solutionTitle}</h3>
      <hr />
      <p><b>${texts.bestResponsesRow}</b></p>
      <ul class="exercises-compact-list">${rowResponseItems}</ul>
      <p><b>${texts.bestResponsesCol}</b></p>
      <ul class="exercises-compact-list">${colResponseItems}</ul>
      <p><b>${texts.nashEquilibria}:</b> ${nashText}</p>
      <p class="exercises-legend">
        ${texts.legendRow}<br />${texts.legendCol}<br />${texts.legendNash}
      </p>
    </div>
    <h3 style="margin-top: 24px;">${texts.matrixTitle}</h3>
  `;
}

/**
 * @param {HTMLElement} container
 * @param {{headers: string[], rows: (string|number)[][]}} table
 * @param {{highlightIndex?: number, cellClasses?: string[][]}} options
 */
function renderTable(container, table, options = {}) {
  const { highlightIndex, cellClasses } = options;

  const headerHtml = table.headers
    .map((header, index) => {
      const highlight = index === highlightIndex ? "highlight" : "";
      return `<th class="${highlight}">${header}</th>`;
    })
    .join("");

  const rowsHtml = table.rows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, index) => {
          const highlight = index === highlightIndex ? "highlight" : "";
          const extraClass = cellClasses?.[rowIndex]?.[index] ?? "";
          const classes = [highlight, extraClass].filter(Boolean).join(" ");
          return `<td class="${classes}">${value}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  container.innerHTML = `
    <div class="exercises-table-wrap">
      <table class="exercises-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

/**
 * @param {HTMLElement} mount
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {object}
 */
function renderPage(mount, { lang }) {
  const isEn = lang === "en";

  const labels = {
    title: isEn ? "Decision Theory Exercises" : "Exercícios de Teoria da Decisão",
    subtitle: isEn
      ? "Practice Decision Theory and Game Theory problems with guided solution methods."
      : "Pratique problemas de Teoria da Decisão e Teoria dos Jogos com métodos de solução guiados.",
    backToHome: isEn ? "Select a different exercise" : "Selecionar outro exercício",
    backToHomeAbout: isEn ? "Select an exercise" : "Selecionar um exercício",
    homeTitle: isEn ? "Choose an exercise" : "Escolha um exercício",
    homeSubtitle: isEn
      ? "Select a practice mode to begin. New exercise types can be added here."
      : "Selecione uma modalidade para começar. Novos tipos de exercício podem ser adicionados aqui.",
    homeIgnorance: isEn ? "Decisions under ignorance" : "Decisões sob ignorância",
    homeIgnoranceBadge: isEn ? "Solution methods" : "MÉTODOS DE SOLUÇÃO",
    homeIgnoranceIcon: isEn ? "DT" : "TD",
    homeGameTheory: isEn ? "Game Theory" : "Teoria dos Jogos",
    homeGameTheoryBadge: isEn ? "Nash equilibrium" : "Equilíbrio de Nash",
    homeGameTheoryIcon: isEn ? "GT" : "TJ",
    homeAbout: isEn ? "About" : "Sobre",
    homeAboutBadge: isEn ? "Learn more about this project" : "Saiba mais sobre este projeto",
    comingSoon: isEn ? "Coming soon" : "Em breve",
    exerciseTab: isEn ? "💪 Exercise" : "💪 Exercício",
    solutionTab: isEn ? "🤓 Solution" : "🤓 Solução",
    sidebarTitle: isEn ? "Exercise parameters" : "Parâmetros do exercício",
    solutionMethod: isEn ? "Solution Method" : "Método de solução",
    decisionAlternatives: isEn ? "Decision Alternatives" : "Alternativas de decisão",
    statesWorld: isEn ? "States of the World" : "Estados do mundo",
    precision: isEn ? "Payoff precision" : "Precisão dos payoffs",
    generate: isEn ? "Generate Problem" : "Gerar problema",
    exerciseIntro:
      isEn
        ? "Choose the desired exercise parameters and press the button 'Generate Problem' to begin the exercise."
        : "Escolha os parâmetros desejados e pressione 'Gerar problema' para iniciar o exercício.",
    aboutTitle: isEn ? "About" : "Sobre",
    aboutText: isEn
      ? `
        <p style="line-height: 180%; margin-bottom: 15px;">
          This app was designed so that Law students at <a href="https://direitorio.fgv.br/">FGV's Rio de Janeiro Law School</a>
          could practice some of the concepts they are learning in their 2nd year course on Decision Theory.
          Because it is a course designed for students that do not possess graduate-level math skills, the course is not intended
          to provide a deep mathematical understanding of Decision Theory. Instead, the focus of the course is to give a general
          overview of the field, introducing students to some of the merits and challenges of Decision Theory, specially as it
          relates to legal considerations regarding the consequences of legal decisions and public policy choices.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Nevertheless, the course does offer a first contact with the typical decision problems and solution methods presented by
          Decision Theory, including a brief introduction to Game Theory. By dealing with simple, discrete examples, and focusing
          more on the conceptual foundations of the discipline, our goal is to prepare an interesting and effective introduction to
          Decision Theory. By not shying away completely from the analytical foundations of the discipline, we intend to guide
          students towards a solid understanding of rational choice theory and of its applications to legal problems.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Given these objectives, this app is intended to be a <i>playground</i> or <i>testing field</i> where students can go to
          practice some of the concepts they learned during classes. It is an ambitious project, that will be implemented gradually
          and will probably have to be revised many times in the future by its sole active developer. Currently, the app only has a
          couple of exercise-types that deal with decisions under ignorance. In the future, I hope to include many more options,
          making the experience a little richer for the students that decide to visit the app.
        </p>
      `
      : `
        <p style="line-height: 180%; margin-bottom: 15px;">
          Este app foi desenvolvido para que alunos de Direito da <a href="https://direitorio.fgv.br/">FGV Direito Rio</a>
          possam praticar alguns dos conceitos aprendidos na disciplina de Teoria da Decisão. Como é um curso voltado a estudantes
          sem formação matemática avançada, o foco não é aprofundar o conteúdo técnico, mas apresentar um panorama do campo e seus
          principais desafios, especialmente no que diz respeito às consequências de decisões jurídicas e escolhas de políticas públicas.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Ainda assim, o curso oferece um primeiro contato com problemas e métodos típicos da Teoria da Decisão, incluindo uma breve
          introdução à Teoria dos Jogos. Ao trabalhar com exemplos simples e discretos e dar ênfase às bases conceituais, nosso objetivo
          é oferecer uma introdução interessante e efetiva, preparando os alunos para compreender a teoria da escolha racional e suas
          aplicações a problemas jurídicos.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Diante desses objetivos, este app funciona como um <i>laboratório</i> onde os alunos podem praticar os conceitos vistos em sala.
          É um projeto ambicioso, implementado gradualmente e sujeito a revisões futuras. Atualmente, o app cobre apenas alguns tipos de
          exercícios sobre decisões sob ignorância. No futuro, esperamos incluir novas opções e enriquecer a experiência.
        </p>
      `,
  };

  const solutionTexts = isEn
    ? {
        lexical: "Lexical",
        problemTitle: "Problem",
        problemLead: "Solve the decision under ignorance problem represented in the table below using the",
        methodSuffix: "method.",
        optimismHint: "In your solution, use a level of optimism of",
        solutionStatus: "Problem resolution status",
        bestDecision: "Best Decision",
        tiedSolutions: "Tied Solutions",
        stepsTaken: "Steps Taken",
        maximinSingle: "A single best Lexical Maximin solution was found",
        maximinTie: "Lexical Maximin method was unable to produce a single best decision",
        maximinValue: "Maximin Value",
        maximinLast: "Last Maximin Value Used",
        minimaxSingle: "A single best Lexical Minimax solution was found",
        minimaxTie: "Lexical Minimax method was unable to produce a single best decision",
        minimaxValue: "Minimax Regret Value",
        minimaxLast: "Last Minimum Regret Value Used",
        oprSingle: "A single best solution was found by the Optimism-Pessimism Rule",
        oprTie: "The Optimism-Pessimism Rule was unable to produce a single best decision",
        pirSingle: "A single best solution was found by the Principle of Insufficient Reason",
        pirTie: "The Principle of Insufficient Reason was unable to produce a single best decision",
        bestValue: "Best Decision Value",
        optimismLevel: "Level of Optimism",
        solutionFor: "Solution for",
        solutionForA: "Solution for a",
        problemSuffix: "problem",
        maximinTableTitle: "Problem Table with Values Ordered by Minimums",
        minimaxTableTitle: "Regret Table and Values Ordered by Maximum Regret",
        evaluationTableTitle: "Problem Table with Decision Evaluations",
      }
    : {
        lexical: "Lexical",
        problemTitle: "Problema",
        problemLead:
          "Resolva o problema de decisão sob ignorância representado na tabela abaixo usando o método",
        methodSuffix: ".",
        optimismHint: "Na sua solução, use um nível de otimismo de",
        solutionStatus: "Status da resolução do problema",
        bestDecision: "Melhor decisão",
        tiedSolutions: "Soluções empatadas",
        stepsTaken: "Passos realizados",
        maximinSingle: "Foi encontrada uma única solução Lexical Maximin",
        maximinTie: "O método Lexical Maximin não produziu uma única melhor decisão",
        maximinValue: "Valor Maximin",
        maximinLast: "Último valor Maximin utilizado",
        minimaxSingle: "Foi encontrada uma única solução Lexical Minimax",
        minimaxTie: "O método Lexical Minimax não produziu uma única melhor decisão",
        minimaxValue: "Valor de arrependimento Minimax",
        minimaxLast: "Último valor mínimo de arrependimento utilizado",
        oprSingle: "Foi encontrada uma única melhor solução pela Regra Otimismo-Pessimismo",
        oprTie: "A Regra Otimismo-Pessimismo não produziu uma única melhor decisão",
        pirSingle: "Foi encontrada uma única melhor solução pelo Princípio da Razão Insuficiente",
        pirTie: "O Princípio da Razão Insuficiente não produziu uma única melhor decisão",
        bestValue: "Valor da melhor decisão",
        optimismLevel: "Nível de otimismo",
        solutionFor: "Solução para o problema",
        solutionForA: "Solução para um problema",
        problemSuffix: "",
        maximinTableTitle: "Tabela do problema com valores ordenados pelos mínimos",
        minimaxTableTitle: "Tabela de arrependimento com valores ordenados pelo arrependimento máximo",
        evaluationTableTitle: "Tabela do problema com avaliação das decisões",
      };

  const gameTexts = isEn
    ? {
        title: "Game theory: Nash equilibrium",
        sidebarTitle: "Game parameters",
        exerciseType: "Exercise",
        exerciseTypeOption: "Pure-strategy Nash equilibrium",
        rowStrategies: "Row player strategies",
        colStrategies: "Column player strategies",
        precision: "Payoff precision",
        generate: "Generate game",
        exerciseIntro: "Identify the pure-strategy Nash equilibrium(s) in the game below.",
        problemTitle: "Game",
        problemLead: "Find the Nash equilibrium(s) in pure strategies.",
        payoffNote: "Payoffs are shown as (Player 1, Player 2).",
        solutionTitle: "Solution for the Nash equilibrium",
        bestResponsesRow: "Best responses of Player 1 (rows) to each column strategy",
        bestResponsesCol: "Best responses of Player 2 (columns) to each row strategy",
        nashEquilibria: "Nash equilibria",
        noEquilibria: "No pure-strategy Nash equilibrium found",
        legendRow: "Underlined blue values are Player 1 best responses.",
        legendCol: "Underlined purple values are Player 2 best responses.",
        legendNash: "Green cells are Nash equilibria.",
        matrixHeader: "P1 \\ P2",
        matrixTitle: "Payoff matrix with Nash equilibria highlighted",
        rowPrefix: "R",
        colPrefix: "C",
        noneLabel: "None",
      }
    : {
        title: "Teoria dos jogos: equilíbrio de Nash",
        sidebarTitle: "Parâmetros do jogo",
        exerciseType: "Exercício",
        exerciseTypeOption: "Equilíbrio de Nash em estratégias puras",
        rowStrategies: "Estratégias do jogador das linhas",
        colStrategies: "Estratégias do jogador das colunas",
        precision: "Precisão dos payoffs",
        generate: "Gerar jogo",
        exerciseIntro: "Identifique o(s) equilíbrio(s) de Nash em estratégias puras no jogo abaixo.",
        problemTitle: "Jogo",
        problemLead: "Encontre o(s) equilíbrio(s) de Nash em estratégias puras.",
        payoffNote: "Os payoffs estão no formato (Jogador 1, Jogador 2).",
        solutionTitle: "Solução para o equilíbrio de Nash",
        bestResponsesRow: "Melhores respostas do Jogador 1 (linhas) para cada estratégia de coluna",
        bestResponsesCol: "Melhores respostas do Jogador 2 (colunas) para cada estratégia de linha",
        nashEquilibria: "Equilíbrios de Nash",
        noEquilibria: "Nenhum equilíbrio de Nash em estratégias puras foi encontrado",
        legendRow: "Valores sublinhados em azul são melhores respostas do Jogador 1.",
        legendCol: "Valores sublinhados em roxo são melhores respostas do Jogador 2.",
        legendNash: "Células verdes são equilíbrios de Nash.",
        matrixHeader: "J1 \\ J2",
        matrixTitle: "Matriz de payoffs com equilíbrios de Nash destacados",
        rowPrefix: "L",
        colPrefix: "C",
        noneLabel: "Nenhuma",
      };

  const tableLabels = {
    decisions: isEn ? "Decisions" : "Decisões",
    orderedValues: isEn ? "Ordered Values" : "Valores Ordenados",
    decisionEvaluation: isEn ? "Decision Evaluation" : "Avaliação da Decisão",
  };

  mount.innerHTML = `
    <section class="exercises-fullbleed">
      <div class="exercises-surface">
        <header class="exercises-header">
          <div>
            <h1 class="exercises-title">${labels.title}</h1>
            <p class="exercises-subtitle">${labels.subtitle}</p>
          </div>
          <button
            class="exercises-link-btn"
            type="button"
            data-home-link="true"
            data-home-label="${labels.backToHome}"
            data-about-label="${labels.backToHomeAbout}"
          >
            ${labels.backToHome}
          </button>
        </header>

        <div class="exercises-tab-panel" data-panel="home">
          <div class="exercises-home">
            <h2 style="margin-top: 0;">${labels.homeTitle}</h2>
            <p class="exercises-subtitle">${labels.homeSubtitle}</p>
            <div class="exercises-home-grid">
              <button class="exercises-home-card" data-home="dui" type="button">
                <div class="exercises-home-icon">${labels.homeIgnoranceIcon}</div>
                <div class="exercises-home-title">${labels.homeIgnorance}</div>
                <div class="exercises-home-badge">${labels.homeIgnoranceBadge}</div>
              </button>
              <button class="exercises-home-card" data-home="game" type="button">
                <div class="exercises-home-icon">${labels.homeGameTheoryIcon}</div>
                <div class="exercises-home-title">${labels.homeGameTheory}</div>
                <div class="exercises-home-badge">${labels.homeGameTheoryBadge}</div>
              </button>
              <button class="exercises-home-card" data-home="about" type="button">
                <div class="exercises-home-icon">i</div>
                <div class="exercises-home-title">${labels.homeAbout}</div>
                <div class="exercises-home-badge">${labels.homeAboutBadge}</div>
              </button>
            </div>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="dui">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 style="margin-top: 0; color: ${COLORS.darkerBlue};">${labels.sidebarTitle}</h3>
              <hr />
              <label class="exercises-label">${labels.solutionMethod}</label>
              <select id="exercise_type" class="exercises-select">
                ${EXERCISE_TYPES.map(
                  (type) => `<option value="${type.value}">${type.label[lang]}</option>`
                ).join("")}
              </select>

              <label class="exercises-label" style="margin-top: 12px;">
                ${labels.decisionAlternatives}
                <span id="decision_value" class="exercises-slider-value">5</span>
              </label>
              <input id="num_decisions" type="range" min="2" max="8" step="1" value="5" />

              <label class="exercises-label" style="margin-top: 12px;">
                ${labels.statesWorld}
                <span id="states_value" class="exercises-slider-value">5</span>
              </label>
              <input id="num_states" type="range" min="2" max="8" step="1" value="5" />

              <label class="exercises-label" style="margin-top: 12px;">${labels.precision}</label>
              <select id="value_precision" class="exercises-select">
                ${[1, 2, 4, 5, 10]
                  .map((val) => `<option value="${val}" ${val === 5 ? "selected" : ""}>${val}</option>`)
                  .join("")}
              </select>

              <button id="generate_btn" class="exercises-cta" type="button">
                ${labels.generate}
              </button>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${labels.exerciseIntro}</p>
                <div id="problem_description"></div>
                <div id="problem_table"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${labels.exerciseIntro}</p>
                <div id="solution_header"></div>
                <div id="solution_table"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="game">
          <div class="exercises-grid">
            <aside class="exercises-sidebar">
              <h3 style="margin-top: 0; color: ${COLORS.darkerBlue};">${gameTexts.sidebarTitle}</h3>
              <hr />
              <label class="exercises-label">${gameTexts.exerciseType}</label>
              <select id="game_exercise_type" class="exercises-select">
                ${GAME_EXERCISE_TYPES.map(
                  (type) => `<option value="${type.value}">${type.label[lang]}</option>`
                ).join("")}
              </select>

              <label class="exercises-label" style="margin-top: 12px;">
                ${gameTexts.rowStrategies}
                <span id="game_rows_value" class="exercises-slider-value">3</span>
              </label>
              <input id="game_num_rows" type="range" min="2" max="6" step="1" value="3" />

              <label class="exercises-label" style="margin-top: 12px;">
                ${gameTexts.colStrategies}
                <span id="game_cols_value" class="exercises-slider-value">3</span>
              </label>
              <input id="game_num_cols" type="range" min="2" max="6" step="1" value="3" />

              <label class="exercises-label" style="margin-top: 12px;">${gameTexts.precision}</label>
              <select id="game_value_precision" class="exercises-select">
                ${[1, 2, 4, 5, 10]
                  .map((val) => `<option value="${val}" ${val === 5 ? "selected" : ""}>${val}</option>`)
                  .join("")}
              </select>

              <button id="game_generate_btn" class="exercises-cta" type="button">
                ${gameTexts.generate}
              </button>
            </aside>

            <main class="exercises-main">
              <div class="exercises-subtabs">
                <button class="exercises-subtab-btn active" data-subtab="exercise" type="button">
                  ${labels.exerciseTab}
                </button>
                <button class="exercises-subtab-btn" data-subtab="solution" type="button">
                  ${labels.solutionTab}
                </button>
              </div>

              <div class="exercises-subtab-panel" data-subpanel="exercise">
                <p class="exercises-placeholder">${gameTexts.exerciseIntro}</p>
                <div id="game_problem_description"></div>
                <div id="game_problem_table"></div>
              </div>

              <div class="exercises-subtab-panel hidden" data-subpanel="solution">
                <p class="exercises-placeholder">${gameTexts.exerciseIntro}</p>
                <div id="game_solution_header"></div>
                <div id="game_solution_table"></div>
              </div>
            </main>
          </div>
        </div>

        <div class="exercises-tab-panel hidden" data-panel="about">
          <div class="exercises-about">
            <h2 style="margin-top: 0;">${labels.aboutTitle}</h2>
            <hr />
            ${labels.aboutText}
          </div>
        </div>
      </div>
    </section>
  `;

  const duiPanel = mount.querySelector('[data-panel="dui"]');
  const gamePanel = mount.querySelector('[data-panel="game"]');

  return {
    els: {
      tabPanels: Array.from(mount.querySelectorAll(".exercises-tab-panel")),
      homeButtons: Array.from(mount.querySelectorAll(".exercises-home-card[data-home]")),
      homeLink: mount.querySelector("[data-home-link]"),
      dui: {
        panel: duiPanel,
        subtabButtons: Array.from(duiPanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(duiPanel.querySelectorAll(".exercises-subtab-panel")),
        exerciseType: mount.querySelector("#exercise_type"),
        numDecisions: mount.querySelector("#num_decisions"),
        numStates: mount.querySelector("#num_states"),
        decisionValue: mount.querySelector("#decision_value"),
        statesValue: mount.querySelector("#states_value"),
        valuePrecision: mount.querySelector("#value_precision"),
        generateBtn: mount.querySelector("#generate_btn"),
        problemDescription: mount.querySelector("#problem_description"),
        problemTable: mount.querySelector("#problem_table"),
        solutionHeader: mount.querySelector("#solution_header"),
        solutionTable: mount.querySelector("#solution_table"),
        placeholders: Array.from(duiPanel.querySelectorAll(".exercises-placeholder")),
      },
      game: {
        panel: gamePanel,
        subtabButtons: Array.from(gamePanel.querySelectorAll(".exercises-subtab-btn")),
        subtabPanels: Array.from(gamePanel.querySelectorAll(".exercises-subtab-panel")),
        exerciseType: mount.querySelector("#game_exercise_type"),
        numRows: mount.querySelector("#game_num_rows"),
        numCols: mount.querySelector("#game_num_cols"),
        rowValue: mount.querySelector("#game_rows_value"),
        colValue: mount.querySelector("#game_cols_value"),
        valuePrecision: mount.querySelector("#game_value_precision"),
        generateBtn: mount.querySelector("#game_generate_btn"),
        problemDescription: mount.querySelector("#game_problem_description"),
        problemTable: mount.querySelector("#game_problem_table"),
        solutionHeader: mount.querySelector("#game_solution_header"),
        solutionTable: mount.querySelector("#game_solution_table"),
        placeholders: Array.from(gamePanel.querySelectorAll(".exercises-placeholder")),
      },
    },
    texts: solutionTexts,
    tableLabels,
    gameTexts,
    exerciseLabels: Object.fromEntries(
      EXERCISE_TYPES.map((type) => [type.value, type.label[lang]])
    ),
    surface: mount.querySelector(".exercises-surface"),
  };
}

/**
 * @param {HTMLElement[]} subtabButtons
 * @param {HTMLElement[]} subtabPanels
 * @returns {void}
 */
function wireSubtabs(subtabButtons, subtabPanels) {
  subtabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.subtab;
      subtabButtons.forEach((b) => b.classList.toggle("active", b === btn));
      subtabPanels.forEach((panel) => {
        panel.classList.toggle("hidden", panel.dataset.subpanel !== tab);
      });
    });
  });
}

/**
 * App entry point for the central router.
 * @param {HTMLElement} mount
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {Promise<void>}
 */
export async function mountApp(mount, { lang }) {
  ensureAppStyles();

  const ui = renderPage(mount, { lang });
  let levelOfOptimism = 0;

  const setMainPanel = (panel) => {
    ui.els.tabPanels.forEach((p) => {
      p.classList.toggle("hidden", p.dataset.panel !== panel);
    });
    if (ui.surface) {
      ui.surface.classList.toggle("is-home", panel === "home");
    }
    if (ui.els.homeLink) {
      const { homeLabel, aboutLabel } = ui.els.homeLink.dataset;
      const nextLabel = panel === "about" ? aboutLabel : homeLabel;
      if (nextLabel) {
        ui.els.homeLink.textContent = nextLabel;
      }
    }
  };

  const updateDuiRangeLabels = () => {
    ui.els.dui.decisionValue.textContent = ui.els.dui.numDecisions.value;
    ui.els.dui.statesValue.textContent = ui.els.dui.numStates.value;
  };

  const updateGameRangeLabels = () => {
    ui.els.game.rowValue.textContent = ui.els.game.numRows.value;
    ui.els.game.colValue.textContent = ui.els.game.numCols.value;
  };

  const updateOptimismLevel = () => {
    if (ui.els.dui.exerciseType.value === "Optimism-Pessimism Rule") {
      levelOfOptimism = generateOprLevel();
    } else {
      levelOfOptimism = 0;
    }
  };

  updateDuiRangeLabels();
  updateGameRangeLabels();
  updateOptimismLevel();

  setMainPanel("home");

  ui.els.homeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setMainPanel(btn.dataset.home);
    });
  });

  if (ui.els.homeLink) {
    ui.els.homeLink.addEventListener("click", () => {
      setMainPanel("home");
    });
  }

  wireSubtabs(ui.els.dui.subtabButtons, ui.els.dui.subtabPanels);
  wireSubtabs(ui.els.game.subtabButtons, ui.els.game.subtabPanels);

  ui.els.dui.numDecisions.addEventListener("input", updateDuiRangeLabels);
  ui.els.dui.numStates.addEventListener("input", updateDuiRangeLabels);
  ui.els.dui.exerciseType.addEventListener("change", updateOptimismLevel);

  ui.els.dui.generateBtn.addEventListener("click", () => {
    const exerciseType = ui.els.dui.exerciseType.value;
    const exerciseLabel = ui.exerciseLabels[exerciseType] ?? exerciseType;
    const numDecisions = Number(ui.els.dui.numDecisions.value);
    const numStates = Number(ui.els.dui.numStates.value);
    const valuePrecision = Number(ui.els.dui.valuePrecision.value);

    const problemTable = createDuiTable(numDecisions, numStates, valuePrecision, ui.tableLabels);

    let solutionData;
    if (exerciseType === "Maximin") {
      solutionData = solveMaximin(problemTable, ui.tableLabels);
    } else if (exerciseType === "Minimax") {
      solutionData = solveMinimax(problemTable, ui.tableLabels);
    } else if (exerciseType === "Optimism-Pessimism Rule") {
      solutionData = solveOpr(problemTable, levelOfOptimism, ui.tableLabels);
    } else {
      solutionData = solvePir(problemTable, ui.tableLabels);
    }

    ui.els.dui.placeholders.forEach((el) => (el.style.display = "none"));

    ui.els.dui.problemDescription.innerHTML = describeProblem(
      exerciseType,
      exerciseLabel,
      levelOfOptimism,
      ui.texts
    );
    renderTable(ui.els.dui.problemTable, problemTable);

    ui.els.dui.solutionHeader.innerHTML = buildSolutionHeader(
      exerciseType,
      exerciseLabel,
      solutionData.solution,
      levelOfOptimism,
      ui.texts
    );

    const highlightIndex = solutionData.table.headers.findIndex((header) =>
      [ui.tableLabels.orderedValues, ui.tableLabels.decisionEvaluation].includes(header)
    );
    renderTable(ui.els.dui.solutionTable, solutionData.table, { highlightIndex });
  });

  ui.els.game.numRows.addEventListener("input", updateGameRangeLabels);
  ui.els.game.numCols.addEventListener("input", updateGameRangeLabels);

  ui.els.game.generateBtn.addEventListener("click", () => {
    const numRows = Number(ui.els.game.numRows.value);
    const numCols = Number(ui.els.game.numCols.value);
    const valuePrecision = Number(ui.els.game.valuePrecision.value);

    const game = createGameTable(numRows, numCols, valuePrecision, ui.gameTexts);
    const analysis = analyzeGameForNash(game);
    const solutionTable = buildGameSolutionTable(game, analysis, ui.gameTexts);

    ui.els.game.placeholders.forEach((el) => (el.style.display = "none"));

    ui.els.game.problemDescription.innerHTML = describeGameProblem(ui.gameTexts);
    renderTable(ui.els.game.problemTable, game.table);

    ui.els.game.solutionHeader.innerHTML = buildGameSolutionHeader(
      game,
      analysis,
      ui.gameTexts
    );
    renderTable(ui.els.game.solutionTable, solutionTable.table, {
      cellClasses: solutionTable.cellClasses,
    });
  });
}
