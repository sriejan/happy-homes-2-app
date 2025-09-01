"use client";

import * as React from "react";
import type { Review } from "@/types/review";
import { H2 } from "@/components/ui/typography";

export default function Reviews({ productId, initialReviews = [] as Review[] }: { productId: string; initialReviews?: Review[] }) {
  const [reviews, setReviews] = React.useState(initialReviews);
  const [name, setName] = React.useState("");
  const [rating, setRating] = React.useState(5);
  const [comment, setComment] = React.useState("");

  function addReview(e: React.FormEvent) {
    e.preventDefault();
    const r = {
      id: `local-${Date.now()}`,
      productId,
      author: name || "Guest",
      rating,
      comment,
      date: new Date().toISOString(),
    };
    setReviews([r, ...reviews]);
    setName(""); setRating(5); setComment("");
  }

  return (
    <div>
      <H2 asChild withDivider><h2 className="text-ink">Customer Reviews</h2></H2>
      <form onSubmit={addReview} className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
        <input
          className="md:col-span-3 border rounded-xl px-3 py-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
        />
        <select
          className="md:col-span-2 border rounded-xl px-3 py-2"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          aria-label="Rating"
        >
          {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
        </select>
        <input
          className="md:col-span-5 border rounded-xl px-3 py-2"
          placeholder="Write a short review…"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          aria-label="Review"
        />
        <button className="md:col-span-2 border rounded-xl px-3 py-2 bg-[var(--kk-brand)] text-black" type="submit">
          Submit
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reviews.length === 0 ? (
          <div className="text-sm text-neutral-600">No reviews yet. Be the first to review.</div>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border border-[var(--kk-border)] rounded-2xl p-4 transition-colors hover:border-[var(--kk-brand)]/70">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{r.author}</span>
                <span className="text-neutral-500">•</span>
                <span className="text-neutral-700">{new Date(r.date).toLocaleDateString()}</span>
                <span className="ml-auto text-brand">{Array.from({length: r.rating}).map((_,i)=><span key={i}>★</span>)}</span>
              </div>
              <div className="mt-2 text-neutral-800">{r.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
