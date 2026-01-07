// apps/shared/parsing/listParser.js
// Utilities to parse user-provided semicolon-separated lists.

/**
 * Parses a semicolon-separated list of numbers.
 *
 * Examples:
 *  - "20; 40; 0" -> [20, 40, 0]
 *  - "120; 140; -100" -> [120, 140, -100]
 *
 * Notes:
 *  - Accepts spaces.
 *  - Accepts negative numbers.
 *  - Uses dot as decimal separator.
 *
 * @param {string} input
 * @returns {{ ok: true, values: number[] } | { ok: false, error: string }}
 */
export function parseNumberList(input) {
  const raw = (input ?? "").trim();

  if (!raw) {
    return { ok: false, error: "Empty list." };
  }

  // Reject comma decimals early to avoid silent mis-parsing.
  // This mirrors the Shiny app instruction: use dot, not comma.
  if (raw.includes(",")) {
    return { ok: false, error: "Use '.' as decimal separator (commas are not allowed)." };
  }

  const parts = raw
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (parts.length === 0) {
    return { ok: false, error: "No numbers found in list." };
  }

  const values = [];
  for (const part of parts) {
    // Number("-") is NaN, which is good for validation.
    const n = Number(part);
    if (!Number.isFinite(n)) {
      return { ok: false, error: `Invalid number: '${part}'.` };
    }
    values.push(n);
  }

  return { ok: true, values };
}

/**
 * Formats a list of numbers back into a semicolon-separated string.
 * @param {number[]} arr
 * @returns {string}
 */
export function formatNumberList(arr) {
  if (!Array.isArray(arr)) return "";
  return arr.map((n) => String(n)).join("; ");
}

