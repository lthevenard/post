// ============================================================================
// Shared Utilities
// ============================================================================

/**
 * @param {number} seed
 * @returns {() => number}
 */
export function createSeededRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomIntInclusive(min, max, rng = Math.random) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * @returns {number}
 */
export function generateSeed() {
  return randomIntInclusive(10000, 99999);
}

/**
 * @param {HTMLInputElement | null} inputEl
 * @returns {number}
 */
export function resolveSeedFromMode(mode, inputEl) {
  const raw = inputEl?.value?.trim() ?? "";
  const parsed = raw ? Number.parseInt(raw, 10) : Number.NaN;
  const isValid = Number.isFinite(parsed) && parsed >= 10000 && parsed <= 99999;
  const seed = mode === "manual" && isValid ? parsed : generateSeed();
  if (inputEl) {
    inputEl.value = String(seed);
  }
  return seed;
}
