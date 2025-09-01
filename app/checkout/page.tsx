"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/lib/store/cart";
import { useOrders } from "@/lib/store/orders";
import { useRouter } from "next/navigation";
import type { Order, PaymentMethod } from "@/types/order";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { H2 } from "@/components/ui/typography";

const addressSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  line1: z.string().min(3),
  line2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().min(3),
  country: z.string().min(2),
});

type AddressForm = z.infer<typeof addressSchema>;

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clearCart = useCart((s) => s.clear);
  const createOrder = useOrders((s) => s.createOrder);
  const updateStatus = useOrders((s) => s.updateStatus);
  const router = useRouter();

  const [step, setStep] = React.useState<1 | 2 | 3>(1);
  const [method, setMethod] = React.useState<PaymentMethod>("razorpay");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "India",
    },
  });

  const total = subtotal; // add shipping/tax hooks later

  function back() {
    setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : 1));
  }

  async function placeOrder() {
    const addr = form.getValues();
    const parsed = addressSchema.safeParse(addr);
    if (!parsed.success) {
      setStep(1);
      form.trigger();
      return;
    }

    setIsSubmitting(true);
    try {
      const order: Order = {
        id: `ord_${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: method === "cod" ? "cod_pending" : "created",
        paymentMethod: method,
        amount: total,
        currency: items[0]?.currency ?? "INR",
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          currency: i.currency,
          qty: i.qty,
          image: i.image,
        })),
        customer: { name: parsed.data.name, email: parsed.data.email, phone: parsed.data.phone },
        shippingAddress: {
          line1: parsed.data.line1,
          line2: parsed.data.line2,
          city: parsed.data.city,
          state: parsed.data.state,
          postalCode: parsed.data.postalCode,
          country: parsed.data.country,
        },
      };

      // POC: call mock API to simulate gateway order/intent creation
      let paymentRef: string | undefined;
      if (method !== "cod") {
        const res = await fetch(`/api/payments/${method}/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: order.amount, currency: order.currency, orderId: order.id }),
        });
        const data = await res.json();
        paymentRef = data?.id || data?.clientSecret || undefined;
        order.paymentRef = paymentRef;
      }

      createOrder(order);
      // Simulate immediate success for non-COD in POC
      if (method !== "cod") {
        updateStatus(order.id, "paid", paymentRef);
      }
      clearCart();
      // Navigate to order detail for tracking
      router.push(`/orders/${order.id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (items.length === 0 && step !== 3) {
    return (
      <main className="kk-section">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Checkout</h1>
          <div className="mt-6 text-sm text-neutral-700">Your cart is empty. <Link href="/catalog" className="underline">Continue shopping</Link>.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <H2 asChild withDivider><h1 className="text-ink">Checkout</h1></H2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-8 space-y-4">
            <Card className="p-4">
              <Stepper step={step} />
            </Card>

            {/* Step 1: Address */}
            {step === 1 && (
              <Card className="p-4 space-y-3">
                <h2 className="font-medium">Shipping Details</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={form.handleSubmit(() => setStep(2))}>
                  <InputField label="Full name" {...form.register("name")} error={form.formState.errors.name?.message} />
                  <InputField label="Email" type="email" {...form.register("email")} error={form.formState.errors.email?.message} />
                  <InputField label="Phone" {...form.register("phone")} error={form.formState.errors.phone?.message} />
                  <div />
                  <InputField label="Address line 1" className="md:col-span-2" {...form.register("line1")} error={form.formState.errors.line1?.message} />
                  <InputField label="Address line 2" className="md:col-span-2" {...form.register("line2")} />
                  <InputField label="City" {...form.register("city")} error={form.formState.errors.city?.message} />
                  <InputField label="State" {...form.register("state")} error={form.formState.errors.state?.message} />
                  <InputField label="Postal code" {...form.register("postalCode")} error={form.formState.errors.postalCode?.message} />
                  <InputField label="Country" defaultValue="India" {...form.register("country")} error={form.formState.errors.country?.message} />
                  <div className="md:col-span-2 flex items-center gap-2 pt-2">
                    <Button type="button" variant="outline" onClick={back} className="border-[var(--kk-border)]">Back</Button>
                    <Button type="submit">Continue</Button>
                  </div>
                </form>
              </Card>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <Card className="p-4 space-y-3">
                <h2 className="font-medium">Payment Method</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <MethodTile label="Razorpay (India)" active={method === "razorpay"} onClick={() => setMethod("razorpay")} />
                  <MethodTile label="Stripe (International)" active={method === "stripe"} onClick={() => setMethod("stripe")} />
                  <MethodTile label="Cash on Delivery" active={method === "cod"} onClick={() => setMethod("cod")} />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" onClick={back} className="border-[var(--kk-border)]">Back</Button>
                  <Button onClick={placeOrder} disabled={isSubmitting}>{isSubmitting ? "Placing…" : "Place Order"}</Button>
                </div>
              </Card>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <Card className="p-6 text-center space-y-2">
                <div className="text-2xl">✅</div>
                <div className="font-medium">Thank you! Your order has been created.</div>
                <div className="text-sm text-neutral-700">You can review details in Order History (POC).</div>
                <div className="pt-2">
                  <Button asChild><Link href="/">Return Home</Link></Button>
                </div>
              </Card>
            )}
          </section>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <Card className="p-4">
              <div className="font-medium">Order Summary</div>
              <div className="mt-3 space-y-3">
                {items.map((i) => (
                  <div key={i.productId} className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                      <Image src={i.image || "https://picsum.photos/80"} alt={i.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{i.name}</div>
                      <div className="text-xs text-neutral-600">Qty {i.qty}</div>
                    </div>
                    <div className="text-sm">₹{(i.price * i.qty).toLocaleString("en-IN")}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t pt-3 flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="text-xs text-neutral-600">Taxes and shipping calculated at next step.</div>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const steps = ["Shipping", "Payment", "Done"];
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      {steps.map((label, i) => (
        <div key={label} className={`flex items-center justify-center rounded-xl border px-3 py-2 ${i + 1 <= step ? "border-[var(--kk-brand)] bg-[var(--kk-brand-muted)]" : "border-[var(--kk-border)]"}`}>{label}</div>
      ))}
    </div>
  );
}

function MethodTile({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl border px-4 py-3 text-left ${active ? "border-[var(--kk-brand)] bg-[var(--kk-brand-muted)]" : "border-[var(--kk-border)]"}`}>
      <div className="font-medium">{label}</div>
      <div className="text-xs text-neutral-600">Secure payment</div>
    </button>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string };
function InputField({ label, error, className, ...rest }: InputProps) {
  return (
    <label className={`block ${className ?? ""}`}>
      <div className="text-sm font-medium mb-1">{label}</div>
      <input {...rest} className={`w-full border rounded-xl px-3 py-2 ${error ? "border-red-400" : "border-[var(--kk-border)]"}`} />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}


