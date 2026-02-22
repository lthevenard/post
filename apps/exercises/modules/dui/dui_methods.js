// ============================================================================
// Decision Under Ignorance (DUI) Module
// ============================================================================

import { randomIntInclusive } from "../shared/utils.js";
import { DUI_METHODS } from "./registry.js";

export const EXERCISE_TYPES = DUI_METHODS;

export function buildDuiCopy(lang) {
  const isEn = lang === "en";

  const duiLabels = {
    sidebarTitle: isEn ? "Exercise parameters" : "Parâmetros do exercício",
    solutionMethod: isEn ? "Solution Method" : "Método de solução",
    decisionAlternatives: isEn ? "Decision Alternatives" : "Alternativas de decisão",
    statesWorld: isEn ? "States of the World" : "Estados do mundo",
    precision: isEn ? "Payoff precision" : "Precisão dos payoffs",
    generateTab: isEn ? "🚀 Generate Exercise" : "🚀 Gerar Exercício",
    generate: isEn ? "Generate Exercise" : "Gerar Exercício",
    exerciseIntro: isEn
      ? "Generate the decision problem to start the exercise."
      : "Gere o problema de decisão para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the problem to see its solution here."
      : "Gere o problema para visualizar sua solução aqui.",
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

  const explainerTexts = isEn
    ? {
        toggleShow: "View explanation",
        toggleHide: "Hide explanation",
        toggleShowShort: "View",
        toggleHideShort: "Hide",
        logicLabel: "Logic",
        stepsLabel: "Steps",
        calculationTitle: "Calculation for each decision",
        andLabel: "and",
        tiePrefix: "between decisions",
        outcome: {
          decisionSingle: "the chosen decision was",
          decisionPlural: "the chosen decisions were",
          maximinSimple:
            "In this exercise, {decisionClause}. The relevant worst payoff was {value}, the highest among the minima.",
          maximinTieSimple:
            "In this exercise, there is a tie at the first step{tieClause}. {decisionClause}, all with minimum {value}.",
          maximinLexical:
            "Because there was a tie in the first step{tieClause}, the lexical method was applied for {steps} step(s). {decisionClause}, and the last Maximin value compared was {value}.",
          minimaxSimple:
            "In this exercise, {decisionClause}. The relevant maximum regret was {value}, the smallest among the alternatives.",
          minimaxTieSimple:
            "In this exercise, there is a tie at the first step{tieClause}. {decisionClause}, all with maximum regret {value}.",
          minimaxLexical:
            "Because there was a tie in the first step{tieClause}, the lexical method was applied for {steps} step(s). {decisionClause}, and the last minimum regret value compared was {value}.",
          oprSingle:
            "With optimism level α = {level}, the highest evaluation was {value}; {decisionClause}.",
          oprTie:
            "With optimism level α = {level}, there is a tie at {value}; {decisionClause}.",
          pirSingle:
            "Assuming equally likely states, the highest average was {value}; {decisionClause}.",
          pirTie:
            "Assuming equally likely states, there is a tie at {value}; {decisionClause}.",
        },
        methods: {
          Maximin: {
            title: "How to use the Maximin method",
            intro:
              "Maximin is a conservative rule for decisions under ignorance: it chooses the alternative whose worst payoff is as high as possible.",
            logic:
              "Protect yourself against the worst case by comparing the minimum of each alternative. If there is a tie, use the lexical tie-break.",
            tableIntro:
              "Next, we show the payoffs in each decision row ordered from the smallest to the largest. This makes it easier to compare the minimum values of each alternative.",
            steps: [
              "Find the minimum payoff in each decision row.",
              "Compare the minima and keep the decision(s) with the highest minimum.",
              "If more than one decision remains, discard the defeated alternatives and remove only one occurrence of the tied minimum in each remaining row.",
              "Repeat the previous steps with the remaining values until only one decision remains or there are no values left to compare.",
            ],
          },
          Minimax: {
            title: "How to use the Minimax method",
            intro:
              "Minimax (regret) picks the alternative that minimizes the worst possible regret.",
            logic:
              "First build the regret table by subtracting each payoff from the best payoff in its state; then compare the maximum regret of each alternative. If there is a tie, use the lexical tie-break.",
            tableIntro:
              "Next, we show each decision’s regret values ordered from the largest to the smallest. This makes it easier to compare the maximum regret in each alternative.",
            steps: [
              "For each state, compute the best payoff and subtract each payoff to obtain the regret table.",
              "In each decision row, identify the maximum regret.",
              "Choose the decision(s) with the smallest of those maxima.",
              "If tied, apply the lexical procedure: eliminate the defeated alternatives, remove only one occurrence of the tied maximum in the remaining rows, and repeat.",
            ],
          },
          "Optimism-Pessimism Rule": {
            title: "How to use the Optimism–Pessimism Rule",
            intro:
              "The Optimism–Pessimism Rule (Hurwicz) blends the best and worst outcomes using a level of optimism α.",
            logic:
              "Higher α gives more weight to the best outcome; lower α gives more weight to the worst.",
            tableIntro:
              "Next, we show the evaluation value for each decision. The highest evaluation identifies the best alternative.",
            steps: [
              "Find the minimum and maximum payoff in each decision row.",
              "Compute the evaluation value: α·(maximum) + (1 − α)·(minimum).",
              "Choose the decision with the highest evaluation.",
            ],
          },
          "Principle of Insufficient Reason": {
            title: "How to use the Principle of Insufficient Reason",
            intro:
              "The Principle of Insufficient Reason assumes all states are equally likely.",
            logic:
              "With no probability information, treat each state as equiprobable and compare average payoffs.",
            tableIntro:
              "Next, we show the average payoff for each decision. The highest average identifies the best alternative.",
            steps: [
              "Sum the payoffs in each decision row.",
              "Divide by the number of states to get the average payoff.",
              "Choose the decision with the highest average.",
            ],
          },
        },
      }
    : {
        toggleShow: "Visualizar a explicação",
        toggleHide: "Ocultar explicação",
        toggleShowShort: "Visualizar",
        toggleHideShort: "Ocultar",
        logicLabel: "Lógica",
        stepsLabel: "Passos",
        calculationTitle: "Cálculo para cada alternativa",
        andLabel: "e",
        tiePrefix: "entre as decisões",
        outcome: {
          decisionSingle: "a decisão escolhida foi",
          decisionPlural: "as decisões escolhidas foram",
          maximinSimple:
            "Neste exercício, {decisionClause}. O pior resultado relevante foi {value}, o maior entre os mínimos.",
          maximinTieSimple:
            "Neste exercício, houve empate já no primeiro passo{tieClause}. {decisionClause}, todas com mínimo {value}.",
          maximinLexical:
            "Como houve empate no primeiro passo{tieClause}, aplicamos o método léxico por {steps} passo(s). {decisionClause}, e o último valor Maximin comparado foi {value}.",
          minimaxSimple:
            "Neste exercício, {decisionClause}. O maior arrependimento relevante foi {value}, o menor entre as alternativas.",
          minimaxTieSimple:
            "Neste exercício, houve empate já no primeiro passo{tieClause}. {decisionClause}, todas com arrependimento máximo {value}.",
          minimaxLexical:
            "Como houve empate no primeiro passo{tieClause}, aplicamos o método léxico por {steps} passo(s). {decisionClause}, e o último valor mínimo de arrependimento comparado foi {value}.",
          oprSingle:
            "Com nível de otimismo α = {level}, a maior avaliação foi {value}; {decisionClause}.",
          oprTie:
            "Com nível de otimismo α = {level}, houve empate em {value}; {decisionClause}.",
          pirSingle:
            "Assumindo estados equiprováveis, a maior média foi {value}; {decisionClause}.",
          pirTie:
            "Assumindo estados equiprováveis, houve empate em {value}; {decisionClause}.",
        },
        methods: {
          Maximin: {
            title: "Como usar o método Maximin",
            intro:
              "O método Maximin é uma regra conservadora para decisões sob ignorância: ele escolhe a alternativa cujo pior resultado é o melhor entre os piores.",
            logic:
              "A ideia é se proteger do pior cenário comparando os mínimos de cada alternativa. Se houver empate, usamos o método léxico para o desempate.",
            tableIntro:
              "A seguir, mostramos os valores de cada linha (payoffs de cada decisão) ordenados do menor para o maior. Essa visualização facilita a comparação dos menores valores de cada alternativa.",
            steps: [
              "Encontre o menor payoff em cada alternativa.",
              "Compare os mínimos e mantenha a(s) alternativa(s) com o maior desses mínimos.",
              "Se restar mais de uma alternativa, elimine as opções derrotadas e remova apenas uma ocorrência do valor mínimo empatado em cada linha restante.",
              "Repita os passos anteriores com os valores remanescentes até restar uma alternativa, ou não restarem mais valores para comparar.",
            ],
          },
          Minimax: {
            title: "Como usar o método Minimax",
            intro:
              "O método Minimax (arrependimento) escolhe a alternativa que minimiza o pior arrependimento possível.",
            logic:
              "Primeiro criamos a tabela de arrependimento subtraindo cada payoff do melhor payoff daquele estado; depois comparamos o maior arrependimento de cada alternativa. Se houver empate, usamos o método léxico para o desempate.",
            tableIntro:
              "A seguir, mostramos os valores de arrependimento de cada linha ordenados do maior para o menor. Essa visualização facilita a comparação dos maiores arrependimentos de cada alternativa.",
            steps: [
              "Para cada estado, encontre o maior payoff e subtraia cada payoff para obter a tabela de arrependimento.",
              "Em cada alternativa, identifique o maior arrependimento.",
              "Escolha a(s) alternativa(s) com o menor desses máximos.",
              "Se houver empate, aplique o procedimento léxico: elimine as derrotadas, remova apenas uma ocorrência do máximo empatado nas linhas restantes e repita.",
            ],
          },
          "Optimism-Pessimism Rule": {
            title: "Como usar a Regra Otimismo-Pessimismo",
            intro:
              "A Regra de Otimismo-Pessimismo (Hurwicz) combina o melhor e o pior resultado usando um nível de otimismo α.",
            logic:
              "Quanto maior o α, maior o peso do melhor resultado; quanto menor, maior o peso do pior.",
            tableIntro:
              "A seguir, mostramos a avaliação de cada alternativa. A maior avaliação indica a melhor decisão.",
            steps: [
              "Encontre o mínimo e o máximo de cada alternativa.",
              "Calcule o valor de avaliação: α·(máximo) + (1 − α)·(mínimo).",
              "Escolha a alternativa com a maior avaliação.",
            ],
          },
          "Principle of Insufficient Reason": {
            title: "Como usar o Princípio da Razão Insuficiente",
            intro:
              "O Princípio da Razão Insuficiente assume que todos os estados do mundo são igualmente prováveis.",
            logic:
              "Sem informações de probabilidade, tratamos os estados como equiprováveis e comparamos as médias dos payoffs.",
            tableIntro:
              "A seguir, mostramos a média de cada alternativa. A maior média indica a melhor decisão.",
            steps: [
              "Some os payoffs de cada alternativa.",
              "Divida pelo número de estados para obter a média.",
              "Escolha a alternativa com a maior média.",
            ],
          },
        },
      };

  const tableLabels = {
    decisions: isEn ? "Decisions" : "Decisões",
    orderedValues: isEn ? "Ordered Values" : "Valores Ordenados",
    decisionEvaluation: isEn ? "Decision Evaluation" : "Avaliação da Decisão",
  };

  const exerciseLabels = Object.fromEntries(
    DUI_METHODS.map((type) => [type.value, type.label[lang]])
  );

  return {
    duiLabels,
    solutionTexts,
    explainerTexts,
    tableLabels,
    exerciseLabels,
  };
}

/**
 * Generates a random level of optimism (0.20 to 0.70 in steps of 0.05).
 * @returns {number}
 */
export function generateOprLevel(rng = Math.random) {
  const step = randomIntInclusive(4, 14, rng);
  return (step * 5) / 100;
}

/**
 * @param {number} numDecisions
 * @param {number} numStates
 * @param {number} valuePrecision
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
export function createDuiTable(numDecisions, numStates, valuePrecision, labels, rng = Math.random) {
  const decisions = Array.from({ length: numDecisions }, (_, i) => `D${i + 1}`);
  const states = Array.from({ length: numStates }, (_, i) => `S${i + 1}`);
  const maxVal = Math.floor(200 / valuePrecision);

  const rows = decisions.map((decision) => {
    const values = states.map(() => randomIntInclusive(0, maxVal, rng) * valuePrecision);
    return [decision, ...values];
  });

  return {
    headers: [labels.decisions, ...states],
    rows,
  };
}

/**
 * @param {number} min
 * @param {number} max
 * @param {number} step
 * @param {Set<number>} used
 * @param {() => number} rng
 * @returns {number}
 */
function pickValue(min, max, step, used, rng) {
  if (min > max) return min;
  const count = Math.floor((max - min) / step) + 1;
  const tries = Math.min(6, count);
  for (let i = 0; i < tries; i += 1) {
    const value = min + Math.floor(rng() * count) * step;
    if (!used.has(value)) return value;
  }
  for (let i = 0; i < count; i += 1) {
    const value = min + i * step;
    if (!used.has(value)) return value;
  }
  return min;
}

/**
 * @param {number} currentValue
 * @param {number} maxAllowed
 * @param {number} step
 * @param {Set<number>} used
 * @param {() => number} rng
 * @returns {number}
 */
function pickValueAtMost(currentValue, maxAllowed, step, used, rng) {
  const cap = Math.max(0, Math.min(currentValue, maxAllowed));
  const count = Math.floor(cap / step) + 1;
  const tries = Math.min(6, count);
  for (let i = 0; i < tries; i += 1) {
    const value = Math.floor(rng() * count) * step;
    if (!used.has(value)) return value;
  }
  for (let i = count - 1; i >= 0; i -= 1) {
    const value = i * step;
    if (!used.has(value)) return value;
  }
  return cap;
}

/**
 * @param {number} currentValue
 * @param {number} maxAllowed
 * @param {number} step
 * @param {Set<number>} used
 * @param {Set<number>} usedPayoffs
 * @param {number} colMax
 * @param {() => number} rng
 * @returns {number}
 */
function pickValueAtMostWithPayoff(currentValue, maxAllowed, step, used, usedPayoffs, colMax, rng) {
  const cap = Math.max(0, Math.min(currentValue, maxAllowed));
  const count = Math.floor(cap / step) + 1;
  const tries = Math.min(6, count);
  for (let i = 0; i < tries; i += 1) {
    const value = Math.floor(rng() * count) * step;
    if (!used.has(value) && !usedPayoffs.has(colMax - value)) return value;
  }
  for (let i = count - 1; i >= 0; i -= 1) {
    const value = i * step;
    if (!used.has(value) && !usedPayoffs.has(colMax - value)) return value;
  }
  for (let i = count - 1; i >= 0; i -= 1) {
    const value = i * step;
    if (!used.has(value)) return value;
  }
  return cap;
}

/**
 * Ensures a single minimum while avoiding unnecessary repeats.
 * @param {number[]} row
 * @param {number} minValue
 * @param {number} step
 * @param {number} maxValue
 * @param {() => number} rng
 * @returns {{minIndex: number, used: Set<number>}}
 */
function normalizeRowMin(row, minValue, step, maxValue, rng) {
  let minIndex = row.indexOf(minValue);
  if (minIndex === -1) {
    minIndex = Math.floor(rng() * row.length);
  }
  const used = new Set();
  row.forEach((value, index) => {
    if (index === minIndex) {
      row[index] = minValue;
      used.add(minValue);
      return;
    }
    if (value <= minValue) {
      const targetFloorRaw = minValue + step;
      const targetFloor = targetFloorRaw > maxValue ? minValue : targetFloorRaw;
      const newValue = pickValue(targetFloor, maxValue, step, used, rng);
      row[index] = newValue;
      used.add(newValue);
    } else {
      used.add(value);
    }
  });
  return { minIndex, used };
}

/**
 * @param {number[]} row
 * @param {number} targetMax
 * @param {number} occurrenceCount
 * @param {number} step
 * @param {() => number} rng
 * @param {number[]} colMaxes
 * @returns {{ok: boolean, keepIndices: number[], usedRegrets: Set<number>, usedPayoffs: Set<number>}}
 */
function adjustRegretRowForMax(row, targetMax, occurrenceCount, step, rng, colMaxes) {
  const candidates = row
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value >= targetMax);
  if (candidates.length < occurrenceCount) {
    return { ok: false, keepIndices: [], usedRegrets: new Set(), usedPayoffs: new Set() };
  }

  const equals = candidates.filter(({ value }) => value === targetMax).map(({ index }) => index);
  const others = candidates
    .filter(({ value }) => value !== targetMax)
    .sort((a, b) => b.value - a.value)
    .map(({ index }) => index);

  const keepIndices = [];
  while (keepIndices.length < occurrenceCount && equals.length) {
    const pick = Math.floor(rng() * equals.length);
    keepIndices.push(equals.splice(pick, 1)[0]);
  }
  while (keepIndices.length < occurrenceCount && others.length) {
    keepIndices.push(others.shift());
  }

  const usedRegrets = new Set([targetMax]);
  const usedPayoffs = new Set();
  keepIndices.forEach((index) => {
    row[index] = targetMax;
    usedPayoffs.add(colMaxes[index] - targetMax);
  });

  const maxBelow = Math.max(0, targetMax - step);

  row.forEach((value, index) => {
    if (keepIndices.includes(index)) return;
    let newValue = value;
    const payoff = colMaxes[index] - value;
    if (value >= targetMax) {
      newValue = pickValueAtMostWithPayoff(
        value,
        maxBelow,
        step,
        usedRegrets,
        usedPayoffs,
        colMaxes[index],
        rng
      );
    } else if (usedRegrets.has(value) || usedPayoffs.has(payoff)) {
      newValue = pickValueAtMostWithPayoff(
        value,
        value,
        step,
        usedRegrets,
        usedPayoffs,
        colMaxes[index],
        rng
      );
    }
    row[index] = newValue;
    usedRegrets.add(newValue);
    usedPayoffs.add(colMaxes[index] - newValue);
  });

  return { ok: true, keepIndices, usedRegrets, usedPayoffs };
}

