"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { buildCatalogQuery, parseCatalogParams, type CatalogParams } from "@/lib/url";
import { ringFocus } from "@/lib/theme/tokens";
import { Icon } from "@/components/ui/icon";
import { Category } from "@/types/category";

type Props = {
  categories: Category[];
  priceMin?: number;
  priceMax?: number;
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "rating", label: "Rating" },
] as const;

export default function FilterBar({ categories, priceMin = 0, priceMax = 10000 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const parsed = useMemo(() => parseCatalogParams(sp), [sp]);

  // Local controlled state for the price slider to avoid jitter
  const [range, setRange] = useState<[number, number]>([
    parsed.minPrice ?? priceMin,
    parsed.maxPrice ?? priceMax,
  ]);

  function update(params: Partial<CatalogParams>) {
    const next = buildCatalogQuery(sp, params);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
  }

  function toggleCategory(slug: string) {
    const set = new Set(parsed.category || []);
    if (set.has(slug)) set.delete(slug); else set.add(slug);
    update({ category: Array.from(set) });
  }

  function resetAll() {
    const next = new URLSearchParams();
    startTransition(() => router.replace(`${pathname}?${next.toString()}`, { scroll: false }));
    setRange([priceMin, priceMax]);
  }

  return (
    <div className="rounded-2xl border border-[var(--kk-border)] p-4 md:p-5 bg-white transition-colors hover:border-[var(--kk-brand)]/60">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <div className="relative">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
            <Input
              defaultValue={parsed.q || ""}
              placeholder="Search crafts, materials, regions…"
              className="pl-9"
              onKeyDown={(e) => {
                if (e.key === "Enter") update({ q: (e.currentTarget as HTMLInputElement).value || undefined });
              }}
              onBlur={(e) => update({ q: e.currentTarget.value || undefined })}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const active = parsed.category?.includes(c.slug);
              return (
                <Badge
                  key={c.id}
                  variant={active ? "default" : "outline"}
                  className={`${ringFocus} cursor-pointer select-none ${active ? "bg-[var(--kk-brand)] text-black border-[var(--kk-brand)]" : "border-[var(--kk-border)]"}`}
                  onClick={() => toggleCategory(c.slug)}
                >
                  {c.name}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-sm font-medium mb-1">Sort</label>
          <Select defaultValue={parsed.sort || "newest"} onValueChange={(v) => update({ sort: v as CatalogParams["sort"] })}>
            <SelectTrigger><SelectValue placeholder="Sort by" /></SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 md:mt-5 md:w-1/2 md:mx-auto">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Price Range</label>
          <div className="text-sm text-neutral-700">₹{range[0].toLocaleString("en-IN")} — ₹{range[1].toLocaleString("en-IN")}</div>
        </div>
        <div className="px-1 mt-3 md:w-1/2 md:mx-auto">
          <Slider
            min={priceMin}
            max={priceMax}
            step={50}
            value={range}
            onValueChange={(v) => setRange([v[0], v[1]] as [number, number])}
            onValueCommit={(v) => update({ minPrice: v[0], maxPrice: v[1] })}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        <Button variant="outline" onClick={resetAll} className="border-[var(--kk-border)]">
          Reset
        </Button>
        {isPending && <span className="text-sm text-neutral-600">Updating…</span>}
      </div>
    </div>
  );
}
