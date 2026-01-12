// apps/lotteries/controller/state.js
// Centraliza o estado do app (mínimo), sem framework.

export function createAppState({ lang }) {
  return {
    lang,

    // Inputs (raw)
    inputs: {
      values1: "",
      probs1: "",
      values2: "",
      probs2: "",
      nMax: 1000,
      seedMode: "auto",     // "auto" | "manual"
      seedManual: "",
    },

    // Seed efetivamente usado na última simulação
    seedUsed: null,

    // Resultados (pós-simulação)
    lottery: {
      d1: null,
      d2: null,
      simTable1: null,
      simTable2: null,
      N: null,
    },

    // Estado do slider/animação (pós-simulação)
    simUI: {
      selectedN: 1,
      step: 10,
      delay: 750,
      isPlaying: false,
    },
  };
}