/**
 * @param {number[]} row
 * @param {number} maxIndex
 * @param {number} targetSecond
 * @param {number} step
 * @param {() => number} rng
 * @param {number[]} colMaxes
 * @returns {boolean}
 */
function enforceSecondMax(row, maxIndex, targetSecond, step, rng, colMaxes) {
  if (!Number.isFinite(targetSecond) || targetSecond < 0) return false;
  const candidates = row
    .map((value, index) => ({ value, index }))
    .filter(({ value, index }) => index !== maxIndex && value >= targetSecond);
  if (!candidates.length) return false;

  candidates.sort((a, b) => a.value - b.value);
  const secondIndex = candidates[0].index;
  row[secondIndex] = targetSecond;

  const usedRegrets = new Set([row[maxIndex], targetSecond]);
  const usedPayoffs = new Set([
    colMaxes[maxIndex] - row[maxIndex],
    colMaxes[secondIndex] - targetSecond,
  ]);

  const maxBelow = Math.max(0, targetSecond - step);

  row.forEach((value, index) => {
    if (index === maxIndex || index === secondIndex) return;
    let newValue = value;
    const payoff = colMaxes[index] - value;
    if (value > targetSecond || value === targetSecond) {
      newValue = pickValueAtMostWithPayoff(
        value,
        maxBelow,
        step,
        usedRegrets,
        usedPayoffs,
        colMaxes[index],
        rng
      );
    } else if (usedRegrets.has(value) || usedPayoffs.has(payoff)) {
      newValue = pickValueAtMostWithPayoff(
        value,
        value,
        step,
        usedRegrets,
        usedPayoffs,
        colMaxes[index],
        rng
      );
    }
    row[index] = newValue;
    usedRegrets.add(newValue);
    usedPayoffs.add(colMaxes[index] - newValue);
  });

  return true;
}

