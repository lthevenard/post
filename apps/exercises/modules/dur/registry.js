// ============================================================================
// Decision Under Risk (DUR) Registry
// ============================================================================

import { DUR_TREE_SIZES } from "./solve_trees.js";

export const DUR_EXERCISES = DUR_TREE_SIZES.map((size) => ({
  id: size.id,
  label: size.label,
}));
