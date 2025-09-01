"use client";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/store/cart";
import Link from "next/link";
import CartItemRow from "./CartItemRow";

export default function CartDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-sm text-neutral-600">Your cart is empty.</div>
          ) : (
            items.map((i) => <CartItemRow key={i.productId} item={i} />)
          )}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="text-xs text-neutral-600 mt-1">Taxes & shipping calculated at checkout.</div>
          <div className="mt-4 flex gap-2">
            <Button asChild className="flex-1">
              <Link href="/checkout" onClick={() => onOpenChange(false)}>Checkout</Link>
            </Button>
            <Button variant="outline" asChild className="flex-1 border-[var(--kk-border)]">
              <Link href="/cart" onClick={() => onOpenChange(false)}>View Cart</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
