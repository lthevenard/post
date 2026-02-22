// ============================================================================
// Decision Under Ignorance (DUI) - Optimism Level
// ============================================================================

import { randomIntInclusive } from "../shared/utils.js";

export const OPTIMISM_EXERCISE_TYPES = [
  {
    id: "max_level",
    title: { en: "Maximum optimism level", pt: "Nível máximo de otimismo" },
    description: {
      en: "Find the largest α such that the Hurwicz rule still chooses the most conservative decision (highest minimum payoff).",
      pt: "Encontre o maior α para o qual, pela Regra de Otimismo-Pessimismo (Hurwicz), ainda escolheríamos a decisão mais conservadora (maior payoff mínimo).",
    },
  },
  {
    id: "min_level",
    title: { en: "Minimum optimism level", pt: "Nível mínimo de otimismo" },
    description: {
      en: "Find the smallest α such that the Hurwicz rule still chooses the riskiest decision (highest maximum payoff).",
      pt: "Encontre o menor α para o qual, pela Regra de Otimismo-Pessimismo (Hurwicz), ainda escolheríamos a decisão mais arriscada (maior payoff máximo).",
    },
  },
  {
    id: "interval",
    title: { en: "Optimism interval", pt: "Intervalo de níveis de otimismo" },
    description: {
      en: "Find the α interval for which the intermediate decision (neither the most conservative nor the riskiest) is chosen.",
      pt: "Encontre o intervalo de α para o qual escolheríamos a decisão intermediária (nem a mais conservadora nem a mais arriscada).",
    },
  },
  {
    id: "find_payoff",
    title: { en: "Find the payoff", pt: "Encontre o payoff" },
    description: {
      en: "With α fixed, one payoff is hidden (x). Find the smallest x so the Hurwicz rule chooses the indicated decision that contains x.",
      pt: "Com o nível de otimismo (α) fixo, um payoff do problema de decisão foi oculto (x). Encontre o menor x para que a Regra de Otimismo-Pessimismo escolha a decisão indicada que possui o payoff x.",
    },
  },
];

export function buildOptimismTexts(lang) {
  const isEn = lang === "en";
  const t = (entry) => (isEn ? entry.en : entry.pt);

  return {
    lang,
    isEn,
    sidebarTitle: isEn ? "Optimism Level" : "Nível de Otimismo",
    generateTab: isEn ? "🚀 Generate Exercise" : "🚀 Gerar Exercício",
    generate: isEn ? "Generate Exercise" : "Gerar Exercício",
    exerciseTypes: OPTIMISM_EXERCISE_TYPES.map((type) => ({
      id: type.id,
      title: t(type.title),
      description: t(type.description),
    })),
    exerciseIntro: isEn
      ? "Generate the decision problem to start the exercise."
      : "Gere o problema de decisão para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the problem to see its solution here."
      : "Gere o problema para visualizar sua solução aqui.",
    problemTitle: isEn ? "Problem" : "Problema",
    answerTitle: isEn ? "Your answer" : "Sua resposta",
    solutionTitle: isEn ? "Analytical solution" : "Solução analítica",
    alphaHelp: isEn ? "Use a value between 0 and 1." : "Use um valor entre 0 e 1.",
    alphaMaxLabel: isEn ? "Maximum optimism level (α)" : "Nível máximo de otimismo (α)",
    alphaMinLabel: isEn ? "Minimum optimism level (α)" : "Nível mínimo de otimismo (α)",
    alphaIntervalMinLabel: isEn ? "Lower bound (α_min)" : "Limite inferior (α_min)",
    alphaIntervalMaxLabel: isEn ? "Upper bound (α_max)" : "Limite superior (α_max)",
    payoffLabel: isEn ? "Minimum payoff (x)" : "Payoff mínimo (x)",
    payoffHelp: isEn
      ? "Any real value is acceptable."
      : "Qualquer valor real é aceitável.",
    roleConservativeLabel: isEn ? "Most conservative (Maximin)" : "Mais conservadora (Maximin)",
    roleRiskiestLabel: isEn ? "Riskiest (Maximax)" : "Mais arriscada (Maximax)",
    roleIntermediateLabel: isEn
      ? "Intermediate (the remaining one)"
      : "Intermediária (a alternativa restante)",
    hintDefinitions: isEn
      ? "Most conservative = highest minimum payoff (Maximin). Riskiest = highest maximum payoff (Maximax)."
      : "Mais conservadora = maior payoff mínimo (Maximin). Mais arriscada = maior payoff máximo (Maximax).",
    answerLabel: isEn ? "Answer" : "Resposta",
    hurwiczRuleTitle: isEn ? "Hurwicz rule" : "Regra (Hurwicz)",
    hurwiczFunctionsTitle: isEn ? "Functions (Hurwicz)" : "Funções (Hurwicz)",
    hintTitle: isEn ? "💡 Hint" : "💡 Dica",
    hintToggleShow: isEn ? "View hint" : "Visualizar dica",
    hintToggleHide: isEn ? "Hide hint" : "Ocultar dica",
    hintToggleShowShort: isEn ? "Hint" : "Dica",
    hintToggleHideShort: isEn ? "Hide" : "Ocultar",
    solutionExplainerTitle: isEn
      ? "How to solve (Hurwicz rule)"
      : "Como resolver (Regra Otimismo-Pessimismo)",
    statementFindPayoff: isEn
      ? "In the decision-under-ignorance matrix below, the payoff of decision {decision} in state {state} was hidden (x). With an optimism level of {percent}% (α = {alpha}), find the smallest x such that, by the Hurwicz rule, decision {decision} is still chosen."
      : "Na matriz do problema de decisão sob ignorância a seguir, o payoff da decisão {decision} no estado {state} foi oculto (x). Considerando um nível de otimismo de {percent}% (α = {alpha}), encontre o menor valor de x para o qual, pela Regra de Otimismo-Pessimismo, a decisão {decision} ainda seja a escolhida.",
    solutionWeWantDecision: isEn
      ? "We want decision {decision} to be chosen by the Hurwicz rule with α = {alpha}."
      : "Queremos que a decisão {decision} seja escolhida pela Regra de Otimismo-Pessimismo com α = {alpha}.",
    solutionComputeOthers: isEn
      ? "Compute the other decisions’ values at α = {alpha}:"
      : "Calculamos os valores das outras decisões com α = {alpha}:",
    solutionForDecisionMinMax: isEn
      ? "For decision {decision}, we have min = {min} and max = x. Therefore:"
      : "Para a decisão {decision}, temos min = {min} e max = x. Logo:",
    solutionImpose: isEn ? "Now impose the inequality:" : "Agora impomos a inequação:",
    solutionAlsoNeedMax: isEn
      ? "Also, to ensure the hidden payoff is the maximum in that row, we need x ≥ {bound}."
      : "Além disso, para que o payoff oculto seja de fato o máximo da linha, precisamos de x ≥ {bound}.",
    solutionWeComputeFunctions: isEn
      ? "We compute, for each decision, \\(\\min\\), \\(\\max\\), and the evaluation functions \\(V_i(\\alpha)\\):"
      : "Calculamos, para cada decisão, \\(\\min\\), \\(\\max\\) e as funções de avaliação \\(V_i(\\alpha)\\):",
    solutionToChooseNeed: isEn
      ? "To choose {decision}, we need its evaluation to be at least as large as the others:"
      : "Para escolher {decision}, precisamos que sua avaliação seja pelo menos tão grande quanto as demais:",
    othersLatexLabel: isEn ? "others" : "outras",
  };
}

