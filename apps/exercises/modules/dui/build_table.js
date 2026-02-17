// ============================================================================
// Decision Under Ignorance (DUI) - Build the Table
// ============================================================================

export function buildBuildTableTexts(lang) {
  const isEn = lang === "en";

  return {
    sidebarTitle: isEn ? "Build the Table" : "Construa a Tabela",
    generateTab: isEn ? "🚀 Generate Exercise" : "🚀 Gerar Exercício",
    generate: isEn ? "Generate Exercise" : "Gerar Exercício",
    option3Title: isEn ? "Table 3x3:" : "Tabela 3x3:",
    option3Description: isEn
      ? "Build a 3x3 table that satisfies the condition of 3 distinct solutions with the traditional solution methods."
      : "Construa uma tabela 3x3 que satisfaça à condição de 3 soluções distintas com os métodos de solução tradicionais.",
    option4Title: isEn ? "Table 4x4:" : "Tabela 4x4:",
    option4Description: isEn
      ? "Build a 4x4 table and choose an optimism level to satisfy the condition of 4 distinct solutions with the traditional solution methods."
      : "Construa uma tabela 4x4 e escolha um nível de otimismo de forma a satisfazer à condição de 4 soluções distintas com os métodos de solução tradicionais.",
    statement3: isEn
      ? "The table below represents a decision-under-ignorance problem with 3 decisions (D1, D2, and D3) and 3 states of the world (E1, E2, and E3). Fill in the payoffs so that, when we solve the resulting decision problem using the Maximin, Minimax, and Principle of Insufficient Reason methods, each method leads to a different decision."
      : "A tabela a seguir representa um problema de decisão sob ignorância com 3 decisões (D1, D2 e D3) e 3 estados do mundo (E1, E2 e E3). Preencha os payoffs da tabela de forma que, ao resolvermos problema de decisão resultante com os métodos Maximin, Minimax e Princípio da Razão Insuficiente, cada método de solução leve a uma decisão distinta.",
    statement4: isEn
      ? "The table below represents a decision-under-ignorance problem with 4 decisions (D1, D2, D3, and D4) and 4 states of the world (E1, E2, E3, and E4). Fill in the payoffs and the optimism level so that, when we solve the resulting decision problem using the Maximin, Minimax, Optimism–Pessimism Rule, and Principle of Insufficient Reason methods, each method leads to a different decision."
      : "A tabela a seguir representa um problema de decisão sob ignorância com 4 decisões (D1, D2, D3 e D4) e 4 estados do mundo (E1, E2, E3 e E4). Preencha os payoffs da tabela e o campo referente ao nível de otimismo, de forma que, ao resolvermos problema de decisão resultante com os métodos Maximin, Minimax, Regra de Otimismo-Pessimismo e Princípio da Razão Insuficiente, cada método de solução leve a uma decisão distinta.",
    optimismLabel: isEn ? "Optimism level (0 to 1)" : "Nível de otimismo (0 a 1)",
    exerciseIntro: isEn
      ? "Choose the desired exercise option and click “Generate Exercise” to begin."
      : "Escolha a opção de exercício desejada e clique em “Gerar Exercício” para iniciar.",
    solutionIntro: isEn
      ? "Generate the desired exercise, fill in the values, and click “Check Answer” to see if your choices satisfy the prompt."
      : "Gere o exercício desejado, preencha os valores indicados e clique em “Verificar Resposta” para ver se os valores escolhidos atendem ao que foi pedido no enunciado do exercício.",
    checkStatusCorrect: isEn ? "Correct" : "Certo",
    checkStatusWrong: isEn ? "Incorrect" : "Errado",
    solutionTitle: isEn ? "Solution" : "Solução",
    solutionLead: isEn
      ? "Below are the decisions obtained by each method."
      : "A seguir, apresentamos as decisões obtidas por cada método.",
    resultCorrect: isEn
      ? "Because each method yields a different decision, your answer satisfies the prompt."
      : "Como cada método levou a uma decisão distinta, sua resposta atende ao enunciado.",
    resultIncorrectIntro: isEn
      ? "Your answer does not satisfy the prompt."
      : "Sua resposta não atende ao enunciado.",
    resultTie: isEn ? "There was a tie in {methods}." : "Houve empate em {methods}.",
    resultDuplicate: isEn
      ? "{methods} pointed to the same decision ({decision})."
      : "{methods} indicaram a mesma decisão ({decision}).",
    exerciseStatement: isEn ? "Lorem Ipsum" : "Lorem Ipsum",
    checkButtonLabel: isEn ? "Check Answer" : "Verificar Resposta",
    checkMessage: isEn
      ? "Fill in all fields above before checking your answer."
      : "Preencha todos os campos acima antes de verificar sua resposta.",
  };
}
