"use client";

import { useOrders } from "@/lib/store/orders";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function OrdersPage() {
  const orders = useOrders((s) => s.orders);

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Orders</h1>
        {orders.length === 0 ? (
          <div className="mt-6 text-sm text-neutral-700">No orders yet. <Link href="/catalog" className="underline">Shop now</Link>.</div>
        ) : (
          <div className="mt-6 space-y-4">
            {orders.map((o) => (
              <Card key={o.id} className="p-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">Order {o.id}</div>
                    <div className="text-neutral-600">{new Date(o.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{o.amount.toLocaleString("en-IN")}</div>
                    <div className="text-neutral-600 capitalize">{o.status.replace("_", " ")}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}