export function buildOptimismSolutionExplainerBodyHtml(instance, optimismTexts, explainerTexts) {
  if (!instance) return "";
  const isEn = Boolean(optimismTexts?.isEn);

  const methodExplainer = explainerTexts?.methods?.["Optimism-Pessimism Rule"];
  const logicLabel = explainerTexts?.logicLabel ?? (isEn ? "Logic" : "Lógica");
  const stepsLabel = explainerTexts?.stepsLabel ?? (isEn ? "Steps" : "Passos");

  const methodSteps = Array.isArray(methodExplainer?.steps)
    ? methodExplainer.steps.map((step) => `<li>${step}</li>`).join("")
    : "";

  const methodHtml = methodExplainer
    ? `
      <p><strong>${methodExplainer.title}</strong></p>
      <p>${methodExplainer.intro}</p>
      <p><b>${logicLabel}:</b> ${methodExplainer.logic}</p>
      ${methodSteps ? `<p><b>${stepsLabel}:</b></p><ol>${methodSteps}</ol>` : ""}
    `
    : `
      <p><strong>${isEn ? "Hurwicz rule (Optimism–Pessimism)" : "Regra de Otimismo-Pessimismo (Hurwicz)"}</strong></p>
      <p>${isEn
        ? "This rule evaluates each decision by blending its best and worst outcomes using an optimism level α."
        : "Essa regra avalia cada decisão combinando o melhor e o pior resultado usando um nível de otimismo α."}</p>
    `;

  const typeTitle =
    optimismTexts?.exerciseTypes?.find((t) => t.id === instance.typeId)?.title ?? instance.typeId;
  const typeHeader = isEn
    ? `How to solve this exercise type: <strong>${typeTitle}</strong>`
    : `Como resolver este tipo de exercício: <strong>${typeTitle}</strong>`;

  const alphaBlock = `
    <div class="exercises-explainer-math">
      <div class="exercises-katex-line">\\[ V_i(\\alpha) = (1-\\alpha)\\cdot \\min(i) + \\alpha\\cdot \\max(i) \\]</div>
      <div class="exercises-katex-line">\\[ V_i(\\alpha) = \\min(i) + (\\max(i)-\\min(i))\\,\\alpha \\]</div>
    </div>
  `;

  const typeBody = (() => {
    if (instance.typeId === "find_payoff") {
      const decision = instance.variable?.decisionLabel ?? "B";
      const state = `EDM${(instance.variable?.stateIndex ?? 0) + 1}`;
      const alpha = instance.variable?.alpha;
      const alphaStr = Number.isFinite(alpha) ? formatNumberPlain(alpha, 2) : "\\alpha";
      const base = `
        <p>${isEn
          ? `Here, \\(\\alpha\\) is fixed and one payoff is unknown (\\(x\\)). Turn the condition “${decision} is chosen” into an inequality in \\(x\\).`
          : `Aqui, \\(\\alpha\\) é fixo e um payoff é desconhecido (\\(x\\)). Transforme a condição “${decision} é escolhida” em uma inequação em \\(x\\).`}</p>
        <ol>
          <li>${isEn
            ? `Compute \\(V\\) for the other two decisions at \\(\\alpha = ${alphaStr}\\).`
            : `Calcule \\(V\\) para as outras duas decisões em \\(\\alpha = ${alphaStr}\\).`}</li>
          <li>${isEn
            ? `Write \\(V_${decision}(\\alpha)\\) in terms of \\(x\\) and impose \\(V_${decision}(\\alpha)\\ge V_j(\\alpha)\\) for each other decision.`
            : `Escreva \\(V_${decision}(\\alpha)\\) em função de \\(x\\) e imponha \\(V_${decision}(\\alpha)\\ge V_j(\\alpha)\\) para cada outra decisão.`}</li>
          <li>${isEn
            ? `Solve for \\(x\\) and take the smallest value that satisfies all inequalities.`
            : `Resolva para \\(x\\) e escolha o menor valor que satisfaça todas as inequações.`}</li>
        </ol>
      `;
      const note = `
        <p>${isEn
          ? `Note: the unknown payoff is in decision <strong>${decision}</strong> and state <strong>${state}</strong>. Check whether \\(x\\) is the minimum or maximum in that row (the expression for \\(V_${decision}(\\alpha)\\) depends on that).`
          : `Observação: o payoff oculto está na decisão <strong>${decision}</strong> e no estado <strong>${state}</strong>. Verifique se \\(x\\) é o mínimo ou o máximo dessa linha (a expressão de \\(V_${decision}(\\alpha)\\) depende disso).`}</p>
      `;
      return `${base}${note}`;
    }

    const common = `
      <p>${isEn
        ? "In this exercise, you want a specific decision to be the one chosen by the Hurwicz rule."
        : "Neste exercício, você quer que uma decisão específica seja a escolhida pela Regra de Otimismo-Pessimismo."}</p>
      ${alphaBlock}
      <ol>
        <li>${isEn
          ? "Compute the minimum and maximum payoff of each decision row."
          : "Calcule o mínimo e o máximo de cada linha (decisão)."} </li>
        <li>${isEn
          ? "Write the evaluation functions \\(V_A(\\alpha), V_B(\\alpha), V_C(\\alpha)\\)."
          : "Escreva as funções de avaliação \\(V_A(\\alpha), V_B(\\alpha), V_C(\\alpha)\\)."} </li>
        <li>${isEn
          ? "Impose inequalities so the target decision’s evaluation is at least as large as the other two."
          : "Imponha inequações para que a avaliação da decisão-alvo seja pelo menos tão grande quanto as outras duas."} </li>
        <li>${isEn
          ? "Solve the inequalities and intersect the result with \\(\\alpha\\in[0,1]\\)."
          : "Resolva as inequações e interseccione com \\(\\alpha\\in[0,1]\\)."} </li>
      </ol>
    `;

    if (instance.typeId === "max_level") {
      return `
        ${common}
        <p>${isEn
          ? "Your final answer is the upper bound of that interval: the maximum \\(\\alpha\\) for which the most conservative decision is still chosen."
          : "A resposta final é o limite superior desse intervalo: o maior \\(\\alpha\\) para o qual a decisão mais conservadora ainda é escolhida."}</p>
      `;
    }

    if (instance.typeId === "min_level") {
      return `
        ${common}
        <p>${isEn
          ? "Your final answer is the lower bound of that interval: the minimum \\(\\alpha\\) for which the riskiest decision is still chosen."
          : "A resposta final é o limite inferior desse intervalo: o menor \\(\\alpha\\) para o qual a decisão mais arriscada ainda é escolhida."}</p>
      `;
    }

    return `
      ${common}
      <p>${isEn
        ? "Your final answer is the whole interval \\([\\alpha_{\\min},\\alpha_{\\max}]\\) for which the intermediate decision is chosen."
        : "A resposta final é o intervalo inteiro \\([\\alpha_{\\min},\\alpha_{\\max}]\\) para o qual a decisão intermediária é escolhida."}</p>
    `;
  })();

  return `
    ${methodHtml}
    <div class="exercises-explainer-gap"></div>
    <p>${typeHeader}</p>
    ${typeBody}
  `;
}

