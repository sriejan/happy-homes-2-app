import Link from "next/link";
import { H1, H3, Small } from "@/components/ui/typography";
import { Icon } from "@/components/ui/icon";
import { ringFocus } from "@/lib/theme/tokens";

export function Footer() {
  return (
    <footer className="border-t border-borderGold bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <H1 asChild className="text-2xl font-bold text-ink tracking-wide">
                <span>Happy Homes 2.0</span>
              </H1>
            </Link>
            <Small className="max-w-xs">
              Discover the finest handcrafted treasures, where tradition meets contemporary design.
            </Small>
            <div className="flex space-x-4">
              <Link
                href="#"
                className={`text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
              >
                <Icon name="facebook" className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#"
                className={`text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
              >
                <Icon name="instagram" className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="#"
                className={`text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
              >
                <Icon name="twitter" className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <H3 withDivider>Quick Links</H3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/collections"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/artisans"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Artisans
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <H3 withDivider>Support</H3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/care"
                  className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
                >
                  Care Instructions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <H3 withDivider>Contact</H3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="mail" className="h-4 w-4 text-muted-foreground" aria-hidden />
                <Small>
                  hello@kalakriti.com
                </Small>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="phone" className="h-4 w-4 text-muted-foreground" aria-hidden />
                <Small>
                  +1 (555) 123-4567
                </Small>
              </div>
              <div className="flex items-start space-x-3">
                <Icon name="map-pin" className="h-4 w-4 text-muted-foreground mt-0.5" aria-hidden />
                <Small>
                  123 Craft Street<br />
                  Artisan District, AD 12345
                </Small>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-borderGold mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <Small>
              © 2024 Happy Homes 2.0. All rights reserved.
            </Small>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`text-sm text-muted-foreground transition-subtle hover:text-brand border-b border-transparent hover:border-[var(--kk-brand)] pb-0.5 ${ringFocus}`}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
