import Breadcrumbs from "@/components/product/Breadcrumbs";
import { Card } from "@/components/ui/card";
import Image from "next/image";

const artisans = [
  { slug: "khans-of-kashmir", name: "Khan Handlooms", craft: "Pashmina Weaving", image: "/img/artisans-loom.jpg" },
  { slug: "mishra-blue-atelier", name: "Mishra Blue Atelier", craft: "Blue Pottery", image: "/img/cat-blue-pottery.jpg" },
  { slug: "gond-collective", name: "Gond Crafts Collective", craft: "Dhokra", image: "/img/nandi1.webp" },
];

export const metadata = { title: "Artisans • Happy Homes 2.0", description: "Meet our master artisans." };

export default function ArtisansPage() {
  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Artisans", isCurrent: true }]} />
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6">Artisans</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artisans.map((a) => (
            <Card key={a.slug} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={a.image} alt={a.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <div className="font-medium">{a.name}</div>
                <div className="text-sm text-neutral-600">{a.craft}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}


