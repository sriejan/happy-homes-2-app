import { getAllCategories, filterProducts } from "@/lib/data";
import { parseCatalogParams } from "@/lib/url";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/catalog/ProductCard";
import { Suspense } from "react";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import { H2 } from "@/components/ui/typography";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const metadata = {
  title: "Catalog • Happy Homes 2.0",
  description: "Explore Indian handicrafts with refined filters and search.",
};

export default async function CatalogPage({ searchParams }: Props) {
  const spObj = await searchParams;
  // Normalize Next's searchParams into URLSearchParams
  const usp = new URLSearchParams();
  Object.entries(spObj || {}).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((vv) => usp.append(k, vv));
    else if (v !== undefined) usp.set(k, v);
  });

  const params = parseCatalogParams(usp);
  const products = filterProducts({
    category: params.category,
    q: params.q,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    sort: params.sort || "newest",
  });

  const cats = getAllCategories();

  // Derive a broad price range from data (simple bounds)
  const prices = products.length ? products.map((p) => p.price) : [0];
  const min = Math.min(...prices, 0);
  const max = Math.max(...prices, 10000);

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { label: "Catalog", isCurrent: true },
          ]}
        />
        
        <H2 asChild withDivider className="mb-4"><h1 className="text-ink">Catalog</h1></H2>

        <Suspense fallback={<div className="mb-6 h-32 rounded-2xl bg-[var(--kk-bgMuted)]" />}>
          <FilterBar categories={cats} priceMin={Math.max(0, min - 100)} priceMax={Math.max(1000, max + 100)} />
        </Suspense>

        <div className="mt-6">
          {products.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  slug={p.slug}
                  name={p.name}
                  madeIn={p.madeIn}
                  price={p.price}
                  image={p.images[0]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border border-dashed border-[var(--kk-border)] rounded-2xl">
      <div className="text-lg font-medium">No items match your filters</div>
      <div className="text-sm text-neutral-600 mt-1">Try clearing some filters or widening the price range.</div>
    </div>
  );
}
