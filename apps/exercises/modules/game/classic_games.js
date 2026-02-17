// ============================================================================
// Game Theory - Classic Games
// ============================================================================

export function buildClassicGamesTexts(lang) {
  const isEn = lang === "en";

  return {
    sidebarTitle: isEn ? "Classic Games" : "Jogos Clássicos",
    generateTab: isEn ? "🚀 Generate game" : "🚀 Gerar jogo",
    generate: isEn ? "Generate game" : "Gerar jogo",
    exerciseIntro: isEn
      ? "Generate the game to start the exercise."
      : "Gere o jogo para iniciar o exercício.",
    solutionIntro: isEn
      ? "Generate the game to see its solution here."
      : "Gere o jogo para visualizar sua solução aqui.",
  };
}
