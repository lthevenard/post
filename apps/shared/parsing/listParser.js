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
  if (raw.includes(",")) {
    return { ok: false, error: "Use '.' as decimal separator and ';' to separate values (commas are not allowed)." };
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
    const n = Number(part);
    if (!Number.isFinite(n)) {
      return { ok: false, error: `Invalid number: '${part}'.` };
    }
    values.push(n);
  }

  return { ok: true, values };
}

