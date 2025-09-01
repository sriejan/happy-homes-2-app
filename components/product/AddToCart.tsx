"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useCart } from "@/lib/store/cart";
import type { Product } from "@/types/product";

export default function AddToCart({ product, qty = 1 }: { product: Product; qty?: number }) {
  const add = useCart((s) => s.add);
  const disabled = (product.stock ?? 0) <= 0;

  return (
    <Button onClick={() => add(product, qty)} disabled={disabled}>
      <Icon name="shopping-bag" aria-hidden className="mr-2" />
      {disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
}
