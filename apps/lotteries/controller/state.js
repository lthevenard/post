// ============================================================================
// App State
// ============================================================================

/**
 * Creates the initial application state.
 * @param {{lang: "pt"|"en"}} ctx
 * @returns {object}
 */
export function createAppState({ lang }) {
  return {
    lang,

    // Raw inputs
    inputs: {
      values1: "",
      probs1: "",
      values2: "",
      probs2: "",
      nMax: 1000,
      seedMode: "auto",     // "auto" | "manual"
      seedManual: "",
    },

    // Seed actually used in the last simulation
    seedUsed: null,

    // Post-simulation results
    lottery: {
      d1: null,
      d2: null,
      simTable1: null,
      simTable2: null,
      N: null,
    },

    // Slider/animation state (post-simulation)
    simUI: {
      selectedN: 1,
      step: 10,
      delay: 750,
      isPlaying: false,
    },
  };
}
