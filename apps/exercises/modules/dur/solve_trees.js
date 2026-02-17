// ============================================================================
// Decision Under Risk (DUR) - Solve Trees
// ============================================================================

import { generateRandomDecisionTree } from "../shared/decision_tree.js";

const L = (pt, en) => ({ pt, en });

export function buildDurTexts(lang) {
  const isEn = lang === "en";

  return {
    sidebarTitle: isEn ? "Exercise parameters" : "Parâmetros do exercício",
    exerciseType: isEn ? "Tree size" : "Tamanho da árvore",
    probabilityPrecision: isEn
      ? "Probability precision"
      : "Precisão das probabilidades",
    generate: isEn ? "Generate Tree" : "Gerar Árvore",
    generateTab: isEn ? "🌳 Build Tree" : "🌳 Gerar Árvore",
    exerciseIntro: isEn
      ? "Generate the decision tree to start the exercise."
      : "Gere a árvore de decisão para iniciar o exercício.",
    exerciseStatement: isEn
      ? "Solve the decision problem represented by the tree below, assuming the decision maker is risk-neutral."
      : "Resolva o problema de decisão representado pela árvore a seguir, supondo que o decisor é neutro em relação ao risco.",
    solutionIntro: isEn
      ? "Generate the tree to see its solution here."
      : "Gere a árvore para visualizar sua solução aqui.",
    treeAriaLabel: isEn ? "Decision tree" : "Árvore de decisão",
    solutionTitle: isEn ? "Solution steps" : "Cálculo da solução",
    solvedTreeTitle: isEn ? "Solved tree" : "Árvore Resolvida",
    solutionIntroText: isEn
      ? "Below we present the calculation used to evaluate the chance nodes and decision nodes of the tree."
      : "A seguir, apresentamos o cálculo realizado para a avaliação dos nós de estados do mundo e nós de decisão da árvore.",
    solutionSectionChance: isEn ? "Chance nodes" : "Nós de estados do mundo",
    solutionSectionDecision: isEn ? "Decision nodes" : "Nós de decisão",
    solutionSectionResult: isEn ? "Result" : "Resultado",
    solutionResultSingle: isEn
      ? "The risk-neutral decision maker chooses {choice} and obtains a payoff of {value}."
      : "O decisor neutro em relação ao risco escolhe {choice} e obtém um payoff de {value}.",
    solutionResultMulti: isEn
      ? "The risk-neutral decision maker is indifferent between choosing {choices}, obtaining a payoff of {value} with both options."
      : "O decisor neutro em relação ao risco é indiferente entre escolher {choices}, obtendo um payoff de {value} com ambas as opções.",
    solutionResultMultiMany: isEn
      ? "The risk-neutral decision maker is indifferent between choosing {choices}, obtaining a payoff of {value} with all options."
      : "O decisor neutro em relação ao risco é indiferente entre escolher {choices}, obtendo um payoff de {value} com todas as opções.",
    legendTitle: isEn ? "Legend of node values" : "Legenda dos valores dos nós",
    explainerTitle: isEn ? "How to solve a decision tree" : "Como resolver uma árvore",
    explainerBody: isEn
      ? `
        <p>
          A decision tree represents a sequence of choices and uncertain outcomes. In our convention,
          decision nodes are open squares, chance nodes are open circles, and branches describe decisions
          or states of the world. The corresponding payoff values and probabilities are shown below each branch.
        </p>
        <p>
          To solve the tree for a risk-neutral decision maker, we use <strong>backward induction</strong>
          (i.e., we evaluate the nodes from right to left, moving from the last to the first). Following
          this order, we should carry out these steps:
        </p>
        <ul>
          <li>
            To evaluate each chance node, compute the expected value of the outcomes:
            $$V_e = \\sum_{i=1}^{k} p_i\\,x_i$$
            and write this value below the node.
          </li>
          <li>
            To evaluate each decision node, compare the branch values and keep the largest
            (if there is a tie, the decision maker is indifferent). Then cross out the rejected
            branches and write the value of the chosen option below the node.
          </li>
          <li>
            By replacing each node, once evaluated, with its assigned value, we move backward,
            always evaluating the rightmost nodes before the leftmost ones. This way we can use
            the evaluation of later nodes as part of the evaluation of earlier nodes.
          </li>
        </ul>
        <p>
          After completing all evaluations, the value written below the initial node is the expected
          final payoff for a risk-neutral decision maker, and the branches at each decision node that
          were not crossed out represent the chosen actions at each decision stage.
        </p>
      `
      : `
        <p>
          Uma árvore de decisão representa uma sequência de escolhas e resultados incertos. Na nossa
          convenção, nós de decisão são representados por quadrados abertos, nós de estados do mundo
          são representados por círculos abertos, e os ramos descrevem decisões ou estados do mundo.
          Os respectivos valores dos payoffs e probabilidades são indicados abaixo de cada ramo.
        </p>
        <p>
          Para resolver a árvore como um decisor neutro em relação ao risco, usamos a
          <strong>indução retroativa</strong> (ou seja, avaliamos os nós da direita para a esquerda,
          indo do último para o primeiro). Seguindo essa ordem, devemos cumprir as seguintes etapas:
        </p>
        <ul>
          <li>
            Para avaliar cada nó de estados do mundo, calculamos o valor esperado dos resultados:
            $$V_e = \\sum_{i=1}^{k} p_i\\,x_i$$
            e escreva esse valor abaixo do nó.
          </li>
          <li>
            Para avaliar cada nó de decisão, comparamos os valores dos ramos e mantemos o maior
            (em caso de empate, o decisor é indiferente). Em seguida riscamos os ramos rejeitados e
            escrevemos o valor da opção escolhida abaixo do nó.
          </li>
          <li>
            Substituindo cada nó, dessa forma avaliado, pelo valor a ele atribuído, avançamos de trás
            pra frente, sempre avaliando os nós mais à direita antes de avaliar os nós mais à esquerda.
            Dessa forma podemos usar a avaliação dos nós subsequentes como parte da avaliação dos nós anteriores.
          </li>
        </ul>
        <p>
          Após terminarmos todas as avaliações, o valor escrito abaixo do nó inicial constitui o
          payoff final esperado de um decisor neutro em relação ao risco e os ramos de cada nó de
          decisão que não foram riscados constituem as suas escolhas em cada etapa de decisão.
        </p>
      `,
    toggleShow: isEn ? "View explanation" : "Visualizar a explicação",
    toggleHide: isEn ? "Hide explanation" : "Ocultar explicação",
    toggleShowShort: isEn ? "View" : "Visualizar",
    toggleHideShort: isEn ? "Hide" : "Ocultar",
  };
}

export const DUR_TREE_SIZES = [
  { id: "small", label: L("Pequena", "Small") },
  { id: "medium", label: L("Média", "Medium") },
  { id: "large", label: L("Grande", "Large") },
];

export const DUR_PROBABILITY_PRECISIONS = [
  { id: 1, label: "1%" },
  { id: 5, label: "5%" },
  { id: 10, label: "10%" },
];

export function buildDurRandomTree(options = {}) {
  return generateRandomDecisionTree({
    rng: options.rng,
    size: options.size,
    probabilityStep: options.probabilityStep,
  });
}
