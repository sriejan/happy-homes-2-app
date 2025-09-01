"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  slug: string;
  name: string;
  madeIn: string;
  price: number;
  image: string;
  className?: string;
};

export default function ProductCard({ slug, name, madeIn, price, image, className }: Props) {
  const priceLabel = useMemo(() => `₹${price.toLocaleString("en-IN")}`, [price]);

  return (
    <Link href={`/product/${slug}`} className={cn("group block focus:outline-none", className)}>
      <Card className="overflow-hidden border-[var(--kk-border)] hover:shadow-lg transition-shadow hover:border-[var(--kk-brand)]/70">
        <div className="relative aspect-[4/3]">
          <Image src={image} alt={name} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" priority={false} />
        </div>
        <div className="p-4">
          <div className="text-xs text-neutral-500">{madeIn}</div>
          <div className="font-medium mt-1 transition-subtle group-hover:text-brand">{name}</div>
          <div className="mt-1 text-brand">{priceLabel}</div>
        </div>
      </Card>
    </Link>
  );
}
