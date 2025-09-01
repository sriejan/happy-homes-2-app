"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Order } from "@/types/order";

export type OrdersStore = {
  orders: Order[];
  createOrder: (order: Order) => void;
  updateStatus: (id: string, status: Order["status"], paymentRef?: string) => void;
  getById: (id: string) => Order | undefined;
  clearAll: () => void;
};

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      createOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
      updateStatus: (id, status, paymentRef) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status, paymentRef: paymentRef ?? o.paymentRef } : o)),
        })),
      getById: (id) => get().orders.find((o) => o.id === id),
      clearAll: () => set({ orders: [] }),
    }),
    {
      name: "kk_orders_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ orders: s.orders }),
      version: 1,
    }
  )
);


