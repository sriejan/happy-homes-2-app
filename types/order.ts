import type { Currency } from "@/types/product";

export type PaymentMethod = "razorpay" | "stripe" | "cod";

export type OrderStatus =
  | "created"
  | "paid"
  | "failed"
  | "cod_pending"
  | "cancelled";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  currency: Currency;
  qty: number;
  image?: string;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

export type Address = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string; // e.g., "India", "United States"
};

export type Order = {
  id: string;
  createdAt: string; // ISO date string
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentRef?: string; // gateway reference like Razorpay order/payment id or Stripe intent id
  amount: number; // total amount in major units (e.g., INR)
  currency: Currency;
  items: OrderItem[];
  customer: CustomerInfo;
  shippingAddress: Address;
  notes?: string;
};


