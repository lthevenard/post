// ============================================================================
// Decision Under Ignorance (DUI) - Optimism Level
// ============================================================================

export function buildOptimismTexts(lang) {
  const isEn = lang === "en";

  return {
    sidebarTitle: isEn ? "Optimism Level" : "Nível de Otimismo",
    generateTab: isEn ? "🚀 Generate Exercise" : "🚀 Gerar Exercício",
    generate: isEn ? "Generate Exercise" : "Gerar Exercício",
    exerciseIntro: isEn
      ? "Generate the decision problem to start the exercise."
      : "Gere o problema de decisão para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the problem to see its solution here."
      : "Gere o problema para visualizar sua solução aqui.",
  };
}
