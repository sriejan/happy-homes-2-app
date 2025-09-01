// Utility helpers for reading/writing URLSearchParams safely
export type CatalogParams = {
  category?: string[]; // category slugs
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price_asc" | "price_desc" | "rating";
};

export function parseCatalogParams(searchParams: URLSearchParams): CatalogParams {
  const category = searchParams.getAll("category"); // multi
  const q = searchParams.get("q") || undefined;
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = (searchParams.get("sort") as CatalogParams["sort"]) || undefined;

  return {
    category: category.length ? category : undefined,
    q,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort,
  };
}

export function buildCatalogQuery(existing: URLSearchParams, next: Partial<CatalogParams>) {
  const sp = new URLSearchParams(existing.toString());

  // primitives
  if (next.q !== undefined) setOrDelete(sp, "q", next.q);
  if (next.minPrice !== undefined) setOrDelete(sp, "minPrice", String(next.minPrice));
  if (next.maxPrice !== undefined) setOrDelete(sp, "maxPrice", String(next.maxPrice));
  if (next.sort !== undefined) setOrDelete(sp, "sort", next.sort || "");

  // multi
  if (next.category !== undefined) {
    sp.delete("category");
    for (const c of next.category || []) sp.append("category", c);
  }
  return sp;
}

function setOrDelete(sp: URLSearchParams, key: string, val?: string) {
  if (val && String(val).trim().length) sp.set(key, val);
  else sp.delete(key);
}
