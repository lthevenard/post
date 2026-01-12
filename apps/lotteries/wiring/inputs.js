// apps/lotteries/wiring/inputs.js
// Mantém state.inputs sincronizado com os campos de texto + Nmax (slider/input).

function readIntSafe(v, fallback) {
  const x = Number.parseInt(String(v), 10);
  return Number.isFinite(x) ? x : fallback;
}

export function wireInputs(ui, state) {
  const els = ui.els;

  const handlers = [];

  function setField(key, value) {
    state.inputs[key] = value;
  }

  // Text inputs
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

  // N max (pode ser range ou number, depende da sua UI)
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
