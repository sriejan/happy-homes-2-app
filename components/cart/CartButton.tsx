"use client";
import * as React from "react";
import { useCart } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import CartDrawer from "./CartDrawer";
import { Icon } from "@/components/ui/icon";

export default function CartButton() {
  const [open, setOpen] = React.useState(false);
  const count = useCart((s) => s.itemCount());

  return (
    <>
      <Button variant="ghost" className="relative" onClick={() => setOpen(true)} aria-label="Open cart">
        <Icon name="shopping-bag" aria-hidden />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 text-xs px-2 py-0.5 rounded-full bg-[var(--kk-brand)] text-black">
            {count}
          </span>
        )}
      </Button>
      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
