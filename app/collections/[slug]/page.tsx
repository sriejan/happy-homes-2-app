import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductCard from "@/components/catalog/ProductCard";
import { filterProducts } from "@/lib/data";

const collections: Record<string, { name: string; filter: Parameters<typeof filterProducts>[0] }> = {
  "festive-brass": { name: "Festive Brass", filter: { category: ["brassware"] } },
  "blue-elegance": { name: "Blue Elegance", filter: { category: ["blue-pottery"] } },
  "artisan-textiles": { name: "Artisan Textiles", filter: { category: ["textiles"] } },
};

export async function generateStaticParams() {
  return Object.keys(collections).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = collections[params.slug];
  if (!c) return {};
  return { title: `${c.name} • Happy Homes 2.0`, description: `Shop the ${c.name} collection.` };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const c = collections[params.slug];
  if (!c) return notFound();
  const products = filterProducts(c.filter);
  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/collections", label: "Collections" }, { label: c.name, isCurrent: true }]} />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">{c.name}</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} slug={p.slug} name={p.name} madeIn={p.madeIn} price={p.price} image={p.images[0]} />
          ))}
        </div>
      </div>
    </main>
  );
}


