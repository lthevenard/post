// ============================================================================
// Inputs Wiring
// ============================================================================

/**
 * Parses an integer safely with a fallback.
 * @param {string|number} v
 * @param {number} fallback
 * @returns {number}
 */
function readIntSafe(v, fallback) {
  const x = Number.parseInt(String(v), 10);
  return Number.isFinite(x) ? x : fallback;
}

/**
 * Synchronizes UI inputs with state.inputs.
 * @param {object} ui
 * @param {object} state
 * @returns {{dispose: () => void}}
 */
export function wireInputs(ui, state) {
  const els = ui.els;

  const handlers = [];

  function setField(key, value) {
    state.inputs[key] = value;
  }

  // Text inputs.
  const textBindings = [
    ["values1", els.values1],
    ["probs1", els.probs1],
    ["values2", els.values2],
    ["probs2", els.probs2],
  ];

  for (const [key, el] of textBindings) {
    if (!el) continue;

    // init from DOM
    setField(key, el.value ?? "");

    const onInput = () => setField(key, el.value ?? "");
    el.addEventListener("input", onInput);
    handlers.push(() => el.removeEventListener("input", onInput));
  }

  // N max (range or number input, depending on the UI).
  if (els.nMax) {
    state.inputs.nMax = readIntSafe(els.nMax.value, state.inputs.nMax);

    const onInput = () => {
      state.inputs.nMax = readIntSafe(els.nMax.value, state.inputs.nMax);
    };
    els.nMax.addEventListener("input", onInput);
    handlers.push(() => els.nMax.removeEventListener("input", onInput));
  }

  return {
    dispose() {
      for (const off of handlers) off();
    },
  };
}
