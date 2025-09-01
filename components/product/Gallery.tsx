"use client";

import * as React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

type Props = { images: string[]; alt: string };

export default function ProductGallery({ images, alt }: Props) {
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const main = images[active] ?? images[0];

  return (
    <div>
      <Card className="overflow-hidden">
        <button
          type="button"
          className="relative aspect-square w-full group"
          aria-label="Open image in lightbox"
          onClick={() => setOpen(true)}
        >
          <Image src={main} alt={alt} fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          <div className="absolute bottom-3 right-3 rounded-full bg-white/80 p-2 shadow-md opacity-0 group-hover:opacity-100 transition">
            <Icon name="search" aria-hidden />
          </div>
        </button>
      </Card>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square rounded-xl overflow-hidden border",
                i === active ? "border-[var(--kk-brand)]" : "border-[var(--kk-border)]"
              )}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={src} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" sizes="120px" />
            </button>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <div className="relative w-full h-[70vh]">
            <Image src={main} alt={alt} fill className="object-contain bg-white" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