/**
 * @param {number[]} row
 * @param {number} minIndex
 * @param {number} secondMin
 * @param {number} step
 * @param {number} maxValue
 * @param {() => number} rng
 * @param {Set<number>} used
 * @returns {number}
 */
function ensureSecondMin(row, minIndex, secondMin, step, maxValue, rng, used) {
  let secondIndex = row.findIndex((value, index) => index !== minIndex && value === secondMin);
  if (secondIndex === -1) {
    const candidates = row.map((_, idx) => idx).filter((idx) => idx !== minIndex);
    secondIndex = candidates[Math.floor(rng() * candidates.length)];
    row[secondIndex] = secondMin;
  }
  used.add(secondMin);
  const targetFloorRaw = secondMin + step;
  const targetFloor = targetFloorRaw > maxValue ? secondMin : targetFloorRaw;
  row.forEach((value, index) => {
    if (index === minIndex || index === secondIndex) return;
    if (value <= secondMin) {
      const newValue = pickValue(targetFloor, maxValue, step, used, rng);
      row[index] = newValue;
      used.add(newValue);
    }
  });
  return secondIndex;
}

/**
 * @param {number[]} row
 * @param {number} minIndex
 * @param {number} floorValue
 * @param {number} step
 * @param {number} maxValue
 * @param {() => number} rng
 * @param {Set<number>} used
 * @returns {void}
 */
