import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Breadcrumbs from "@/components/product/Breadcrumbs";

const collections = [
  { slug: "festive-brass", name: "Festive Brass", image: "/img/cat-brassware.jpg" },
  { slug: "blue-elegance", name: "Blue Elegance", image: "/img/cat-blue-pottery.jpg" },
  { slug: "artisan-textiles", name: "Artisan Textiles", image: "/img/cat-textiles.jpg" },
];

export const metadata = { title: "Collections • Happy Homes 2.0", description: "Curated collections from Happy Homes 2.0." };

export default function CollectionsPage() {
  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Collections", isCurrent: true }]} />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Collections</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}>
              <Card className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                </div>
                <div className="p-4 font-medium">{c.name}</div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}


