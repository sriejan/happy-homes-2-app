import { H2, H3, Small } from "@/components/ui/typography";
import SafeImage from "@/components/ui/SafeImage";

export const metadata = {
  title: "About • Happy Homes 2.0",
  description: "Our story, ethos, and commitment to handcrafted excellence.",
};

export default function AboutPage() {
  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <H2 asChild withDivider><h1 className="text-ink">About Happy Homes 2.0</h1></H2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6 items-start">
          <div className="space-y-4">
            <p className="text-neutral-800 leading-relaxed">
              Happy Homes 2.0 celebrates Indian craftsmanship with a modern sensibility. We curate authentic
              handmade pieces that bring warmth, culture, and character to your living spaces.
            </p>
            <p className="text-neutral-800 leading-relaxed">
              Each item is sourced directly from artisan communities, ensuring fair value and sustainable
              livelihoods. Our white & gold aesthetic pays homage to timeless Indian elegance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
              <div className="rounded-2xl border border-[var(--kk-border)] p-4">
                <div className="text-2xl font-display text-brand">500+</div>
                <Small>Artisan Partners</Small>
              </div>
              <div className="rounded-2xl border border-[var(--kk-border)] p-4">
                <div className="text-2xl font-display text-brand">10K+</div>
                <Small>Happy Customers</Small>
              </div>
              <div className="rounded-2xl border border-[var(--kk-border)] p-4">
                <div className="text-2xl font-display text-brand">50+</div>
                <Small>Craft Categories</Small>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <H3 withDivider>Our Values</H3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-800">
                <li>Authenticity and provenance</li>
                <li>Fair trade and community impact</li>
                <li>Quality, durability, and timeless design</li>
              </ul>
            </div>
          </div>

          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <SafeImage src="/img/hero-royal.jpg" alt="Happy Homes 2.0 aesthetic" fill className="object-cover" />
          </div>
        </div>
      </div>
    </main>
  );
}


