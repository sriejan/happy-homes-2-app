import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllCategories, filterProducts } from "@/lib/data";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/catalog/ProductCard";
import { H2 } from "@/components/ui/typography";

type ParamsP = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: ParamsP }) {
  const { slug } = await params;
  const cat = getAllCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  const title = `${cat.name} • Happy Homes 2.0`;
  const description = `Explore ${cat.name} from KalaKriti.`;
  return { title, description, openGraph: { title, description }, twitter: { card: "summary_large_image", title, description } };
}

export default async function CategoryPage({ params }: { params: ParamsP }) {
  const { slug } = await params;
  const category = getAllCategories().find((c) => c.slug === slug);
  if (!category) return notFound();

  const products = filterProducts({ category: [slug] });

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/catalog", label: "Catalog" },
            { label: category.name, isCurrent: true },
          ]}
        />
        <H2 asChild withDivider className="mb-4"><h1 className="text-ink">{category.name}</h1></H2>
        <div className="mb-6">
          <Suspense fallback={<div className="h-32 rounded-2xl bg-[var(--kk-bgMuted)]" />}> 
            <FilterBar categories={getAllCategories()} />
          </Suspense>
        </div>
        {products.length === 0 ? (
          <div className="text-sm text-neutral-600">No items found in {category.name}.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} slug={p.slug} name={p.name} madeIn={p.madeIn} price={p.price} image={p.images[0]} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


