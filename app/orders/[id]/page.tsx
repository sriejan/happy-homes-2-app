"use client";

import { useParams } from "next/navigation";
import { useOrders } from "@/lib/store/orders";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function OrderDetailPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const order = useOrders((s) => s.getById(id));

  if (!order) {
    return (
      <main className="kk-section">
        <div className="container mx-auto px-4">
          <div className="text-sm text-neutral-700">Order not found. <Link href="/orders" className="underline">Go back</Link>.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4 space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Order {order.id}</h1>

        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium">Status</div>
              <div className="capitalize">{order.status.replace("_", " ")}</div>
            </div>
            <div>
              <div className="font-medium">Placed on</div>
              <div>{new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="font-medium">Payment</div>
              <div className="uppercase">{order.paymentMethod}</div>
            </div>
            <div>
              <div className="font-medium">Total</div>
              <div>₹{order.amount.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="font-medium mb-3">Items</div>
          <div className="space-y-3">
            {order.items.map((i) => (
              <div key={i.productId} className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                  {i.image && <Image src={i.image} alt={i.name} fill className="object-cover" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-xs text-neutral-600">Qty {i.qty}</div>
                </div>
                <div className="text-sm">₹{(i.price * i.qty).toLocaleString("en-IN")}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <div className="font-medium mb-3">Shipping Address</div>
          <div className="text-sm text-neutral-800">
            <div>{order.customer.name}</div>
            <div>{order.shippingAddress.line1}{order.shippingAddress.line2 ? `, ${order.shippingAddress.line2}` : ""}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</div>
            <div>{order.shippingAddress.country}</div>
          </div>
        </Card>

        <div>
          <Link href="/orders" className="underline text-sm">Back to orders</Link>
        </div>
      </div>
    </main>
  );
}


