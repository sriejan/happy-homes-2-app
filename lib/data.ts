import products from "@/data/products.json";
import categories from "@/data/categories.json";
import reviews from "@/data/reviews.json";

import type { Product, SortKey } from "@/types/product";
import type { Category } from "@/types/category";
import type { Review } from "@/types/review";

// ----- Core getters -----
export function getAllProducts(): Product[] {
  return (products as Product[]).slice();
}

export function getAllCategories(): Category[] {
  return (categories as Category[]).slice();
}

export function getAllReviews(): Review[] {
  return (reviews as Review[]).slice();
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return getAllCategories().find((c) => c.id === id);
}

// ----- Review helpers -----
export function getReviewsForProduct(productId: string): Review[] {
  return getAllReviews()
    .filter((r) => r.productId === productId)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getAverageRating(productId: string): number {
  const rs = getReviewsForProduct(productId);
  if (rs.length === 0) return 0;
  const avg = rs.reduce((sum, r) => sum + r.rating, 0) / rs.length;
  return Math.round(avg * 10) / 10;
}

// ----- Search / filter / sort -----
export type FilterParams = {
  category?: string[];   // category slugs
  q?: string;            // search terms
  minPrice?: number;
  maxPrice?: number;
  sort?: SortKey;
  tags?: string[];
};

export function filterProducts(params: FilterParams = {}): Product[] {
  const {
    category,
    q,
    minPrice = 0,
    maxPrice = Number.MAX_SAFE_INTEGER,
    sort = "newest",
    tags,
  } = params;

  let list = getAllProducts();

  // category filter by slug(s)
  if (category && category.length) {
    const catIds = getAllCategories()
      .filter((c) => category.includes(c.slug))
      .map((c) => c.id);
    list = list.filter((p) => catIds.includes(p.categoryId));
  }

  // price filter
  list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // tags filter (AND semantics)
  if (tags && tags.length) {
    list = list.filter((p) => tags.every((t) => p.tags.includes(t)));
  }

  // search: name + description + tags
  if (q && q.trim()) {
    const qn = q.toLowerCase().split(/\s+/).filter(Boolean);
    list = list.filter((p) => {
      const hay = (p.name + " " + p.description + " " + p.tags.join(" ")).toLowerCase();
      return qn.every((term) => hay.includes(term));
    });
  }

  // sort
  list = sortProducts(list, sort);

  return list;
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const byDateDesc = (a: Product, b: Product) => +new Date(b.createdAt) - +new Date(a.createdAt);
  const byPriceAsc = (a: Product, b: Product) => a.price - b.price;
  const byPriceDesc = (a: Product, b: Product) => b.price - a.price;
  const byRatingDesc = (a: Product, b: Product) => b.rating - a.rating;

  switch (sort) {
    case "price_asc": return list.slice().sort(byPriceAsc);
    case "price_desc": return list.slice().sort(byPriceDesc);
    case "rating": return list.slice().sort(byRatingDesc);
    case "newest":
    default:
      return list.slice().sort(byDateDesc);
  }
}

// ----- Convenience helpers for pages -----
export function getFeaturedProducts(limit = 8): Product[] {
  return getAllProducts().filter((p) => p.isFeatured).slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const inSameCategory = getAllProducts()
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id);
  // simple tag overlap scoring
  const scored = inSameCategory.map((p) => ({
    p,
    score: p.tags.filter((t) => product.tags.includes(t)).length,
  }));
  return scored.sort((a, b) => b.score - a.score).map((s) => s.p).slice(0, limit);
}

// ----- Data sanity checks (optional but useful in dev) -----
export function validateCatalog(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const slugs = new Set<string>();
  const catIds = new Set(getAllCategories().map((c) => c.id));

  for (const p of getAllProducts()) {
    if (ids.has(p.id)) errors.push(`Duplicate product id: ${p.id}`);
    ids.add(p.id);
    if (slugs.has(p.slug)) errors.push(`Duplicate product slug: ${p.slug}`);
    slugs.add(p.slug);
    if (!catIds.has(p.categoryId)) errors.push(`Unknown categoryId '${p.categoryId}' on ${p.name}`);
    if (!p.images?.length) errors.push(`No images for product ${p.name}`);
    if (p.rating < 0 || p.rating > 5) errors.push(`Invalid rating for ${p.name}`);
    if (p.price < 0) errors.push(`Invalid price for ${p.name}`);
  }
  return errors;
}