function shuffle(items, rng) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function gcd(a, b) {
  let x = Math.abs(Math.trunc(a));
  let y = Math.abs(Math.trunc(b));
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function reduceFraction(numerator, denominator) {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
    return null;
  }
  const sign = Math.sign(denominator) || 1;
  const num = Math.trunc(numerator) * sign;
  const den = Math.trunc(denominator) * sign;
  const divisor = gcd(num, den);
  return { num: num / divisor, den: den / divisor };
}

function formatNumberPlain(value, digits = 3) {
  if (!Number.isFinite(value)) return "";
  const fixed = value.toFixed(digits);
  return fixed.replace(/\.?0+$/, "");
}

function formatFractionLatex(frac) {
  if (!frac) return "";
  if (frac.den === 1) return String(frac.num);
  return `\\frac{${frac.num}}{${frac.den}}`;
}

function buildHurwiczLine(minVal, maxVal) {
  const d = maxVal - minVal;
  return { min: minVal, max: maxVal, slope: d };
}

function computeRowMinMax(values) {
  const nums = values.filter((v) => typeof v === "number" && Number.isFinite(v));
  if (!nums.length) return { min: 0, max: 0 };
  return { min: Math.min(...nums), max: Math.max(...nums) };
}

function computeHurwiczValue({ min, max }, alpha) {
  return (1 - alpha) * min + alpha * max;
}

