// ============================================================================
// Seed Wiring
// ============================================================================

/**
 * Synchronizes seed UI controls with state.inputs.
 * @param {object} ui
 * @param {object} state
 * @returns {{dispose: () => void}}
 */
export function wireSeed(ui, state) {
  const els = ui.els;
  const handlers = [];

  function setMode(mode) {
    state.inputs.seedMode = mode;
    if (els.seedManualWrap) {
      els.seedManualWrap.style.display = mode === "manual" ? "block" : "none";
    }
  }

  // Initialize mode.
  if (els.seedModeManual?.checked) setMode("manual");
  else setMode("auto");

  if (els.seedModeAuto) {
    const onAuto = () => setMode("auto");
    els.seedModeAuto.addEventListener("change", onAuto);
    handlers.push(() => els.seedModeAuto.removeEventListener("change", onAuto));
  }

  if (els.seedModeManual) {
    const onManual = () => setMode("manual");
    els.seedModeManual.addEventListener("change", onManual);
    handlers.push(() => els.seedModeManual.removeEventListener("change", onManual));
  }

  // Manual seed value.
  if (els.seedManualInput) {
    state.inputs.seedManual = els.seedManualInput.value ?? "";

    const onInput = () => {
      state.inputs.seedManual = els.seedManualInput.value ?? "";
    };
    els.seedManualInput.addEventListener("input", onInput);
    handlers.push(() => els.seedManualInput.removeEventListener("input", onInput));
  }

  return {
    dispose() {
      for (const off of handlers) off();
    },
  };
}