function liftAbove(row, minIndex, floorValue, step, maxValue, rng, used) {
  const targetFloorRaw = floorValue + step;
  const targetFloor = targetFloorRaw > maxValue ? floorValue : targetFloorRaw;
  row.forEach((value, index) => {
    if (index === minIndex) return;
    if (value <= floorValue) {
      const newValue = pickValue(targetFloor, maxValue, step, used, rng);
      row[index] = newValue;
      used.add(newValue);
    }
  });
}

/**
 * @param {number[][]} values
 * @param {number} baseIndex
 * @param {number[]} candidates
 * @param {number} minValue
 * @param {number} secondMin
 * @param {number} step
 * @param {number} maxValue
 * @param {() => number} rng
 * @returns {boolean}
 */
function applyDoubleMaximinTie(values, baseIndex, candidates, minValue, secondMin, step, maxValue, rng) {
  if (candidates.length < 2) return false;
  if (secondMin <= minValue) return false;
  if (secondMin + step > maxValue) return false;

  const firstPick = Math.floor(rng() * candidates.length);
  const rowAIndex = candidates[firstPick];
  const remaining = candidates.filter((_, idx) => idx !== firstPick);
  const rowBIndex = remaining[Math.floor(rng() * remaining.length)];

  const baseRow = values[baseIndex];
  const baseNorm = normalizeRowMin(baseRow, minValue, step, maxValue, rng);
  ensureSecondMin(baseRow, baseNorm.minIndex, secondMin, step, maxValue, rng, baseNorm.used);

  const rowB = values[rowBIndex];
  const rowBNorm = normalizeRowMin(rowB, minValue, step, maxValue, rng);
  ensureSecondMin(rowB, rowBNorm.minIndex, secondMin, step, maxValue, rng, rowBNorm.used);

  const rowA = values[rowAIndex];
  const rowANorm = normalizeRowMin(rowA, minValue, step, maxValue, rng);
  liftAbove(rowA, rowANorm.minIndex, secondMin, step, maxValue, rng, rowANorm.used);

  return true;
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} valuePrecision
 * @param {() => number} rng
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
export function maybeForceMaximinTies(problemTable, valuePrecision, rng) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const values = problemTable.rows.map((row) => row.slice(1).map(Number));
  const initialSolution = solveLexicalMaximin(values, decisions);

  if (initialSolution.steps !== 1) return problemTable;

  const roll = rng();
  if (roll >= 0.6) return problemTable;

  const rowMins = values.map((row) => Math.min(...row));
  const bestMin = Math.max(...rowMins);
  const baseIndex = rowMins.indexOf(bestMin);
  const candidates = values.map((_, idx) => idx).filter((idx) => idx !== baseIndex);
  if (candidates.length === 0) return problemTable;

  const maxValue = Math.floor(200 / valuePrecision) * valuePrecision;

  if (roll < 0.3 || candidates.length < 2) {
    const targetIndex = candidates[Math.floor(rng() * candidates.length)];
    normalizeRowMin(values[targetIndex], bestMin, valuePrecision, maxValue, rng);
  } else {
    const baseRow = values[baseIndex];
    const higherValues = baseRow.filter((value) => value > bestMin);
    const secondMinCandidate = higherValues.length
      ? Math.min(...higherValues)
      : bestMin + valuePrecision;
    const ok = applyDoubleMaximinTie(
      values,
      baseIndex,
      candidates,
      bestMin,
      secondMinCandidate,
      valuePrecision,
      maxValue,
      rng
    );
    if (!ok) {
      const targetIndex = candidates[Math.floor(rng() * candidates.length)];
      normalizeRowMin(values[targetIndex], bestMin, valuePrecision, maxValue, rng);
    }
  }

  problemTable.rows = problemTable.rows.map((row, index) => [row[0], ...values[index]]);
  return problemTable;
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} valuePrecision
 * @param {() => number} rng
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
export function maybeForceMinimaxTies(problemTable, valuePrecision, rng) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const payoffs = problemTable.rows.map((row) => row.slice(1).map(Number));
  const numStates = problemTable.headers.length - 1;
  const colMaxes = Array.from({ length: numStates }, (_, colIndex) =>
    Math.max(...payoffs.map((row) => row[colIndex]))
  );

  const regrets = payoffs.map((row) =>
    row.map((value, index) => colMaxes[index] - value)
  );

  const initialSolution = solveLexicalMinimax(regrets, decisions);
  if (initialSolution.steps !== 1) return problemTable;

  const roll = rng();
  if (roll >= 0.6) return problemTable;

  const rowMaxes = regrets.map((row) => Math.max(...row));
  const bestMax = Math.min(...rowMaxes);
  const baseIndex = rowMaxes.indexOf(bestMax);
  const candidates = regrets.map((_, idx) => idx).filter((idx) => idx !== baseIndex);
  if (!candidates.length) return problemTable;

  let workingRegrets;
  let updated = false;

  if (roll < 0.3 || candidates.length < 2) {
    workingRegrets = regrets.map((row) => [...row]);
    const targetIndex = candidates[Math.floor(rng() * candidates.length)];
    const adjusted = adjustRegretRowForMax(
      workingRegrets[targetIndex],
      bestMax,
      1,
      valuePrecision,
      rng,
      colMaxes
    );
    updated = adjusted.ok;
  } else {
    workingRegrets = regrets.map((row) => [...row]);
    const pickA = Math.floor(rng() * candidates.length);
    const rowAIndex = candidates[pickA];
    const remaining = candidates.filter((_, idx) => idx !== pickA);
    const rowBIndex = remaining[Math.floor(rng() * remaining.length)];

    const baseAdjusted = adjustRegretRowForMax(
      workingRegrets[baseIndex],
      bestMax,
      1,
      valuePrecision,
      rng,
      colMaxes
    );
    if (!baseAdjusted.ok) return problemTable;

    const baseRow = workingRegrets[baseIndex];
    const maxIndex = baseAdjusted.keepIndices[0];
    const baseSecond = Math.max(
      ...baseRow.filter((_, idx) => idx !== maxIndex)
    );
    if (!Number.isFinite(baseSecond) || baseSecond >= bestMax) {
      updated = false;
    } else {
      const originalRowA = [...workingRegrets[rowAIndex]];
      const rowAAdjusted = adjustRegretRowForMax(
        workingRegrets[rowAIndex],
        bestMax,
        1,
        valuePrecision,
        rng,
        colMaxes
      );
      const rowBAdjusted = adjustRegretRowForMax(
        workingRegrets[rowBIndex],
        bestMax,
        1,
        valuePrecision,
        rng,
        colMaxes
      );
      if (!rowAAdjusted.ok || !rowBAdjusted.ok) {
        updated = false;
      } else {
        const rowA = workingRegrets[rowAIndex];
        const rowAMaxIndex = rowAAdjusted.keepIndices[0];
        const rowASecond = Math.max(
          ...rowA.filter((_, idx) => idx !== rowAMaxIndex)
        );
        let rowAOk = Number.isFinite(rowASecond) && rowASecond > baseSecond;

        if (!rowAOk) {
          workingRegrets[rowAIndex] = [...originalRowA];
          const rowADouble = adjustRegretRowForMax(
            workingRegrets[rowAIndex],
            bestMax,
            2,
            valuePrecision,
            rng,
            colMaxes
          );
          rowAOk = rowADouble.ok;
        }

        if (!rowAOk) {
          updated = false;
        } else {
          const okSecond = enforceSecondMax(
            workingRegrets[rowBIndex],
            rowBAdjusted.keepIndices[0],
            baseSecond,
            valuePrecision,
            rng,
            colMaxes
          );
          updated = okSecond;
        }
      }
    }

    if (!updated) {
      workingRegrets = regrets.map((row) => [...row]);
      const fallbackIndex = candidates[Math.floor(rng() * candidates.length)];
      const fallbackAdjusted = adjustRegretRowForMax(
        workingRegrets[fallbackIndex],
        bestMax,
        1,
        valuePrecision,
        rng,
        colMaxes
      );
      updated = fallbackAdjusted.ok;
    }
  }

  if (!updated) return problemTable;

  problemTable.rows = problemTable.rows.map((row, rowIndex) => [
    row[0],
    ...colMaxes.map((max, colIndex) => max - workingRegrets[rowIndex][colIndex]),
  ]);
  return problemTable;
}

