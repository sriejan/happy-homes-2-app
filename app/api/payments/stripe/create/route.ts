import { NextRequest, NextResponse } from "next/server";

// POC mock endpoint: in real app, create Stripe PaymentIntent via server SDK with secret key
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { amount, currency = "USD", orderId } = body || {};
  if (!amount || !orderId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  // Simulate a client secret
  const clientSecret = `pi_${Math.random().toString(36).slice(2)}_secret_${Math.random().toString(36).slice(2)}`;
  return NextResponse.json({ clientSecret, amount, currency, orderId });
}


