import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types/product";
import { H3 } from "@/components/ui/typography";

export default function RelatedProducts({ products }: { products: Product[] }) {
  return (
    <div>
      <H3 withDivider className="mb-4">You may also like</H3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p) => (
          <Link key={p.id} href={`/product/${p.slug}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-[4/3]">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
              </div>
              <div className="p-3">
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-sm text-brand">₹{p.price.toLocaleString("en-IN")}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