/**
 * @param {number[]} row
 * @param {number} minValue
 * @param {number} maxValue
 * @param {Set<string>} usedPairs
 * @param {number} step
 * @param {number} maxAllowed
 * @param {() => number} rng
 * @returns {boolean}
 */
function adjustRowMinMaxPair(row, minValue, maxValue, usedPairs, step, maxAllowed, rng) {
  const used = new Set(row);
  const maxIndices = row.map((value, index) => (value === maxValue ? index : -1)).filter((i) => i >= 0);
  const minIndices = row.map((value, index) => (value === minValue ? index : -1)).filter((i) => i >= 0);

  const pickIndex = (indices) => indices[Math.floor(rng() * indices.length)];
  const pickCandidate = (candidates) => candidates[Math.floor(rng() * candidates.length)];

  if (maxValue < maxAllowed) {
    const candidates = [];
    for (let value = maxValue + step; value <= maxAllowed; value += step) {
      if (!used.has(value) && !usedPairs.has(`${minValue}|${value}`)) {
        candidates.push(value);
      }
    }
    if (!candidates.length) {
      for (let value = maxValue + step; value <= maxAllowed; value += step) {
        if (!usedPairs.has(`${minValue}|${value}`)) {
          candidates.push(value);
        }
      }
    }
    if (candidates.length) {
      const newMax = pickCandidate(candidates);
      row[pickIndex(maxIndices)] = newMax;
      return true;
    }
  }

  if (minValue > 0) {
    const candidates = [];
    for (let value = 0; value <= minValue - step; value += step) {
      if (!used.has(value) && !usedPairs.has(`${value}|${maxValue}`)) {
        candidates.push(value);
      }
    }
    if (!candidates.length) {
      for (let value = 0; value <= minValue - step; value += step) {
        if (!usedPairs.has(`${value}|${maxValue}`)) {
          candidates.push(value);
        }
      }
    }
    if (candidates.length) {
      const newMin = pickCandidate(candidates);
      row[pickIndex(minIndices)] = newMin;
      return true;
    }
  }

  if (minValue < maxValue && maxValue - step >= minValue) {
    const candidates = [];
    for (let value = minValue; value <= maxValue - step; value += step) {
      if (!used.has(value) && !usedPairs.has(`${minValue}|${value}`)) {
        candidates.push(value);
      }
    }
    if (!candidates.length) {
      for (let value = minValue; value <= maxValue - step; value += step) {
        if (!usedPairs.has(`${minValue}|${value}`)) {
          candidates.push(value);
        }
      }
    }
    if (candidates.length) {
      const newMax = pickCandidate(candidates);
      maxIndices.forEach((index) => {
        row[index] = newMax;
      });
      return true;
    }
  }

  return false;
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} valuePrecision
 * @param {() => number} rng
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
export function ensureOprUniqueMinMax(problemTable, valuePrecision, rng) {
  const values = problemTable.rows.map((row) => row.slice(1).map(Number));
  const usedPairs = new Set();
  const maxValue = Math.floor(200 / valuePrecision) * valuePrecision;

  values.forEach((row) => {
    let attempts = 0;
    while (attempts < 6) {
      const minValue = Math.min(...row);
      const maxValueRow = Math.max(...row);
      const key = `${minValue}|${maxValueRow}`;
      if (!usedPairs.has(key)) {
        usedPairs.add(key);
        return;
      }
      const changed = adjustRowMinMaxPair(
        row,
        minValue,
        maxValueRow,
        usedPairs,
        valuePrecision,
        maxValue,
        rng
      );
      if (!changed) break;
      attempts += 1;
    }
    const finalMin = Math.min(...row);
    const finalMax = Math.max(...row);
    usedPairs.add(`${finalMin}|${finalMax}`);
  });

  problemTable.rows = problemTable.rows.map((row, index) => [row[0], ...values[index]]);
  return problemTable;
}

