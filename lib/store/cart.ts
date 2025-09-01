"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  currency: "INR" | "USD";
  image: string;
  qty: number;
  stock?: number;
};

type CartStore = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (p, qty = 1) =>
        set((state) => {
          const max = Math.max(0, Math.min(qty, p.stock ?? qty));
          if (max === 0) return state;
          const idx = state.items.findIndex((i) => i.productId === p.id);
          const next = [...state.items];
          if (idx >= 0) {
            const existing = next[idx];
            const capped = Math.min((p.stock ?? 99), existing.qty + max);
            next[idx] = { ...existing, qty: capped, price: p.price, name: p.name, image: p.images[0] ?? existing.image };
          } else {
            next.push({
              productId: p.id,
              name: p.name,
              price: p.price,
              currency: p.currency || "INR",
              image: p.images[0] ?? "",
              qty: max,
              stock: p.stock,
            });
          }
          return { items: next };
        }),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((s) => {
          const next = s.items
            .map((i) => {
              if (i.productId !== productId) return i;
              const cap = i.stock != null ? Math.min(qty, i.stock) : qty;
              return { ...i, qty: Math.max(0, cap) };
            })
            .filter((i) => i.qty > 0);
          return { items: next };
        }),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((n, i) => n + i.qty, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
    }),
    {
      name: "kk_cart_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      version: 1,
    }
  )
);
