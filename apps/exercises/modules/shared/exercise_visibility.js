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
 * - game_mixed
 * - about
 */
export const HOME_CARD_VISIBILITY = {
  dui: true,
  dui_build_table: true,
  dui_optimism: true,
  dur: true,
  ev: true,
  game: true,
  game_classic: true,
  game_mixed: false,
  about: true,
};

export function isHomeCardVisible(key) {
  return HOME_CARD_VISIBILITY[key] !== false;
}