function solveDominanceInterval(lines, targetIdx) {
  let lo = 0;
  let hi = 1;

  const target = lines[targetIdx];
  for (let i = 0; i < lines.length; i += 1) {
    if (i === targetIdx) continue;
    const other = lines[i];

    const deltaSlope = target.slope - other.slope;
    const rhs = other.min - target.min;

    if (deltaSlope === 0) {
      if (rhs > 0) return null;
      continue;
    }

    const threshold = rhs / deltaSlope;
    if (deltaSlope > 0) {
      lo = Math.max(lo, threshold);
    } else {
      hi = Math.min(hi, threshold);
    }
    if (lo > hi) return null;
  }

  lo = Math.max(0, lo);
  hi = Math.min(1, hi);
  if (lo > hi) return null;
  return { lo, hi };
}

function solveInequalityStepsLatex({ left, right }) {
  const deltaSlope = left.slope - right.slope;
  const rhs = right.min - left.min;
  if (deltaSlope === 0) {
    return {
      comparator: ">=",
      bound: null,
      lines: [
        `V_${left.label}(\\alpha) \\ge V_${right.label}(\\alpha)`,
        `${left.min} + ${left.slope}\\alpha \\ge ${right.min} + ${right.slope}\\alpha`,
        rhs <= 0 ? `\\text{Verdadeiro para todo } \\alpha \\in [0,1].` : `\\text{Sem solução.}`,
      ],
    };
  }

  const thresholdFrac = reduceFraction(rhs, deltaSlope);
  const threshold = rhs / deltaSlope;
  const sign = deltaSlope > 0 ? "\\ge" : "\\le";
  const final = `\\alpha ${sign} ${formatFractionLatex(thresholdFrac)} \\; (\\approx ${formatNumberPlain(threshold)})`;

  return {
    comparator: deltaSlope > 0 ? ">=" : "<=",
    bound: { value: threshold, frac: thresholdFrac },
    lines: [
      `V_${left.label}(\\alpha) \\ge V_${right.label}(\\alpha)`,
      `${left.min} + ${left.slope}\\alpha \\ge ${right.min} + ${right.slope}\\alpha`,
      `(${left.slope} - ${right.slope})\\alpha \\ge ${right.min} - ${left.min}`,
      final,
    ],
  };
}

function pickBetween(min, max, rng) {
  if (max <= min) return min;
  return randomIntInclusive(min, max, rng);
}

function buildDecisionPayoffs(minVal, maxVal, rng) {
  const innerMin = minVal + 1;
  const innerMax = maxVal - 1;
  const mid = innerMin <= innerMax ? pickBetween(innerMin, innerMax, rng) : minVal;
  return shuffle([minVal, mid, maxVal], rng);
}

function generateThreeDecisionEnvelope(rng) {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const minHigh = randomIntInclusive(35, 75, rng);
    const minMid = randomIntInclusive(15, Math.max(16, minHigh - 10), rng);
    const minLow = randomIntInclusive(0, Math.max(0, minMid - 10), rng);

    if (!(minHigh > minMid && minMid > minLow)) continue;

    const slopeLow = randomIntInclusive(5, 25, rng);
    const slopeMid = randomIntInclusive(slopeLow + 15, slopeLow + 70, rng);
    const slopeHigh = randomIntInclusive(slopeMid + 15, slopeMid + 70, rng);

    const maxLow = minHigh + slopeLow;
    const maxMid = minMid + slopeMid;
    const maxHigh = minLow + slopeHigh;

    if (!(maxHigh > maxMid && maxMid > maxLow)) continue;

    const alpha1 = (minHigh - minMid) / (slopeMid - slopeLow);
    const alpha2 = (minMid - minLow) / (slopeHigh - slopeMid);
    if (!Number.isFinite(alpha1) || !Number.isFinite(alpha2)) continue;
    if (!(alpha1 > 0.05 && alpha2 < 0.95 && alpha1 < alpha2 - 0.12)) continue;

    const archetypes = [
      { archetype: "conservative", min: minHigh, max: maxLow },
      { archetype: "intermediate", min: minMid, max: maxMid },
      { archetype: "risky", min: minLow, max: maxHigh },
    ];
    return { archetypes: shuffle(archetypes, rng) };
  }

  return {
    archetypes: [
      { archetype: "conservative", min: 42, max: 42 },
      { archetype: "intermediate", min: 21, max: 84 },
      { archetype: "risky", min: 0, max: 93 },
    ],
  };
}

