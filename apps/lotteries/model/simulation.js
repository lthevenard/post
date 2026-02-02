// ============================================================================
// Deterministic Simulation Engine
// ============================================================================

/**
 * Checks whether a seed is a valid 5-digit integer.
 * @param {number} n
 * @returns {boolean}
 */
export function isValidSeed5Digits(n) {
  return Number.isInteger(n) && n >= 10000 && n <= 99999;
}

/**
 * Generates a random 5-digit seed.
 * @returns {number}
 */
export function generateRandomSeed5Digits() {
  return Math.floor(10000 + Math.random() * 90000);
}

/**
 * Deterministic PRNG (Mulberry32). Stable across browsers.
 * @param {number} seedUint32
 * @returns {() => number}
 */
export function makeRng(seedUint32) {
  let a = seedUint32 >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Selects an outcome based on a cumulative probability array.
 * @param {number} u
 * @param {Array<number>} cumProbs
 * @param {Array<string>} resultNames
 * @returns {string}
 */
export function selectOutcome(u, cumProbs, resultNames) {
  // cumProbs is increasing and ends at 1.
  for (let i = 0; i < cumProbs.length; i += 1) {
    if (u <= cumProbs[i]) return resultNames[i];
  }
  return resultNames[resultNames.length - 1];
}

/**
 * Simulates outcomes for a given number of tickets.
 * @param {number} tickets
 * @param {Array<number>} cumProbs
 * @param {Array<string>} resultNames
 * @param {() => number} rngNext
 * @returns {Array<string>}
 */
export function simulateNTickets(tickets, cumProbs, resultNames, rngNext) {
  const outcomes = new Array(tickets);
  for (let i = 0; i < tickets; i += 1) {
    const u = rngNext();
    outcomes[i] = selectOutcome(u, cumProbs, resultNames);
  }
  return outcomes;
}

/**
 * Registers outcomes into a summary row.
 * @param {Array<string>} outcomes
 * @param {Array<string>} resultNames
 * @param {Record<string, number>} valuesByName
 * @returns {object}
 */
export function registerTickets(outcomes, resultNames, valuesByName) {
  const row = { Tickets: outcomes.length };
  let returns = 0;

  // Initialize counts at 0 (stable columns).
  for (const name of resultNames) row[name] = 0;

  for (const o of outcomes) {
    row[o] += 1;
    returns += valuesByName[o] ?? 0;
  }

  row.Returns = returns;
  return row;
}

/**
 * Builds the full simulation table for t = 1..N.
 * @param {number} N
 * @param {Array<number>} cumProbs
 * @param {Array<string>} resultNames
 * @param {Array<number>} values
 * @param {number} expectedValue
 * @param {number} seed5digits
 * @returns {Array<object>}
 */
export function buildSimulationTable(N, cumProbs, resultNames, values, expectedValue, seed5digits) {
  // Create mapping name -> value.
  const valuesByName = {};
  for (let i = 0; i < resultNames.length; i += 1) valuesByName[resultNames[i]] = values[i];

  // Expand seed to uint32 deterministically.
  const seedUint32 = (seed5digits * 2654435761) >>> 0;
  const rngNext = makeRng(seedUint32);

  const table = [];
  for (let t = 1; t <= N; t += 1) {
    const sim = simulateNTickets(t, cumProbs, resultNames, rngNext);
    const row = registerTickets(sim, resultNames, valuesByName);

    const mean = row.Returns / row.Tickets;
    row["Mean Returns"] = roundTo(mean, 2);
    row.Profit = roundTo((mean - expectedValue) * row.Tickets, 2);

    table.push(row);
  }

  return table;
}

/**
 * Rounds to a fixed number of digits.
 * @param {number} x
 * @param {number} digits
 * @returns {number}
 */
function roundTo(x, digits) {
  const p = 10 ** digits;
  return Math.round(x * p) / p;
}

/**
 * Returns the simulation row for a given number of tickets.
 * @param {Array<object>} table
 * @param {number} tickets
 * @returns {object}
 */
export function getRowForTickets(table, tickets) {
  // Tickets are 1-based; table[tickets-1].
  const idx = Math.max(1, Math.min(tickets, table.length)) - 1;
  return table[idx];
}
