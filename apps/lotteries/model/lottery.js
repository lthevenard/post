// ============================================================================
// Lottery Parsing & Theory
// ============================================================================

import { parseNumberList } from "../../shared/parsing/listParser.js";

export const MAX_OUTCOMES = 20;

/**
 * Validates lottery values and probabilities.
 * @param {Array<number>} values
 * @param {Array<number>} probs
 * @returns {{ok: boolean, errors?: string[]}}
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

  const sum = probs.reduce((acc, p) => acc + (Number.isFinite(p) ? p : 0), 0);
  const tol = 1e-9;
  if (Math.abs(sum - 1) > tol) {
    errors.push(`Probabilities must sum to 1 (currently ${sum}).`);
  }

  return errors.length ? { ok: false, errors } : { ok: true };
}

/**
 * Parses and validates lottery inputs from strings.
 * @param {string} valuesStr
 * @param {string} probsStr
 * @returns {{ok: boolean, values?: number[], probs?: number[], errors?: string[]}}
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

// ============================================================================
// Helpers
// ============================================================================

/**
 * Generates result labels A, B, C, ...
 * @param {number} n
 * @returns {Array<string>}
 */
function getResultNames(n) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return alphabet.slice(0, n);
}

/**
 * Computes cumulative probabilities.
 * @param {Array<number>} probs
 * @returns {Array<number>}
 */
function cumulateProbabilities(probs) {
  const out = [];
  let acc = 0;
  for (const p of probs) {
    acc += p;
    out.push(acc);
  }
  return out;
}

/**
 * Computes expected value for a discrete lottery.
 * @param {Array<number>} values
 * @param {Array<number>} probs
 * @returns {number}
 */
function expectedValue(values, probs) {
  let ev = 0;
  for (let i = 0; i < values.length; i += 1) ev += values[i] * probs[i];
  return ev;
}

/**
 * Computes theoretical standard deviation.
 * @param {Array<number>} values
 * @param {Array<number>} probs
 * @param {number} ev
 * @returns {number}
 */
function theoreticalStdDev(values, probs, ev) {
  let v = 0;
  for (let i = 0; i < values.length; i += 1) {
    const d = values[i] - ev;
    v += probs[i] * d * d;
  }
  return Math.sqrt(v);
}

/**
 * Groups identical payoff values to build a compact distribution for charting.
 * @param {Array<number>} values
 * @param {Array<number>} probs
 * @returns {{ value: number, prob: number }[]}
 */
function groupedDistribution(values, probs) {
  const map = new Map();
  for (let i = 0; i < values.length; i += 1) {
    const key = values[i];
    map.set(key, (map.get(key) ?? 0) + probs[i]);
  }
  return Array.from(map.entries())
    .map(([value, prob]) => ({ value: Number(value), prob }))
    .sort((a, b) => a.value - b.value);
}

/**
 * Produces the lottery description object for rendering.
 * @param {Array<number>} values
 * @param {Array<number>} probs
 * @returns {object}
 */
export function describeLottery(values, probs) {
  const n = values.length;
  const names = getResultNames(n);
  const cumProbs = cumulateProbabilities(probs);
  const ev = expectedValue(values, probs);
  const sd = theoreticalStdDev(values, probs, ev);
  const dist = groupedDistribution(values, probs);

  return {
    resultNames: names,
    values,
    probs,
    cumProbs,
    expectedValue: ev,
    stdDev: sd,
    distribution: dist,
  };
}