function resolveConservativeRiskiestIntermediate(decisions) {
  const sortedByMin = [...decisions].sort((a, b) => b.min - a.min);
  const sortedByMax = [...decisions].sort((a, b) => b.max - a.max);
  const conservative = sortedByMin[0]?.label ?? "";
  const riskiest = sortedByMax[0]?.label ?? "";
  const intermediate = decisions.find((d) => d.label !== conservative && d.label !== riskiest)?.label ?? "";
  return { conservative, riskiest, intermediate };
}

function buildBaseExerciseTable({ decisions, headers }) {
  return {
    headers,
    rows: decisions.map((d) => [d.label, ...d.values]),
  };
}

function buildVariablePayoffTable({ decisions, headers, variable }) {
  const rows = decisions.map((d) => {
    const row = [d.label, ...d.values];
    return row;
  });
  const targetRowIndex = decisions.findIndex((d) => d.label === variable.decisionLabel);
  if (targetRowIndex >= 0) {
    const cellIndex = 1 + variable.stateIndex;
    rows[targetRowIndex][cellIndex] = variable.symbol;
  }
  return { headers, rows };
}

export function generateOptimismExercise({ typeId, rng, tableLabels }) {
  const headers = [tableLabels.decisions, "EDM1", "EDM2", "EDM3"];
  const labels = shuffle(["A", "B", "C"], rng);

  if (typeId === "find_payoff") {
    const alphaSteps = randomIntInclusive(6, 16, rng); // 0.30 to 0.80 in steps of 0.05
    const alpha = alphaSteps * 0.05;
    const targetLabel = labels[0];
    const otherLabels = labels.slice(1);

    for (let attempt = 0; attempt < 250; attempt += 1) {
      const aMin = randomIntInclusive(10, 45, rng);
      const aMax = randomIntInclusive(aMin + 10, aMin + 80, rng);
      const cMin = randomIntInclusive(0, 35, rng);
      const cMax = randomIntInclusive(cMin + 10, cMin + 95, rng);
      if (!(aMax !== cMax && aMin !== cMin)) continue;

      const lineA = buildHurwiczLine(aMin, aMax);
      const lineC = buildHurwiczLine(cMin, cMax);
      const valueA = computeHurwiczValue(lineA, alpha);
      const valueC = computeHurwiczValue(lineC, alpha);
      const bestOther = valueA >= valueC
        ? { label: otherLabels[0], line: lineA, value: valueA }
        : { label: otherLabels[1], line: lineC, value: valueC };
      const otherValue = bestOther.value;

      const bMin = randomIntInclusive(5, 35, rng);
      const knownMax = randomIntInclusive(bMin + 5, bMin + 25, rng);
      const otherValueNum = 20 * bestOther.line.min + alphaSteps * (bestOther.line.max - bestOther.line.min);
      const rhsNum = otherValueNum - (20 - alphaSteps) * bMin;
      const xReq = rhsNum / alphaSteps;
      if (!Number.isFinite(xReq)) continue;
      if (!(xReq > knownMax + 4 && xReq < 160)) continue;

      const otherAValues = buildDecisionPayoffs(aMin, aMax, rng);
      const otherCValues = buildDecisionPayoffs(cMin, cMax, rng);

      const stateIndex = randomIntInclusive(0, 2, rng);
      const remaining = shuffle([0, 1, 2].filter((idx) => idx !== stateIndex), rng);
      const bValues = Array(3).fill(0);
      bValues[stateIndex] = null;
      bValues[remaining[0]] = bMin;
      bValues[remaining[1]] = knownMax;

      const decisions = [
        {
          label: targetLabel,
          values: bValues.map((v) => (v === null ? 0 : v)),
          line: buildHurwiczLine(bMin, knownMax),
          variable: { min: bMin, knownMax },
        },
        {
          label: otherLabels[0],
          values: otherAValues,
          line: lineA,
        },
        {
          label: otherLabels[1],
          values: otherCValues,
          line: lineC,
        },
      ].map((d) => ({
        ...d,
        min: d.line.min,
        max: d.line.max,
        slope: d.line.max - d.line.min,
      }));

      return {
        typeId,
        alpha,
        table: buildVariablePayoffTable({
          decisions: decisions.map((d) => ({
            label: d.label,
            values: d.label === targetLabel ? bValues.map((v) => (v === null ? "x" : v)) : d.values,
          })),
          headers,
          variable: { decisionLabel: targetLabel, stateIndex, symbol: "x" },
        }),
        decisions,
        variable: {
          decisionLabel: targetLabel,
          stateIndex,
          symbol: "x",
          alpha,
          alphaSteps,
          min: bMin,
          knownMax,
          required: xReq,
          otherValue,
          rhsNum,
          requiredFraction: reduceFraction(rhsNum, alphaSteps),
          bestOther: {
            label: bestOther.label,
            min: bestOther.line.min,
            max: bestOther.line.max,
            value: bestOther.value,
            valueFraction: reduceFraction(otherValueNum, 20),
          },
        },
      };
    }
  }

  const { archetypes } = generateThreeDecisionEnvelope(rng);

  const decisions = labels.map((label, idx) => {
    const archetype = archetypes[idx] ?? archetypes[0];
    const values = buildDecisionPayoffs(archetype.min, archetype.max, rng);
    const { min, max } = computeRowMinMax(values);
    const line = buildHurwiczLine(min, max);
    return { label, values, min, max, slope: line.slope, archetype: archetype.archetype };
  });

  const table = buildBaseExerciseTable({ decisions, headers });

  const lines = decisions.map((d) => ({ label: d.label, min: d.min, max: d.max, slope: d.slope }));
  const intervals = Object.fromEntries(
    lines.map((_, idx) => {
      const interval = solveDominanceInterval(lines, idx);
      return [lines[idx].label, interval];
    })
  );

  const { conservative, riskiest, intermediate } = resolveConservativeRiskiestIntermediate(decisions);

  return {
    typeId,
    alpha: null,
    table,
    decisions,
    lines,
    intervals,
    roles: { conservative, riskiest, intermediate },
  };
}

