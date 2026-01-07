export async function loadAppsCatalog() {
  const res = await fetch("./apps/apps.json");
  if (!res.ok) throw new Error("Failed to load apps/apps.json");
  return await res.json();
}
