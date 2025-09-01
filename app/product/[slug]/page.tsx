import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug, getCategoryById, getReviewsForProduct, getAverageRating, getRelatedProducts } from "@/lib/data";
import ProductGallery from "@/components/product/Gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@/components/ui/icon";
import Reviews from "@/components/product/Reviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import AddToCart from "@/components/product/AddToCart";
import { H2 } from "@/components/ui/typography";

type ParamsP = Promise<{ slug: string }>;

export async function generateStaticParams() {
  // Static params for POC; okay for a small catalog
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: ParamsP }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const title = `${product.name} • Happy Homes 2.0`;
  const description = product.description.slice(0, 140);
  const images = product.images?.length ? [{ url: product.images[0] }] : [];
  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ProductPage({ params }: { params: ParamsP }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return notFound();

  const category = getCategoryById(product.categoryId);
  const reviews = getReviewsForProduct(product.id);
  const avg = getAverageRating(product.id);
  const related = getRelatedProducts(product, 4);

  return (
    <main className="kk-section">
      <div className="container mx-auto px-4">
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/catalog", label: "Catalog" },
            category ? { href: `/catalog?category=${category.slug}`, label: category.name } : undefined,
            { label: product.name, isCurrent: true },
          ].filter(Boolean) as { href?: string; label: string; isCurrent?: boolean }[]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Gallery */}
          <section>
            <ProductGallery images={product.images} alt={product.name} />
          </section>

          {/* Details */}
          <section>
            <H2 asChild withDivider><h1 className="text-ink">{product.name}</h1></H2>
            <div className="mt-2 flex items-center gap-2">
              <div className="text-xl font-semibold text-brand">₹{product.price.toLocaleString("en-IN")}</div>
              {product.isFeatured && <Badge className="bg-[var(--kk-brand)] text-black border-[var(--kk-brand)]">Featured</Badge>}
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm text-neutral-600">
              <Icon name="star" aria-hidden />
              <span>{avg ? `${avg.toFixed(1)} / 5` : "No ratings yet"}</span>
              {reviews.length > 0 && <span className="text-neutral-400">•</span>}
              {reviews.length > 0 && <a href="#reviews" className="underline">{reviews.length} review{reviews.length>1?"s":""}</a>}
            </div>

            <p className="mt-4 text-neutral-800 leading-relaxed">{product.description}</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.materials?.length > 0 && (
                <Card className="p-4">
                  <div className="text-sm font-medium">Materials</div>
                  <div className="text-sm text-neutral-700 mt-1">{product.materials.join(", ")}</div>
                </Card>
              )}
              {product.dimensions && (
                <Card className="p-4">
                  <div className="text-sm font-medium">Dimensions</div>
                  <div className="text-sm text-neutral-700 mt-1">{product.dimensions}</div>
                </Card>
              )}
              <Card className="p-4">
                <div className="text-sm font-medium">Region</div>
                <div className="text-sm text-neutral-700 mt-1">{product.madeIn}</div>
              </Card>
              {product.artisan && (
                <Card className="p-4">
                  <div className="text-sm font-medium">Artisan</div>
                  <div className="text-sm text-neutral-700 mt-1">{product.artisan}</div>
                </Card>
              )}
            </div>

            <Separator className="my-6 bg-[var(--kk-brand)]/30" />

            {/* CTA row */}
            <div className="flex items-center gap-3">
              <AddToCart product={product} />
              <Button variant="outline" asChild className="border-[var(--kk-border)]">
                <Link href="/catalog"><Icon name="chevron-right" aria-hidden className="mr-2 rotate-180" />Back to Catalog</Link>
              </Button>
            </div>

            {/* Small stock hint */}
            <div className="mt-3 text-sm text-neutral-600">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</div>
          </section>
        </div>

        {/* Reviews */}
        <section id="reviews" className="mt-12">
          <Reviews productId={product.id} initialReviews={reviews} />
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <RelatedProducts products={related} />
          </section>
        )}
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: product.images,
            description: product.description,
            brand: { "@type": "Brand", name: "Happy Homes 2.0" },
            offers: {
              "@type": "Offer",
              priceCurrency: product.currency || "INR",
              price: product.price,
              availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            },
            aggregateRating: avg
              ? { "@type": "AggregateRating", ratingValue: avg, reviewCount: reviews.length }
              : undefined,
          }),
        }}
      />
    </main>
  );
}


