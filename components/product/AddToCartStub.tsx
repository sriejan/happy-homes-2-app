"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/lib/store/cart";
import type { Product } from "@/types/product";

export default function AddToCartStub({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <Button onClick={() => add(product, 1)}>
      <Icon name="shopping-bag" aria-hidden className="mr-2" />
      Add to Cart
    </Button>
  );
}
