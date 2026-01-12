// apps/lotteries/controller/actions.js
// Pipeline "compute": valida + simula + grava no state (sem mexer no DOM).

import { parseAndValidateLottery, describeLottery } from "../model/lottery.js";
import {
  buildSimulationTable,
  generateRandomSeed5Digits,
  isValidSeed5Digits,
} from "../model/simulation.js";

export function runSimulation(state, raw) {
  const isEn = state.lang === "en";

  // 1) Persist raw inputs
  state.inputs = { ...raw };

  // 2) Parse + validate both lotteries
  const l1 = parseAndValidateLottery(raw.values1, raw.probs1);
  const l2 = parseAndValidateLottery(raw.values2, raw.probs2);

  const errors = [];
  if (!l1.ok) errors.push(...l1.errors.map((e) => `Lottery 1 — ${e}`));
  if (!l2.ok) errors.push(...l2.errors.map((e) => `Lottery 2 — ${e}`));

  if (errors.length) return { ok: false, errors };

  // 3) Resolve seed (auto/manual)
  let seedUsed;
  if (raw.seedMode === "manual") {
    const parsed = Number.parseInt(raw.seedManual, 10);
    if (!isValidSeed5Digits(parsed)) {
      return {
        ok: false,
        errors: [
          isEn
            ? "Seed must be an integer between 10000 and 99999."
            : "O seed deve ser um inteiro entre 10000 e 99999.",
        ],
      };
    }
    seedUsed = parsed;
  } else {
    seedUsed = generateRandomSeed5Digits();
  }

  // 4) Describe lotteries (theory)
  const d1 = describeLottery(l1.values, l1.probs);
  const d2 = describeLottery(l2.values, l2.probs);

  // 5) Build simulation tables
  const N = raw.nMax;

  const simTable1 = buildSimulationTable(
    N,
    d1.cumProbs,
    d1.resultNames,
    d1.values,
    d1.expectedValue,
    seedUsed
  );

  const simTable2 = buildSimulationTable(
    N,
    d2.cumProbs,
    d2.resultNames,
    d2.values,
    d2.expectedValue,
    seedUsed
  );

  // 6) Commit to state
  state.seedUsed = seedUsed;

  state.lottery.d1 = d1;
  state.lottery.d2 = d2;
  state.lottery.simTable1 = simTable1;
  state.lottery.simTable2 = simTable2;
  state.lottery.N = N;

  // Reset UI-dependent simulation state
  state.simUI.selectedN = 1;
  state.simUI.isPlaying = false;

  return { ok: true, errors: [] };
}
