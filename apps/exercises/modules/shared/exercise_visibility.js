// ============================================================================
// Exercises Home Visibility Config
// ============================================================================

/**
 * Controla quais cards/exercicios aparecem na home do app.
 * Defina `false` para ocultar um item.
 *
 * Chaves disponiveis:
 * - dui
 * - dui_build_table
 * - dui_optimism
 * - dur
 * - ev
 * - game
 * - game_classic
 * - about
 */
export const HOME_CARD_VISIBILITY = {
  dui: true,
  dui_build_table: false,
  dui_optimism: false,
  dur: true,
  ev: true,
  game: true,
  game_classic: false,
  about: true,
};

export function isHomeCardVisible(key) {
  return HOME_CARD_VISIBILITY[key] !== false;
}