export function buildOptimismStatementHtml(instance, texts) {
  const isPayoff = instance.typeId === "find_payoff";
  const alpha = instance.alpha;

  const baseLead = (() => {
    if (instance.typeId === "max_level") {
      return texts.exerciseTypes.find((t) => t.id === "max_level")?.description ?? "";
    }
    if (instance.typeId === "min_level") {
      return texts.exerciseTypes.find((t) => t.id === "min_level")?.description ?? "";
    }
    if (instance.typeId === "interval") {
      return texts.exerciseTypes.find((t) => t.id === "interval")?.description ?? "";
    }
    return texts.exerciseTypes.find((t) => t.id === "find_payoff")?.description ?? "";
  })();

  if (!isPayoff) {
    return `
      <p class="exercises-lead">${baseLead}</p>
    `;
  }

  const variable = instance.variable;
  const stateLabel = `EDM${(variable?.stateIndex ?? 0) + 1}`;
  const alphaStr = formatNumberPlain(alpha, 2);
  const alphaPercent = Math.round(Number(alpha) * 100);

  if (!variable) {
    return `<p class="exercises-lead">${baseLead}</p>`;
  }

  const statement = String(texts.statementFindPayoff ?? "")
    .replaceAll("{decision}", String(variable.decisionLabel ?? ""))
    .replaceAll("{state}", String(stateLabel))
    .replaceAll("{percent}", String(alphaPercent))
    .replaceAll("{alpha}", String(alphaStr));

  return `<p class="exercises-lead">${statement}</p>`;
}

