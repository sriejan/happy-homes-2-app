import { Hero } from "@/components/site/Hero";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { H2, H3, Small } from "@/components/ui/typography";
import { getFeaturedProducts, getAllCategories } from "@/lib/data";
import SafeImage from "@/components/ui/SafeImage";
import Link from "next/link";

export default function Home() {
  const featured = getFeaturedProducts(6);
  const cats = getAllCategories().slice(0, 6);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <H2 className="text-ink" withDivider>
              Happy Homes 2.0 — Featured Collections
            </H2>
            <Small className="max-w-2xl mx-auto">
              Discover our most popular handcrafted treasures, carefully curated from master artisans around the world.
            </Small>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((product) => (
              <Link key={product.id} href={`/product/${product.slug}`}>
                <Card className="group overflow-hidden border-borderGold shadow-md hover:shadow-lg transition-elegant">
                  <div className="aspect-square bg-gradient-to-br from-brand/10 to-brand/5 relative overflow-hidden">
                    <SafeImage
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-elegant"
                    />
                    <div className="absolute top-4 right-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
                        <Icon name="heart" className="h-4 w-4" aria-hidden />
                      </Button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="bg-brand/20 text-brand border-brand/30">
                        {product.madeIn.split(',')[0]}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="font-display text-xl text-ink group-hover:text-brand transition-subtle">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {product.description.substring(0, 80)}...
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Icon 
                              key={i} 
                              name="star" 
                              className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-brand text-brand' : 'text-muted-foreground'}`} 
                              aria-hidden 
                            />
                          ))}
                        </div>
                        <Small className="text-muted-foreground">({product.reviewsCount})</Small>
                      </div>
                      <div className="text-right">
                        <div className="font-display text-lg font-semibold text-brand">₹{product.price.toLocaleString("en-IN")}</div>
                        <Small className="text-muted-foreground line-through">₹{(product.price * 1.2).toFixed(0)}</Small>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="group border-borderGold text-ink hover:bg-brand/5 hover:border-brand">
              View All Collections
              <Icon name="arrow-right" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-bgWarm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <H2 className="text-ink" withDivider>
              Explore Categories
            </H2>
            <Small className="max-w-2xl mx-auto">
              Discover the rich diversity of Indian handicrafts across different regions and traditions.
            </Small>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cats.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`}>
                <div className="group border border-borderGold rounded-2xl p-4 text-center hover:border-brand hover:bg-white transition-elegant">
                  <div className="aspect-square rounded-xl mb-3 overflow-hidden">
                    <SafeImage src={`/img/cat-${category.slug}.jpg`} alt={category.name} width={400} height={400} className="object-cover w-full h-full" />
                  </div>
                  <H3 asChild className="text-sm font-medium text-ink group-hover:text-brand transition-subtle">
                    <span>{category.name}</span>
                  </H3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Spotlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <H2 className="text-ink" withDivider>
                Meet Our Master{" "}
                <span className="text-brand">Artisans</span>
              </H2>
              <Small className="text-lg text-muted-foreground">
                Behind every piece lies the story of a skilled artisan who has dedicated their life to perfecting their craft. 
                Discover the faces and stories behind our handcrafted treasures.
              </Small>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center">
                    <Icon name="eye" className="h-6 w-6 text-brand" aria-hidden />
                  </div>
                  <div>
                    <H3 asChild className="text-lg font-semibold text-ink">
                      <span>Traditional Techniques</span>
                    </H3>
                    <Small className="text-muted-foreground">Centuries-old methods passed down through generations</Small>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center">
                    <Icon name="heart" className="h-6 w-6 text-brand" aria-hidden />
                  </div>
                  <div>
                    <H3 asChild className="text-lg font-semibold text-ink">
                      <span>Passion & Dedication</span>
                    </H3>
                    <Small className="text-muted-foreground">Every piece crafted with love and attention to detail</Small>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center">
                    <Icon name="star" className="h-6 w-6 text-brand" aria-hidden />
                  </div>
                  <div>
                    <H3 asChild className="text-lg font-semibold text-ink">
                      <span>Quality Assurance</span>
                    </H3>
                    <Small className="text-muted-foreground">Rigorous standards ensure the finest craftsmanship</Small>
                  </div>
                </div>
              </div>
              <Button size="lg" className="group bg-brand text-ink hover:bg-brand/90">
                Discover Artisans
                <Icon name="arrow-right" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
            </div>
            
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <SafeImage src="/img/artisans-loom.jpg" alt="Master artisan weaving at a handloom in warm light" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
