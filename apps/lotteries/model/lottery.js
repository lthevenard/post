// apps/lotteries/model/lottery.js
// Lottery input validation and (later) core lottery description helpers.

// NOTE: In the repository tree, this file lives at: apps/lotteries/model/lottery.js
// and the parser lives at: apps/shared/parsing/listParser.js
// Therefore the relative import is "../../shared/parsing/listParser.js".
import { parseNumberList } from "../../shared/parsing/listParser.js";

export const MAX_OUTCOMES = 20;

/**
 * Validates parsed lottery arrays.
 *
 * Rules mirror the original Shiny app:
 *  - Same length for values and probabilities.
 *  - Sum of probabilities equals 1.
 *  - Maximum length is 20.
 *  - Probabilities are decimals between 0 and 1.
 *
 * @param {number[]} values
 * @param {number[]} probs
 * @returns {{ ok: true } | { ok: false, errors: string[] }}
 */
export function validateLottery(values, probs) {
  const errors = [];

  if (!Array.isArray(values) || !Array.isArray(probs)) {
    return { ok: false, errors: ["Internal error: values/probabilities must be arrays."] };
  }

  if (values.length === 0 || probs.length === 0) {
    errors.push("Payoffs and probabilities must not be empty.");
  }

  if (values.length !== probs.length) {
    errors.push("Payoffs and probabilities must have the same length.");
  }

  if (values.length > MAX_OUTCOMES) {
    errors.push(`Maximum number of outcomes is ${MAX_OUTCOMES}.`);
  }

  // Probabilities must be within [0, 1].
  for (let i = 0; i < probs.length; i += 1) {
    const p = probs[i];
    if (!Number.isFinite(p)) {
      errors.push(`Probability at position ${i + 1} is not a valid number.`);
      continue;
    }
    if (p < 0 || p > 1) {
      errors.push(`Probability at position ${i + 1} must be between 0 and 1.`);
    }
  }

  // Sum must equal 1 (use tolerance to avoid floating point issues).
  const sum = probs.reduce((acc, p) => acc + (Number.isFinite(p) ? p : 0), 0);
  const tol = 1e-9;
  if (Math.abs(sum - 1) > tol) {
    errors.push(`Probabilities must sum to 1 (currently ${sum}).`);
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}

/**
 * Parses and validates lottery inputs from strings.
 *
 * @param {string} valuesStr
 * @param {string} probsStr
 * @returns {{ ok: true, values: number[], probs: number[] } | { ok: false, errors: string[] }}
 */
export function parseAndValidateLottery(valuesStr, probsStr) {
  const v = parseNumberList(valuesStr);
  const p = parseNumberList(probsStr);

  const errors = [];
  if (!v.ok) errors.push(`Payoffs: ${v.error}`);
  if (!p.ok) errors.push(`Probabilities: ${p.error}`);
  if (errors.length) return { ok: false, errors };

  const validation = validateLottery(v.values, p.values);
  if (!validation.ok) return { ok: false, errors: validation.errors };

  return { ok: true, values: v.values, probs: p.values };
}

// --- Placeholder exports for Milestone B (kept here so other modules can start importing).

/**
 * Returns "A", "B", "C"... outcome labels.
 * @param {number} n
 * @returns {string[]}
 */
export function outcomeNames(n) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from({ length: n }, (_, i) => alphabet[i] ?? `O${i + 1}`);
}
