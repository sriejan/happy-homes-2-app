import { Button } from "@/components/ui/button";
import { Display, Lead } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import SafeImage from "@/components/ui/SafeImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bgWarm via-white to-bgWarm kk-section">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-brand/10 text-brand px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="sparkles" className="h-4 w-4" aria-hidden />
                <span>Handcrafted with Love</span>
              </div>
              <Display className="text-ink">
                Discover the Art of{" "}
                <span className="text-brand">Handcrafted</span> Excellence
              </Display>
              <Lead className="max-w-2xl mx-auto lg:mx-0">
                Experience the beauty of traditional craftsmanship meets contemporary design. 
                Each piece tells a story of skill, passion, and cultural heritage.
              </Lead>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="group bg-brand text-ink hover:bg-brand/90">
                Explore Collections
                <Icon name="arrow-right" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
              <Button variant="outline" size="lg" className="border-borderGold text-ink hover:bg-brand/5 hover:border-brand">
                Meet Our Artisans
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-borderGold">
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-brand">500+</div>
                <div className="text-sm text-muted-foreground">Artisan Partners</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-brand">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-brand">50+</div>
                <div className="text-sm text-muted-foreground">Craft Categories</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
              <SafeImage
                src="/img/hero-royal.jpg"
                alt="Royal arches of City Palace, Jaipur in soft white & gold"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23BFA45E' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
    </section>
  );
}
