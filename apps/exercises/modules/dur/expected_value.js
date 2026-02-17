// ============================================================================
// Decision Under Risk (DUR) - Expected Value (Lottery)
// ============================================================================

import { generateLottery } from "../shared/decision_tree.js";

const L = (pt, en) => ({ pt, en });

export function buildExpectedValueTexts(lang) {
  const isEn = lang === "en";

  return {
    sidebarTitle: isEn ? "Exercise parameters" : "Parâmetros do exercício",
    exerciseType: isEn ? "Choose exercise" : "Escolher exercício",
    payoffCount: isEn ? "Number of payoffs" : "Número de payoffs",
    proposedPayoffsLabel: isEn ? "Payoffs" : "Payoffs",
    proposedProbabilitiesLabel: isEn ? "Probabilities" : "Probabilidades",
    proposedPayoffsPlaceholder: isEn ? "100; -50; 200" : "100; -50; 200",
    proposedProbabilitiesPlaceholder: isEn ? "0.2; 0.5; 0.3" : "0.2; 0.5; 0.3",
    proposedPayoffsHelp: isEn
      ? "Separate values with semicolons (e.g., 100; -50; 200)."
      : "Separe os valores por ponto e vírgula (ex.: 100; -50; 200).",
    proposedProbabilitiesHelp: isEn
      ? "Use decimals that sum to 1 or percentages (e.g., 0.2; 0.5; 0.3 or 20; 50; 30)."
      : "Use decimais que somem 1 ou percentuais (ex.: 0.2; 0.5; 0.3 ou 20; 50; 30).",
    proposedErrorEmpty: isEn
      ? "Fill in both payoffs and probabilities."
      : "Preencha os campos de payoffs e probabilidades.",
    proposedErrorCount: isEn
      ? "Provide between 2 and 8 values."
      : "Informe entre 2 e 8 valores.",
    proposedErrorMismatch: isEn
      ? "The number of payoffs must match the number of probabilities."
      : "O número de payoffs deve ser igual ao número de probabilidades.",
    proposedErrorInvalidPayoffs: isEn
      ? "Payoffs must be valid numbers."
      : "Os payoffs devem ser números válidos.",
    proposedErrorInvalidProbabilities: isEn
      ? "Probabilities must be valid numbers between 0 and 1 (or 0 to 100)."
      : "As probabilidades devem ser números válidos entre 0 e 1 (ou 0 a 100).",
    proposedErrorProbSum: isEn
      ? "Probabilities must sum to 1."
      : "A soma das probabilidades deve ser igual a 1.",
    generate: isEn ? "Generate Lottery" : "Gerar Loteria",
    generateTab: isEn ? "🎰 Build Lottery" : "🎰 Gerar Loteria",
    exerciseIntro: isEn
      ? "Generate the lottery to start the exercise."
      : "Gere a loteria para iniciar o exercício.",
    solutionPlaceholder: isEn
      ? "Generate the lottery to see its solution here."
      : "Gere a loteria para visualizar sua solução aqui.",
    exerciseStatement: isEn
      ? "The figure below represents a lottery: a world-state node with the payoffs and probabilities of each state shown on the branches. Compute the expected value of this lottery."
      : "A figura a seguir representa uma “loteria” como um nó de estados do mundo com os payoffs e as probabilidades de cada estado do mundo indicados nos respectivos ramos. Calcule o valor esperado dessa loteria.",
    exerciseStatementFindPayoff: isEn
      ? "The figure below represents a lottery and shows its expected value. One payoff, indicated as “x”, is missing.<br />Find the value of x."
      : "A figura a seguir representa uma loteria e informa o seu valor esperado. Um dos payoffs, indicado como “x”, não foi informado.<br />Encontre o valor de x.",
    exerciseStatementFindProbabilities: isEn
      ? "The figure below represents a lottery and shows its expected value. Two probabilities, indicated as “p1” and “p2”, are missing.<br />Find the values of p1 and p2."
      : "A figura a seguir representa uma loteria e informa o seu valor esperado. Duas probabilidades, indicadas como “p1” e “p2”, não foram informadas.<br />Encontre os valores de p1 e p2.",
    expectedValueExplainerTitle: isEn
      ? "How to compute the expected value"
      : "Como calcular o valor esperado",
    expectedValueExplainerBody: isEn
      ? `
        <p>
          The expected value (\\(V_e\\)) is the <strong>long-run average</strong> return of the lottery.
        </p>
        <p>
          When the lottery is repeated many times, the average of the realized returns tends to \\(V_e\\).
          It is therefore a summary measure: it does not represent a guaranteed outcome in a single play.
        </p>
        <p>
          To compute the expected value, we sum the possible outcomes across different states of the world,
          each weighted by its corresponding probability.
        </p>
        <p>
          Thus, if the outcomes are \\(x_1,\\dots,x_k\\), with probabilities \\(p_1,\\dots,p_k\\), we have:
        </p>
        <p>$$V_e = \\sum_{i=1}^{k} x_i\\,p_i$$</p>
        <p>$$V_e = x_1\\,p_1 + x_2\\,p_2 + \\cdots + x_k\\,p_k$$</p>
      `
      : `
        <p>
          O valor esperado (\\(V_e\\)) é a <strong>média de longo prazo</strong> do retorno da loteria.
        </p>
        <p>
          Ao repetir a loteria muitas vezes, a média dos retornos obtidos tenderá a \\(V_e\\).
          Trata-se, portanto, de uma medida-resumo: não é um resultado garantido em uma jogada.
        </p>
        <p>
          Para calcular o valor esperado, somamos os resultados dos diferentes estados do mundo multiplicados pelas suas respectivas probabilidades.
        </p>
        <p>
          Assim, se os resultados são \\(x_1,\\dots,x_k\\), com probabilidades \\(p_1,\\dots,p_k\\), então temos:
        </p>
        <p>$$V_e = \\sum_{i=1}^{k} x_i\\,p_i$$</p>
        <p>$$V_e = x_1\\,p_1 + x_2\\,p_2 + \\cdots + x_k\\,p_k$$</p>
      `,
    stdDevExplainerTitle: isEn
      ? "Extra: compute the theoretical standard deviation of this lottery"
      : "Extra: calcule o desvio padrão teórico desta loteria",
    stdDevExplainerBody: isEn
      ? `
        <p>
          The standard deviation measures how much the lottery outcomes <strong>spread</strong>
          around the expected value. As a result, two lotteries may have the same
          \\(V_e\\) and yet exhibit very different levels of risk.
        </p>
        <p>
          To understand this measure, we begin with the <strong>variance</strong>.
          Let \\(V_e\\) be the expected value. The variance computes the average
          <em>squared</em> distance between each possible outcome and the expected value,
          weighted by the probability of each outcome.
        </p>
        <p>
          Formally, the variance (\\(\\mathrm{Var}(X)\\)) is defined as:
        </p>
        <p>
          $$\\mathrm{Var}(X) = \\sum_{i=1}^{k} (x_i - V_e)^2\\,p_i$$
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
          \\(V_e\\) e, ainda assim, apresentar níveis de risco bastante diferentes.
        </p>
        <p>
          Para entender essa medida, começamos pela <strong>variância</strong>.
          Seja \\(V_e\\) o valor esperado. A variância calcula a distância média
          <em>ao quadrado</em> entre cada resultado possível e o valor esperado,
          ponderada pelas probabilidades de cada resultado.
        </p>
        <p>
          Formalmente, a variância (\\(\\mathrm{Var}(X)\\)) é definida como:
        </p>
        <p>
          $$\\mathrm{Var}(X) = \\sum_{i=1}^{k} (x_i - V_e)^2\\,p_i$$
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
      `,
    solutionIntro: isEn
      ? "Below is the expected value calculation for the lottery."
      : "A seguir, apresentamos o cálculo do valor esperado da loteria.",
    treeAriaLabel: isEn ? "Lottery" : "Loteria",
    solutionTitle: isEn ? "Expected value" : "Valor esperado",
    solutionTitleFindPayoff: isEn ? "Missing payoff" : "Payoff desconhecido",
    solutionIntroFindPayoff: isEn
      ? "Below, we solve the problem by finding the missing payoff using the expected value given in the exercise."
      : "A seguir, resolvemos o problema, encontrando o payoff desconhecido a partir do valor esperado informado no exercício.",
    solutionTitleFindProbabilities: isEn ? "Missing probabilities" : "Probabilidades desconhecidas",
    solutionIntroFindProbabilities: isEn
      ? "Below, we solve the problem using the expected value in the prompt and the fact that probabilities must sum to 1."
      : "A seguir, resolvemos o problema usando o valor esperado indicado no enunciado e o fato de que a soma das probabilidades deve ser igual a 1.",
    probSolutionSectionSum: isEn ? "Probabilities sum to 1:" : "Probabilidades somam 1:",
    probSolutionSectionEv: isEn ? "Expected value formula:" : "Fórmula do valor esperado:",
    probSolutionSectionP1: isEn ? "Solving for p1 (by substitution):" : "Cálculo de p1 (por substituição):",
    probSolutionSectionP2: isEn
      ? "Solving for p2 (using the value of p1):"
      : "Cálculo de p2 (conhecendo o valor de p1):",
    missingPayoffLabel: isEn ? "Missing payoff" : "Payoff desconhecido",
    solutionSectionTitle: isEn ? "Solution" : "Solução",
    toggleShow: isEn ? "View explanation" : "Visualizar a explicação",
    toggleHide: isEn ? "Hide explanation" : "Ocultar explicação",
    toggleShowShort: isEn ? "View" : "Visualizar",
    toggleHideShort: isEn ? "Hide" : "Ocultar",
  };
}

export const EXPECTED_VALUE_EXERCISES = [
  { id: "random_lottery", label: L("Avaliar uma Loteria", "Evaluate a Lottery") },
  { id: "find_payoff", label: L("Encontre o Payoff", "Find the Payoff") },
  { id: "find_probabilities", label: L("Encontre as Probabilidades", "Find the Probabilities") },
  { id: "propose_lottery", label: L("Proponha uma Loteria", "Propose a Lottery") },
];

export function buildRandomLottery(options = {}) {
  return generateLottery({
    rng: options.rng,
    numStates: options.numStates,
    probabilityStep: options.probabilityStep,
  });
}
