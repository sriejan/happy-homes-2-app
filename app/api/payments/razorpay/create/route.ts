import { NextRequest, NextResponse } from "next/server";

// POC mock endpoint: in real app, create Razorpay order via server SDK using key/secret
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { amount, currency = "INR", orderId } = body || {};
  if (!amount || !orderId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  // Simulate a Razorpay order id
  const id = `razorpay_order_${Math.random().toString(36).slice(2)}`;
  return NextResponse.json({ id, amount, currency, orderId });
}


