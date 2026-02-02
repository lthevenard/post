// ============================================================================
// Tabs Wiring
// ============================================================================

/**
 * Wires tab button clicks to switch panels.
 * @param {object} ui
 * @returns {{dispose: () => void}}
 */
export function wireTabs(ui){
  const handlers = [];

  for (const btn of ui.els.tabButtons) {
    const onClick = () => ui.setActiveTab(btn.dataset.tab);
    btn.addEventListener("click", onClick);
    handlers.push(() => btn.removeEventListener("click", onClick));
  }

  return {
    dispose(){
      for (const off of handlers) off();
    }
  };
}
