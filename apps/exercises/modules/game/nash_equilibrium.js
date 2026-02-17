// ============================================================================
// Game Theory Module
// ============================================================================

import { randomIntInclusive } from "../shared/utils.js";
import { GAME_EXERCISES } from "./registry.js";

export const GAME_EXERCISE_TYPES = GAME_EXERCISES;

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

function alphabetLabel(index) {
  let n = index;
  let label = "";
  while (n >= 0) {
    label = String.fromCharCode(65 + (n % 26)) + label;
    n = Math.floor(n / 26) - 1;
  }
  return label;
}

function buildStrategyLabels(count, offset) {
  return Array.from({ length: count }, (_, i) => alphabetLabel(offset + i));
}

export function buildGameTexts(lang) {
  const isEn = lang === "en";
  return isEn
      ? {
        title: "Game theory: Nash equilibrium",
        sidebarTitle: "Game parameters",
        rowStrategies: "Player 1 strategies (rows)",
        colStrategies: "Player 2 strategies (columns)",
        precision: "Payoff precision",
        generateTab: "🚀 Generate game",
        generate: "Generate game",
        exerciseIntro: "Generate the decision tree to start the exercise.",
        solutionIntro: "Generate the game to see its solution here.",
        problemTitle: "Game",
        problemLead: "Find the Nash equilibrium(s) in pure strategies.",
        payoffNote: "Payoffs are shown as (Player 1, Player 2).",
        explainerTitle: "Finding Nash equilibria in pure strategies",
        explainerIntro:
          "A pure-strategy Nash equilibrium occurs when each player is simultaneously choosing a best response to the other player’s strategy. At that point, neither player has an incentive to unilaterally change their strategy, because any change would make their payoff worse (or not better) given what the other is doing. That is why it is considered a stable solution to the game.",
        explainerLogic:
          "Mark the best responses of each player; the cells that are best responses for both players at the same time are Nash equilibria.",
        logicLabel: "Logic",
        stepsLabel: "Steps",
        toggleShow: "View explanation",
        toggleHide: "Hide explanation",
        toggleShowShort: "View",
        toggleHideShort: "Hide",
        explainerSteps: [
          "For each Player 2 strategy (columns), identify the Player 1 responses with the highest payoffs. That is, to find Player 1’s best responses to Player 2’s strategies, compare the first value in each cell down the columns, underlining the highest value(s) in each column.",
          "Then, for each Player 1 strategy (rows), identify the Player 2 responses with the highest payoffs. Now, to find Player 2’s best responses to Player 1’s strategies, compare the second value in each cell across the rows, underlining the highest value(s) in each row.",
          "Cells that are best responses for both players simultaneously are Nash equilibria in pure strategies.",
          "If no cell satisfies both conditions, there is no pure-strategy Nash equilibrium.",
        ],
        solutionTitle: "Solution for the Nash equilibrium",
        bestResponsesRow: "Best responses of Player 1 (rows) to each Player 2 strategy (columns)",
        bestResponsesCol: "Best responses of Player 2 (columns) to each Player 1 strategy (rows)",
        nashEquilibria: "Nash equilibria",
        noEquilibria: "No pure-strategy Nash equilibrium found",
        legendResponses:
          "Underlined and bold values indicate the best responses of Player 1 and Player 2.",
        legendNash: "Light yellow cells are Nash equilibria.",
        matrixHeader: "P1 | P2",
        matrixTitle: "Payoff matrix with Nash equilibria highlighted",
        noneLabel: "None",
      } 
    : {
        title: "Teoria dos jogos: equilíbrio de Nash",
        sidebarTitle: "Parâmetros do jogo",
        rowStrategies: "Estratégias do Jogador 1 (linhas)",
        colStrategies: "Estratégias do Jogador 2 (colunas)",
        precision: "Precisão dos payoffs",
        generateTab: "🚀 Gerar jogo",
        generate: "Gerar jogo",
        exerciseIntro: "Gere a árvore de decisão para iniciar o exercício.",
        solutionIntro: "Gere o jogo para visualizar sua solução aqui.",
        problemTitle: "Jogo",
        problemLead: "Encontre o(s) equilíbrio(s) de Nash em estratégias puras.",
        payoffNote: "Os payoffs estão no formato (Jogador 1, Jogador 2).",
        explainerTitle: "Encontrando equilíbrios de Nash em estratégias puras",
        explainerIntro:
          "Um equilíbrio de Nash em estratégias puras ocorre quando cada jogador escolhe, simultaneamente, uma melhor resposta à estratégia do outro jogador. Nesse ponto, nenhum jogador tem incentivo a mudar unilateralmente sua estratégia, pois qualquer mudança pioraria (ou não melhoraria) seu payoff dado o que o outro está fazendo. Por isso, é considerado uma solução estável do jogo.",
        explainerLogic:
          "Marque as melhores respostas de cada jogador; as células que são melhores respostas para ambos ao mesmo tempo são equilíbrios de Nash.",
        logicLabel: "Lógica",
        stepsLabel: "Passos",
        toggleShow: "Visualizar a explicação",
        toggleHide: "Ocultar explicação",
        toggleShowShort: "Visualizar",
        toggleHideShort: "Ocultar",
        explainerSteps: [
          "Para cada estratégia do Jogador 2 (colunas), identifique as respostas do Jogador 1 que possuem os maiores payoffs. Ou seja, para encontrar as melhores respostas do Jogador 1 às estratégias do Jogador 2, você deve comparar o primeiro valor de cada célula das colunas, sublinhando sempre o(s) maior(es) valor(es) comparados em cada coluna.",
          "Em seguida, para cada estratégia do Jogador 1 (linhas), identifique as respostas do Jogador 2 que possuem os maiores payoffs. Agora, para encontrar as melhores respostas do Jogador 2 às estratégias do Jogador 1, você deve comparar o segundo valor de cada célula das linhas, sublinhando sempre o(s) maior(es) valor(es) comparados em cada linha.",
          "As células que são melhores respostas para ambos simultaneamente são equilíbrios de Nash em estratégias puras.",
          "Se nenhuma célula satisfizer as duas condições, não há equilíbrio de Nash em estratégias puras.",
        ],
        solutionTitle: "Solução para o equilíbrio de Nash",
        bestResponsesRow: "Melhores respostas do Jogador 1 (linhas) para cada estratégia do Jogador 2 (colunas)",
        bestResponsesCol: "Melhores respostas do Jogador 2 (colunas) para cada estratégia do Jogador 1 (linhas)",
        nashEquilibria: "Equilíbrios de Nash",
        noEquilibria: "Nenhum equilíbrio de Nash em estratégias puras foi encontrado",
        legendResponses:
          "Valores sublinhados e em negrito indicam as melhores respostas do Jogador 1 e do Jogador 2.",
        legendNash: "Células em amarelo claro são equilíbrios de Nash.",
        matrixHeader: "J1 | J2",
        matrixTitle: "Matriz de payoffs com equilíbrios de Nash destacados",
        noneLabel: "Nenhuma",
      };
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
export function createGameTable(numRows, numCols, valuePrecision, texts, rng = Math.random) {
  const rowStrategies = buildStrategyLabels(numRows, 0);
  const colStrategies = buildStrategyLabels(numCols, numRows);
  const rowLabels = rowStrategies.map((label) => wrapPlayer(label, PLAYER_ONE_CLASS));
  const colLabels = colStrategies.map((label) => wrapPlayer(label, PLAYER_TWO_CLASS));
  const maxVal = Math.floor(200 / valuePrecision);

  const payoffs = rowStrategies.map(() =>
    colStrategies.map(() => ({
      row: randomIntInclusive(0, maxVal, rng) * valuePrecision,
      col: randomIntInclusive(0, maxVal, rng) * valuePrecision,
    }))
  );

  const headers = [buildMatrixHeader(texts), ...colLabels];
  const rows = rowStrategies.map((rowLabel, rowIndex) => {
    const payoffCells = colStrategies.map((_, colIndex) => {
      const cell = payoffs[rowIndex][colIndex];
      return formatPayoffCell(cell.row, cell.col);
    });
    return [wrapPlayer(rowLabel, PLAYER_ONE_CLASS), ...payoffCells];
  });

  return {
    table: { headers, rows },
    payoffs,
    rowStrategies,
    colStrategies,
    rowLabels,
    colLabels,
  };
}

/**
 * @param {{payoffs: {row: number, col: number}[][], rowStrategies: string[], colStrategies: string[]}} game
 * @returns {{rowBest: boolean[][], colBest: boolean[][], nash: boolean[][], nashCells: string[][], bestResponsesRow: string[][], bestResponsesCol: string[][]}}
 */
export function analyzeGameForNash(game) {
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
export function buildGameSolutionTable(game, analysis, texts) {
  const rowLabels = game.rowLabels ?? game.rowStrategies;
  const colLabels = game.colLabels ?? game.colStrategies;
  const headers = [buildMatrixHeader(texts), ...colLabels];
  const rows = rowLabels.map((rowLabel, rowIndex) => {
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
export function describeGameProblem(texts) {
  return `
    <h2 class="exercises-section-title">${texts.problemTitle}</h2>
    <p class="exercises-lead"><b>${texts.problemLead}</b></p>
    <p class="exercises-lead">${texts.payoffNote}</p>
  `;
}

/**
 * @param {{rowStrategies: string[], colStrategies: string[]}} game
 * @param {{bestResponsesRow: string[][], bestResponsesCol: string[][], nashCells: string[][]}} analysis
 * @param {object} texts
 * @returns {string}
 */
export function buildGameSolutionHeader(game, analysis, texts) {
  const explainerSteps = (texts.explainerSteps || [])
    .map((step) => `<li>${step}</li>`)
    .join("");
  const explainer = `
    <details class="exercises-explainer">
      <summary class="exercises-explainer-summary">
        <span class="exercises-explainer-title">${texts.explainerTitle}</span>
        <span class="exercises-explainer-toggle">
          <span class="when-closed">
            <span class="toggle-long">${texts.toggleShow}</span>
            <span class="toggle-short">${texts.toggleShowShort}</span>
          </span>
          <span class="when-open">
            <span class="toggle-long">${texts.toggleHide}</span>
            <span class="toggle-short">${texts.toggleHideShort}</span>
          </span>
        </span>
      </summary>
      <div class="exercises-explainer-body">
        <p>${texts.explainerIntro}</p>
        <p><b>${texts.logicLabel ?? "Lógica"}:</b> ${texts.explainerLogic}</p>
        <p><b>${texts.stepsLabel}:</b></p>
        <ol>${explainerSteps}</ol>
      </div>
    </details>
  `;

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
    ${explainer}
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${texts.solutionTitle}</h3>
      <hr class="exercises-solution-divider" />
      <p><b>${texts.bestResponsesRow}</b></p>
      <ul class="exercises-compact-list">${rowResponseItems}</ul>
      <p><b>${texts.bestResponsesCol}</b></p>
      <ul class="exercises-compact-list">${colResponseItems}</ul>
      <p><b>${texts.nashEquilibria}:</b> ${nashText}</p>
      <p class="exercises-legend">
        ${texts.legendResponses}<br />${texts.legendNash}
      </p>
    </div>
    <h3 class="exercises-solution-subtitle">${texts.matrixTitle}</h3>
  `;
}