export function buildOptimismHintBodyHtml(instance, texts) {
  if (!instance || instance.typeId === "find_payoff") return "";
  const decisions = Array.isArray(instance.decisions) ? instance.decisions : [];
  if (!decisions.length) return "";

  const isEn = Boolean(texts?.isEn);
  const roles = instance.roles ?? resolveConservativeRiskiestIntermediate(decisions);
  const sorted = [...decisions].sort((a, b) => String(a.label).localeCompare(String(b.label)));

  const listItemsMin = sorted
    .map(
      (d) => `
      <li class="exercises-solution-item">
        <span class="exercises-solution-key">min(${d.label}):</span> ${d.min}
      </li>
    `
    )
    .join("");

  const listItemsMax = sorted
    .map(
      (d) => `
      <li class="exercises-solution-item">
        <span class="exercises-solution-key">max(${d.label}):</span> ${d.max}
      </li>
    `
    )
    .join("");

  const listItemsMinMax = sorted
    .map(
      (d) => `
      <li class="exercises-solution-item">
        <span class="exercises-solution-key">${d.label}:</span> min = ${d.min}, max = ${d.max}
      </li>
    `
    )
    .join("");

  if (instance.typeId === "max_level") {
    const label = roles.conservative;
    const value = decisions.find((d) => d.label === label)?.min ?? "";
    return `
      <p>${isEn
        ? "<b>Most conservative</b> = the decision with the highest minimum payoff (worst case)."
        : "<b>Mais conservadora</b> = a decisão com o maior payoff mínimo (pior caso)."}</p>
      <ul class="exercises-solution-list">${listItemsMin}</ul>
      <p>${isEn
        ? `So, the most conservative decision is <b>${label}</b>, because it has the highest minimum payoff (${value}).`
        : `Logo, a decisão mais conservadora é <b>${label}</b>, pois ela tem o maior payoff mínimo (${value}).`}</p>
    `;
  }

  if (instance.typeId === "min_level") {
    const label = roles.riskiest;
    const value = decisions.find((d) => d.label === label)?.max ?? "";
    return `
      <p>${isEn
        ? "<b>Riskiest</b> = the decision with the highest maximum payoff (best case)."
        : "<b>Mais arriscada</b> = a decisão com o maior payoff máximo (melhor caso)."}</p>
      <ul class="exercises-solution-list">${listItemsMax}</ul>
      <p>${isEn
        ? `So, the riskiest decision is <b>${label}</b>, because it has the highest maximum payoff (${value}).`
        : `Logo, a decisão mais arriscada é <b>${label}</b>, pois ela tem o maior payoff máximo (${value}).`}</p>
    `;
  }

  if (instance.typeId === "interval") {
    return `
      <p>${isEn
        ? "<b>Intermediate</b> = the remaining decision (neither the most conservative nor the riskiest)."
        : "<b>Intermediária</b> = a alternativa restante (nem a mais conservadora, nem a mais arriscada)."}</p>
      <ul class="exercises-solution-list">${listItemsMinMax}</ul>
      <p>${isEn
        ? `Here, the most conservative is <b>${roles.conservative}</b> (highest min), the riskiest is <b>${roles.riskiest}</b> (highest max), so the intermediate is <b>${roles.intermediate}</b>.`
        : `Aqui, a mais conservadora é <b>${roles.conservative}</b> (maior min), a mais arriscada é <b>${roles.riskiest}</b> (maior max) e, portanto, a intermediária é <b>${roles.intermediate}</b>.`}</p>
    `;
  }

  return "";
}

function buildLineLatex(decision) {
  const minVal = decision.min;
  const maxVal = decision.max;
  const slope = maxVal - minVal;
  return `V_${decision.label}(\\alpha) = (1-\\alpha)\\cdot ${minVal} + \\alpha \\cdot ${maxVal} = ${minVal} + ${slope}\\alpha`;
}

function buildIntervalLatex(lo, hi) {
  const loStr = formatNumberPlain(lo);
  const hiStr = formatNumberPlain(hi);
  return `\\alpha \\in [${loStr},\\; ${hiStr}]`;
}

