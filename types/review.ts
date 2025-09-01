export type Review = {
  id: string;
  productId: string;
  author: string;
  rating: number;       // 1–5
  comment: string;
  date: string;         // ISO
};
