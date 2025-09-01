export type Currency = "INR" | "USD";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;            // in smallest currency unit? No — plain decimal in INR for POC
  currency: Currency;       // default "INR"
  images: string[];
  categoryId: string;
  tags: string[];
  rating: number;           // 0–5 (snapshot, derived from reviews at seed time)
  reviewsCount: number;     // snapshot
  stock: number;            // for POC
  materials: string[];
  dimensions?: string;
  madeIn: string;           // city/state/region
  artisan?: string;
  isFeatured?: boolean;
  createdAt: string;        // ISO
  updatedAt: string;        // ISO
};

export type SortKey = "newest" | "price_asc" | "price_desc" | "rating";
