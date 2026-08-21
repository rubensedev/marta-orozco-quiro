/** Bidirectional ES ↔ EN section hash map (without leading #). */
export const HASH_ES_TO_EN: Record<string, string> = {
  inicio: "home",
  "sobre-mi": "about",
  masajes: "massages",
  bonos: "packages",
  contacto: "contact",
};

export const HASH_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(HASH_ES_TO_EN).map(([esHash, enHash]) => [enHash, esHash]),
);

/** Map a hash fragment (with or without #) to the target locale's section id. */
export function mapHashForLocale(
  hash: string,
  targetLocale: "es" | "en",
): string {
  const raw = hash.replace(/^#/, "");
  if (!raw) return "";

  if (targetLocale === "en") {
    return HASH_ES_TO_EN[raw] ?? (HASH_EN_TO_ES[raw] ? raw : raw);
  }
  return HASH_EN_TO_ES[raw] ?? (HASH_ES_TO_EN[raw] ? raw : raw);
}

export function mappedHashHref(hash: string, targetLocale: "es" | "en"): string {
  const id = mapHashForLocale(hash, targetLocale);
  return id ? `#${id}` : "";
}
