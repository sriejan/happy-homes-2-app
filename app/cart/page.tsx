"use client";

import { useCart } from "@/lib/store/cart";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8 text-sm text-neutral-700">
            Your cart is empty. <Link className="underline" href="/catalog">Browse the catalog</Link>.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              {items.map((i) => (
                <div key={i.productId} className="flex gap-4 items-center border border-[var(--kk-border)] rounded-2xl p-4">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <Image src={i.image || "https://picsum.photos/100"} alt={i.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{i.name}</div>
                    <div className="text-sm text-neutral-700">₹{i.price.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="text-sm">Qty: {i.qty}</div>
                  <div className="text-sm font-medium">₹{(i.price * i.qty).toLocaleString("en-IN")}</div>
                </div>
              ))}
            </div>

            <aside className="lg:col-span-4 border border-[var(--kk-border)] rounded-2xl p-4 h-fit">
              <div className="flex items-center justify-between">
                <div className="text-sm">Subtotal</div>
                <div className="text-sm font-medium">₹{subtotal.toLocaleString("en-IN")}</div>
              </div>
              <div className="text-xs text-neutral-600 mt-1">Taxes and shipping calculated at checkout.</div>
              <div className="mt-4 flex gap-2">
                <Button asChild className="flex-1"><Link href="/checkout">Proceed to Checkout</Link></Button>
                <Button variant="outline" className="flex-1 border-[var(--kk-border)]" onClick={() => clear()}>Clear</Button>
              </div>
              <div className="mt-3 text-sm">
                or <Link className="underline" href="/catalog">continue shopping</Link>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