export function buildOptimismSolutionHtml(instance, texts) {
  if (!instance) return "";

  if (instance.typeId === "find_payoff") {
    const v = instance.variable;
    if (!v) return "";

    const alpha = v.alpha;
    const alphaStr = formatNumberPlain(alpha, 2);
    const otherLines = (instance.decisions ?? [])
      .filter((d) => d.label !== v.decisionLabel)
      .map((d) => ({ label: d.label, min: d.min, max: d.max, value: computeHurwiczValue(d, alpha) }));
    const otherLinesLatex = otherLines
      .map((d) => {
        const valueStr = formatNumberPlain(d.value, 3);
        return `<div class="exercises-katex-line">\\[ V_{${d.label}}(\\alpha) = (1-\\alpha)\\cdot ${d.min} + \\alpha \\cdot ${d.max} = ${valueStr} \\]</div>`;
      })
      .join("");

    const otherStr = formatNumberPlain(v.otherValue, 3);
    const rhsNum = v.rhsNum ?? 0;
    const rhsDen = 20;
    const rhsFrac = reduceFraction(rhsNum, rhsDen);
    const rhsStr = formatNumberPlain(rhsNum / rhsDen, 3);
    const required = v.required;
    const requiredStr = formatNumberPlain(required, 3);

    const requiredFracLatex = formatFractionLatex(v.requiredFraction);
    const extraBound = v.knownMax;

    const body = `
      <p>${texts.solutionWeWantDecision
        .replace("{decision}", `<b>${v.decisionLabel}</b>`)
        .replace("{alpha}", `<b>${alphaStr}</b>`)}</p>
      <div class="exercises-explainer-math">
        <div class="exercises-explainer-math-title">${texts.hurwiczRuleTitle}</div>
        <div class="exercises-katex-line">\\[ V_i(\\alpha) = (1-\\alpha)\\cdot \\min(i) + \\alpha \\cdot \\max(i) \\]</div>
      </div>
      <p>${texts.solutionComputeOthers.replace("{alpha}", alphaStr)}</p>
      <div class="exercises-explainer-math">
        ${otherLinesLatex}
        <div class="exercises-katex-line">\\[ \\max\\{V_{\\text{${texts.othersLatexLabel}}}(\\alpha)\\} = ${otherStr} \\]</div>
      </div>
      <p>${texts.solutionForDecisionMinMax
        .replace("{decision}", `<b>${v.decisionLabel}</b>`)
        .replace("{min}", `\\( ${v.min} \\)`)}</p>
      <div class="exercises-explainer-math">
        <div class="exercises-katex-line">\\[ V_{${v.decisionLabel}}(\\alpha) = (1-\\alpha)\\cdot ${v.min} + \\alpha \\cdot x \\]</div>
      </div>
      <p>${texts.solutionImpose}</p>
      <div class="exercises-explainer-math">
        <div class="exercises-katex-line">\\[ (1-\\alpha)\\cdot ${v.min} + \\alpha x \\ge ${otherStr} \\]</div>
        <div class="exercises-katex-line">\\[ \\alpha x \\ge ${otherStr} - (1-\\alpha)\\cdot ${v.min} = ${rhsFrac ? formatFractionLatex(rhsFrac) : rhsStr} \\approx ${rhsStr} \\]</div>
        <div class="exercises-katex-line">\\[ x \\ge \\frac{${rhsFrac ? formatFractionLatex(rhsFrac) : rhsStr}}{${alphaStr}} = ${requiredFracLatex} \\approx ${requiredStr} \\]</div>
      </div>
      <p>${texts.solutionAlsoNeedMax.replace("{bound}", `\\( ${extraBound} \\)`)}</p>
      <p class="exercises-solution-summary"><span class="exercises-solution-key">${texts.answerLabel}:</span> \\(x \\ge ${formatNumberPlain(
        Math.max(required, extraBound),
        3
      )}\\).</p>
    `;

    return `
      <h4 class="exercises-solution-title">${texts.solutionTitle}</h4>
      <hr class="exercises-solution-divider" />
      ${body}
    `;
  }

  const roles = instance.roles ?? resolveConservativeRiskiestIntermediate(instance.decisions ?? []);
  const targetLabel =
    instance.typeId === "max_level"
      ? roles.conservative
      : instance.typeId === "min_level"
        ? roles.riskiest
        : roles.intermediate;

  const lines = (instance.lines ?? []).map((line) => ({ ...line }));
  const targetIdx = lines.findIndex((l) => l.label === targetLabel);
  const interval = targetIdx >= 0 ? solveDominanceInterval(lines, targetIdx) : null;

  const decisionsMap = Object.fromEntries((instance.decisions ?? []).map((d) => [d.label, d]));
  const decisionLatex = Object.values(decisionsMap)
    .map((d) => `<div class="exercises-katex-line">\\[ ${buildLineLatex(d)} \\]</div>`)
    .join("");

  const target = decisionsMap[targetLabel];
  const others = lines.filter((l) => l.label !== targetLabel);
  const inequalityBlocks = others
    .map((otherLine) => {
      const steps = solveInequalityStepsLatex({ left: target, right: otherLine });
      const mathLines = steps.lines
        .map((line) => `<div class="exercises-katex-line">\\[ ${line} \\]</div>`)
        .join("");
      return `<div class="exercises-explainer-math">${mathLines}</div>`;
    })
    .join('<div class="exercises-explainer-gap"></div>');

  const roleText = `
    <ul class="exercises-solution-list">
      <li class="exercises-solution-item"><span class="exercises-solution-key">${texts.roleConservativeLabel}:</span> <b>${roles.conservative}</b></li>
      <li class="exercises-solution-item"><span class="exercises-solution-key">${texts.roleRiskiestLabel}:</span> <b>${roles.riskiest}</b></li>
      <li class="exercises-solution-item"><span class="exercises-solution-key">${texts.roleIntermediateLabel}:</span> <b>${roles.intermediate}</b></li>
    </ul>
  `;

  const intervalLatex = interval ? buildIntervalLatex(interval.lo, interval.hi) : "";
  const summary = (() => {
    if (!interval) return "";
    if (instance.typeId === "max_level") {
      return `\\alpha_{\\max} = ${formatNumberPlain(interval.hi)}`;
    }
    if (instance.typeId === "min_level") {
      return `\\alpha_{\\min} = ${formatNumberPlain(interval.lo)}`;
    }
    return intervalLatex;
  })();

  return `
    <h4 class="exercises-solution-title">${texts.solutionTitle}</h4>
    <hr class="exercises-solution-divider" />
    ${roleText}
    <p>${texts.solutionWeComputeFunctions}</p>
    <div class="exercises-explainer-math">
      <div class="exercises-explainer-math-title">${texts.hurwiczFunctionsTitle}</div>
      ${decisionLatex}
    </div>
    <p>${texts.solutionToChooseNeed.replace("{decision}", `<b>${targetLabel}</b>`)}</p>
    ${inequalityBlocks}
    <div class="exercises-explainer-math">
      <div class="exercises-katex-line">\\[ ${intervalLatex} \\]</div>
    </div>
    <p class="exercises-solution-summary"><span class="exercises-solution-key">${texts.answerLabel}:</span> \\( ${summary} \\).</p>
  `;
}

// (No "check answer" flow in this exercise.)
