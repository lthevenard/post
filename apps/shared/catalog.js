// ============================================================================
// Apps Catalog Loader
// ============================================================================

/**
 * Loads the apps catalog JSON.
 * @returns {Promise<Array<object>>}
 */
export async function loadAppsCatalog() {
  const res = await fetch("./apps/apps.json");
  if (!res.ok) throw new Error("Failed to load apps/apps.json");
  return await res.json();
}