/**
 * @param {number[]} row
 * @param {number} step
 * @param {number} maxAllowed
 * @param {() => number} rng
 * @returns {boolean}
 */
function increaseRowValue(row, step, maxAllowed, rng) {
  const candidates = row
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value + step <= maxAllowed);
  if (!candidates.length) return false;
  const pick = candidates[Math.floor(rng() * candidates.length)];
  const used = new Set(row);
  const newValue = pickValue(pick.value + step, maxAllowed, step, used, rng);
  row[pick.index] = newValue;
  return true;
}

/**
 * @param {number[]} row
 * @param {number} step
 * @param {() => number} rng
 * @returns {boolean}
 */
function decreaseRowValue(row, step, rng) {
  const candidates = row
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value - step >= 0);
  if (!candidates.length) return false;
  candidates.sort((a, b) => b.value - a.value);
  const pick = candidates[Math.floor(rng() * Math.min(3, candidates.length))];
  const used = new Set(row);
  const newValue = pickValueAtMost(pick.value, pick.value - step, step, used, rng);
  row[pick.index] = newValue;
  return true;
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} valuePrecision
 * @param {() => number} rng
 * @returns {{headers: string[], rows: (string|number)[][]}}
 */
export function ensurePirUniqueBest(problemTable, valuePrecision, rng) {
  const values = problemTable.rows.map((row) => row.slice(1).map(Number));
  const sums = values.map((row) => row.reduce((acc, value) => acc + value, 0));
  const maxSum = Math.max(...sums);
  const tied = sums.map((sum, index) => (sum === maxSum ? index : -1)).filter((i) => i >= 0);
  if (tied.length <= 1) return problemTable;

  const maxValue = Math.floor(200 / valuePrecision) * valuePrecision;
  const improvable = tied.filter((index) =>
    values[index].some((value) => value + valuePrecision <= maxValue)
  );

  if (improvable.length) {
    const winnerIndex = improvable[Math.floor(rng() * improvable.length)];
    increaseRowValue(values[winnerIndex], valuePrecision, maxValue, rng);
  } else {
    const winnerIndex = tied[Math.floor(rng() * tied.length)];
    const losers = tied.filter((index) => index !== winnerIndex);
    const targetIndex = losers.length ? losers[Math.floor(rng() * losers.length)] : winnerIndex;
    decreaseRowValue(values[targetIndex], valuePrecision, rng);
  }

  problemTable.rows = problemTable.rows.map((row, index) => [row[0], ...values[index]]);
  return problemTable;
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
 * Lexical Maximin solver that removes only one tied minimum per step.
 * @param {number[][]} table
 * @param {string[]} decisions
 * @returns {{steps: number, results: number, bestDecision: string[]}}
 */
function solveLexicalMaximin(table, decisions) {
  let remainingValues = table.map((row) => [...row]);
  let remainingDecisions = [...decisions];
  const maxSteps = table[0]?.length ?? 0;

  const solution = {
    steps: 0,
    results: 0,
    bestDecision: [],
  };

  while (remainingValues.length) {
    if (remainingValues[0].length === 0) break;

    const rowMins = remainingValues.map((row) => Math.min(...row));
    const maxMin = Math.max(...rowMins);
    solution.results = maxMin;
    solution.steps += 1;

    const keepMask = rowMins.map((val) => val === maxMin);
    remainingValues = remainingValues.filter((_, i) => keepMask[i]);
    remainingDecisions = remainingDecisions.filter((_, i) => keepMask[i]);
    solution.bestDecision = remainingDecisions;

    if (remainingDecisions.length === 1) break;

    remainingValues = remainingValues.map((row) => {
      const idx = row.indexOf(maxMin);
      if (idx === -1) return row;
      const nextRow = [...row];
      nextRow.splice(idx, 1);
      return nextRow;
    });

    if (solution.steps >= maxSteps) break;
  }

  return solution;
}

/**
 * Lexical Minimax solver that removes only one tied maximum per step.
 * @param {number[][]} table
 * @param {string[]} decisions
 * @returns {{steps: number, results: number, bestDecision: string[]}}
 */
function solveLexicalMinimax(table, decisions) {
  let remainingValues = table.map((row) => [...row]);
  let remainingDecisions = [...decisions];
  const maxSteps = table[0]?.length ?? 0;

  const solution = {
    steps: 0,
    results: 0,
    bestDecision: [],
  };

  while (remainingValues.length) {
    if (remainingValues[0].length === 0) break;

    const rowMaxes = remainingValues.map((row) => Math.max(...row));
    const minMax = Math.min(...rowMaxes);
    solution.results = minMax;
    solution.steps += 1;

    const keepMask = rowMaxes.map((value) => value === minMax);
    remainingValues = remainingValues.filter((_, i) => keepMask[i]);
    remainingDecisions = remainingDecisions.filter((_, i) => keepMask[i]);
    solution.bestDecision = remainingDecisions;

    if (remainingDecisions.length === 1) break;

    remainingValues = remainingValues.map((row) => {
      const idx = row.indexOf(minMax);
      if (idx === -1) return row;
      const nextRow = [...row];
      nextRow.splice(idx, 1);
      return nextRow;
    });

    if (solution.steps >= maxSteps) break;
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
export function solveMaximin(problemTable, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));
  const solution = solveLexicalMaximin(statesTable, decisions);
  const solutionTable = {
    headers: [labels.decisions, labels.orderedValues],
    rows: problemTable.rows.map((row) => {
      const values = row.slice(1).map(Number);
      return [row[0], orderedValuesString(values, false)];
    }),
  };
  return { baseTable: problemTable, solutionTable, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
export function solveMinimax(problemTable, labels) {
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

  const solution = solveLexicalMinimax(regretRows, decisions);
  const solutionTable = {
    headers: [labels.decisions, labels.orderedValues],
    rows: regretRows.map((row, i) => [
      decisions[i],
      orderedValuesString(row, true),
    ]),
  };
  return { baseTable: regretTable, solutionTable, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @param {number} level
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
export function solveOpr(problemTable, level, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));

  const calcValue = (values, a) => {
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    return a * maxValue + (1 - a) * minValue;
  };

  const solution = solveNonLexicalProblem(statesTable, decisions, calcValue, level);
  const solutionTable = {
    headers: [labels.decisions, labels.decisionEvaluation],
    rows: problemTable.rows.map((row, i) => [
      row[0],
      Number(solution.results[i].toFixed(2)),
    ]),
  };

  return { baseTable: problemTable, solutionTable, solution };
}

/**
 * @param {{headers: string[], rows: (string|number)[][]}} problemTable
 * @returns {{table: {headers: string[], rows: (string|number)[][]}, solution: object}}
 */
export function solvePir(problemTable, labels) {
  const decisions = problemTable.rows.map((row) => String(row[0]));
  const statesTable = problemTable.rows.map((row) => row.slice(1).map(Number));

  const calcValue = (values) => {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  const solution = solveNonLexicalProblem(statesTable, decisions, calcValue);
  const solutionTable = {
    headers: [labels.decisions, labels.decisionEvaluation],
    rows: problemTable.rows.map((row, i) => [
      row[0],
      Number(solution.results[i].toFixed(2)),
    ]),
  };

  return { baseTable: problemTable, solutionTable, solution };
}

/**
 * @param {string} exerciseType
 * @param {number} levelOfOptimism
 * @returns {string}
 */
export function describeProblem(exerciseType, exerciseLabel, levelOfOptimism, texts) {
  const method = ["Maximin", "Minimax"].includes(exerciseType)
    ? `${texts.lexical} ${exerciseLabel}`
    : exerciseLabel;

  const optimismText =
    exerciseType === "Optimism-Pessimism Rule"
      ? `<p class="exercises-hint"><b>${texts.optimismHint} ${levelOfOptimism}.</b></p>`
      : "";

  return `
    <h2 class="exercises-section-title">${texts.problemTitle}</h2>
    <p class="exercises-lead"><b>
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
export function buildSolutionHeader(exerciseType, exerciseLabel, solution, levelOfOptimism, texts) {
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
 * @param {string} exerciseType
 * @param {object} texts
 * @returns {string}
 */
function formatOutcomeValue(value, decimals) {
  if (!Number.isFinite(value)) return "";
  if (typeof decimals === "number") {
    return String(Number(value.toFixed(decimals)));
  }
  return String(value);
}

function formatList(items, andLabel) {
  if (!items.length) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} ${andLabel} ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} ${andLabel} ${items[items.length - 1]}`;
}

function fillTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, key) => (data[key] ?? ""));
}

function capitalizeFirstChar(value) {
  const text = String(value ?? "");
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function buildDecisionClause(decisions, texts, { sentenceStart = false } = {}) {
  if (!decisions?.length) return "";
  const key = decisions.length === 1 ? "decisionSingle" : "decisionPlural";
  const clause = sentenceStart
    ? capitalizeFirstChar(texts.outcome[key])
    : String(texts.outcome[key] ?? "");
  return `${clause} <b>${decisions.join(", ")}</b>`;
}

function buildTieClause(decisions, texts) {
  if (!decisions || decisions.length < 2) return "";
  const list = formatList(decisions, texts.andLabel);
  return ` (${texts.tiePrefix} ${list})`;
}

function buildCalculationBlock(exerciseType, baseTable, levelOfOptimism, texts) {
  if (!baseTable?.rows?.length) return "";
  if (exerciseType === "Optimism-Pessimism Rule") {
    if (!Number.isFinite(levelOfOptimism)) return "";
    const alphaValue = formatOutcomeValue(levelOfOptimism, 2);
    const betaValue = formatOutcomeValue(1 - levelOfOptimism, 2);
    const lines = baseTable.rows.map((row) => {
      const decision = String(row[0]);
      const values = row.slice(1).map(Number);
      const minVal = Math.min(...values);
      const maxVal = Math.max(...values);
      const evalValue = levelOfOptimism * maxVal + (1 - levelOfOptimism) * minVal;
      const evalStr = formatOutcomeValue(evalValue, 2);
      return `\\[ ${decision}:\\; \\alpha \\cdot ${maxVal} + (1-\\alpha) \\cdot ${minVal} = ${alphaValue} \\cdot ${maxVal} + ${betaValue} \\cdot ${minVal} = ${evalStr} \\]`;
    });
    const mathLines = [`\\[ \\alpha = ${alphaValue} \\]`, ...lines];
    const math = mathLines.map((line) => `<div class="exercises-katex-line">${line}</div>`).join("");
    return `
      <div class="exercises-explainer-math is-opr">
        <div class="exercises-explainer-math-title">${texts.calculationTitle}</div>
        ${math}
      </div>
    `;
  }

  if (exerciseType === "Principle of Insufficient Reason") {
    const lines = baseTable.rows.map((row) => {
      const decision = String(row[0]);
      const values = row.slice(1).map(Number);
      const sum = values.reduce((acc, value) => acc + value, 0);
      const n = values.length || 1;
      const evalValue = sum / n;
      const evalStr = formatOutcomeValue(evalValue, 2);
      const numerator = values.map((value) => formatOutcomeValue(value)).join(" + ");
      return `\\[ ${decision}:\\; \\frac{${numerator}}{${n}} = ${evalStr} \\]`;
    });
    const math = lines.map((line) => `<div class="exercises-katex-line">${line}</div>`).join("");
    return `
      <div class="exercises-explainer-math is-pir">
        <div class="exercises-explainer-math-title">${texts.calculationTitle}</div>
        ${math}
      </div>
    `;
  }

  return "";
}

function getFirstStepTies(exerciseType, baseTable) {
  if (!baseTable?.rows?.length) return [];
  const decisions = baseTable.rows.map((row) => String(row[0]));
  const values = baseTable.rows.map((row) => row.slice(1).map(Number));
  if (!values.length) return [];
  if (exerciseType === "Maximin") {
    const rowMins = values.map((row) => Math.min(...row));
    const bestMin = Math.max(...rowMins);
    return decisions.filter((_, idx) => rowMins[idx] === bestMin);
  }
  if (exerciseType === "Minimax") {
    const rowMaxes = values.map((row) => Math.max(...row));
    const bestMax = Math.min(...rowMaxes);
    return decisions.filter((_, idx) => rowMaxes[idx] === bestMax);
  }
  return [];
}

function buildSolutionOutcomeText(exerciseType, solution, levelOfOptimism, texts, baseTable) {
  if (!solution || !texts?.outcome) return "";
  const decisions = solution.bestDecision ?? [];
  const decisionClause = buildDecisionClause(decisions, texts);
  const decisionClauseSentenceStart = buildDecisionClause(decisions, texts, { sentenceStart: true });
  if (!decisionClause) return "";
  const steps = solution.steps ?? 0;
  const firstStepTies = getFirstStepTies(exerciseType, baseTable);
  const tieClause = buildTieClause(firstStepTies, texts);

  if (exerciseType === "Maximin") {
    const value = formatOutcomeValue(solution.results);
    if (steps === 1 && decisions.length === 1) {
      return fillTemplate(texts.outcome.maximinSimple, { decisionClause, value });
    }
    if (steps === 1) {
      return fillTemplate(texts.outcome.maximinTieSimple, {
        decisionClause: decisionClauseSentenceStart,
        value,
        tieClause,
      });
    }
    return fillTemplate(texts.outcome.maximinLexical, {
      decisionClause: decisionClauseSentenceStart,
      value,
      steps,
      tieClause,
    });
  }

  if (exerciseType === "Minimax") {
    const value = formatOutcomeValue(solution.results);
    if (steps === 1 && decisions.length === 1) {
      return fillTemplate(texts.outcome.minimaxSimple, { decisionClause, value });
    }
    if (steps === 1) {
      return fillTemplate(texts.outcome.minimaxTieSimple, {
        decisionClause: decisionClauseSentenceStart,
        value,
        tieClause,
      });
    }
    return fillTemplate(texts.outcome.minimaxLexical, {
      decisionClause: decisionClauseSentenceStart,
      value,
      steps,
      tieClause,
    });
  }

  if (exerciseType === "Optimism-Pessimism Rule") {
    const values = Array.isArray(solution.results) ? solution.results : [];
    const bestValueRaw = values.length ? Math.max(...values) : solution.results;
    const value = formatOutcomeValue(bestValueRaw, 2);
    const template = decisions.length === 1 ? texts.outcome.oprSingle : texts.outcome.oprTie;
    return fillTemplate(template, { decisionClause, value, level: levelOfOptimism });
  }

  const values = Array.isArray(solution.results) ? solution.results : [];
  const bestValueRaw = values.length ? Math.max(...values) : solution.results;
  const value = formatOutcomeValue(bestValueRaw, 2);
  const template = decisions.length === 1 ? texts.outcome.pirSingle : texts.outcome.pirTie;
  return fillTemplate(template, { decisionClause, value });
}

export function buildSolutionExplainer(exerciseType, texts, solution, levelOfOptimism, baseTable) {
  const explainer = texts.methods?.[exerciseType];
  if (!explainer) return "";
  const steps = explainer.steps.map((step) => `<li>${step}</li>`).join("");
  const outcomeText = buildSolutionOutcomeText(
    exerciseType,
    solution,
    levelOfOptimism,
    texts,
    baseTable
  );
  const calculationBlock = buildCalculationBlock(
    exerciseType,
    baseTable,
    levelOfOptimism,
    texts
  );
  const tableIntro = explainer.tableIntro
    ? `<p class="exercises-explainer-table">${explainer.tableIntro}</p>`
    : "";
  return `
    <details class="exercises-explainer">
      <summary class="exercises-explainer-summary">
        <span class="exercises-explainer-title">${explainer.title}</span>
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
        <p>${explainer.intro}</p>
        <p><b>${texts.logicLabel}:</b> ${explainer.logic}</p>
        <p><b>${texts.stepsLabel}:</b></p>
        <ol>${steps}</ol>
        ${tableIntro}
        ${calculationBlock}
        ${outcomeText ? `<p class="exercises-explainer-outcome">${outcomeText}</p>` : ""}
      </div>
    </details>
  `;
}

/**
 * @param {object} solution
 * @param {string} exerciseType
 * @returns {string}
 */
function describeMaximinSolution(solution, exerciseLabel, texts) {
  const single = solution.bestDecision.length === 1;
  const solutionType = single
    ? `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.maximinSingle}.`
    : `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.maximinTie}.`;
  const bestDecision = single
    ? `<span class="exercises-solution-key">${texts.bestDecision}:</span> <span class="exercises-solution-emph">${solution.bestDecision[0]}</span>`
    : `<span class="exercises-solution-key">${texts.bestDecision}:</span> ${solution.bestDecision.join(", ")}`;
  const maximinValue = single
    ? `<span class="exercises-solution-key">${texts.maximinValue}:</span> ${solution.results}`
    : `<span class="exercises-solution-key">${texts.maximinLast}:</span> ${solution.results}`;

  return buildSolutionCard([
    solutionType,
    bestDecision,
    `<span class="exercises-solution-key">${texts.stepsTaken}:</span> ${solution.steps}`,
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
    ? `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.minimaxSingle}.`
    : `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.minimaxTie}.`;
  const bestDecision = single
    ? `<span class="exercises-solution-key">${texts.bestDecision}:</span> <span class="exercises-solution-emph">${solution.bestDecision[0]}</span>`
    : `<span class="exercises-solution-key">${texts.bestDecision}:</span> ${solution.bestDecision.join(", ")}`;
  const minimaxValue = single
    ? `<span class="exercises-solution-key">${texts.minimaxValue}:</span> ${solution.results}`
    : `<span class="exercises-solution-key">${texts.minimaxLast}:</span> ${solution.results}`;

  return buildSolutionCard([
    solutionType,
    bestDecision,
    `<span class="exercises-solution-key">${texts.stepsTaken}:</span> ${solution.steps}`,
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
    ? `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.oprSingle}.`
    : `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.oprTie}.`;
  const bestDecision = single
    ? `<span class="exercises-solution-key">${texts.bestDecision}:</span> <span class="exercises-solution-emph">${solution.bestDecision[0]}</span>`
    : `<span class="exercises-solution-key">${texts.tiedSolutions}:</span> ${solution.bestDecision.join(", ")}`;
  const bestValue = `<span class="exercises-solution-key">${texts.bestValue}:</span> ${Math.max(...solution.results).toFixed(2)}`;

  return buildSolutionCard([
    solutionType,
    `<span class="exercises-solution-key">${texts.optimismLevel}:</span> ${level}`,
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
    ? `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.pirSingle}.`
    : `<span class="exercises-solution-key">${texts.solutionStatus}:</span> ${texts.pirTie}.`;
  const bestDecision = single
    ? `<span class="exercises-solution-key">${texts.bestDecision}:</span> <span class="exercises-solution-emph">${solution.bestDecision[0]}</span>`
    : `<span class="exercises-solution-key">${texts.tiedSolutions}:</span> ${solution.bestDecision.join(", ")}`;
  const bestValue = `<span class="exercises-solution-key">${texts.bestValue}:</span> ${Math.max(...solution.results).toFixed(2)}`;

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
    .map((item) => `<li class="exercises-solution-item">${item}</li>`)
    .join("");

  return `
    <div class="exercises-solution-card">
      <h3 class="exercises-solution-title">${title}</h3>
      <hr class="exercises-solution-divider" />
      <ul class="exercises-solution-list">${listItems}</ul>
    </div>
    <h3 class="exercises-solution-subtitle">${subtitle}</h3>
  `;
}
