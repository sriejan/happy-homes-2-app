"use client";
import Image from "next/image";
import { useCart, CartItem } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";

export default function CartItemRow({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart();

  return (
    <div className="flex gap-3 items-center border border-[var(--kk-border)] rounded-2xl p-3">
      <div className="relative w-16 h-16 rounded-xl overflow-hidden">
        {/* image might be external placeholder; Next config may need remotePatterns */}
        <Image src={item.image || "https://picsum.photos/100"} alt={item.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{item.name}</div>
        <div className="text-xs text-neutral-600">₹{item.price.toLocaleString("en-IN")}</div>
        <div className="mt-2 flex items-center gap-2">
          <QtyStepper
            value={item.qty}
            onChange={(q) => setQty(item.productId, q)}
            max={item.stock ?? 99}
          />
          <Button variant="ghost" size="sm" onClick={() => remove(item.productId)}>Remove</Button>
        </div>
      </div>
    </div>
  );
}

function QtyStepper({ value, onChange, max }: { value: number; onChange: (q: number) => void; max: number }) {
  return (
    <div className="inline-flex items-center border rounded-full overflow-hidden">
      <button className="px-3 py-1" aria-label="Decrease" onClick={() => onChange(Math.max(1, value - 1))}>−</button>
      <input
        className="w-10 text-center outline-none"
        value={value}
        onChange={(e) => {
          const n = Number((e.target.value || "").replace(/\D/g, "")) || 1;
          onChange(Math.min(Math.max(1, n), max));
        }}
        inputMode="numeric"
        aria-label="Quantity"
      />
      <button className="px-3 py-1" aria-label="Increase" onClick={() => onChange(Math.min(max, value + 1))}>＋</button>
    </div>
  );
}
