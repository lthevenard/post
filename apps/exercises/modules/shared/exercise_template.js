// ============================================================================
// Exercise Templates (copy and adapt)
// ============================================================================

export const DUI_METHOD_TEMPLATE = {
  id: "my_method_id",
  label: {
    en: "My Method",
    pt: "Meu Metodo",
  },
  // Optional: tweak or enforce tie-breaking rules on the generated table.
  prepareTable({ problemTable, valuePrecision, rng }) {
    return problemTable;
  },
  // Required: solve the exercise and return the same shape used by the app.
  solve({ problemTable, tableLabels, levelOfOptimism }) {
    return {
      baseTable: problemTable,
      solutionTable: problemTable,
      solution: {
        steps: 1,
        results: 0,
        bestDecision: [],
      },
    };
  },
  // Required: summary card that appears in the Solution tab.
  buildHeader({ exerciseLabel, solution, levelOfOptimism, texts }) {
    return "";
  },
  // Required: detailed explainer (optional to return empty string).
  buildExplainer({ texts, solution, levelOfOptimism, baseTable }) {
    return "";
  },
};

export const GAME_EXERCISE_TEMPLATE = {
  id: "my_game_exercise",
  label: {
    en: "My Game Exercise",
    pt: "Meu Exercicio de Jogo",
  },
  // Required: build game data and solution artifacts.
  build({ numRows, numCols, valuePrecision, texts, rng }) {
    return {
      problem: {
        description: "",
        table: { headers: [], rows: [] },
      },
      solution: {
        header: "",
        table: { headers: [], rows: [] },
        cellClasses: [],
      },
    };
  },
};

export const DUR_EXERCISE_TEMPLATE = {
  id: "my_dur_exercise",
  label: {
    en: "My Decision Under Risk Exercise",
    pt: "Meu Exercicio de Decisao sob Risco",
  },
  // Required: create the exercise and solution artifacts.
  build({ inputs, rng }) {
    return {
      problem: {
        description: "",
        table: { headers: [], rows: [] },
      },
      solution: {
        header: "",
        table: { headers: [], rows: [] },
      },
    };
  },
};
